import {
  describe,
  it,
  expect,
  beforeAll,
  afterAll,
  afterEach,
  vi,
} from 'vitest';
import { setupServer } from 'msw/node';
import { http, HttpResponse } from 'msw';
import { handlers, mockWeatherResponse } from '../test/handlers';
import { fetchWeatherByCity, clearWeatherCache } from './weatherApi';
import { ERROR_MESSAGES } from '../constants/messages';

const server = setupServer(...handlers);

beforeAll(() => server.listen());
afterEach(() => {
  server.resetHandlers();
  clearWeatherCache();
});
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

describe('caching', () => {
  it('returns cached data on repeated request within TTL', async () => {
    let callCount = 0;
    server.use(
      http.get('https://api.openweathermap.org/data/2.5/weather', () => {
        callCount++;
        return HttpResponse.json(mockWeatherResponse);
      }),
    );

    await fetchWeatherByCity('CacheCity');
    await fetchWeatherByCity('CacheCity');

    expect(callCount).toBe(1);
  });

  it('cache key is case-insensitive', async () => {
    let callCount = 0;
    server.use(
      http.get('https://api.openweathermap.org/data/2.5/weather', () => {
        callCount++;
        return HttpResponse.json(mockWeatherResponse);
      }),
    );

    await fetchWeatherByCity('Berlin');
    await fetchWeatherByCity('berlin');

    expect(callCount).toBe(1);
  });

  it('different cities make separate requests', async () => {
    let callCount = 0;
    server.use(
      http.get('https://api.openweathermap.org/data/2.5/weather', () => {
        callCount++;
        return HttpResponse.json(mockWeatherResponse);
      }),
    );

    await fetchWeatherByCity('Paris');
    await fetchWeatherByCity('Rome');

    expect(callCount).toBe(2);
  });

  it('does not cache errors', async () => {
    await expect(fetchWeatherByCity('NotFoundCity')).rejects.toThrow();

    let callCount = 0;
    server.use(
      http.get('https://api.openweathermap.org/data/2.5/weather', () => {
        callCount++;
        return HttpResponse.json(mockWeatherResponse);
      }),
    );

    await fetchWeatherByCity('NotFoundCity');
    expect(callCount).toBe(1);
  });

  it('refetches after TTL expires', async () => {
    let callCount = 0;
    server.use(
      http.get('https://api.openweathermap.org/data/2.5/weather', () => {
        callCount++;
        return HttpResponse.json(mockWeatherResponse);
      }),
    );

    await fetchWeatherByCity('ExpireCity');

    vi.spyOn(Date, 'now').mockReturnValue(Date.now() + 6 * 60 * 1000);
    await fetchWeatherByCity('ExpireCity');

    expect(callCount).toBe(2);
    vi.restoreAllMocks();
  });

  it('clearWeatherCache forces new request', async () => {
    let callCount = 0;
    server.use(
      http.get('https://api.openweathermap.org/data/2.5/weather', () => {
        callCount++;
        return HttpResponse.json(mockWeatherResponse);
      }),
    );

    await fetchWeatherByCity('ClearCity');
    clearWeatherCache();
    await fetchWeatherByCity('ClearCity');

    expect(callCount).toBe(2);
  });
});
