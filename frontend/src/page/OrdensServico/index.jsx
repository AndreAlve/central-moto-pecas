import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'

import { useAuth } from '../../context/AuthContext'

import logo from '../../assets/Logo.png'

import './style.css'

function OrdensServico() {

    /* ───────────────────────────── */
    /* AUTH */
    /* ───────────────────────────── */

    const { logout } = useAuth()

    const navigate = useNavigate()
    const location = useLocation()

    function handleLogout() {
        logout()
        navigate('/login')
    }

    /* ───────────────────────────── */
    /* MODAL */
    /* ───────────────────────────── */

    const [modalOpen, setModalOpen] = useState(false)

    /* ───────────────────────────── */
    /* FORMULÁRIO */
    /* ───────────────────────────── */

    const [formData, setFormData] = useState({
        cliente: '',
        moto: '',
        funcionario: '',
        status: 'Em andamento'
    })

    /* ───────────────────────────── */
    /* ORDENS */
    /* ───────────────────────────── */

    const [ordens, setOrdens] = useState([
        {
            id: 1,
            cliente: 'André Alves',
            moto: 'CB 300',
            funcionario: 'Carlos',
            status: 'Em andamento'
        },
        {
            id: 2,
            cliente: 'João',
            moto: 'Fan 160',
            funcionario: 'Marcos',
            status: 'Finalizada'
        }
    ])

    /* ───────────────────────────── */
    /* SALVAR ORDEM */
    /* ───────────────────────────── */

    function salvarOS() {

        if (
            !formData.cliente ||
            !formData.moto ||
            !formData.funcionario
        ) {
            alert('Preencha todos os campos!')
            return
        }

        const novaOS = {
            id: ordens.length + 1,
            ...formData
        }

        setOrdens([...ordens, novaOS])

        setFormData({
            cliente: '',
            moto: '',
            funcionario: '',
            status: 'Em andamento'
        })

        setModalOpen(false)
    }

    /* ───────────────────────────── */
    /* JSX */
    /* ───────────────────────────── */

    return (

        <div className="painel">

            {/* ───────────────── SIDEBAR ───────────────── */}

            <aside className="sidebar">

                <div className="sidebar-logo">
                    <img
                        src={logo}
                        alt="Central Moto Peças"
                    />
                </div>

                <nav className="menu">

                    <Link
                        to="/painel"
                        className={
                            location.pathname === '/painel'
                                ? 'ativo'
                                : ''
                        }
                    >
                        📊 Dashboard
                    </Link>

                    <Link
                        to="/painel/ordens"
                        className={
                            location.pathname === '/painel/ordens'
                                ? 'ativo'
                                : ''
                        }
                    >
                        🔧 Ordens de Serviço
                    </Link>

                    <Link
                        to="/painel/clientes"
                        className={
                            location.pathname === '/painel/clientes'
                                ? 'ativo'
                                : ''
                        }
                    >
                        👤 Clientes
                    </Link>

                    <Link
                        to="/painel/motos"
                        className={
                            location.pathname === '/painel/motos'
                                ? 'ativo'
                                : ''
                        }
                    >
                        🏍️ Motos
                    </Link>

                    <Link
                        to="/painel/pecas"
                        className={
                            location.pathname === '/painel/pecas'
                                ? 'ativo'
                                : ''
                        }
                    >
                        🔩 Peças
                    </Link>

                    <Link
                        to="/painel/funcionarios"
                        className={
                            location.pathname === '/painel/funcionarios'
                                ? 'ativo'
                                : ''
                        }
                    >
                        👷 Funcionários
                    </Link>

                </nav>

                <button
                    className="btn-logout"
                    onClick={handleLogout}
                >
                    🚪 Sair do sistema
                </button>

            </aside>

            {/* ───────────────── CONTEÚDO ───────────────── */}

            <main className="conteudo">

                {/* HEADER */}

                <header className="header">

                    <div>
                        <h1>Ordens de Serviço</h1>

                        <p>
                            Gerencie todas as ordens da oficina
                        </p>
                    </div>

                    <div className="usuario">

                        <div className="usuario-avatar">
                            A
                        </div>

                        <div>
                            <strong>André Alves</strong>
                            <small>Administrador</small>
                        </div>

                    </div>

                </header>

                {/* TOPO */}

                <div className="cabecalho">

                    <button
                        className="btn-nova-os"
                        onClick={() => setModalOpen(true)}
                    >
                        + Nova OS
                    </button>

                </div>

                {/* TABELA */}

                <section className="tabela">

                    <table>

                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Cliente</th>
                                <th>Moto</th>
                                <th>Funcionário</th>
                                <th>Status</th>
                                <th>Ações</th>
                            </tr>
                        </thead>

                        <tbody>

                            {ordens.map((os) => (

                                <tr key={os.id}>

                                    <td>{os.id}</td>

                                    <td>{os.cliente}</td>

                                    <td>{os.moto}</td>

                                    <td>{os.funcionario}</td>

                                    <td>
                                        <span
                                            className={`status ${os.status}`}
                                        >
                                            {os.status}
                                        </span>
                                    </td>

                                    <td>

                                        <button className="btn-acao editar">
                                            Editar
                                        </button>

                                        <button className="btn-acao excluir">
                                            Excluir
                                        </button>

                                    </td>

                                </tr>

                            ))}

                        </tbody>

                    </table>

                </section>

            </main>

            {/* ───────────────── MODAL ───────────────── */}

            {
                modalOpen && (

                    <div className="modal-overlay">

                        <div className="modal">

                            <h2>
                                Nova Ordem de Serviço
                            </h2>

                            {/* CLIENTE */}

                            <div className="form-group">

                                <label>Cliente</label>

                                <input
                                    type="text"
                                    value={formData.cliente}
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            cliente: e.target.value
                                        })
                                    }
                                />

                            </div>

                            {/* MOTO */}

                            <div className="form-group">

                                <label>Moto</label>

                                <input
                                    type="text"
                                    value={formData.moto}
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            moto: e.target.value
                                        })
                                    }
                                />

                            </div>

                            {/* FUNCIONÁRIO */}

                            <div className="form-group">

                                <label>Funcionário</label>

                                <input
                                    type="text"
                                    value={formData.funcionario}
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            funcionario: e.target.value
                                        })
                                    }
                                />

                            </div>

                            {/* STATUS */}

                            <div className="form-group">

                                <label>Status</label>

                                <select
                                    value={formData.status}
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            status: e.target.value
                                        })
                                    }
                                >
                                    <option>
                                        Em andamento
                                    </option>

                                    <option>
                                        Finalizada
                                    </option>

                                </select>

                            </div>

                            {/* AÇÕES */}

                            <div className="modal-actions">

                                <button
                                    className="btn-cancelar"
                                    onClick={() =>
                                        setModalOpen(false)
                                    }
                                >
                                    Cancelar
                                </button>

                                <button
                                    className="btn-salvar"
                                    onClick={salvarOS}
                                >
                                    Salvar
                                </button>

                            </div>

                        </div>

                    </div>

                )
            }

        </div>
    )
}

export default OrdensServico