import React from 'react'
import { useSelector } from 'react-redux'
import _ from 'lodash'
import Card from './Card'
import { Text } from './Typography'
import { formatDay, formatTemperature, Dot } from '../utils'

const styles = {
    dotsContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    dayCardsContainer: {
        display: 'flex',
        justifyContent: 'space-around',
        marginBottom: 20,
        flexWrap: 'wrap',
    },
    dayCard: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: 20,
        marginBlock: 5,
    },
    paragraph: {
        marginBottom: 30,
    },
}

export default function WeekCarousel() {
    const timezone = useSelector(
        (state) => state.currentCityWeather.value.timezone
    )
    const dailyForecast = useSelector(
        (state) => state.currentCityWeather.value.daily
    )
    const [pageToShow, setPageToShow] = React.useState(0)

    const paginatedDays = _.chunk(dailyForecast, 3)

    return (
        <>
            <div style={styles.dayCardsContainer}>
                {paginatedDays[pageToShow]?.map((day) => (
                    <Card
                        key={day.dt}
                        width={150}
                        height={305}
                        bg={'rgba(255,255,255,0.1)'}
                        style={styles.dayCard}
                    >
                        <Text
                            weight="semibold"
                            size={22}
                            color="textContrast"
                            style={styles.paragraph}
                        >
                            {formatDay(day.dt, timezone)}
                        </Text>
                        <Text
                            weight="semibold"
                            size={42}
                            color="textContrast"
                            style={styles.paragraph}
                        >
                            {formatTemperature(day.temp.day)}
                        </Text>
                        <img
                            src={`../../assets/${day.weather[0]?.icon}.png`}
                            alt=""
                        />
                    </Card>
                ))}
            </div>
            <div style={styles.dotsContainer}>
                <Dot
                    isActive={pageToShow === 0}
                    onClick={() => setPageToShow(0)}
                />
                <Dot
                    isActive={pageToShow === 1}
                    onClick={() => setPageToShow(1)}
                />
                <Dot
                    isActive={pageToShow === 2}
                    onClick={() => setPageToShow(2)}
                />
            </div>
        </>
    )
}
