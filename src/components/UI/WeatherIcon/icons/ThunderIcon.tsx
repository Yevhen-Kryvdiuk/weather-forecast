import styles from '../WeatherIcon.module.css';

function ThunderIcon() {
  return (
    <svg viewBox="0 0 64 64" className={styles.icon} aria-hidden="true">
      <path
        d="M18 34c-4.5 0-8-3.2-8-7.2S13.5 20 18 20c.8-5 5-8.8 10-8.8 4 0 7.5 2.4 9 6 4.2 0 7.5 3.2 7.5 7s-3.3 7-7.5 7"
        fill="#64748b"
      />
      <polygon
        className={styles.lightning}
        points="30,34 26,44 31,44 27,56 38,40 33,40 36,34"
        fill="#facc15"
      />
    </svg>
  );
}

export { ThunderIcon };
