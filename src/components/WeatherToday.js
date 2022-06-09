import React from 'react'
import { useSelector } from 'react-redux'
import dayjs from 'dayjs'
import styled from 'styled-components'
import Card from './Card'
import { Title, Text } from './Typography'
import theme from '../theme'
import { formatTime, formatTemperature } from '../utils'

const BigCircle = styled.div`
    width: 30px;
    height: 30px;
    border-radius: 50%;
    margin: -1px auto -1px;
    background: ${(props) => props.theme.palette.background.white};
`

const SmallCircle = styled(BigCircle)`
    width: 20px;
    height: 20px;
`

const Segment = styled.div`
    width: 8px;
    height: 30px;
    margin: 0 auto;
    transform: scaleY(2.1);
    background: ${(props) =>
        `linear-gradient(180deg,rgba(255, 255, 255, ${props.alphaStart}) 0%,rgba(255, 255, 255, ${props.alphaEnd}) 100%)`};
`

const Centered = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`

export default function WeatherToday() {
    const timezone = useSelector(
        (state) => state.currentCityWeather.value.timezone
    )
    const hourlyForecast = useSelector(
        (state) => state.currentCityWeather.value.hourly
    )

    const currentHour = dayjs.unix(hourlyForecast?.[0].dt).format('HH')
    const hoursLeftToday = 24 - parseInt(currentHour)
    const hoursToRender = hourlyForecast?.slice(0, hoursLeftToday)

    const opacityStart = 1
    const gradientsDelta = opacityStart / (hoursLeftToday - 1)
    const gradientsAlphas = []
    for (let i = 0; i < hoursToRender?.length - 1; i++) {
        gradientsAlphas.push({
            start: (opacityStart - i * gradientsDelta).toFixed(2),
            end: (opacityStart - (i + 1) * gradientsDelta).toFixed(2),
        })
    }

    return (
        <div style={{ margin: theme.spacing }}>
            <Title style={{ padding: 20 }}>Today</Title>
            <Card
                width={302}
                height={385}
                bg={theme.palette.background.gradients.default}
                style={{ padding: '45px 45px 0px', overflowY: 'auto' }}
            >
                <Text
                    weight="bold"
                    color="textContrast"
                    style={{ textAlign: 'center' }}
                >
                    Now
                </Text>
                {hoursToRender?.map((hour, index) => {
                    const isFirstItem = index === 0
                    const isLastItem = index === hoursToRender.length - 1
                    return (
                        <div key={hour.dt}>
                            <div
                                style={{
                                    display: 'flex',
                                    marginBottom: isLastItem ? 40 : 0,
                                }}
                            >
                                <Centered style={{ flex: 1 }}>
                                    <Text
                                        size={isFirstItem ? 40 : 30}
                                        weight={isFirstItem ? 'bold' : 'light'}
                                        color="textContrast"
                                    >
                                        {formatTemperature(hour.temp)}
                                    </Text>
                                </Centered>
                                <Centered>
                                    {isFirstItem ? (
                                        <BigCircle />
                                    ) : (
                                        <SmallCircle />
                                    )}
                                </Centered>
                                <Centered style={{ flex: 1 }}>
                                    {!isFirstItem && (
                                        <Text
                                            size={20}
                                            weight="light"
                                            color="textContrast"
                                        >
                                            {formatTime(hour.dt, timezone)}
                                        </Text>
                                    )}
                                </Centered>
                            </div>
                            {!isLastItem && (
                                <Segment
                                    alphaStart={gradientsAlphas[index].start}
                                    alphaEnd={gradientsAlphas[index].end}
                                />
                            )}
                        </div>
                    )
                })}
            </Card>
        </div>
    )
}
