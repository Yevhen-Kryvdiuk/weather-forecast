import styles from '../WeatherIcon.module.css';

function MistIcon() {
  return (
    <svg viewBox="0 0 64 64" className={styles.icon} aria-hidden="true">
      <g className={styles.mist}>
        <line
          x1="10"
          y1="24"
          x2="54"
          y2="24"
          stroke="#94a3b8"
          strokeWidth="3"
          strokeLinecap="round"
        />
        <line
          x1="14"
          y1="32"
          x2="50"
          y2="32"
          stroke="#94a3b8"
          strokeWidth="3"
          strokeLinecap="round"
        />
        <line
          x1="10"
          y1="40"
          x2="54"
          y2="40"
          stroke="#94a3b8"
          strokeWidth="3"
          strokeLinecap="round"
        />
        <line
          x1="18"
          y1="48"
          x2="46"
          y2="48"
          stroke="#94a3b8"
          strokeWidth="3"
          strokeLinecap="round"
        />
      </g>
    </svg>
  );
}

export { MistIcon };
