import React from 'react'
import { useSelector } from 'react-redux'
import Card from './Card'
import { Text } from './Typography'
import { getRandomImageByKeyword } from '../networking'
import theme from '../theme'
import { formatTemperature, formatLongDate } from '../utils'

const styles = {
    centered: {
        position: 'absolute',
        left: '50%',
        transform: 'translate(-50%)',
    },
    floatingCard: {
        position: 'absolute',
        left: 0,
        top: '50%',
        transform: 'translate(-36%, -50%)',
        borderTopLeftRadius: 0,
        borderBottomLeftRadius: 0,
    },
}

export default function WeatherNow() {
    const weather = useSelector((state) => state.currentCityWeather.value)
    const [imgUrl, setImgUrl] = React.useState()

    React.useEffect(() => {
        async function getCityImage() {
            const img = await getRandomImageByKeyword(weather.cityName)
            setImgUrl(img?.urls.regular)
        }
        getCityImage()
    })

    return (
        <div style={{ position: 'relative', margin: theme.spacing }}>
            <Card
                width="100%"
                height={440}
                style={{ paddingTop: 70, paddingLeft: 150 }}
                bg={`url("${imgUrl}") no-repeat center/cover, ${theme.palette.background.gradients.default}`}
            >
                <Text weight="semibold" size={32} shadow>
                    {weather.cityName}
                </Text>
                <Text weight="medium" size={20} shadow>
                    {formatLongDate(weather.current?.dt, weather.timezone)}
                </Text>
                <Text weight="light" size={20} shadow>
                    {weather.current?.weather[0]?.main}
                </Text>
            </Card>
            <Card
                width={140}
                height={280}
                bg={
                    theme.palette.background.gradients[
                        weather.current?.weather[0]?.icon
                    ]
                }
                style={styles.floatingCard}
            >
                <Text
                    weight="semibold"
                    size={50}
                    color="textContrast"
                    style={{ ...styles.centered, top: 45 }}
                >
                    {formatTemperature(weather.current?.temp)}
                </Text>
                <img
                    src={`../../assets/${weather.current?.weather[0]?.icon}.png`}
                    alt=""
                    style={{ ...styles.centered, top: 130 }}
                />
            </Card>
        </div>
    )
}
