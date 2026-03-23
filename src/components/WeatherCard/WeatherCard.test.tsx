import { describe, it, expect } from 'vitest';
import { render, screen } from '../../test/testUtils';
import { WeatherCard } from './WeatherCard';
import type { WeatherData } from '../../types/weather';

const mockData: WeatherData = {
  city: 'London',
  country: 'GB',
  temperature: 15.7,
  feelsLike: 14.2,
  description: 'overcast clouds',
  icon: '04d',
  tempMin: 13.1,
  tempMax: 17.8,
  windSpeed: 3.5,
  humidity: 72,
  timestamp: 1700000000,
};

describe('WeatherCard', () => {
  it('renders city and country', () => {
    render(<WeatherCard data={mockData} />);
    expect(screen.getByRole('heading', { name: /london, gb/i })).toBeInTheDocument();
  });

  it('renders temperature rounded to integer', () => {
    render(<WeatherCard data={mockData} />);
    expect(screen.getByText('16°C')).toBeInTheDocument();
  });

  it('renders description capitalized', () => {
    render(<WeatherCard data={mockData} />);
    expect(screen.getByText('Overcast clouds')).toBeInTheDocument();
  });

  it('renders min/max temperature', () => {
    render(<WeatherCard data={mockData} />);
    expect(screen.getByText('13°C / 18°C')).toBeInTheDocument();
  });

  it('renders wind speed with m/s', () => {
    render(<WeatherCard data={mockData} />);
    expect(screen.getByText('3.5 m/s')).toBeInTheDocument();
  });

  it('renders humidity with percent', () => {
    render(<WeatherCard data={mockData} />);
    expect(screen.getByText('72%')).toBeInTheDocument();
  });

  it('renders weather icon', () => {
    render(<WeatherCard data={mockData} />);
    const img = screen.getByRole('img', { name: /overcast clouds/i });
    expect(img).toHaveAttribute('src', 'https://openweathermap.org/img/wn/04d@2x.png');
  });
});
