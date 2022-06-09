import React from 'react'
import { useDispatch } from 'react-redux'
import { setCurrentCityWeather } from '../redux/currentCityWeatherSlice'
import WeatherNow from './WeatherNow'
import WeatherToday from './WeatherToday'
import WeatherForecast from './WeatherForecast'
import { getWeatherFromCoords, getCityNameFromCoords } from '../networking'
import theme from '../theme'

export default function CurrentWeather() {
    const dispatch = useDispatch()

    React.useEffect(() => {
        async function getDefaultWeather() {
            const defaultWeather = await getWeatherFromCoords(
                31.224361,
                121.46917
            )
            const cityName = await getCityNameFromCoords(31.224361, 121.46917)
            dispatch(setCurrentCityWeather({ ...defaultWeather, cityName }))
        }
        getDefaultWeather()
    }, [dispatch])

    return (
        <div
            style={{
                flex: '1 1 60%',
                display: 'flex',
                flexDirection: 'column',
                margin: theme.spacing,
            }}
        >
            <WeatherNow />
            <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                <WeatherToday />
                <WeatherForecast />
            </div>
        </div>
    )
}
