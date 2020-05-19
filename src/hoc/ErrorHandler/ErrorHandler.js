import React from 'react'

import Modal from '../../components/UI/Modal/Modal'
import Aux from '../Auxiliary/Auxiliary'
import useError from '../../hooks/useError'

const errorHandler = (WrapperClass, Axios) => {
    return props => {
        const [error, handleErrorConfirm] = useError(Axios)
        return (
            <Aux>
                <Modal show={error} clicked={handleErrorConfirm}>
                    {error ? error.message : null}
                </Modal>
                <WrapperClass {...props} />
            </Aux>
        )
    }
}

export default errorHandler;