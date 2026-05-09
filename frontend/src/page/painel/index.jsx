import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import logo from '../../assets/Logo.png'
import './style.css'

function Painel() {
    const { logout } = useAuth()
    const navigate = useNavigate()
    const location = useLocation()

    function handleLogout() {
        logout()
        navigate('/login')
    }
    return (
        <div className="painel">

            <aside className="sidebar">
                <img src={logo} alt="Central Moto Peças" />
                <nav className="menu">
                    <Link to="/painel" className={location.pathname === '/painel' ? 'ativo' : ''}>
                        📊 Dashboard
                    </Link>
                    <Link to="/painel/ordens" className={location.pathname === '/painel/ordens' ? 'ativo' : ''}>
                        🔧 Ordens de Serviço
                    </Link>
                    <Link to="/painel/clientes" className={location.pathname === '/painel/clientes' ? 'ativo' : ''}>
                        👤 Clientes
                    </Link>
                    <Link to="/painel/motos" className={location.pathname === '/painel/motos' ? 'ativo' : ''}>
                        🏍️ Motos
                    </Link>
                    <Link to="/painel/pecas" className={location.pathname === '/painel/pecas' ? 'ativo' : ''}>
                        🔩 Peças
                    </Link>
                    <Link to="/painel/funcionarios" className={location.pathname === '/painel/funcionarios' ? 'ativo' : ''}>
                        👷 Funcionários
                    </Link>
                </nav>
                <button className="btn-logout" onClick={handleLogout}>
                    🚪 Sair do sistema
                </button>
            </aside>
            <main className="conteudo">

                <header className="header">
                    <div>
                        <h1>Dashboard</h1>
                        <p>Bem-vindo ao sistema</p>
                    </div>

                    <div className="usuario">
                        <div className="usua-avatar">A</div>
                        <strong>André Alves</strong>
                        <small>Administrador</small>
                    </div>
                </header>

                <section className="cards">
                    <div className="card">
                        <div className="stat-icon">👤</div>
                        <h2>0</h2>
                        <span>Clientes</span>
                    </div>

                    <div className="card">
                        <div className="stat-icon">🏍️</div>
                        <h2>0</h2>
                        <span>Motos</span>
                    </div>

                    <div className="card">
                        <div className="stat-icon">🔧</div>
                        <h2>0</h2>
                        <span>OS Abertas</span>
                    </div>


                    <div className="card">
                        <div className="stat-icon">🔩</div>
                        <h2>0</h2>
                        <span>Peças</span>
                    </div>

                </section>

                <section className="tabela">
                    <h2>🔧 Últimas Ordens de Serviço</h2>
                    <table>
                        <thead>
                            <tr>
                                <th>Cliente</th>
                                <th>Moto</th>
                                <th>Funcionário</th>
                                <th>Status</th>
                            </tr>
                        </thead>

                        <tbody>
                            <tr>
                                <td colSpan={5} style={{ textAlign: 'center', color: '#555', padding: '32px' }}>
                                    Nenhuma OS registrada ainda
                                </td>
                            </tr>
                        </tbody>

                    </table>
                </section>

            </main>

        </div>
    )
}


export default Painel


