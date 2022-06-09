import React from 'react'
import styled from 'styled-components'

const AppText = styled.p`
    font-size: ${(props) => props.size}px;
    font-weight: ${(props) => props.theme.typography.weight[props.weight]};
    color: ${(props) => props.theme.palette[props.color]};
    margin: 0;
    text-align: ${(props) => props.align};
    text-shadow: ${(props) =>
        props.shadow
            ? '1px 1px 4px rgb(255 255 255 / 80%), -1px -1px 4px rgb(255 255 255 / 80%)'
            : 'none'};
`

export function Text({
    children,
    size = 18,
    weight = 'regular',
    color = 'primary',
    align = 'left',
    shadow = false,
    ...props
}) {
    return (
        <AppText
            size={size}
            weight={weight}
            color={color}
            align={align}
            shadow={shadow}
            {...props}
        >
            {children}
        </AppText>
    )
}

const AppTitle = styled(Text)`
    margin-bottom: 20px;
    padding-left: 20px;
`

export function Title(props) {
    return <AppTitle {...props} weight="semibold" size={28} />
}
