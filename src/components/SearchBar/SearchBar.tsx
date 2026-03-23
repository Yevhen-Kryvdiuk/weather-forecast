import { useState } from 'react';
import { Button } from '../UI/Button/Button';
import styles from './SearchBar.module.css';

interface SearchBarProps {
  onSearch: (city: string) => void;
  isLoading: boolean;
}

function SearchBar({ onSearch, isLoading }: SearchBarProps) {
  const [query, setQuery] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = query.trim();
    if (trimmed === '') return;
    onSearch(trimmed);
    setQuery('');
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <label htmlFor="city-search" className={styles.label}>
        City name
      </label>
      <div className={styles.inputGroup}>
        <input
          id="city-search"
          className={styles.input}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Enter city name..."
          aria-label="Enter city name"
        />
        <Button
          type="submit"
          disabled={query.trim() === '' || isLoading}
        >
          {isLoading ? 'Searching...' : 'Search'}
        </Button>
      </div>
    </form>
  );
}

export { SearchBar };
export type { SearchBarProps };
