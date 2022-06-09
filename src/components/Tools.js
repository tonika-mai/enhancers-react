import React from 'react'
import Cities from './Cities'
import SearchBar from './Searchbar'
import Geolocation from './Geolocation'
import styled from 'styled-components'

const ToolsContainer = styled.div`
    display: flex;
    flex-direction: column;
    margin: ${(props) => props.theme.spacing}px;
    align-items: center;
`

export default function Tools() {
    return (
        <ToolsContainer>
            <Cities />
            <SearchBar />
            <Geolocation />
        </ToolsContainer>
    )
}
