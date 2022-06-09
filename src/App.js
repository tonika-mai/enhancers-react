import React from 'react'
import { ThemeProvider } from 'styled-components'
import { Provider } from 'react-redux'
import store from './redux/store'
import CurrentWeather from './components/CurrentWeather'
import Tools from './components/Tools'
import StatusAppOverlay from './components/StatusAppOverlay'
import theme from './theme'

function App() {
    return (
        <Provider store={store}>
            <ThemeProvider theme={theme}>
                <div
                    style={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        position: 'relative',
                    }}
                >
                    <CurrentWeather />
                    <Tools />
                    <StatusAppOverlay />
                </div>
            </ThemeProvider>
        </Provider>
    )
}

export default App
