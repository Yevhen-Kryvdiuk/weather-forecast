import styles from '../WeatherIcon.module.css';

function RainIcon() {
  return (
    <svg viewBox="0 0 64 64" className={styles.icon} aria-hidden="true">
      <path
        d="M18 36c-4.5 0-8-3.2-8-7.2S13.5 22 18 22c.8-5 5-8.8 10-8.8 4 0 7.5 2.4 9 6 4.2 0 7.5 3.2 7.5 7s-3.3 7-7.5 7"
        fill="#94a3b8"
      />
      <g className={styles.rain}>
        <line
          x1="18"
          y1="40"
          x2="15"
          y2="50"
          stroke="#60a5fa"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <line
          x1="26"
          y1="42"
          x2="23"
          y2="52"
          stroke="#60a5fa"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <line
          x1="34"
          y1="40"
          x2="31"
          y2="50"
          stroke="#60a5fa"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </g>
    </svg>
  );
}

export { RainIcon };
