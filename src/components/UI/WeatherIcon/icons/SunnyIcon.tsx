import styles from '../WeatherIcon.module.css';

function SunnyIcon() {
  return (
    <svg viewBox="0 0 64 64" className={styles.icon} aria-hidden="true">
      <circle cx="32" cy="32" r="10" className={styles.sun} />
      <g className={styles.rays}>
        {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => (
          <line
            key={angle}
            x1="32"
            y1="8"
            x2="32"
            y2="14"
            transform={`rotate(${angle} 32 32)`}
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
        ))}
      </g>
    </svg>
  );
}

export { SunnyIcon };
