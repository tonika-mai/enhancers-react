import React from 'react'
import styled from 'styled-components'

const RoundedCard = styled.div`
    border-radius: ${(props) => props.theme.borderRadius}px;
    box-shadow: ${(props) => props.theme.shadow};
    width: ${(props) =>
        typeof props.width === 'number' ? props.width + 'px' : props.width};
    height: ${(props) =>
        typeof props.height === 'number' ? props.height + 'px' : props.height};
    background: ${(props) => props.bg || 'none'};
`

export default function Card({ children, width, height, bg, ...props }) {
    return (
        <RoundedCard width={width} height={height} bg={bg} {...props}>
            {children}
        </RoundedCard>
    )
}
