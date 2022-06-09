import React from 'react'
import { useSelector } from 'react-redux'
import { BounceLoader } from 'react-spinners'
import { Text } from './Typography'
import theme from '../theme'

const styles = {
    backdrop: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        background: 'rgba(0,0,0,.5)',
    },
    container: {
        width: '100vw',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    errorContainer: {
        background: 'rgba(255,255,255, 0.6)',
        borderRadius: theme.borderRadius,
        padding: '20px 30px',
    },
}

export default function StatusAppOverlay() {
    const isLoading = useSelector((state) => state.statusApp.value.isLoading)
    const isError = useSelector((state) => state.statusApp.value.isError)

    return (
        (isLoading || isError) && (
            <div style={styles.backdrop}>
                <div style={styles.container}>
                    {isLoading ? (
                        <BounceLoader
                            loading={isLoading}
                            size={80}
                            color={theme.palette.primary}
                        />
                    ) : (
                        <div style={styles.errorContainer}>
                            <Text align="center" size={24}>
                                Si è verificato un errore.
                            </Text>
                            <Text align="center" size={24}>
                                Prova a ricaricare la pagina.
                            </Text>
                        </div>
                    )}
                </div>
            </div>
        )
    )
}
