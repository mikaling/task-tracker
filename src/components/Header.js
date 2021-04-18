import React from 'react'
import PropTypes from 'prop-types'

import Button from './Button'


const Header = ({ title, onAddButtonClick, showAddTask }) => {    
    return (
        <header className='header'>
            <h1>{title}</h1>
            <Button text={ showAddTask ? 'Close' : 'Add' } color={ showAddTask ? 'red' : 'green'} onClick={ onAddButtonClick }/>
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
