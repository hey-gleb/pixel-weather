import { get } from '../utils/fetch'

const getWeather = () => {
    return get(
        'https://api.open-meteo.com/v1/forecast?latitude=50.26&longitude=19.03&hourly=temperature_2m&current_weather=true'
    )
}

export default getWeather
