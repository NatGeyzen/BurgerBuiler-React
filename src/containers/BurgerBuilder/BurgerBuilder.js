import React, { Component } from 'react';

import Aux from '../../hoc/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
}

class BurgerBuilder extends Component {

    state = {
        ingredients: {
            salad: 0,
            bacon: 0,
            cheese: 0,
            meat: 0
        },
        totalPrice: 4
    }

    addIngredientHandler = (type) => {
        // update individual ingredient count (only if equal to or bigger than 0, otherwise return)
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount + 1;
        // update all ingredients count
        const updatedIngredients = {...this.state.ingredients};
        updatedIngredients[type] = updatedCount;
        // update price
        const priceAddition = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + priceAddition;
        // update state
        this.setState({totalPrice: newPrice, ingredients: updatedIngredients});
    }

    removeIngredientHandler = (type) => {
        // update individual ingredient count
        const oldCount = this.state.ingredients[type];
        if (oldCount <= 0) {
            return;
        }
        const updatedCount = oldCount - 1;
        // update all ingredients count
        const updatedIngredients = {...this.state.ingredients};
        updatedIngredients[type] = updatedCount;
        // update price
        const priceDeduction = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice - priceDeduction;
        // update state
        this.setState({totalPrice: newPrice, ingredients: updatedIngredients});  
    }

    // alternative syntax for state 
    // constructor(props) {
    //     super(props);
    //     this.state = {...}
    // }

    render() {
        const disabledInfo = {...this.state.ingredients};
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0;
        }
        return (
            <Aux>
                <Burger ingredients={this.state.ingredients} />
                <BuildControls 
                    ingredientAdded={this.addIngredientHandler}
                    ingredientRemoved={this.removeIngredientHandler}
                    disabled={disabledInfo} 
                    price={this.state.totalPrice}
                    />
            </Aux>
        );
    }
}

export default BurgerBuilder;