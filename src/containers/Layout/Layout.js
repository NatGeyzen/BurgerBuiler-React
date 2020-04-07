import React, {Component, useState} from 'react';
import Aux from '../../hoc/Aux/Aux';
import classes from './Layout.module.css';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';

const Layout = props => {

    const [ sideDrawerIsVisible, setSideDrawerIsVisible ] = useState(false);

    const sideDrawerClosedHandler = () => {
        setSideDrawerIsVisible(false);
    }

    const sideDrawerToggleHandler = () => {
        setSideDrawerIsVisible(!sideDrawerIsVisible);
    }

    return (
        <Aux>
            <Toolbar drawerToggleClicked={sideDrawerToggleHandler}/>
            <SideDrawer 
                open={sideDrawerIsVisible}
                closed={sideDrawerClosedHandler}
            />
            <div>Backdrop</div>
            <main className={classes.Content}>
                {props.children}
            </main>
        </Aux>
        )

}

export default Layout;