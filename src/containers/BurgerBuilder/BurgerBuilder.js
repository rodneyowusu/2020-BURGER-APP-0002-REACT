import React, { Component } from 'react';

import Aux from '../../hoc/AUXILLARY/Auxiliary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from './../../axios-orders' //This will use the instave created
import Spinner from './../../components/UI/Spinner/Spinner'
import withErrorHandler from './../../hoc/withErrorHandler/withErrorHandler'



const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
};

class BurgerBuilder extends Component {
    // constructor(props) {
    //     super(props);
    //     this.state = {...}
    // }
    state = {
        ingredients:null,//recieves all ingredients from firebase
        totalPrice: 4,
        purchasable: false,
        purchasing: false ,
        loading : false ,
        error : false
    }

    componentDidMount (){
        axios.get('https://react-my-burger-78b92.firebaseio.com/orders/Ingredients.json')
        .then(response=>{
            console.log(response)
            this.setState({ingredients : response.data})
        })
        .catch(error =>{
            this.setState({error : true})
        })
    }


    updatePurchaseState (ingredients) {
        const sum = Object.keys( ingredients )
            .map( igKey => {
                return ingredients[igKey];
            } )
            .reduce( ( sum, el ) => {
                return sum + el;
            }, 0 );
        this.setState( { purchasable: sum > 0 } );
    }

    addIngredientHandler = ( type ) => {
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount + 1;
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = updatedCount;
        const priceAddition = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + priceAddition;
        this.setState( { totalPrice: newPrice, ingredients: updatedIngredients } );
        this.updatePurchaseState(updatedIngredients);
    }

    removeIngredientHandler = ( type ) => {
        const oldCount = this.state.ingredients[type];
        if ( oldCount <= 0 ) {
            return;
        }
        const updatedCount = oldCount - 1;
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = updatedCount;
        const priceDeduction = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice - priceDeduction;
        this.setState( { totalPrice: newPrice, ingredients: updatedIngredients } );
        this.updatePurchaseState(updatedIngredients);
    }

    purchaseHandler = () => {
        this.setState({purchasing: true});
    }

    purchaseCancelHandler = () => {
        this.setState({purchasing: false});
    }

    purchaseContinueHandler = () => {
        // alert('You continue!');
        // this.setState({loading :true})
        // const order = {
        //     ingerdients: this.state.ingredients , 
        //     price : this.state.totalPrice,
        //     customer:{
        //         name : 'Rodney Owusu' ,
        //         address : {
        //             street : 'Teststreets 1',
        //             zipCode : '455896',
        //             country : 'Germany'
        //         },
        //         email:'rodneyowusu12@gmail.com' ,
            
        //     },
        //     deliveryMethod : 'Fastest'
        // } 
        // axios.post('/orders.json', order) //This will create order table and will push all the passed data into that .
        // .then(response=>{
        //     // console.log(response)
        //     this.setState({loading:false,purchasing: false})
        // })
        // .catch(error=>{
        //     // console.log(error)
        //     //This is to avoid loading in case there is an error with request.
        //     this.setState({loading:false,purchasing: false})
        // })
        const queryParams = [];
        for(let m in this.state.ingredients){
            queryParams.push(encodeURIComponent(m) + '=' + encodeURIComponent(this.state.ingregients[m]));
        }

        const queryString = queryParams.join('&')

        this.props.history.push({
            pathname : '/checkout' ,
            search : '?' + queryString
        })
    }

    render () {
        const disabledInfo = {
            ...this.state.ingredients
        };
        for ( let key in disabledInfo ) {
            disabledInfo[key] = disabledInfo[key] <= 0
        }
        // {salad: true, meat: false, ...}

       let orderSummary = null ;

        

        let burger = this.state.error ? <p style = {{textAlign:'center'}}>Ingredients Cannot Be Loaded</p>: <Spinner/>

        //This is to make sure that data has been passed to the ingredients before it runs.
        if(this.state.ingredients){
            burger = (
                <Aux>
                    <Burger ingredients={this.state.ingredients} />
                    <BuildControls
                        ingredientAdded={this.addIngredientHandler}
                        ingredientRemoved={this.removeIngredientHandler}
                        disabled={disabledInfo}
                        purchasable={this.state.purchasable}
                        ordered={this.purchaseHandler}
                        price={this.state.totalPrice} />
                </Aux>
            )

            orderSummary = <OrderSummary 
            ingredients={this.state.ingredients}
            price={this.state.totalPrice}
            purchaseCancelled={this.purchaseCancelHandler}
            purchaseContinued={this.purchaseContinueHandler} />
    
        }
        
        if(this.state.loading){
            orderSummary = <Spinner/>
    