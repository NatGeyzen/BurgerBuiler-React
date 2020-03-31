import React from 'react';
import { connect } from 'react-redux';

import classes from './NavigationItems.module.css';
import NavigationItem from './NavigationItem/NavigationItem';

const navigationItems = (props) => {

    return (
        <ul className={classes.NavigationItems}>
            <NavigationItem link="/" exact >Burger Builder</NavigationItem>
            {props.authenticated ? <NavigationItem link="/orders" >Orders</NavigationItem> : null}
    
            {!props.authenticated ? 
                <NavigationItem link="/auth">Authenticate</NavigationItem> : 
                <NavigationItem link="/logout">Log out</NavigationItem>}
        </ul>
    )
}

const mapStateToProps = state => {
    return {
        authenticated: state.auth.isAuthenticated
    }
}

export default connect(mapStateToProps)(navigationItems);