import axios, { AxiosError } from 'axios';
import { API_BASE_URL, API_KEY, UNITS } from '../constants/api';
import { ERROR_MESSAGES } from '../constants/messages';
import type { OpenWeatherMapResponse, WeatherData } from '../types/weather';

const weatherClient = axios.create({
  baseURL: API_BASE_URL,
  params: {
    appid: API_KEY,
    units: UNITS,
  },
});

function mapResponseToWeatherData(raw: OpenWeatherMapResponse): WeatherData {
  const weather = raw.weather[0];

  return {
    city: raw.name,
    country: raw.sys.country,
    temperature: raw.main.temp,
    feelsLike: raw.main.feels_like,
    description: weather ? weather.description : '',
    icon: weather ? weather.icon : '',
    tempMin: raw.main.temp_min,
    tempMax: raw.main.temp_max,
    windSpeed: raw.wind.speed,
    humidity: raw.main.humidity,
    timestamp: raw.dt,
  };
}

function mapError(error: AxiosError): string {
  if (error.code === 'ERR_NETWORK' || error.message === 'Network Error') {
    return ERROR_MESSAGES.NETWORK_ERROR;
  }

  switch (error.response?.status) {
    case 404:
      return ERROR_MESSAGES.CITY_NOT_FOUND;
    case 429:
      return ERROR_MESSAGES.API_LIMIT;
    default:
      return ERROR_MESSAGES.GENERIC;
  }
}

export async function fetchWeatherByCity(
  city: string,
  signal?: AbortSignal,
): Promise<WeatherData> {
  try {
    const response = await weatherClient.get<OpenWeatherMapResponse>(
      '/weather',
      {
        params: { q: city },
        signal,
      },
    );

    return mapResponseToWeatherData(response.data);
  } catch (error) {
    if (axios.isCancel(error)) {
      throw error;
    }

    if (axios.isAxiosError(error)) {
      throw new Error(mapError(error));
    }

    throw new Error(ERROR_MESSAGES.GENERIC);
  }
}
