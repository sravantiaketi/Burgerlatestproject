import  React, {Component}  from "react";
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
            <Toolbar drawerToggleClicked={this.sideDrawerToggleClicked}/>
            <SideDrawer 
            open = {this.state.showSideDrawer} 
            closed = {this.sideDrawerClosedHandler}
            />
            <main className={classes.Content}>
                {this.props.children}
            </main>
       </Bar>);
    }
}  

export default Layout;