import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { addCity } from '../redux/favoriteCitiesSlice'
import { setCurrentCityWeather } from '../redux/currentCityWeatherSlice'
import _ from 'lodash'
import styled from 'styled-components'
import { Text } from './Typography'
import ButtonCard from './ButtonCard'
import { formatTemperature, formatLongDate, formatTime } from '../utils'
import theme from '../theme'

const ContainerButton = styled.button`
    display: flex;
    align-items: center;
    align-self: center;
    padding: 30px;
`

const CityContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
`

const SectionContainer = styled.div`
    display: flex;
    flex-direction: column;
    margin-bottom: 20;
`

export default function Cities() {
    const weather = useSelector((state) => state.currentCityWeather.value)
    const cities = useSelector((state) => state.favoriteCities.value)
    const dispatch = useDispatch()

    function saveCity() {
        if (_.isEmpty(weather)) return
        if (cities.find((city) => city.cityName === weather.cityName)) return
        dispatch(addCity(weather))
    }

    function setAsCurrentWeather(cityWeather) {
        dispatch(setCurrentCityWeather(cityWeather))
    }

    return (
        <SectionContainer>
            <ContainerButton onClick={saveCity}>
                <img
                    src="../../assets/addIcon.png"
                    alt=""
                    style={{ marginRight: 15 }}
                />
                <Text size={20} weight="semibold">
                    Add city
                </Text>
            </ContainerButton>
            {cities.map((city) => (
                <ButtonCard
                    key={city.cityName}
                    onClick={() => setAsCurrentWeather(city)}
                    bg={
                        theme.palette.background.gradients[
                            city.current?.weather[0]?.icon
                        ]
                    }
                    style={{ padding: 20, marginBottom: 30 }}
                >
                    <CityContainer>
                        <div style={{ flex: 1 }}>
                            <Text
                                size={26}
                                weight="semibold"
                                color="textContrast"
                                style={{ whiteSpace: 'pre' }}
                            >
                                {city.cityName}
                            </Text>
                            <Text
                                size={15}
                                weight="medium"
                                color="textContrast"
                            >
                                {formatLongDate(
                                    city.current?.dt,
                                    city.timezone
                                )}
                            </Text>
                            <Text size={12} weight="light" color="textContrast">
                                {formatTime(city.current?.dt, city.timezone)}
                            </Text>
                        </div>
                        <div style={{ flex: 1 }}>
                            <img
                                src={`../../assets/${city.current?.weather[0]?.icon}.png`}
                                alt=""
                                width={70}
                            />
                        </div>
                        <div style={{ flex: 1 }}>
                            <Text
                                size={50}
                                weight="bold"
                                color="textContrast"
                                style={{ textAlign: 'right' }}
                            >
                                {formatTemperature(city.current?.temp)}
                            </Text>
                        </div>
                    </CityContainer>
                </ButtonCard>
            ))}
        </SectionContainer>
    )
}
