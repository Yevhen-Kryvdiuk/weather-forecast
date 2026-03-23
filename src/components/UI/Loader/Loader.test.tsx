import { describe, it, expect } from 'vitest';
import { render, screen } from '../../../test/testUtils';
import { Loader } from './Loader';

describe('Loader', () => {
  it('renders with status role', () => {
    render(<Loader />);
    expect(screen.getByRole('status')).toBeInTheDocument();
  });

  it('has aria-live polite', () => {
    render(<Loader />);
    expect(screen.getByRole('status')).toHaveAttribute('aria-live', 'polite');
  });

  it('renders optional message', () => {
    render(<Loader message="Loading weather..." />);
    expect(screen.getByText('Loading weather...')).toBeInTheDocument();
  });

  it('does not render message when not provided', () => {
    render(<Loader />);
    expect(screen.queryByText(/loading/i)).not.toBeInTheDocument();
  });
});
