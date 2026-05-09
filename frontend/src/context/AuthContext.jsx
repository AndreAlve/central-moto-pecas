import { createContext, useState, useContext } from 'react'

const AuthContext = createContext()

export function AuthProvider({ children }) {
    const [logado, setLogado] = useState(false)

    function login(usuario, senha) {
        if (usuario === 'admin' && senha === '1234') {
            setLogado(true)
            return true
        }
        return false
    }

    function logout() {
        setLogado(false)
    }

    return (
        <AuthContext.Provider value={{ logado, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
    return useContext(AuthContext)
}