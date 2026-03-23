import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, userEvent } from '../../../test/testUtils';
import { UndoNotification } from './UndoNotification';

beforeEach(() => {
  vi.useFakeTimers();
});

afterEach(() => {
  vi.useRealTimers();
});

describe('UndoNotification', () => {
  it('renders message and undo button', () => {
    render(
      <UndoNotification
        message="City removed"
        onUndo={() => {}}
        onDismiss={() => {}}
      />,
    );
    expect(screen.getByText('City removed')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /undo/i })).toBeInTheDocument();
  });

  it('has role status and aria-live polite', () => {
    render(
      <UndoNotification
        message="Removed"
        onUndo={() => {}}
        onDismiss={() => {}}
      />,
    );
    const toast = screen.getByRole('status');
    expect(toast).toHaveAttribute('aria-live', 'polite');
  });

  it('calls onUndo when undo button is clicked', async () => {
    const handleUndo = vi.fn();
    vi.useRealTimers();
    render(
      <UndoNotification
        message="Removed"
        onUndo={handleUndo}
        onDismiss={() => {}}
      />,
    );

    await userEvent.click(screen.getByRole('button', { name: /undo/i }));
    expect(handleUndo).toHaveBeenCalledOnce();
  });

  it('calls onDismiss after duration', () => {
    const handleDismiss = vi.fn();
    render(
      <UndoNotification
        message="Removed"
        onUndo={() => {}}
        onDismiss={handleDismiss}
        duration={3000}
      />,
    );

    expect(handleDismiss).not.toHaveBeenCalled();
    vi.advanceTimersByTime(3000);
    expect(handleDismiss).toHaveBeenCalledOnce();
  });
});
