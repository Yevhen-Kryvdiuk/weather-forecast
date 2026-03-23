import styles from './Loader.module.css';

type LoaderSize = 'small' | 'medium' | 'large';

interface LoaderProps {
  size?: LoaderSize;
  message?: string;
}

function Loader({ size = 'medium', message }: LoaderProps) {
  return (
    <div className={styles.container} role="status" aria-live="polite">
      <div className={`${styles.spinner} ${styles[size]}`} />
      {message && <p className={styles.message}>{message}</p>}
    </div>
  );
}

export { Loader };
export type { LoaderProps };
