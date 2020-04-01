import React, {Component} from 'react';
import Aux from '../../../hoc/Aux/Aux';
import Button from '../../UI/Button/Button';

class OrderSummary extends Component {

    // This could be a functional component
    // UNSAFE_componentWillUpdate() {
    //     console.log('[OrderSummary] will update');
    // }

    render() {

        // Receive the ingredients object and transform it into an array of ingredients
        const ingredientSummary = Object.keys(this.props.ingredients)
            // Map over the array of ingredients
            .map(igKey => {
            // For each ingredient in the array, return JSX (list item containing the ingredient and amount)
                return (
                    <li key={igKey}>
                        <span style={{textTransform: 'capitalize'}}>{igKey}</span>: {this.props.ingredients[igKey]}
                    </li>
                )
        })

        return (
            <Aux>
                <h3>Your Order</h3>
                <p>A delicious burger with the following ingredients:</p>
                <ul>
                    {ingredientSummary}
                </ul>
                <p><strong>Total price: $ {this.props.price.toFixed(2)}</strong></p>
                <p>Continue to Checkout?</p>
                <Button btnType="Danger" clicked={this.props.purchaseCancelled}>CANCEL</Button>
                <Button btnType="Success" clicked={this.props.purchaseContinued}>CONTINUE</Button>
            </Aux>
        )
    }
}

export default OrderSummary;