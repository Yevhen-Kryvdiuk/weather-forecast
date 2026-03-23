import { createContext, useReducer, useEffect } from 'react';
import type {
  SearchHistoryState,
  SearchHistoryAction,
  SearchHistoryItem,
} from '../types/weather';
import { loadFromStorage, saveToStorage } from '../utils/storage';
import { STORAGE_KEYS } from '../constants/storage';

function searchHistoryReducer(
  state: SearchHistoryState,
  action: SearchHistoryAction,
): SearchHistoryState {
  switch (action.type) {
    case 'ADD': {
      const city = action.payload.city;
      const filtered = state.items.filter(
        (item) => item.city.toLowerCase() !== city.toLowerCase(),
      );
      const newItem: SearchHistoryItem = {
        id: crypto.randomUUID(),
        city,
        searchedAt: Date.now(),
      };
      return {
        ...state,
        items: [newItem, ...filtered],
      };
    }
    case 'REMOVE': {
      const removed = state.items.find(
        (item) => item.id === action.payload.id,
      );
      return {
        items: state.items.filter((item) => item.id !== action.payload.id),
        lastRemoved: removed ?? null,
      };
    }
    case 'UNDO_REMOVE': {
      if (!state.lastRemoved) return state;
      const restored = state.lastRemoved;
      const items = [...state.items];
      const insertIndex = items.findIndex(
        (item) => item.searchedAt < restored.searchedAt,
      );
      if (insertIndex === -1) {
        items.push(restored);
      } else {
        items.splice(insertIndex, 0, restored);
      }
      return { items, lastRemoved: null };
    }
  }
}

interface SearchHistoryContextValue {
  state: SearchHistoryState;
  dispatch: React.Dispatch<SearchHistoryAction>;
}

const SearchHistoryContext = createContext<SearchHistoryContextValue | null>(
  null,
);

function SearchHistoryProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(searchHistoryReducer, null, () => {
    const items = loadFromStorage<SearchHistoryItem[]>(
      STORAGE_KEYS.SEARCH_HISTORY,
      [],
    );
    return { items, lastRemoved: null };
  });

  useEffect(() => {
    saveToStorage(STORAGE_KEYS.SEARCH_HISTORY, state.items);
  }, [state.items]);

  return (
    <SearchHistoryContext.Provider value={{ state, dispatch }}>
      {children}
    </SearchHistoryContext.Provider>
  );
}

export { SearchHistoryContext, SearchHistoryProvider, searchHistoryReducer };
