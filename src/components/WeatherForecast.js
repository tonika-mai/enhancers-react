import React from 'react'
import styled from 'styled-components'
import Card from './Card'
import { Text } from './Typography'
import theme from '../theme'
import WeekCarousel from './WeekCarousel'
import MonthCarousel from './MonthCarousel'

const Tab = styled(Card)`
    flex: 1;
    padding: 20px 30px;
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
    cursor: pointer;
    background: ${(props) =>
        props.isActive ? 'transparent' : theme.palette.background.white};
`

const TabTitle = styled(Text).attrs((props) => ({
    size: 28,
    weight: 'semibold',
    color: props.isActive ? 'textContrast' : 'primary',
    align: 'center',
}))``

export default function WeatherForecast() {
    const [activeTab, setActiveTab] = React.useState('week')

    return (
        <div
            style={{ display: 'flex', flex: '1 1 55%', margin: theme.spacing }}
        >
            <Card
                bg={theme.palette.background.gradients.default}
                style={{
                    flex: 1,
                    display: 'flex',
                    flexDirection: 'column',
                }}
            >
                <div style={{ display: 'flex' }}>
                    <Tab
                        onClick={() => setActiveTab('week')}
                        isActive={activeTab === 'week'}
                        style={{
                            boxShadow:
                                activeTab === 'week'
                                    ? '12px -6px 10px -11px rgb(0 0 0 / 17%)'
                                    : 'none',
                        }}
                    >
                        <TabTitle isActive={activeTab === 'week'}>
                            This week
                        </TabTitle>
                    </Tab>
                    <Tab
                        onClick={() => setActiveTab('month')}
                        isActive={activeTab === 'month'}
                        style={{
                            boxShadow:
                                activeTab === 'month'
                                    ? '-12px -9px 11px -11px rgb(0 0 0 / 17%)'
                                    : 'none',
                        }}
                    >
                        <TabTitle isActive={activeTab === 'month'}>
                            This month
                        </TabTitle>
                    </Tab>
                </div>
                <div
                    style={{
                        padding: theme.spacing,
                        flex: 1,
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                    }}
                >
                    {activeTab === 'week' ? (
                        <WeekCarousel />
                    ) : (
                        <MonthCarousel />
                    )}
                </div>
            </Card>
        </div>
    )
}
