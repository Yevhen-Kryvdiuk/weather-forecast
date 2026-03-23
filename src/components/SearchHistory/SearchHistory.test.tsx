import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, userEvent } from '../../test/testUtils';
import { SearchHistory } from './SearchHistory';
import { SearchHistoryProvider } from '../../context/SearchHistoryContext';
import { STORAGE_KEYS } from '../../constants/storage';

function renderWithProvider(onCityClick = vi.fn()) {
  return {
    onCityClick,
    ...render(
      <SearchHistoryProvider>
        <SearchHistory onCityClick={onCityClick} />
      </SearchHistoryProvider>,
    ),
  };
}

beforeEach(() => {
  localStorage.clear();
});

describe('SearchHistory', () => {
  it('shows empty state when no history', () => {
    renderWithProvider();
    expect(screen.getByText('No searches yet')).toBeInTheDocument();
  });

  it('renders cities from localStorage', () => {
    localStorage.setItem(
      STORAGE_KEYS.SEARCH_HISTORY,
      JSON.stringify([
        { id: '1', city: 'London', searchedAt: 100 },
        { id: '2', city: 'Paris', searchedAt: 50 },
      ]),
    );
    renderWithProvider();
    expect(screen.getByText('London')).toBeInTheDocument();
    expect(screen.getByText('Paris')).toBeInTheDocument();
  });

  it('calls onCityClick when a city is clicked', async () => {
    localStorage.setItem(
      STORAGE_KEYS.SEARCH_HISTORY,
      JSON.stringify([{ id: '1', city: 'London', searchedAt: 100 }]),
    );
    const { onCityClick } = renderWithProvider();

    await userEvent.click(
      screen.getByRole('button', { name: /search weather for london/i }),
    );
    expect(onCityClick).toHaveBeenCalledWith('London');
  });

  it('removes a city when × is clicked', async () => {
    localStorage.setItem(
      STORAGE_KEYS.SEARCH_HISTORY,
      JSON.stringify([{ id: '1', city: 'London', searchedAt: 100 }]),
    );
    renderWithProvider();

    await userEvent.click(
      screen.getByRole('button', { name: /remove london/i }),
    );
    expect(screen.queryByText('London')).not.toBeInTheDocument();
    expect(screen.getByText('No searches yet')).toBeInTheDocument();
  });
});
