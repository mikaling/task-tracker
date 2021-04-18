import React from 'react'
import { useLocation } from 'react-router-dom'
import PropTypes from 'prop-types'

import Button from './Button'


const Header = ({ title, onAddButtonClick, showAddTask }) => {

    const location = useLocation()

    return (
        <header className='header'>
            <h1>{title}</h1>
            {
                // Show button only when on homepage
                location.pathname === '/' &&
                (<Button
                    text={showAddTask ? 'Close' : 'Add'}
                    color={showAddTask ? 'red' : 'green'}
                    onClick={onAddButtonClick}
                />)}
        </header>
    )
}

Header.defaultProps = {
    title: 'Default Prop'
}

Header.propTypes = {
    title: PropTypes.string.isRequired,
}

// CSS in JS
// const headingStyle = {
//     color: 'red',
//     backgroundColor: 'black'
// }

export default Header
