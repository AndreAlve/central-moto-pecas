import { Navigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

function RotaProtegida({ children }) {
    const { logado } = useAuth()

    if (!logado) {
        return <Navigate to="/login" />
    }

    return children
}

export default RotaProtegida