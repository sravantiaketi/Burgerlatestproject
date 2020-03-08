import React, { useState, useEffect } from "react";
import Bar from '../../hoc/Bar';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import Checkout from "../Checkout/Checkout";
import { Route, Switch } from 'react-router-dom';
import axios from '../../axios-orders';

//related to redux
import { connect } from 'react-redux';
import * as burgerBuilderActions from '../../store/actions/index';


const burgerBuilder = props => {
    const [purchasing, setPurchasing ] = useState(false);
    const { onInitIngredients } = props;

    useEffect(() => {
        onInitIngredients();
    }, [onInitIngredients]);


    const updatePurchaseState = (ingredients) => {
        const sum = Object.keys(ingredients)
        .map(igKey => {
            return ingredients[igKey]
        })
        .reduce((sum, el) => {
            return sum + el;
        }, 0);
        return sum > 0;
    };
    
    const purchaseHandler = () => {
        if(props.isAuthenticated) {
            setPurchasing(true);
        } else {
            props.onSetAuthRedirectpath('/checkout');
            props.history.push('/auth');
        }
    };

    const purchaseCancelHandler = () => {
        setPurchasing(false);
    };

    const purchaseContinueHandler = () => {
        props.onInitPurchase();
        props.history.push('/checkout');
    };


    const disabledInfo = {
        ...props.ings
    };

        for(let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <=0 
         }

         let orderSummary = null;
        
         let burger = props.error? <p>Ingredients can't be loaded</p> : <Spinner />;

         if( props.ings ) {
            burger = (<Bar>
            <Burger ingredients={props.ings}/>
            <BuildControls 
            ingredientAdded = {props.onIngredientAdded}
            ingredientRemoved = {props.onIngredientRemoved} 
            disabled= {disabledInfo} 
            purchasable = {updatePurchaseState(props.ings)}
            ordered = {purchaseHandler}
            isAuth = { props.isAuthenticated }
            price = {props.price}/>
            </Bar>);

            orderSummary = <OrderSummary 
            ingredients={props.ings}
            purchaseCancelled = {purchaseCancelHandler}
            price = {props.price}
            purchaseContinued = {purchaseContinueHandler}
            />;
         }

        return (
            <Bar>
                <Modal show={purchasing} modalClosed={purchaseCancelHandler}>
                {orderSummary}
                </Modal>
                {burger}
                <Switch>
                    <Route path="/checkout" component={Checkout} />
                </Switch>
            </Bar>
        );
    
}

//redux

const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        error: state.burgerBuilder.error,
        isAuthenticated: state.auth.token !== null
    };
}

const mapDispatchToProps = dispatch => {
    return {
        onIngredientAdded: (ingName) => dispatch(burgerBuilderActions.addIngredient(ingName)),
        onIngredientRemoved: (ingName) => dispatch(burgerBuilderActions.removeIngredient(ingName)),
        onInitIngredients: () => dispatch(burgerBuilderActions.initIngredients()),
        onInitPurchase: () => dispatch(burgerBuilderActions.purchaseInit()),
        onSetAuthRedirectpath : (path) => dispatch(burgerBuilderActions.setAuthRedirectPath(path))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(burgerBuilder,axios));