import React, {Component} from 'react'
import Modal from './../../components/UI/Modal/Modal'
import Aux from './../../hoc/AUXILLARY/Auxiliary'


//This is to handle error but irrespective of the component.
const withErrorHandler = (WrappedComponent , axios) => {
    return class extends Component {
        state = {
            error :null
        }

        // This is used instead of componentDidMount because this is rendered before child components 
        componentWillMount (){
            // This is to clear errors at the initial stage.
            this.reqInterceptor = axios.interceptors.request.use(requests =>{
                this.setState({error : null}) ;
                return requests
            })

            //This will set the error state in case an error is encountered
            this.resInterceptor = axios.interceptors.response.use(response => response , error=>{
                this.setState({error : error})
            })
        }

        //This is used to avoid infinite call of the interceptors even in the case when there is no error .
        componentWillUnmount () {
            //Checking if the Unmount works
            console.log('Will Unmount' , this.reqInterceptor ,this.resInterceptor )
            axios.interceptors.request.eject(this.reqInterceptor);
            axios.interceptors.response.eject(this.resInterceptor);
        }


        errorConfirmedHandler = () => {
            this.setState({error : null})
        }

        render(){
            return(
                <Aux>
                    <Modal 
                    show = {this.state.error}
                    modalClosed = {this.errorConfirmedHandler}>
                        {this.state.error ? this.state.error.message : null}
                    </Modal>
                    <WrappedComponent {...this.props} />
                </Aux>
                
    
            )
        }
    } 
        
}

export default withErrorHandler;