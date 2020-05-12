import React, { Component } from 'react'
import Aux from './Auxiliar'
import Modal from '../../components/UI/Modal/Modal'

const withErrorHandler = (WrapedComponent, axios )=> {
    return class extends Component {
        state = {
            error: null
        }

        componentDidMount(){
            this.requestInterceptor = axios.interceptors.request.use( req => {
                this.setState({error: null});
                return req;
             }) 
             this.responseInterceptor = axios.interceptors.response.use(res => res, error => {
                this.setState({error: error});
             }) 
        }

        componentWillUnmount(){
            axios.interceptors.request.eject(this.requestInterceptor);
            axios.interceptors.response.eject(this.responseInterceptor);
        }

        confirmedErrorHandler = () => {
            this.setState({error: null});
        }

        render(){
            return (
                <Aux>
                    <Modal 
                    showModal={this.state.error}
                    hideHandler={this.confirmedErrorHandler}
                    >
                        {this.state.error ? this.state.error.message : null}
                    </Modal>
                    <WrapedComponent {...this.props}/>
                </Aux>
            )
        }
    }
}

export default withErrorHandler
