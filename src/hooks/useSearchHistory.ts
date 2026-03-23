import { useContext } from 'react';
import { SearchHistoryContext } from '../context/SearchHistoryContext';

function useSearchHistory() {
  const context = useContext(SearchHistoryContext);

  if (!context) {
    throw new Error(
      'useSearchHistory must be used within a SearchHistoryProvider',
    );
  }

  const { state, dispatch } = context;

  const addCity = (city: string) => {
    dispatch({ type: 'ADD', payload: { city } });
  };

  const removeCity = (id: string) => {
    dispatch({ type: 'REMOVE', payload: { id } });
  };

  const undoRemove = () => {
    dispatch({ type: 'UNDO_REMOVE' });
  };

  return {
    items: state.items,
    lastRemoved: state.lastRemoved,
    addCity,
    removeCity,
    undoRemove,
  };
}

export { useSearchHistory };
