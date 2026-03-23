import { useState, useRef, useCallback, useEffect } from 'react';
import { fetchWeatherByCity } from '../services/weatherApi';
import type { WeatherData } from '../types/weather';
import axios from 'axios';

interface UseWeatherReturn {
  weather: WeatherData | null;
  isLoading: boolean;
  error: string | null;
  searchCity: (city: string) => Promise<void>;
  clearError: () => void;
}

function useWeather(): UseWeatherReturn {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const abortControllerRef = useRef<AbortController | null>(null);

  const searchCity = useCallback(async (city: string) => {
    abortControllerRef.current?.abort();
    const controller = new AbortController();
    abortControllerRef.current = controller;

    setIsLoading(true);
    setError(null);
    setWeather(null);

    try {
      const data = await fetchWeatherByCity(city, controller.signal);
      setWeather(data);
    } catch (err) {
      if (axios.isCancel(err)) return;
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  useEffect(() => {
    return () => {
      abortControllerRef.current?.abort();
    };
  }, []);

  return { weather, isLoading, error, searchCity, clearError };
}

export { useWeather };
export type { UseWeatherReturn };
