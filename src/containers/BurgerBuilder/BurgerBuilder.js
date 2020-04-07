import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Aux from '../../hoc/Aux/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

import * as actions from '../../store/actions/index';
import axios from '../../axios-orders';

const BurgerBuilder = props => {

    /* ------------------------------
        STATE
    ------------------------------ */

    const [ purchaseMode, setPurchaseMode ] = useState(false);

    const dispatch = useDispatch();

    const ings = useSelector(state => state.burgerBuilder.ingredients);
    const price = useSelector(state => state.burgerBuilder.totalPrice);
    const error = useSelector(state => state.burgerBuilder.error);
    const authenticated = useSelector(state => state.auth.isAuthenticated);

    const onIngredientAdd = ingName => dispatch(actions.addIngredient(ingName));
    const onIngredientRemove = ingName => dispatch(actions.removeIngredient(ingName));
    const onInitIngredients = useCallback(
        () => dispatch(actions.initIngredients())
    );
    const onInitPurchase = () => dispatch(actions.purchaseInit());
    const onSetAuthRedirectPath = (path) => dispatch(actions.setAuthRedirectPath(path));

    useEffect (() => {
        onInitIngredients();
    }, [onInitIngredients]) 
        

    /* ------------------------------
        METHODS
    ------------------------------ */

    const updatePurchaseState = (ingredients) => {
        const sum = Object.keys(ingredients)
            .map(igKey => {             
            return ingredients[igKey]
        })
            .reduce((sum, el) => {
                return sum + el;
            }, 0);
        return sum > 0;
    }

    const purchaseHandler = () => {
        if (authenticated) {
            setPurchaseMode(true);
        } else {
            onSetAuthRedirectPath('/checkout');
            props.history.push('/auth');
        }  
    }

    const purchaseCancelHandler = () => {
        setPurchaseMode(false);
    }

    const purchaseContinueHandler = () => {
        onInitPurchase();
        props.history.push('/checkout');
    }

    /* ------------------------------
        RENDER
    ------------------------------ */

    const disabledInfo = {
        ...ings
    };
    for (let key in disabledInfo) {
        disabledInfo[key] = disabledInfo[key] <= 0;
    }

    let orderSummary = null;
    let burger = error ? <p>Ingredients can't be loaded!</p> : <Spinner />;

    if (ings) {
        burger = (
            <Aux>
                <Burger ingredients={ings} />
                <BuildControls 
                    ingredientAdded={onIngredientAdd}
                    ingredientRemoved={onIngredientRemove}
                    disabled={disabledInfo} 
                    price={price}
                    purchaseable={updatePurchaseState(ings)}
                    ordered={purchaseHandler}
                    isAuth={authenticated} />
            </Aux>
        )
        orderSummary = <OrderSummary 
            ingredients={ings}
            price={price}
            purchaseCancelled={purchaseCancelHandler}
            purchaseContinued={purchaseContinueHandler} />
        }
        
    return (
        <Aux>
            <Modal show={purchaseMode} modalClosed={purchaseCancelHandler}>
                {orderSummary}
            </Modal>
            {burger}
        </Aux>
    );
}

export default (withErrorHandler(BurgerBuilder, axios));