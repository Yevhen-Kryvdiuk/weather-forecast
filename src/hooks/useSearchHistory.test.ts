import { describe, it, expect, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { SearchHistoryProvider } from '../context/SearchHistoryContext';
import { useSearchHistory } from './useSearchHistory';

beforeEach(() => {
  localStorage.clear();
});

function renderUseSearchHistory() {
  return renderHook(() => useSearchHistory(), {
    wrapper: SearchHistoryProvider,
  });
}

describe('useSearchHistory', () => {
  it('starts with empty items', () => {
    const { result } = renderUseSearchHistory();
    expect(result.current.items).toEqual([]);
  });

  it('adds a city', () => {
    const { result } = renderUseSearchHistory();

    act(() => result.current.addCity('London'));

    expect(result.current.items).toHaveLength(1);
    expect(result.current.items[0]?.city).toBe('London');
  });

  it('removes a city and stores in lastRemoved', () => {
    const { result } = renderUseSearchHistory();

    act(() => result.current.addCity('London'));
    const id = result.current.items[0]?.id ?? '';

    act(() => result.current.removeCity(id));

    expect(result.current.items).toHaveLength(0);
    expect(result.current.lastRemoved?.city).toBe('London');
  });

  it('undoes a remove', () => {
    const { result } = renderUseSearchHistory();

    act(() => result.current.addCity('London'));
    const id = result.current.items[0]?.id ?? '';

    act(() => result.current.removeCity(id));
    act(() => result.current.undoRemove());

    expect(result.current.items).toHaveLength(1);
    expect(result.current.items[0]?.city).toBe('London');
    expect(result.current.lastRemoved).toBeNull();
  });

  it('throws when used outside provider', () => {
    expect(() => {
      renderHook(() => useSearchHistory());
    }).toThrow('useSearchHistory must be used within a SearchHistoryProvider');
  });
});
