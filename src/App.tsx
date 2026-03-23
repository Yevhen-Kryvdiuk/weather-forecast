import { useCallback, useRef } from 'react';
import { SearchBar } from './components/SearchBar/SearchBar';
import { WeatherCard } from './components/WeatherCard/WeatherCard';
import { SearchHistory } from './components/SearchHistory/SearchHistory';
import { Loader } from './components/UI/Loader/Loader';
import { ErrorMessage } from './components/UI/ErrorMessage/ErrorMessage';
import { UndoNotification } from './components/UI/UndoNotification/UndoNotification';
import { useWeather } from './hooks/useWeather';
import { useSearchHistory } from './hooks/useSearchHistory';
import styles from './App.module.css';

function App() {
  const { weather, isLoading, error, searchCity } = useWeather();
  const { lastRemoved, addCity, undoRemove } = useSearchHistory();
  const lastCityRef = useRef('');

  const handleSearch = useCallback(
    async (city: string) => {
      lastCityRef.current = city;
      addCity(city);
      await searchCity(city);
    },
    [addCity, searchCity],
  );

  const handleRetry = useCallback(() => {
    if (lastCityRef.current) {
      void handleSearch(lastCityRef.current);
    }
  }, [handleSearch]);

  const handleDismissUndo = useCallback(() => {
    // lastRemoved is cleared on next action; dismiss is a no-op visually
  }, []);

  return (
    <div className={styles.app}>
      <header className={styles.header}>
        <h1 className={styles.title}>Weather Forecast</h1>
      </header>

      <SearchBar onSearch={handleSearch} isLoading={isLoading} />

      <div className={styles.content}>
        <main className={styles.main} aria-live="polite">
          {isLoading && <Loader message="Fetching weather..." />}
          {error && <ErrorMessage message={error} onRetry={handleRetry} />}
          {!isLoading && !error && weather && <WeatherCard data={weather} />}
          {!isLoading && !error && !weather && (
            <section className={styles.welcome}>
              <p className={styles.welcomeText}>
                Search for a city to see the weather forecast
              </p>
            </section>
          )}
        </main>

        <aside className={styles.sidebar}>
          <SearchHistory onCityClick={handleSearch} />
        </aside>
      </div>

      {lastRemoved && (
        <UndoNotification
          message={`"${lastRemoved.city}" removed from history`}
          onUndo={undoRemove}
          onDismiss={handleDismissUndo}
        />
      )}
    </div>
  );
}

export { App };
