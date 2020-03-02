import React from 'react';

import NavigationItems from '../NavigationItems/NavigationItems';
import classes from './SideDrawer.css';
import Backdrop from '../../UI/Backdrop/Backdrop';
import Bar from '../../../hoc/Bar';

const sideDrawer = (props) => {

    let attachedClasses = [classes.SideDrawer, classes.Close]

    if(props.open) {
        attachedClasses = [classes.SideDrawer, classes.Open]
    }
    return (
        <Bar>
        <Backdrop show={props.open} clicked={props.closed}/>
        <div className={attachedClasses.join(' ')}>
           <nav>
               <NavigationItems isAuthenticated={props.isAuth}/>
           </nav>
        </div>
        </Bar>
    );
};

export default sideDrawer;