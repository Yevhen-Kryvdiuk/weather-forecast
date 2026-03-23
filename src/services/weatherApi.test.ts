import { describe, it, expect, beforeAll, afterAll, afterEach } from 'vitest';
import { setupServer } from 'msw/node';
import { handlers, mockWeatherResponse } from '../test/handlers';
import { fetchWeatherByCity } from './weatherApi';
import { ERROR_MESSAGES } from '../constants/messages';

const server = setupServer(...handlers);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('fetchWeatherByCity', () => {
  it('returns transformed WeatherData on success', async () => {
    const data = await fetchWeatherByCity('London');

    expect(data).toEqual({
      city: mockWeatherResponse.name,
      country: mockWeatherResponse.sys.country,
      temperature: mockWeatherResponse.main.temp,
      feelsLike: mockWeatherResponse.main.feels_like,
      description: mockWeatherResponse.weather[0]?.description,
      icon: mockWeatherResponse.weather[0]?.icon,
      tempMin: mockWeatherResponse.main.temp_min,
      tempMax: mockWeatherResponse.main.temp_max,
      windSpeed: mockWeatherResponse.wind.speed,
      humidity: mockWeatherResponse.main.humidity,
      timestamp: mockWeatherResponse.dt,
    });
  });

  it('throws city not found error on 404', async () => {
    await expect(fetchWeatherByCity('NotFoundCity')).rejects.toThrow(
      ERROR_MESSAGES.CITY_NOT_FOUND,
    );
  });

  it('throws API limit error on 429', async () => {
    await expect(fetchWeatherByCity('RateLimitCity')).rejects.toThrow(
      ERROR_MESSAGES.API_LIMIT,
    );
  });

  it('throws generic error on 500', async () => {
    await expect(fetchWeatherByCity('ServerErrorCity')).rejects.toThrow(
      ERROR_MESSAGES.GENERIC,
    );
  });

  it('throws network error on connection failure', async () => {
    await expect(fetchWeatherByCity('NetworkErrorCity')).rejects.toThrow(
      ERROR_MESSAGES.NETWORK_ERROR,
    );
  });

  it('throws on abort without error message', async () => {
    const controller = new AbortController();
    controller.abort();

    await expect(
      fetchWeatherByCity('London', controller.signal),
    ).rejects.toThrow();
  });
});
