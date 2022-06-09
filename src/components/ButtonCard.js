import React from 'react'
import Card from './Card'
import styled from 'styled-components'

const ButtonBase = styled.button`
    width: 100%;
    border-radius: ${(props) => props.theme.borderRadius}px;
`

export default function ButtonCard({ children, onClick, bg, ...props }) {
    return (
        <ButtonBase onClick={onClick}>
            <Card width={374} height={140} bg={bg} {...props}>
                {children}
            </Card>
        </ButtonBase>
    )
}
