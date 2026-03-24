import { describe, it, expect } from 'vitest';
import { render, screen } from '../../../test/testUtils';
import { WeatherIcon } from './WeatherIcon';

describe('WeatherIcon', () => {
  it('renders SVG icon for known code', () => {
    render(<WeatherIcon code="01d" description="clear sky" />);
    expect(screen.getByRole('img', { name: 'clear sky' })).toBeInTheDocument();
  });

  it('renders different icon for rain code', () => {
    render(<WeatherIcon code="10d" description="light rain" />);
    expect(screen.getByRole('img', { name: 'light rain' })).toBeInTheDocument();
  });

  it('falls back to img for unknown code', () => {
    render(<WeatherIcon code="99x" description="unknown" />);
    const img = screen.getByRole('img', { name: 'unknown' });
    expect(img.tagName).toBe('IMG');
    expect(img).toHaveAttribute(
      'src',
      'https://openweathermap.org/img/wn/99x@2x.png',
    );
  });
});
