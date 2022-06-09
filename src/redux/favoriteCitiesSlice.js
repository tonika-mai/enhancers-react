import { createSlice } from '@reduxjs/toolkit'

export const favoriteCitiesSlice = createSlice({
    name: 'favoriteCities',
    initialState: {
        value: [],
    },
    reducers: {
        addCity: (state, action) => {
            if (state.value.length === 2) {
                state.value.pop()
            }
            state.value.unshift(action.payload)
        },
    },
})

export const { addCity } = favoriteCitiesSlice.actions

export default favoriteCitiesSlice.reducer
