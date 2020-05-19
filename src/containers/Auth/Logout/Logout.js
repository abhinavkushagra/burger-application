import React, { useEffect } from 'react'
import { authLogOut } from '../../../store/actions'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

const Logout = props => {
    const { onLogOut } = props
    useEffect(() => {
        onLogOut()
    }, [onLogOut])

    return (
        <Redirect to="/" />
    )

}

const mapDipatchToProps = dispatch => {
    return {
        onLogOut: () => dispatch(authLogOut())
    }
}

export default connect(null, mapDipatchToProps)(Logout)