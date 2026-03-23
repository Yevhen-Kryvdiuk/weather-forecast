import { describe, it, expect, beforeAll, afterAll, afterEach } from 'vitest';
import { renderHook, act, waitFor } from '@testing-library/react';
import { setupServer } from 'msw/node';
import { handlers, mockWeatherResponse } from '../test/handlers';
import { useWeather } from './useWeather';

const server = setupServer(...handlers);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('useWeather', () => {
  it('starts with idle state', () => {
    const { result } = renderHook(() => useWeather());
    expect(result.current.weather).toBeNull();
    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBeNull();
  });

  it('fetches weather successfully', async () => {
    const { result } = renderHook(() => useWeather());

    await act(() => result.current.searchCity('London'));

    await waitFor(() => {
      expect(result.current.weather).not.toBeNull();
    });
    expect(result.current.weather?.city).toBe(mockWeatherResponse.name);
    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBeNull();
  });

  it('handles error', async () => {
    const { result } = renderHook(() => useWeather());

    await act(() => result.current.searchCity('NotFoundCity'));

    await waitFor(() => {
      expect(result.current.error).not.toBeNull();
    });
    expect(result.current.weather).toBeNull();
    expect(result.current.isLoading).toBe(false);
  });

  it('clears error', async () => {
    const { result } = renderHook(() => useWeather());

    await act(() => result.current.searchCity('NotFoundCity'));
    await waitFor(() => {
      expect(result.current.error).not.toBeNull();
    });

    act(() => result.current.clearError());
    expect(result.current.error).toBeNull();
  });
});
