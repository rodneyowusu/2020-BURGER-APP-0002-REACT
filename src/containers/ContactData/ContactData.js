import React, { Component } from 'react'
import Button from './../../components/UI/Button/Button'
import Spinner from './../../components/UI/Spinner/Spinner'
import classes from './ContactData.css'
import axios from './../../axios-orders'

class ContactData extends Component{
    state = {
        name : '',
        email : '',
        address : {
            street : '' ,
            postalCode : ' '
        },
        loading : false
    }

    orderHandler = (event) => {
         event.preventDefault();
        //  console.log(this.props.ingredients)
        //    alert('You continue!');
        this.setState({loading :true})
        const order = {
            ingerdients: this.props.ingredients , 
            price : this.props.price,
            customer:{
                name : 'Rodney Owusu' ,
                address : {
                    street : 'Teststreets 1',
                    zipCode : '455896',
                    country : 'Germany'
                },
                email:'rodneyowusu12@gmail.com' ,
            
            },
            deliveryMethod : 'Fastest'
        } 
        axios.post('/orders.json', order) //This will create order table and will push all the passed data into that .
        .then(response=>{
            // console.log(response)
            this.setState({loading:false})
            this.props.history.push('/')
        })
        .catch(error=>{
            // console.log(error)
            //This is to avoid loading in case there is an error with request.
            this.setState({loading:false})
        })
    }

    render(){
        let form = (
            <form>
                    <input className = {classes.Input} type="text" name="name" placeholder="Your Name" />
                    <input className = {classes.Input} type="email" name="email" placeholder="Your Email" />
                    <input className = {classes.Input} type="text" name="street" placeholder="Street" />
                    <input className = {classes.Input} type="text" name="postal" placeholder="Postal Code" />
                    <Button clicked = {this.orderHandler} btnType="Success">ORDER</Button>
                </form>
        );

        if (this.state.loading){
            form = <Spinner/>
        }
        return(
            <div className = {classes.ContactData}>
                <h4>Enter Your Contact Data</h4>
                {form}
            </div>
        )
    }

}
export default ContactData;