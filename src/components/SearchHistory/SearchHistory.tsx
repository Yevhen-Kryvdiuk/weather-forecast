import { useSearchHistory } from '../../hooks/useSearchHistory';
import styles from './SearchHistory.module.css';

interface SearchHistoryProps {
  onCityClick: (city: string) => void;
}

function SearchHistory({ onCityClick }: SearchHistoryProps) {
  const { items, removeCity } = useSearchHistory();

  if (items.length === 0) {
    return (
      <aside className={styles.container}>
        <h2 className={styles.title}>Search History</h2>
        <p className={styles.empty}>No searches yet</p>
      </aside>
    );
  }

  return (
    <aside className={styles.container}>
      <h2 className={styles.title}>Search History</h2>
      <ul className={styles.list}>
        {items.map((item) => (
          <li key={item.id} className={styles.item}>
            <button
              className={styles.cityButton}
              onClick={() => onCityClick(item.city)}
              aria-label={`Search weather for ${item.city}`}
            >
              {item.city}
            </button>
            <button
              className={styles.removeButton}
              onClick={() => removeCity(item.id)}
              aria-label={`Remove ${item.city} from history`}
            >
              &times;
            </button>
          </li>
        ))}
      </ul>
    </aside>
  );
}

export { SearchHistory };
export type { SearchHistoryProps };
