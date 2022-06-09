import React from 'react'
import AsyncSelect from 'react-select/async'
import { useDispatch } from 'react-redux'
import { getCoordsListFromCityName, getWeatherFromCoords } from '../networking'
import { setCurrentCityWeather } from '../redux/currentCityWeatherSlice'
import Card from './Card'
import { Title, Text } from './Typography'
import theme from '../theme'

const customStyles = {
    container: (provided) => ({
        ...provided,
        height: '100%',
    }),
    control: (provided) => ({
        ...provided,
        height: '100%',
        border: 'unset',
        borderRadius: theme.borderRadius,
    }),
    valueContainer: (provided) => ({
        ...provided,
        paddingLeft: 40,
    }),
}

const SearchButton = ({ innerRef, innerProps }) => (
    <div
        ref={innerRef}
        {...innerProps}
        style={{
            borderRadius: theme.borderRadius,
            width: 56,
            height: '100%',
            background: `url("../../assets/searchIcon.png") no-repeat center, ${theme.palette.background.gradients.default}`,
        }}
    />
)

export default function SearchBar() {
    const dispatch = useDispatch()

    async function handleSearch(value) {
        if (value) {
            const cities = await getCoordsListFromCityName(value)
            return cities.map((city) => ({
                label: `${city.name}, ${city.country}`,
                cityName: city.name,
                value: {
                    lat: city.lat,
                    lon: city.lon,
                },
            }))
        }
    }

    async function handleOptionClick(chosenCity) {
        const weather = await getWeatherFromCoords(
            chosenCity.value.lat,
            chosenCity.value.lon
        )
        dispatch(
            setCurrentCityWeather({ ...weather, cityName: chosenCity.cityName })
        )
    }

    return (
        <div style={{ marginBottom: 50 }}>
            <Title>Search</Title>
            <Card width={374} height={140}>
                <AsyncSelect
                    loadOptions={handleSearch}
                    onChange={handleOptionClick}
                    placeholder={
                        <Text color="disabled" size={28} weight="semibold">
                            ex. Miami
                        </Text>
                    }
                    noOptionsMessage={() => 'No cities'}
                    components={{
                        DropdownIndicator: SearchButton,
                        IndicatorSeparator: null,
                    }}
                    styles={customStyles}
                />
            </Card>
        </div>
    )
}
