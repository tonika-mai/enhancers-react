import React from 'react'
import { useDispatch } from 'react-redux'
import { setCurrentCityWeather } from '../redux/currentCityWeatherSlice'
import { getCityNameFromCoords, getWeatherFromCoords } from '../networking'
import { Text, Title } from './Typography'
import ButtonCard from './ButtonCard'
import theme from '../theme'

export default function Geolocation() {
    const dispatch = useDispatch()

    function getUserLocation() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                async (position) => {
                    const weather = await getWeatherFromCoords(
                        position.coords.latitude,
                        position.coords.longitude
                    )
                    const cityName = await getCityNameFromCoords(
                        position.coords.latitude,
                        position.coords.longitude
                    )
                    dispatch(setCurrentCityWeather({ ...weather, cityName }))
                },
                (err) => {
                    console.log(err)
                }
            )
        }
    }

    return (
        <div>
            <Title>Localization</Title>
            <ButtonCard
                onClick={getUserLocation}
                bg={theme.palette.background.gradients.default}
            >
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        height: '100%',
                    }}
                >
                    <img src="../../assets/locationIcon.png" alt="" />
                    <Text weight="semibold" size={28} color="textContrast">
                        Add localization
                    </Text>
                </div>
            </ButtonCard>
        </div>
    )
}
