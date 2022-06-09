import React from 'react'
import { useSelector } from 'react-redux'
import Card from './Card'
import { Text } from './Typography'
import {
    Dot,
    formatShortDate,
    formatTemperature,
    calcWindCondition,
    formatTime,
} from '../utils'
import theme from '../theme'

const Info = ({ children, ...props }) => (
    <Text color="textContrast" {...props}>
        {children}
    </Text>
)

const styles = {
    img: {
        width: 50,
        marginRight: theme.spacing,
    },
    paragraph: {
        marginBottom: theme.spacing,
    },
    riseSetInfo: {
        display: 'flex',
        alignItems: 'center',
    },
    riseSetContainer: {
        padding: theme.spacing,
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-evenly',
    },
}

export default function MonthCarousel() {
    const [pageToShow, setPageToShow] = React.useState(0)

    const timezone = useSelector(
        (state) => state.currentCityWeather.value.timezone
    )
    const forecast = useSelector((state) =>
        state.currentCityWeather.value.daily.at(-1)
    )

    return (
        <>
            <Card
                bg={'rgba(255,255,255,0.1)'}
                style={{ flex: 1, display: 'flex' }}
            >
                {pageToShow === 0 ? (
                    <div style={{ display: 'flex' }}>
                        <div style={{ flex: 1, margin: theme.spacing }}>
                            <Text
                                color="textContrast"
                                weight="semibold"
                                size={22}
                                style={{ marginBottom: 40 }}
                            >
                                {formatShortDate(forecast.dt, timezone)}
                            </Text>
                            <img src="../../assets/wind.png" alt="" />
                        </div>
                        <div style={{ flex: '2 1 50%', margin: theme.spacing }}>
                            <Info size={36} weight="semibold">
                                {formatTemperature(forecast.temp.day)}
                            </Info>
                            <Info style={styles.paragraph}>
                                {calcWindCondition(forecast.wind_speed)}
                            </Info>
                            <Info
                                style={styles.paragraph}
                            >{`The high will be ${formatTemperature(
                                forecast.temp.max
                            )}C, the low will be ${formatTemperature(
                                forecast.temp.min
                            )}C.`}</Info>
                            <div style={styles.paragraph}>
                                <Info>{`Humidity: ${forecast.humidity}%`}</Info>
                                <Info>{`UV: ${forecast.uvi}`}</Info>
                                <Info>{`Dew point: ${formatTemperature(
                                    forecast.dew_point
                                )}C`}</Info>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div style={styles.riseSetContainer}>
                        <div style={styles.riseSetInfo}>
                            <img
                                src="../../assets/sun.png"
                                alt=""
                                style={styles.img}
                            />
                            <Info>{`The sun will rise at ${formatTime(
                                forecast.sunrise,
                                timezone
                            )} and set at ${formatTime(
                                forecast.sunset,
                                timezone
                            )}`}</Info>
                        </div>
                        <div style={styles.riseSetInfo}>
                            <img
                                src="../../assets/moon.png"
                                alt=""
                                style={styles.img}
                            />
                            <Info>{`The moon will rise at ${formatTime(
                                forecast.moonrise,
                                timezone
                            )} and set at ${formatTime(
                                forecast.moonset,
                                timezone
                            )}`}</Info>
                        </div>
                    </div>
                )}
            </Card>
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <Dot
                    isActive={pageToShow === 0}
                    onClick={() => setPageToShow(0)}
                />
                <Dot
                    isActive={pageToShow === 1}
                    onClick={() => setPageToShow(1)}
                />
            </div>
        </>
    )
}
