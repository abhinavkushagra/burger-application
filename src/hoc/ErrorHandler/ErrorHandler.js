import React, { Component } from 'react'

import Modal from '../../components/UI/Modal/Modal' 
import Aux from '../Auxiliary/Auxiliary'

const errorHandler = (WrapperClass, Axios) => {
    return class extends Component {
        constructor() {
            super()
            this.reqInterceptors = Axios.interceptors.request.use( request => {
                this.setState({error: null})
                return request
            })
            this.resInterceptors = Axios.interceptors.response.use( response => 
                response 
            , error => this.setState({error: error}))
        }
        state = {
            error: null
        }

        componentWillUnmount() {
            console.log(this.reqInterceptors + " " + this.resInterceptors)
            Axios.interceptors.request.eject(this.reqInterceptors)
            Axios.interceptors.response.eject(this.resInterceptors)
        }

        handleErrorConfirm = () => {
            this.setState({error: null})
        }
        render(){
            return (
                <Aux>
                    <Modal show={this.state.error} clicked={this.handleErrorConfirm}>
                        { this.state.error ? this.state.error.message: null}
                    </Modal>
                    <WrapperClass {...this.props} />
                </Aux>
            )
        }
    }
}

export default errorHandler;