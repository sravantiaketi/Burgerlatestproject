import  React, { useState }  from "react";
import { connect } from 'react-redux';
import Bar from '../../hoc/Bar'
import classes from './Layout.css';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';

const layout = props => {

   const [sideDrawerIsVisible, setSideDrawerIsVisible] = useState(false);
    

    const sideDrawerClosedHandler = () => {
        setSideDrawerIsVisible(false);
    };

    const sideDrawerToggleClicked = ()  => {
        setSideDrawerIsVisible(!sideDrawerIsVisible);
    };

    
        return (<Bar>
            <Toolbar 
            isAuth = {props.isAuthenticated}
            drawerToggleClicked={sideDrawerToggleClicked}/>
            <SideDrawer 
            isAuth = {props.isAuthenticated}
            open = {sideDrawerIsVisible} 
            closed = {sideDrawerClosedHandler}
            />
            <main className={classes.Content}>
                {props.children}
            </main>
       </Bar>);
    
}  

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.token !== null
    };
};

export default connect(mapStateToProps)(layout);