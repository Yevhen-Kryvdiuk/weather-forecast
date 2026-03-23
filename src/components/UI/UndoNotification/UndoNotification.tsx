import { useEffect } from 'react';
import { Button } from '../Button/Button';
import styles from './UndoNotification.module.css';

interface UndoNotificationProps {
  message: string;
  onUndo: () => void;
  duration?: number;
  onDismiss: () => void;
}

function UndoNotification({
  message,
  onUndo,
  duration = 5000,
  onDismiss,
}: UndoNotificationProps) {
  useEffect(() => {
    const timer = setTimeout(onDismiss, duration);
    return () => clearTimeout(timer);
  }, [duration, onDismiss]);

  return (
    <div className={styles.toast} role="status" aria-live="polite">
      <p className={styles.message}>{message}</p>
      <Button variant="secondary" onClick={onUndo} ariaLabel="Undo">
        Undo
      </Button>
    </div>
  );
}

export { UndoNotification };
export type { UndoNotificationProps };
