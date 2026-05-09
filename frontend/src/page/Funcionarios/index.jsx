import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import logo from '../../assets/Logo.png'
import '../painel/style.css'

function Funcionarios() {
    const { logout } = useAuth()
    const navigate = useNavigate()
    const location = useLocation()

    function handleLogout() {
        logout()
        navigate('/login')
    }

    const [modalOpen, setModalOpen] = useState(false)
    const [editando, setEditando] = useState(null)
    const [busca, setBusca] = useState('')

    const [formData, setFormData] = useState({
        nome: '', cargo: '', telefone: '', especialidade: '', status: 'Ativo'
    })

    const [funcionarios, setFuncionarios] = useState([
        { id: 1, nome: 'Carlos Souza', cargo: 'Mecânico', telefone: '(81) 99111-1111', especialidade: 'Motor e suspensão', status: 'Ativo' },
        { id: 2, nome: 'Marcos Lima', cargo: 'Mecânico', telefone: '(81) 99222-2222', especialidade: 'Elétrica e freios', status: 'Ativo' },
        { id: 3, nome: 'Ana Paula', cargo: 'Atendente', telefone: '(81) 99333-3333', especialidade: 'Atendimento ao cliente', status: 'Ativo' },
    ])

    const CARGOS = ['Mecânico', 'Atendente', 'Gerente', 'Auxiliar', 'Vendedor']

    function abrirNovo() {
        setFormData({ nome: '', cargo: '', telefone: '', especialidade: '', status: 'Ativo' })
        setEditando(null)
        setModalOpen(true)
    }

    function abrirEditar(f) {
        setFormData({ nome: f.nome, cargo: f.cargo, telefone: f.telefone, especialidade: f.especialidade, status: f.status })
        setEditando(f.id)
        setModalOpen(true)
    }

    function salvar() {
        if (!formData.nome || !formData.cargo) {
            alert('Nome e cargo são obrigatórios!')
            return
        }

        if (editando) {
            setFuncionarios(funcionarios.map(f => f.id === editando ? { ...f, ...formData } : f))
        } else {
            setFuncionarios([...funcionarios, { id: funcionarios.length + 1, ...formData }])
        }

        setModalOpen(false)
    }

    function excluir(id) {
        if (confirm('Deseja excluir este funcionário?')) {
            setFuncionarios(funcionarios.filter(f => f.id !== id))
        }
    }

    const filtrados = funcionarios.filter(f =>
        f.nome.toLowerCase().includes(busca.toLowerCase()) ||
        f.cargo.toLowerCase().includes(busca.toLowerCase()) ||
        f.especialidade.toLowerCase().includes(busca.toLowerCase())
    )

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
                        <h1>Funcionários</h1>
                        <p>Gerencie a equipe da oficina</p>
                    </div>
                    <div className="usuario">
                        <div className="usuario-avatar">A</div>
                        <div>
                            <strong>André Alves</strong>
                            <small>Administrador</small>
                        </div>
                    </div>
                </header>

                {/* STATS */}
                <div className="pecas-stats">
                    <div className="peca-stat">
                        <span>{funcionarios.length}</span>
                        <p>Total</p>
                    </div>
                    <div className="peca-stat">
                        <span>{funcionarios.filter(f => f.status === 'Ativo').length}</span>
                        <p>Ativos</p>
                    </div>
                    <div className="peca-stat">
                        <span>{funcionarios.filter(f => f.cargo === 'Mecânico').length}</span>
                        <p>Mecânicos</p>
                    </div>
                    <div className="peca-stat">
                        <span>{[...new Set(funcionarios.map(f => f.cargo))].length}</span>
                        <p>Cargos</p>
                    </div>
                </div>

                <div className="cabecalho">
                    <input
                        className="input-busca"
                        placeholder="🔍 Buscar por nome, cargo ou especialidade..."
                        value={busca}
                        onChange={e => setBusca(e.target.value)}
                    />
                    <button className="btn-nova-os" onClick={abrirNovo}>+ Novo Funcionário</button>
                </div>

                <section className="tabela">
                    <table>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Nome</th>
                                <th>Cargo</th>
                                <th>Telefone</th>
                                <th>Especialidade</th>
                                <th>Status</th>
                                <th>Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filtrados.length === 0 ? (
                                <tr><td colSpan={7} style={{ textAlign: 'center', padding: '40px', color: '#666' }}>Nenhum funcionário encontrado</td></tr>
                            ) : filtrados.map(f => (
                                <tr key={f.id}>
                                    <td>
                                        <div className="func-avatar">{f.nome[0]}</div>
                                    </td>
                                    <td><strong>{f.nome}</strong></td>
                                    <td><span className="badge-cargo">{f.cargo}</span></td>
                                    <td>{f.telefone || '—'}</td>
                                    <td>{f.especialidade || '—'}</td>
                                    <td>
                                        <span className={f.status === 'Ativo' ? 'status-ativo' : 'status-inativo'}>
                                            {f.status === 'Ativo' ? '🟢' : '🔴'} {f.status}
                                        </span>
                                    </td>
                                    <td>
                                        <button className="btn-acao editar" onClick={() => abrirEditar(f)}>Editar</button>
                                        <button className="btn-acao excluir" onClick={() => excluir(f.id)}>Excluir</button>
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
                        <h2>{editando ? 'Editar Funcionário' : 'Novo Funcionário'}</h2>

                        <div className="form-group">
                            <label>Nome *</label>
                            <input placeholder="Nome completo" value={formData.nome} onChange={e => setFormData({ ...formData, nome: e.target.value })} />
                        </div>

                        <div className="form-group">
                            <label>Cargo *</label>
                            <select value={formData.cargo} onChange={e => setFormData({ ...formData, cargo: e.target.value })}>
                                <option value="">Selecione</option>
                                {CARGOS.map(c => <option key={c} value={c}>{c}</option>)}
                            </select>
                        </div>

                        <div className="form-group">
                            <label>Telefone</label>
                            <input placeholder="(81) 99999-9999" value={formData.telefone} onChange={e => setFormData({ ...formData, telefone: e.target.value })} />
                        </div>

                        <div className="form-group">
                            <label>Especialidade</label>
                            <input placeholder="Motor, Elétrica, Freios..." value={formData.especialidade} onChange={e => setFormData({ ...formData, especialidade: e.target.value })} />
                        </div>

                        <div className="form-group">
                            <label>Status</label>
                            <select value={formData.status} onChange={e => setFormData({ ...formData, status: e.target.value })}>
                                <option value="Ativo">Ativo</option>
                                <option value="Inativo">Inativo</option>
                            </select>
                        </div>

                        <div className="modal-actions">
                            <button className="btn-cancelar" onClick={() => setModalOpen(false)}>Cancelar</button>
                            <button className="btn-salvar" onClick={salvar}>
                                {editando ? 'Salvar Alterações' : 'Cadastrar Funcionário'}
                            </button>
                        </div>
                    </div>
                </div>
            )}

        </div>
    )
}

export default Funcionarios