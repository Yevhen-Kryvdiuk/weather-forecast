import { describe, it, expect, vi } from 'vitest';
import { render, screen, userEvent } from '../../test/testUtils';
import { SearchBar } from './SearchBar';

describe('SearchBar', () => {
  it('renders the search form', () => {
    render(<SearchBar onSearch={() => {}} isLoading={false} />);
    expect(screen.getByPlaceholderText(/enter city name/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /search/i })).toBeInTheDocument();
  });

  it('calls onSearch with trimmed value on submit', async () => {
    const handleSearch = vi.fn();
    render(<SearchBar onSearch={handleSearch} isLoading={false} />);

    await userEvent.type(
      screen.getByPlaceholderText(/enter city name/i),
      '  London  ',
    );
    await userEvent.click(screen.getByRole('button', { name: /search/i }));

    expect(handleSearch).toHaveBeenCalledWith('London');
  });

  it('clears input after submit', async () => {
    render(<SearchBar onSearch={() => {}} isLoading={false} />);
    const input = screen.getByPlaceholderText(/enter city name/i);

    await userEvent.type(input, 'Paris');
    await userEvent.click(screen.getByRole('button', { name: /search/i }));

    expect(input).toHaveValue('');
  });

  it('does not call onSearch with empty string', async () => {
    const handleSearch = vi.fn();
    render(<SearchBar onSearch={handleSearch} isLoading={false} />);

    await userEvent.click(screen.getByRole('button', { name: /search/i }));
    expect(handleSearch).not.toHaveBeenCalled();
  });

  it('disables button when isLoading', () => {
    render(<SearchBar onSearch={() => {}} isLoading={true} />);
    expect(screen.getByRole('button', { name: /searching/i })).toBeDisabled();
  });

  it('submits on Enter key', async () => {
    const handleSearch = vi.fn();
    render(<SearchBar onSearch={handleSearch} isLoading={false} />);

    await userEvent.type(
      screen.getByPlaceholderText(/enter city name/i),
      'Berlin{Enter}',
    );
    expect(handleSearch).toHaveBeenCalledWith('Berlin');
  });
});
