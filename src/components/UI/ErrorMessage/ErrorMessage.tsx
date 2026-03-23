import { Button } from '../Button/Button';
import styles from './ErrorMessage.module.css';

interface ErrorMessageProps {
  message: string;
  onRetry?: () => void;
}

function ErrorMessage({ message, onRetry }: ErrorMessageProps) {
  return (
    <div className={styles.container} role="alert">
      <p className={styles.message}>{message}</p>
      {onRetry && (
        <Button variant="secondary" onClick={onRetry} ariaLabel="Try again">
          Try again
        </Button>
      )}
    </div>
  );
}

export { ErrorMessage };
export type { ErrorMessageProps };
