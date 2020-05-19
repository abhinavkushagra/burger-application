import {useState, useEffect} from 'react'

const useError = Axios => {
        const [error, setError] = useState(null)
        const reqInterceptors = Axios.interceptors.request.use(request => {
            setError(null)
            return request
        })
        const resInterceptors = Axios.interceptors.response.use(response =>
            response
            , err => setError(err))

        useEffect(() => {
            return () => {
                Axios.interceptors.request.eject(reqInterceptors)
                Axios.interceptors.response.eject(resInterceptors)
            }
        }, [reqInterceptors, resInterceptors, Axios])

        const handleErrorConfirm = () => {
            setError(null)
        }
        return [
            error, handleErrorConfirm
        ]
}

export default useError