import React, { Component } from 'react'
import { authLogOut } from '../../../store/actions'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

class Logout extends Component {
    componentDidMount(){
        this.props.onLogOut()
    }

    render(){
        return (
            <Redirect to="/" />
        )
    }
}

const mapDipatchToProps = dispatch => {
    return {
        onLogOut: () => dispatch(authLogOut())
    }
}

export default connect(null, mapDipatchToProps)(Logout)