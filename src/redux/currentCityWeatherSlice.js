import { createSlice } from '@reduxjs/toolkit'

export const currentCityWeatherSlice = createSlice({
    name: 'currentCityWeather',
    initialState: {
        value: {},
    },
    reducers: {
        setCurrentCityWeather: (state, action) => {
            state.value = action.payload
        },
    },
})

export const { setCurrentCityWeather } = currentCityWeatherSlice.actions

export default currentCityWeatherSlice.reducer
