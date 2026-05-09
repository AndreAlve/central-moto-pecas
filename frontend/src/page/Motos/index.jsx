import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../../../src/context/AuthContext'
import logo from '../../../src/assets/Logo.png'
import './style.css'

function Motos() {
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
        cliente: '', modelo: '', marca: '', ano: '', cor: ''
    })

    const [motos, setMotos] = useState([
        { id: 1, cliente: 'André Alves', modelo: 'CB 300', marca: 'Honda', ano: '2022', cor: 'Preta' },
        { id: 2, cliente: 'João Silva', modelo: 'Fan 160', marca: 'Honda', ano: '2020', cor: 'Vermelha' },
    ])

    function abrirNovo() {
        setFormData({ cliente: '', modelo: '', marca: '', ano: '', cor: '' })
        setEditando(null)
        setModalOpen(true)
    }

    function abrirEditar(moto) {
        setFormData({ cliente: moto.cliente, modelo: moto.modelo, marca: moto.marca, ano: moto.ano, cor: moto.cor })
        setEditando(moto.id)
        setModalOpen(true)
    }

    function salvar() {
        if (!formData.cliente || !formData.modelo || !formData.marca) {
            alert('Cliente, modelo e marca são obrigatórios!')
            return
        }

        if (editando) {
            setMotos(motos.map(m => m.id === editando ? { ...m, ...formData } : m))
        } else {
            setMotos([...motos, { id: motos.length + 1, ...formData }])
        }

        setModalOpen(false)
    }

    function excluir(id) {
        if (confirm('Deseja excluir esta moto?')) {
            setMotos(motos.filter(m => m.id !== id))
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

    const CORES = ['Preta', 'Branca', 'Vermelha', 'Azul', 'Prata', 'Cinza', 'Amarela', 'Verde', 'Laranja']

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
                        <h1>Motos</h1>
                        <p>Gerencie todas as motos cadastradas</p>
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
                    <button className="btn-nova-os" onClick={abrirNovo}>+ Nova Moto</button>
                </div>

                <section className="tabela">
                    <table>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Cliente</th>
                                <th>Marca</th>
                                <th>Modelo</th>
                                <th>Ano</th>
                                <th>Cor</th>
                                <th>Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            {motos.length === 0 ? (
                                <tr><td colSpan={7} style={{ textAlign: 'center', padding: '40px', color: '#666' }}>Nenhuma moto cadastrada</td></tr>
                            ) : motos.map(m => (
                                <tr key={m.id}>
                                    <td>{m.id}</td>
                                    <td>{m.cliente}</td>
                                    <td>{m.marca}</td>
                                    <td>{m.modelo}</td>
                                    <td>{m.ano || '—'}</td>
                                    <td>{m.cor || '—'}</td>
                                    <td>
                                        <button className="btn-acao editar" onClick={() => abrirEditar(m)}>Editar</button>
                                        <button className="btn-acao excluir" onClick={() => excluir(m.id)}>Excluir</button>
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
                        <h2>{editando ? 'Editar Moto' : 'Nova Moto'}</h2>

                        <div className="form-group">
                            <label>Cliente *</label>
                            <input placeholder="Nome do cliente" value={formData.cliente} onChange={e => setFormData({ ...formData, cliente: e.target.value })} />
                        </div>
                        <div className="form-group">
                            <label>Marca *</label>
                            <input placeholder="Honda, Yamaha..." value={formData.marca} onChange={e => setFormData({ ...formData, marca: e.target.value })} />
                        </div>
                        <div className="form-group">
                            <label>Modelo *</label>
                            <input placeholder="CB 300, Fazer 250..." value={formData.modelo} onChange={e => setFormData({ ...formData, modelo: e.target.value })} />
                        </div>
                        <div className="form-group">
                            <label>Ano</label>
                            <input type="number" placeholder="2024" value={formData.ano} onChange={e => setFormData({ ...formData, ano: e.target.value })} />
                        </div>
                        <div className="form-group">
                            <label>Cor</label>
                            <select value={formData.cor} onChange={e => setFormData({ ...formData, cor: e.target.value })}>
                                <option value="">Selecione</option>
                                {CORES.map(c => <option key={c} value={c}>{c}</option>)}
                            </select>
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

export default Motos