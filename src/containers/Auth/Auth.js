import React, { Component } from 'react'
import Input from '../../components/UI/Input/Input'
import Button from '../../components/UI/Button/Button'
import { auth, authReset, setAuthRedirectPath } from '../../store/actions/index'
import styles from './Auth.module.css'
import { connect } from 'react-redux'
import Loading from '../../components/UI/Loading/Loading'
import Modal from '../../components/UI/Modal/Modal'
import { Redirect } from 'react-router-dom'
import updateState, { checkValidity } from '../../shared/utilities'

class Auth extends Component {
    state = {
        controls: {
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
        },
        isFormValid: false,
        isSignUp: true
    }

    componentDidMount() {
        if (!this.props.building && this.props.auth_redirect_path !== '/') {
            this.props.onSetAuthRedirectPath('/')
        }
    }


    handleChange = (event, identifier) => {
        const updatedControls = updateState(this.state.controls, {
            [identifier]: updateState(this.state.controls[identifier], {
                value: event.target.value,
                valid: checkValidity(event.target.value, this.state.controls[identifier].validation)
            })
        })

        let isFormValid = true;
        for (let key in updatedControls) {
            isFormValid = isFormValid && updatedControls[key].valid
        }
        this.setState({ controls: updatedControls, isFormValid: isFormValid })
    }

    handleSignSwitch = () => {
        this.setState(prev_state => ({
            isSignUp: !prev_state.isSignUp
        })
        )
    }

    submitHadler = event => {
        event.preventDefault()
        this.props.onLogIn(this.state.controls.email.value, this.state.controls.password.value, this.state.isSignUp)
    }

    authResetHandler = () => {

        const initial_state = {
            ...this.state.controls,
            email: {
                ...this.state.controls.email,
                value: '',
                valid: 'f'
            },
            password: {
                ...this.state.controls.password,
                value: '',
                valid: 'f'
            }
        }
        this.setState({
            controls: initial_state, isFormValid: false, isSignUp: true
        })
        this.props.onAuthReset()
    }

    render() {
        const elementsArray = [];
        for (let key in this.state.controls) {
            elementsArray.push({
                id: key,
                config: this.state.controls[key]
            })
        }

        const form = this.props.loading ? <Loading /> : this.props.error ? <Modal show={this.props.error} clicked={this.authResetHandler}> {this.props.error.message} </Modal> : (
            elementsArray.map(element => (
                <Input key={element.id}
                    elementType={element.config.elementType}
                    elementConfig={element.config.elementConfig}
                    value={element.config.value}
                    changed={event => this.handleChange(event, element.id)}
                    invalid={!element.config.valid}
                    needValidation={element.config.validation} />
            )
            )
        )

        let auth_redirect = this.props.isAuthenticated ? <Redirect to={this.props.auth_redirect_path} /> : null;

        return (
            <div className={styles.Auth}>
                {auth_redirect}
                <h3> Sign Up/In </h3>
                <form onSubmit={this.submitHadler}>
                    {form}
                    <Button btntype="Success"> {!this.state.isSignUp ? "Sign In" : "Sign Up"} </Button>
                </form>
                <Button btntype="Success" clicked={this.handleSignSwitch}> Switch to {this.state.isSignUp ? "Sign In" : "Sign Up"}</Button>
            </div>
        )
    }

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