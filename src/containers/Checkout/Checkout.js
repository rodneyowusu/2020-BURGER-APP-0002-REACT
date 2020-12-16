import React, { Component } from 'react'
import CheckoutSummary from './../../components/Order/CheckoutSummary/CheckoutSummary'
import {Route} from 'react-router-dom'
import ContactData from './../ContactData/ContactData'
import {connect } from 'react-redux'

class Checkout extends Component{
    //managed by redux
    // state = {
    //     ingredients : null ,
    //     totalPrice : 0 

    // }

    //The use of query params in search to update states
    // componentWillMount () {
    //     const query = new URLSearchParams(this.props.location.search);
    //     const ingredients = {};
    //     let price = 0 ;
    //     for (let param of query.entries()){
    //         //Format of entry like  ['salad' , '1']
    //         if (param[0] === 'price'){
    //             //This is to pass the the price . It firsts checks .
    //              price = param[1]
    //         }
    //         else {
    //             ingredients[param[0]] = +param[1]
    //         }
    //     }

    //     this.setState({ingredients : ingredients , totalPrice : price })
    // }


    checkoutCancelledHandler = () => {
        //This is to go back . This can be accessed since this is a route component.
        this.props.history.goBack();
    }

    checkoutContinuedHandler = () => {
        this.props.history.replace('/checkout/contact-data');
    }


    

    render(){
        return(
            <div>
               <CheckoutSummary 
               ingredients = {this.props.ings}
               checkoutCancelled = {this.checkoutCancelledHandler}
               checkoutContinued = {this.checkoutContinuedHandler}
               />
               {/* <Route //This passes the info ih this container with the help of routing
               path={this.props.match.path + '/contact-data'} 
               render={(props) => (<ContactData 
               ingredients = {this.state.ingredients}  
               price = {this.state.totalPrice}
               {...props}
               />)}/> */}
               <Route 
               path={this.props.match.path + '/contact-data'}
               component = {ContactData} />
            </div>
        )
    }
}


const mapStateToProps = state => {
    return {
        ings: state.ingredients
    }
};

export default connect(mapStateToProps)(Checkout);