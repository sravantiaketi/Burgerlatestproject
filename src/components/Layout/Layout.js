import  React, {Component}  from "react";
import { connect } from 'react-redux';
import Bar from '../../hoc/Bar'
import classes from './Layout.css';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';

class Layout extends Component {

    state = {
        showSideDrawer : false
    }

    sideDrawerClosedHandler = () => {
        this.setState({showSideDrawer : false});
    }

    sideDrawerToggleClicked = ()  => {
        this.setState((prevState) => {
           return { showSideDrawer : !prevState.showSideDrawer };
        });
    }

    render() {
        return (<Bar>
            <Toolbar 
            isAuth = {this.props.isAuthenticated}
            drawerToggleClicked={this.sideDrawerToggleClicked}/>
            <SideDrawer 
            isAuth = {this.props.isAuthenticated}
            open = {this.state.showSideDrawer} 
            closed = {this.sideDrawerClosedHandler}
            />
            <main className={classes.Content}>
                {this.props.children}
            </main>
       </Bar>);
    }
}  

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.token !== null
    };
};

export default connect(mapStateToProps)(Layout);