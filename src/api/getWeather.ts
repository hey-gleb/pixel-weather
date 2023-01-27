import { get } from '../utils/fetch';
import { buildQueryString } from '../utils/queryBuilder';

export interface WeatherRequestConfig {
    latitude: number;
    longitude: number;
    currentWeather?: boolean;
    startDate?: string;
    endDate?: string;
    daily?: string | string[];
    timezone?: string;
}

const getWeather = (config: WeatherRequestConfig) => {
    const urlBase = 'https://api.open-meteo.com/v1/forecast';
    const queryString = buildQueryString(config);
    return get(
        // 'https://api.open-meteo.com/v1/forecast?latitude=50.26&longitude=19.03&hourly=weathercode&current_weather=true'
        urlBase + queryString
    );
};

export default getWeather;
