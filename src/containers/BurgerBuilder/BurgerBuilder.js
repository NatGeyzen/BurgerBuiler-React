import React, { Component } from 'react';
import { connect } from 'react-redux';

import Aux from '../../hoc/Aux/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import axios from '../../axios-orders';
import * as actionTypes from '../../store/actions';


class BurgerBuilder extends Component {

    /* ------------------------------
        STATE
    ------------------------------ */

    state = {
        purchaseable: false,
        purchaseMode: false,
        loading: false,
        error: false
    }

    // alternative syntax for state 
    // constructor(props) {
    //     super(props);
    //     this.state = {...}
    // }

    // componentDidMount () {
    //     console.log(this.props);
    //     axios.get('https://react-my-burger-e9525.firebaseio.com/ingredients.json')
    //         .then(response => {
    //             this.setState({ingredients: response.data})
    //         })
    //         .catch(error => {
    //             this.setState({error: true})
    //         });
    // }

    /* ------------------------------
        METHODS
    ------------------------------ */

    updatePurchaseState (ingredients) {
        // Create another new object holding the ingredient keys
        const sum = Object.keys(ingredients)
            // Loop over those keys and return their values
            .map(igKey => {             
            return ingredients[igKey]
        })
            // Add all those values together so only one value is ultimately returned (the sum)
            .reduce((sum, el) => {
                return sum + el;
            }, 0);
        // Change the value of 'purchaseable' to true if the sum is bigger than 0 (so user can click order button)
        return sum > 0;
    }

    purchaseHandler = () => {
        this.setState({purchaseMode: true})
    }

    purchaseCancelHandler = () => {
        this.setState({purchaseMode: false, purchasing: false})
    }

    purchaseContinueHandler = () => {
        this.props.history.push('/checkout');
    }

    /* ------------------------------
        RENDER
    ------------------------------ */

    render() {
        const disabledInfo = {
            ...this.props.ings
        };
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0;
        }

        let orderSummary = null;
        let burger = this.state.error ? <p>Ingredients can't be loaded!</p> : <Spinner />;

        if (this.props.ings) {
            burger = (
                <Aux>
                    <Burger ingredients={this.props.ings} />
                    <BuildControls 
                        ingredientAdded={this.props.onIngredientAdd}
                        ingredientRemoved={this.props.onIngredientRemove}
                        disabled={disabledInfo} 
                        price={this.props.price}
                        purchaseable={this.updatePurchaseState(this.props.ings)}
                        ordered={this.purchaseHandler} />
                </Aux>
            )
            orderSummary = <OrderSummary 
                ingredients={this.props.ings}
                price={this.props.price}
                purchaseCancelled={this.purchaseCancelHandler}
                purchaseContinued={this.purchaseContinueHandler} />
        }

        if (this.state.loading) {
            orderSummary = <Spinner />;
        }
        
        return (
            <Aux>
                <Modal show={this.state.purchaseMode} modalClosed={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </Aux>
        );
    }
}

const mapStateToProps = state => {
    return {
        ings: state.ingredients,
        price: state.totalPrice
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onIngredientAdd: (ingName) => dispatch({type: actionTypes.ADD_INGREDIENT, ingredientName: ingName}),
        onIngredientRemove: (ingName) => dispatch({type: actionTypes.REMOVE_INGREDIENT, ingredientName: ingName})
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));