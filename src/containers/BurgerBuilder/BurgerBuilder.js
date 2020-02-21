import React, { Component } from "react";
import Bar from '../../hoc/Bar';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import Checkout from "../Checkout/Checkout";
import { Route, Switch } from 'react-router-dom';

//related to redux
import { connect } from 'react-redux';
import * as actionTypes from '../../store/actions';


class BurgerBuilder extends Component {
  
    state = {
      purchasing : false,
      loading : false,
      error : false
    };

    componentDidMount() {
      /*  axios.get('https://react-my-burger-9e0dd.firebaseio.com/ingredients.json')
        .then(response => {
         this.setState({ingredients : response.data});
        })
        .catch(error => {
         this.setState({error : true});
        });
        */
    }
    updatePurchaseState (ingredients) {
        const sum = Object.keys(ingredients)
        .map(igKey => {
            return ingredients[igKey]
        })
        .reduce((sum, el) => {
            return sum + el;
        }, 0);
        return sum > 0;
    }
    
    purchaseHandler = () => {
      this.setState({purchasing : true});
    }

    purchaseCancelHandler = () => {
      this.setState({purchasing : false});
    }

    purchaseContinueHandler = () => {
        this.props.history.push('/checkout');
    }



    render() {
        const disabledInfo = {
            ...this.props.ings
        };

        for(let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <=0 
         }

         let orderSummary = null;
        
         let burger = this.state.error? <p>Ingredients can't be loaded</p> : <Spinner />;

         if( this.props.ings ) {
            burger = (<Bar>
            <Burger ingredients={this.props.ings}/>
            <BuildControls 
            ingredientAdded = {this.props.onIngredientAdded}
            ingredientRemoved = {this.props.onIngredientRemoved} 
            disabled= {disabledInfo} 
            purchasable = {this.updatePurchaseState(this.props.ings)}
            ordered = {this.purchaseHandler}
            price = {this.props.price}/>
            </Bar>);

            orderSummary = <OrderSummary 
            ingredients={this.props.ings}
            purchaseCancelled = {this.purchaseCancelHandler}
            price = {this.props.price}
            purchaseContinued = {this.purchaseContinueHandler}
            />;
         }

         if(this.state.loading) {
            orderSummary = <Spinner />; 
         }

        return (
            <Bar>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                {orderSummary}
                </Modal>
                {burger}
                <Switch>
                    <Route path="/checkout" component={Checkout} />
                </Switch>
            </Bar>
        );
    }
}

//redux

const mapStateToProps = state => {
    return {
        ings: state.ingredients,
        price: state.totalPrice
    };
}

const mapDispatchToProps = dispatch => {
    return {
        onIngredientAdded: (ingName) => dispatch({type: actionTypes.ADD_INGREDIENT, ingredientName: ingName}),
        onIngredientRemoved: (ingName) => dispatch({type: actionTypes.REMOVE_INGREDIENT, ingredientName: ingName})
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder,axios));