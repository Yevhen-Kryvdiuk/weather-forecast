export interface WeatherData {
  city: string;
  country: string;
  temperature: number;
  feelsLike: number;
  description: string;
  icon: string;
  tempMin: number;
  tempMax: number;
  windSpeed: number;
  humidity: number;
  timestamp: number;
}

export interface SearchHistoryItem {
  id: string;
  city: string;
  searchedAt: number;
}

export interface WeatherState {
  data: WeatherData | null;
  isLoading: boolean;
  error: string | null;
}

export interface OpenWeatherMapResponse {
  name: string;
  sys: { country: string };
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    humidity: number;
  };
  weather: Array<{
    description: string;
    icon: string;
    main: string;
  }>;
  wind: { speed: number };
  dt: number;
}
