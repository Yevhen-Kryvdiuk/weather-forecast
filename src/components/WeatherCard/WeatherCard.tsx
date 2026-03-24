import type { WeatherData } from '../../types/weather';
import { WeatherIcon } from '../UI/WeatherIcon/WeatherIcon';
import styles from './WeatherCard.module.css';

interface WeatherCardProps {
  data: WeatherData;
}

function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function WeatherCard({ data }: WeatherCardProps) {
  return (
    <article className={styles.card}>
      <header className={styles.header}>
        <h2 className={styles.city}>
          {data.city}, {data.country}
        </h2>
      </header>

      <div className={styles.main}>
        <WeatherIcon code={data.icon} description={data.description} />
        <p className={styles.temperature}>{Math.round(data.temperature)}°C</p>
        <p className={styles.description}>{capitalize(data.description)}</p>
      </div>

      <dl className={styles.details}>
        <div className={styles.detailItem}>
          <dt className={styles.detailLabel}>Min / Max</dt>
          <dd className={styles.detailValue}>
            {Math.round(data.tempMin)}°C / {Math.round(data.tempMax)}°C
          </dd>
        </div>
        <div className={styles.detailItem}>
          <dt className={styles.detailLabel}>Wind</dt>
          <dd className={styles.detailValue}>{data.windSpeed} m/s</dd>
        </div>
        <div className={styles.detailItem}>
          <dt className={styles.detailLabel}>Humidity</dt>
          <dd className={styles.detailValue}>{data.humidity}%</dd>
        </div>
      </dl>
    </article>
  );
}

export { WeatherCard };
export type { WeatherCardProps };
