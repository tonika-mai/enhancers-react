import { configureStore } from '@reduxjs/toolkit'
import favoriteCitiesReducer from './favoriteCitiesSlice'
import currentCityWeatherReducer from './currentCityWeatherSlice'
import statusAppReducer from './statusAppSlice'

export default configureStore({
    reducer: {
        favoriteCities: favoriteCitiesReducer,
        currentCityWeather: currentCityWeatherReducer,
        statusApp: statusAppReducer,
    },
})
