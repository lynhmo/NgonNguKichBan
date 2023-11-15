import React from 'react'
import { LinkStyle, TypeStyle } from './style'
const TypeProduct = ({ name }) => {
    return (
        <LinkStyle href={name.value}>
            <TypeStyle>{name.title}</TypeStyle>
        </LinkStyle>
    )
}

export default TypeProduct