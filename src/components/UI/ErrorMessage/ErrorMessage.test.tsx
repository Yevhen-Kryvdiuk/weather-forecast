import { describe, it, expect, vi } from 'vitest';
import { render, screen, userEvent } from '../../../test/testUtils';
import { ErrorMessage } from './ErrorMessage';

describe('ErrorMessage', () => {
  it('renders error message with alert role', () => {
    render(<ErrorMessage message="Something went wrong" />);
    expect(screen.getByRole('alert')).toBeInTheDocument();
    expect(screen.getByText('Something went wrong')).toBeInTheDocument();
  });

  it('does not render retry button when onRetry is not provided', () => {
    render(<ErrorMessage message="Error" />);
    expect(screen.queryByRole('button')).not.toBeInTheDocument();
  });

  it('renders retry button when onRetry is provided', () => {
    render(<ErrorMessage message="Error" onRetry={() => {}} />);
    expect(
      screen.getByRole('button', { name: /try again/i }),
    ).toBeInTheDocument();
  });

  it('calls onRetry when retry button is clicked', async () => {
    const handleRetry = vi.fn();
    render(<ErrorMessage message="Error" onRetry={handleRetry} />);

    await userEvent.click(screen.getByRole('button', { name: /try again/i }));
    expect(handleRetry).toHaveBeenCalledOnce();
  });
});
