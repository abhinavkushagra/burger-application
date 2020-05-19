import React, { useState, useEffect } from 'react'
import Input from '../../components/UI/Input/Input'
import Button from '../../components/UI/Button/Button'
import { auth, authReset, setAuthRedirectPath } from '../../store/actions/index'
import styles from './Auth.module.css'
import { connect } from 'react-redux'
import Loading from '../../components/UI/Loading/Loading'
import Modal from '../../components/UI/Modal/Modal'
import { Redirect } from 'react-router-dom'
import updateState, { checkValidity } from '../../shared/utilities'

const Auth = props => {

    const { building, auth_redirect_path, onSetAuthRedirectPath} = props

    const [controls, setControls] = useState({
        email: {
            elementType: 'input',
            elementConfig: {
                type: 'email',
                placeholder: 'User ID'
            },
            value: '',
            validation: {
                required: true,
                isEmail: true
            },
            valid: 'f'
        },
        password: {
            elementType: 'input',
            elementConfig: {
                type: 'password',
                placeholder: 'Password'
            },
            value: '',
            validation: {
                required: true,
                minLength: 6,
                maxLength: 15
            },
            valid: 'f'
        }
    })
    const [is_form_valid, setIsFormValid] = useState(false)
    const [is_signed_up, setSignedUp] = useState(true)

    useEffect(() => {
        if (!building && auth_redirect_path !== '/') {
            onSetAuthRedirectPath('/')
        }
    }, [ building, auth_redirect_path, onSetAuthRedirectPath ])


    const handleChange = (event, identifier) => {
        const updatedControls = updateState(controls, {
            [identifier]: updateState(controls[identifier], {
                value: event.target.value,
                valid: checkValidity(event.target.value, controls[identifier].validation)
            })
        })

        let isFormValid = true;
        for (let key in updatedControls) {
            isFormValid = isFormValid && updatedControls[key].valid
        }
        setControls(updatedControls)
        setIsFormValid(isFormValid)
    }

    const handleSignSwitch = () => {
        setSignedUp(!is_signed_up)
    }

    const submitHadler = event => {
        event.preventDefault()
        props.onLogIn(controls.email.value, controls.password.value, is_signed_up)
    }

    const authResetHandler = () => {

        const initial_state = {
            ...controls,
            email: {
                ...controls.email,
                value: '',
                valid: 'f'
            },
            password: {
                ...controls.password,
                value: '',
                valid: 'f'
            }
        }
        setControls(initial_state)
        setIsFormValid(false)
        setSignedUp(true)
        props.onAuthReset()
    }

    
        const elementsArray = [];
        for (let key in controls) {
            elementsArray.push({
                id: key,
                config: controls[key]
            })
        }

        const form = props.loading ? <Loading /> : props.error ? <Modal show={props.error} clicked={authResetHandler}> {props.error.message} </Modal> : (
            elementsArray.map(element => (
                <Input key={element.id}
                    elementType={element.config.elementType}
                    elementConfig={element.config.elementConfig}
                    value={element.config.value}
                    changed={event => handleChange(event, element.id)}
                    invalid={!element.config.valid}
                    needValidation={element.config.validation} />
            )
            )
        )

        let auth_redirect = props.isAuthenticated ? <Redirect to={props.auth_redirect_path} /> : null;

        return (
            <div className={styles.Auth}>
                {auth_redirect}
                <h3> Sign Up/In </h3>
                <form onSubmit={submitHadler}>
                    {form}
                    <Button btntype="Success" disabled={!is_form_valid}> {!is_signed_up ? "Sign In" : "Sign Up"} </Button>
                </form>
                <Button btntype="Success" clicked={handleSignSwitch}> Switch to {is_signed_up ? "Sign In" : "Sign Up"}</Button>
            </div>
        )

}

const mapStateToProps = state => {
    return {
        loading: state.auth.loading,
        error: state.auth.error,
        isAuthenticated: state.auth.token !== null,
        auth_redirect_path: state.auth.auth_redirect_path,
        building: state.burger_builder.building

    }
}

const mapDispathToProps = dispatch => {
    return {
        onLogIn: (email, password, isSignUp) => dispatch(auth(email, password, isSignUp)),
        onAuthReset: () => dispatch(authReset()),
        onSetAuthRedirectPath: path => dispatch(setAuthRedirectPath(path))
    }
}

export default connect(mapStateToProps, mapDispathToProps)(Auth);