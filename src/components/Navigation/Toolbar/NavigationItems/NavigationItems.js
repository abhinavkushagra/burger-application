import React from 'react'
import NavigationItem from './NavigationItem/NavigationItem'

const navigationItems = props => (
    <ul>
        <NavigationItem link="/" active={true} > Burger Builder </NavigationItem>
        <NavigationItem link="/" active={false}> Check Out </NavigationItem>
    </ul>
)

export default navigationItems;