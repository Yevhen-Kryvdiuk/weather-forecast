import styles from '../WeatherIcon.module.css';

function CloudyIcon() {
  return (
    <svg viewBox="0 0 64 64" className={styles.icon} aria-hidden="true">
      <g className={styles.cloud}>
        <path
          d="M20 44c-5.5 0-10-4-10-9s4.5-9 10-9c1-6 6-10 12-10 5 0 9 3 11 7 5 0 9 4 9 8.5S47.5 40 43 40h-1"
          fill="#94a3b8"
          stroke="#94a3b8"
          strokeWidth="1"
          strokeLinejoin="round"
        />
        <ellipse cx="26" cy="42" rx="14" ry="6" fill="#94a3b8" />
      </g>
    </svg>
  );
}

export { CloudyIcon };
