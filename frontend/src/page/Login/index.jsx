import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './style.css'
import logo from '../../assets/Logo.png'
import { useAuth } from '../../context/AuthContext'
import { Link } from 'react-router-dom'

function Login() {
    const { login } = useAuth()
    const navigate = useNavigate()
    const [usuario, setUsuario] = useState('')
    const [senha, setSenha] = useState('')
    const [erro, setErro] = useState('')

    function handleLogin(e) {
        e.preventDefault()
        const sucesso = login(usuario, senha)
        if (sucesso) {
            navigate('/painel')
        } else {
            setErro('Usuário ou senha incorretos!')
        }
    }


    return (
        <div className="login-page">
            <div className="login-box">
                <img src={logo} alt="Central Moto Peças" className="login-logo" />

                <h2>Acesso ao Sistema</h2>
                <p className="login-sub">Área exclusiva para funcionários</p>

                <form onSubmit={handleLogin}>
                    <div className="form-group">
                        <label>Usuário</label>
                        <input
                            type="text"
                            placeholder="Digite seu usuário"
                            value={usuario}
                            onChange={e => setUsuario(e.target.value)}
                        />
                    </div>

                    <div className="form-group">
                        <label>Senha</label>
                        <input
                            type="password"
                            placeholder="Digite sua senha"
                            value={senha}
                            onChange={e => setSenha(e.target.value)}
                        />
                    </div>

                    {erro && <p className="login-erro">⚠️ {erro}</p>}

                    <button type="submit" className="btn-login">
                        Entrar no Sistema
                    </button>

                    <Link to="/" className="link-voltar">
                        ← Voltar para o site
                    </Link>
                </form>
            </div>
        </div>
    )
}

export default Login