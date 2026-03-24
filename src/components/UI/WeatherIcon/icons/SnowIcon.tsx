import styles from '../WeatherIcon.module.css';

function SnowIcon() {
  return (
    <svg viewBox="0 0 64 64" className={styles.icon} aria-hidden="true">
      <path
        d="M18 36c-4.5 0-8-3.2-8-7.2S13.5 22 18 22c.8-5 5-8.8 10-8.8 4 0 7.5 2.4 9 6 4.2 0 7.5 3.2 7.5 7s-3.3 7-7.5 7"
        fill="#94a3b8"
      />
      <g className={styles.snow}>
        <circle cx="18" cy="44" r="2" fill="#bfdbfe" />
        <circle cx="28" cy="48" r="2" fill="#bfdbfe" />
        <circle cx="36" cy="43" r="2" fill="#bfdbfe" />
        <circle cx="24" cy="54" r="1.5" fill="#bfdbfe" />
        <circle cx="34" cy="52" r="1.5" fill="#bfdbfe" />
      </g>
    </svg>
  );
}

export { SnowIcon };
