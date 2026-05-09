import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../../../src/context/AuthContext'
import logo from '../../../src/assets/Logo.png'
import './style.css'

function Clientes() {
    const { logout } = useAuth()
    const navigate = useNavigate()
    const location = useLocation()

    function handleLogout() {
        logout()
        navigate('/login')
    }

    const [modalOpen, setModalOpen] = useState(false)
    const [editando, setEditando] = useState(null)

    const [formData, setFormData] = useState({
        nome: '', telefone: '', cpf: '', endereco: ''
    })

    const [clientes, setClientes] = useState([
        { id: 1, nome: 'André Alves', telefone: '(81) 99999-9999', cpf: '123.456.789-00', endereco: 'Altinho - PE' },
        { id: 2, nome: 'João Silva', telefone: '(81) 98888-8888', cpf: '987.654.321-00', endereco: 'Caruaru - PE' },
    ])

    function abrirNovo() {
        setFormData({ nome: '', telefone: '', cpf: '', endereco: '' })
        setEditando(null)
        setModalOpen(true)
    }

    function abrirEditar(cliente) {
        setFormData({ nome: cliente.nome, telefone: cliente.telefone, cpf: cliente.cpf, endereco: cliente.endereco })
        setEditando(cliente.id)
        setModalOpen(true)
    }

    function salvar() {
        if (!formData.nome || !formData.telefone) {
            alert('Nome e telefone são obrigatórios!')
            return
        }

        if (editando) {
            setClientes(clientes.map(c =>
                c.id === editando ? { ...c, ...formData } : c
            ))
        } else {
            setClientes([...clientes, { id: clientes.length + 1, ...formData }])
        }

        setModalOpen(false)
    }

    function excluir(id) {
        if (confirm('Deseja excluir este cliente?')) {
            setClientes(clientes.filter(c => c.id !== id))
        }
    }

    const links = [
        { to: '/painel', label: '📊 Dashboard' },
        { to: '/painel/ordens', label: '🔧 Ordens de Serviço' },
        { to: '/painel/clientes', label: '👤 Clientes' },
        { to: '/painel/motos', label: '🏍️ Motos' },
        { to: '/painel/pecas', label: '🔩 Peças' },
        { to: '/painel/funcionarios', label: '👷 Funcionários' },
    ]

    return (
        <div className="painel">

            <aside className="sidebar">
                <div className="sidebar-logo">
                    <img src={logo} alt="Central Moto Peças" />
                </div>
                <nav className="menu">
                    {links.map(link => (
                        <Link key={link.to} to={link.to} className={location.pathname === link.to ? 'ativo' : ''}>
                            {link.label}
                        </Link>
                    ))}
                </nav>
                <button className="btn-logout" onClick={handleLogout}>🚪 Sair do sistema</button>
            </aside>

            <main className="conteudo">

                <header className="header">
                    <div>
                        <h1>Clientes</h1>
                        <p>Gerencie todos os clientes da oficina</p>
                    </div>
                    <div className="usuario">
                        <div className="usuario-avatar">A</div>
                        <div>
                            <strong>André Alves</strong>
                            <small>Administrador</small>
                        </div>
                    </div>
                </header>

                <div className="cabecalho">
                    <button className="btn-nova-os" onClick={abrirNovo}>+ Novo Cliente</button>
                </div>

                <section className="tabela">
                    <table>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Nome</th>
                                <th>Telefone</th>
                                <th>CPF</th>
                                <th>Endereço</th>
                                <th>Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            {clientes.length === 0 ? (
                                <tr><td colSpan={6} style={{ textAlign: 'center', padding: '40px', color: '#666' }}>Nenhum cliente cadastrado</td></tr>
                            ) : clientes.map(c => (
                                <tr key={c.id}>
                                    <td>{c.id}</td>
                                    <td>{c.nome}</td>
                                    <td>{c.telefone}</td>
                                    <td>{c.cpf || '—'}</td>
                                    <td>{c.endereco || '—'}</td>
                                    <td>
                                        <button className="btn-acao editar" onClick={() => abrirEditar(c)}>Editar</button>
                                        <button className="btn-acao excluir" onClick={() => excluir(c.id)}>Excluir</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </section>

            </main>

            {modalOpen && (
                <div className="modal-overlay">
                    <div className="modal">
                        <h2>{editando ? 'Editar Cliente' : 'Novo Cliente'}</h2>

                        <div className="form-group">
                            <label>Nome *</label>
                            <input placeholder="Nome completo" value={formData.nome} onChange={e => setFormData({ ...formData, nome: e.target.value })} />
                        </div>
                        <div className="form-group">
                            <label>Telefone *</label>
                            <input placeholder="(81) 99999-9999" value={formData.telefone} onChange={e => setFormData({ ...formData, telefone: e.target.value })} />
                        </div>
                        <div className="form-group">
                            <label>CPF</label>
                            <input placeholder="000.000.000-00" value={formData.cpf} onChange={e => setFormData({ ...formData, cpf: e.target.value })} />
                        </div>
                        <div className="form-group">
                            <label>Endereço</label>
                            <input placeholder="Cidade - Estado" value={formData.endereco} onChange={e => setFormData({ ...formData, endereco: e.target.value })} />
                        </div>

                        <div className="modal-actions">
                            <button className="btn-cancelar" onClick={() => setModalOpen(false)}>Cancelar</button>
                            <button className="btn-salvar" onClick={salvar}>Salvar</button>
                        </div>
                    </div>
                </div>
            )}

        </div>
    )
}

export default Clientes