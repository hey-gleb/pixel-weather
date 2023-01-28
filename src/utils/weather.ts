import { weatherCodes } from '../types/weather';

export const translateCodeWeather = (code?: number): string => {
    if (!code) return 'Unknown weather';
    return weatherCodes[code] || 'Unknown weather';
};
