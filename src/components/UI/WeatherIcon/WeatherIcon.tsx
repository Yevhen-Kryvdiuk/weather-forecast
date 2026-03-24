import type { ComponentType } from 'react';
import { SunnyIcon } from './icons/SunnyIcon';
import { CloudyIcon } from './icons/CloudyIcon';
import { RainIcon } from './icons/RainIcon';
import { ThunderIcon } from './icons/ThunderIcon';
import { SnowIcon } from './icons/SnowIcon';
import { MistIcon } from './icons/MistIcon';
import styles from './WeatherIcon.module.css';

const ICON_MAP: Record<string, ComponentType> = {
  '01d': SunnyIcon,
  '01n': SunnyIcon,
  '02d': CloudyIcon,
  '02n': CloudyIcon,
  '03d': CloudyIcon,
  '03n': CloudyIcon,
  '04d': CloudyIcon,
  '04n': CloudyIcon,
  '09d': RainIcon,
  '09n': RainIcon,
  '10d': RainIcon,
  '10n': RainIcon,
  '11d': ThunderIcon,
  '11n': ThunderIcon,
  '13d': SnowIcon,
  '13n': SnowIcon,
  '50d': MistIcon,
  '50n': MistIcon,
};

interface WeatherIconProps {
  code: string;
  description: string;
}

function WeatherIcon({ code, description }: WeatherIconProps) {
  const IconComponent = ICON_MAP[code];

  if (!IconComponent) {
    return (
      <img
        src={`https://openweathermap.org/img/wn/${code}@2x.png`}
        alt={description}
        width={240}
        height={240}
      />
    );
  }

  return (
    <div className={styles.container} role="img" aria-label={description}>
      <IconComponent />
    </div>
  );
}

export { WeatherIcon };
export type { WeatherIconProps };
