import React, { Component } from 'react'
import Button from './../../components/UI/Button/Button'
import Spinner from './../../components/UI/Spinner/Spinner'
import classes from './ContactData.css'
import axios from './../../axios-orders'
import Input from './../../components/UI/Input/Input'

class ContactData extends Component{
    state = {
        orderForm : {
            name :{
                elementType : 'input' ,
                elementConfig : {
                    type : 'text' ,
                    placeholder : 'Your Name'
                },
                value:'' ,
                validation : {
                    required : true
                },
                valid : false,
                touched : false
            } ,
            street : {
                elementType : 'input' ,
                elementConfig : {
                    type : 'text' ,
                    placeholder : 'Your Street'
                },
                value:'',
                validation : {
                    required : true
                } ,
                valid : false ,
                touched : false
            },
            zipCode : {
                elementType : 'input' ,
                elementConfig : {
                    type : 'text' ,
                    placeholder : 'ZipCode'
                },
                value:'',
                validation : {
                    required : true,
                    minLength :5 ,
                    maxLength : 5 
                } ,
                valid : false ,
                touched : false
            },
            country :{
                elementType : 'input' ,
                elementConfig : {
                    type : 'text' ,
                    placeholder : 'Country'
                },
                value:'' ,
                validation : {
                    required : true
                },
                valid : false ,
                touched : false
            } ,
            email:{
                elementType : 'input' ,
                elementConfig : {
                    type : 'email' ,
                    placeholder : 'Your Email'
                },
                value:'' ,
                validation : {
                    required : true
                },
                valid : false ,
                touched : false
            },
            deliveryMethod :{
                elementType : 'select' ,
                elementConfig : {
                    options : [
                        {value : 'NULL' , displayValue: 'Select Delivery Method'},
                        {value : 'fastest' , displayValue: 'Fastest'},
                        {value : 'standard' , displayValue: 'Standard'}
                    ]

                },
                value:'' ,
                validation : {},
                valid : true
            }
        },
        formIsValid : false,
        loading : false
    }

    orderHandler = (event) => {
        //Prevents automatic reload of the page .
         event.preventDefault();
        //  console.log(this.props.ingredients)
        //    alert('You continue!');
        this.setState({loading :true})
        const formData = {} ;
        for (let formElementIdentifier in this.state.orderForm){
            formData[formElementIdentifier] = this.state.orderForm[formElementIdentifier].value;
        }

        const order = {
            ingerdients: this.props.ingredients , 
            price : this.props.price,
            order : formData
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


    checkValidity (value , rules ){
        let isValid = true ;
        
        if(!rules){
            return true ;
        }

        //Trim removes all empty spaces
        if(rules.required){
            isValid = value.trim() !== '' && isValid; 
        }

        if (rules.minLength) {
            isValid = value.length >= rules.minLength && isValid
        }

        if (rules.maxLength) {
            isValid = value.length <= rules.maxLength && isValid
        }


        return isValid ;
    }


    inputChangedHandler = (event , inputIdentifier) => {
        //Assists in getting Data from the form .
        const updatedOrderForm = {
            ...this.state.orderForm
        };

        const updatedFormElement = {
            ...updatedOrderForm[inputIdentifier]
        }

        updatedFormElement.value = event.target.value ;
        updatedFormElement.valid = this.checkValidity(updatedFormElement.value , updatedFormElement.validation)
        updatedFormElement.touched = true ;
        updatedOrderForm[inputIdentifier] = updatedFormElement ;
        
        let formIsValid = true ;
        //Loop throgh the fields
        for (let inputIdentifier in updatedOrderForm){
            formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid;
        }

        this.setState({orderForm : updatedOrderForm , formIsValid : formIsValid})
    }


    render(){
        const formElementArray = [];
        for ( let key in this.state.orderForm){
            formElementArray.push({
                id : key ,
                config : this.state.orderForm[key]
            })
        }

        let form = (
            <form onSubmit={this.orderHandler}>
                    {formElementArray.map(formElement => (
                        <Input 
                        key ={formElement.id}
                        elementType={formElement.config.elementType} 
                        elementConfig={formElement.config.elementConfig}
                        value={formElement.config.value}
                        changed={(event) => this.inputChangedHandler(event, formElement.id) }
                        shouldValidate = {formElement.config.validation}
                        touched = {formElement.config.touched}
                        invalid = {!formElement.config.valid}
                        />
                    ))}
                    <Button clicked = {this.orderHandler} disabled = {!this.state.formIsValid} btnType="Success">ORDER</Button>
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