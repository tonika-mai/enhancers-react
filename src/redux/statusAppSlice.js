import { createSlice } from '@reduxjs/toolkit'

export const statusAppSlice = createSlice({
    name: 'statusApp',
    initialState: {
        value: {
            isLoading: false,
            isError: false,
        },
    },
    reducers: {
        setLoading: (state, action) => {
            state.value.isLoading = action.payload
        },
        setError: (state, action) => {
            state.value.isError = action.payload
        },
    },
})

export const { setLoading, setError } = statusAppSlice.actions

export default statusAppSlice.reducer
