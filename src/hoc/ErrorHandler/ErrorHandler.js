import React, { Component } from 'react'

import Modal from '../../components/UI/Modal/Modal' 
import Aux from '../Auxiliary/Auxiliary'

const errorHandler = (WrapperClass, Axios) => {
    return class extends Component {
        state = {
            error: null
        }
        componentDidMount() {
            Axios.interceptors.request.use( request => {
                this.setState({error: null})
            })
            Axios.interceptors.response.use( response => 
                response
            , error => this.setState({error: error}))
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