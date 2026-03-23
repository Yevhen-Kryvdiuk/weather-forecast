import { http, HttpResponse } from 'msw';
import type { OpenWeatherMapResponse } from '../types/weather';

const BASE_URL = 'https://api.openweathermap.org/data/2.5';

export const mockWeatherResponse: OpenWeatherMapResponse = {
  name: 'London',
  sys: { country: 'GB' },
  main: {
    temp: 15.5,
    feels_like: 14.2,
    temp_min: 13.0,
    temp_max: 17.0,
    humidity: 72,
  },
  weather: [
    {
      description: 'overcast clouds',
      icon: '04d',
      main: 'Clouds',
    },
  ],
  wind: { speed: 3.5 },
  dt: 1700000000,
};

export const handlers = [
  http.get(`${BASE_URL}/weather`, ({ request }) => {
    const url = new URL(request.url);
    const city = url.searchParams.get('q');

    if (city === 'NotFoundCity') {
      return HttpResponse.json(
        { message: 'city not found' },
        { status: 404 },
      );
    }

    if (city === 'RateLimitCity') {
      return HttpResponse.json(
        { message: 'rate limit exceeded' },
        { status: 429 },
      );
    }

    if (city === 'ServerErrorCity') {
      return HttpResponse.json(
        { message: 'internal error' },
        { status: 500 },
      );
    }

    if (city === 'NetworkErrorCity') {
      return HttpResponse.error();
    }

    return HttpResponse.json(mockWeatherResponse);
  }),
];
