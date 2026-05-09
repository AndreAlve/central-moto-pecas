import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import logo from '../../assets/Logo.png'
import '../painel/style.css'
import './pecas.css'

function Pecas() {
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
        nome: '', categoria: '', marca: '', descricao: '',
        preco: '', estoque: '', foto: '🔩', imagem: ''
    })

    const [pecas, setPecas] = useState([
        { id: 1, nome: 'Filtro de Óleo', categoria: 'Motor', marca: 'Mann', descricao: 'Compatível com Honda, Yamaha e Suzuki.', preco: 25.90, estoque: 15, foto: '🛢️', imagem: '' },
        { id: 2, nome: 'Vela de Ignição', categoria: 'Motor', marca: 'NGK', descricao: 'Vela de alta performance.', preco: 18.50, estoque: 30, foto: '⚡', imagem: '' },
        { id: 3, nome: 'Pastilha de Freio', categoria: 'Freios', marca: 'Brembo', descricao: 'Alta durabilidade e frenagem precisa.', preco: 45.00, estoque: 8, foto: '🛑', imagem: '' },
        { id: 4, nome: 'Corrente de Transmissão', categoria: 'Transmissão', marca: 'DID', descricao: 'Kit relação reforçado.', preco: 120.00, estoque: 5, foto: '⛓️', imagem: '' },
        { id: 5, nome: 'Pneu Dianteiro', categoria: 'Pneus', marca: 'Pirelli', descricao: 'Ótima aderência para asfalto.', preco: 210.00, estoque: 4, foto: '🏍️', imagem: '' },
        { id: 6, nome: 'Pneu Traseiro', categoria: 'Pneus', marca: 'Pirelli', descricao: 'Reforçado para maior durabilidade.', preco: 250.00, estoque: 3, foto: '🏍️', imagem: '' },
    ])

    const CATEGORIAS = ['Motor', 'Freios', 'Transmissão', 'Pneus', 'Elétrica', 'Suspensão', 'Carroceria', 'Outros']
    const EMOJIS = ['🛢️', '⚡', '🛑', '⛓️', '🏍️', '🔧', '🔩', '⚙️', '🪛', '🔋', '💡', '🛞']

    function handleImagem(e) {
        const arquivo = e.target.files[0]
        if (!arquivo) return
        const reader = new FileReader()
        reader.onloadend = () => {
            setFormData(prev => ({ ...prev, imagem: reader.result }))
        }
        reader.readAsDataURL(arquivo)
    }

    function abrirNovo() {
        setFormData({ nome: '', categoria: '', marca: '', descricao: '', preco: '', estoque: '', foto: '🔩', imagem: '' })
        setEditando(null)
        setModalOpen(true)
    }

    function abrirEditar(peca) {
        setFormData({
            nome: peca.nome, categoria: peca.categoria, marca: peca.marca,
            descricao: peca.descricao, preco: peca.preco, estoque: peca.estoque,
            foto: peca.foto, imagem: peca.imagem || ''
        })
        setEditando(peca.id)
        setModalOpen(true)
    }

    function salvar() {
        if (!formData.nome || !formData.categoria || !formData.preco) {
            alert('Nome, categoria e preço são obrigatórios!')
            return
        }
        if (editando) {
            setPecas(pecas.map(p => p.id === editando
                ? { ...p, ...formData, preco: Number(formData.preco), estoque: Number(formData.estoque) }
                : p
            ))
        } else {
            setPecas([...pecas, {
                id: pecas.length + 1, ...formData,
                preco: Number(formData.preco), estoque: Number(formData.estoque)
            }])
        }
        setModalOpen(false)
    }

    function excluir(id) {
        if (confirm('Deseja excluir esta peça?')) {
            setPecas(pecas.filter(p => p.id !== id))
        }
    }

    const pecasFiltradas = pecas.filter(p =>
        p.nome.toLowerCase().includes(busca.toLowerCase()) ||
        p.categoria.toLowerCase().includes(busca.toLowerCase()) ||
        p.marca.toLowerCase().includes(busca.toLowerCase())
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
                        <h1>Peças</h1>
                        <p>Gerencie o estoque e o catálogo do site</p>
                    </div>
                    <div className="usuario">
                        <div className="usuario-avatar">A</div>
                        <div>
                            <strong>André Alves</strong>
                            <small>Administrador</small>
                        </div>
                    </div>
                </header>

                <div className="pecas-stats">
                    <div className="peca-stat">
                        <span>{pecas.length}</span>
                        <p>Total de Peças</p>
                    </div>
                    <div className="peca-stat">
                        <span className="alerta">{pecas.filter(p => p.estoque <= 5).length}</span>
                        <p>Estoque Baixo</p>
                    </div>
                    <div className="peca-stat">
                        <span>{[...new Set(pecas.map(p => p.categoria))].length}</span>
                        <p>Categorias</p>
                    </div>
                    <div className="peca-stat">
                        <span>R$ {pecas.reduce((s, p) => s + (p.preco * p.estoque), 0).toFixed(2)}</span>
                        <p>Valor em Estoque</p>
                    </div>
                </div>

                <div className="cabecalho">
                    <input
                        className="input-busca"
                        placeholder="🔍 Buscar por nome, categoria ou marca..."
                        value={busca}
                        onChange={e => setBusca(e.target.value)}
                    />
                    <button className="btn-nova-os" onClick={abrirNovo}>+ Nova Peça</button>
                </div>

                <section className="tabela">
                    <table>
                        <thead>
                            <tr>
                                <th>Foto</th>
                                <th>Nome</th>
                                <th>Categoria</th>
                                <th>Marca</th>
                                <th>Preço</th>
                                <th>Estoque</th>
                                <th>Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            {pecasFiltradas.length === 0 ? (
                                <tr><td colSpan={7} style={{ textAlign: 'center', padding: '40px', color: '#666' }}>Nenhuma peça encontrada</td></tr>
                            ) : pecasFiltradas.map(p => (
                                <tr key={p.id}>
                                    <td className="peca-foto-cell">
                                        {p.imagem
                                            ? <img src={p.imagem} alt={p.nome} className="peca-foto-thumb" />
                                            : <span style={{ fontSize: 28 }}>{p.foto}</span>
                                        }
                                    </td>
                                    <td>
                                        <strong>{p.nome}</strong>
                                        <small className="peca-desc">{p.descricao}</small>
                                    </td>
                                    <td><span className="badge-categoria">{p.categoria}</span></td>
                                    <td>{p.marca || '—'}</td>
                                    <td className="peca-preco">R$ {Number(p.preco).toFixed(2)}</td>
                                    <td>
                                        <span className={p.estoque <= 5 ? 'estoque-baixo' : 'estoque-ok'}>
                                            {p.estoque <= 5 ? '⚠️ ' : '✅ '}{p.estoque} un.
                                        </span>
                                    </td>
                                    <td>
                                        <button className="btn-acao editar" onClick={() => abrirEditar(p)}>Editar</button>
                                        <button className="btn-acao excluir" onClick={() => excluir(p.id)}>Excluir</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </section>

            </main>

            {modalOpen && (
                <div className="modal-overlay">
                    <div className="modal modal-grande">
                        <h2>{editando ? 'Editar Peça' : 'Nova Peça'}</h2>

                        <div className="form-group">
                            <label>Ícone da peça</label>
                            <div className="emoji-grid">
                                {EMOJIS.map(e => (
                                    <button key={e} className={`emoji-btn ${formData.foto === e ? 'selecionado' : ''}`}
                                        onClick={() => setFormData({ ...formData, foto: e })}>
                                        {e}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* UPLOAD DE FOTO */}
                        <div className="form-group">
                            <label>Foto da peça (opcional)</label>
                            <div className="upload-area">
                                {formData.imagem ? (
                                    <div className="preview-foto">
                                        <img src={formData.imagem} alt="Preview" />
                                        <button className="btn-remover-foto" onClick={() => setFormData({ ...formData, imagem: '' })}>
                                            ✕ Remover foto
                                        </button>
                                    </div>
                                ) : (
                                    <label className="upload-label">
                                        <input type="file" accept="image/*" onChange={handleImagem} hidden />
                                        📷 Clique para adicionar foto
                                    </label>
                                )}
                            </div>
                        </div>

                        <div className="form-row">
                            <div className="form-group">
                                <label>Nome *</label>
                                <input placeholder="Ex: Filtro de Óleo" value={formData.nome} onChange={e => setFormData({ ...formData, nome: e.target.value })} />
                            </div>
                            <div className="form-group">
                                <label>Categoria *</label>
                                <select value={formData.categoria} onChange={e => setFormData({ ...formData, categoria: e.target.value })}>
                                    <option value="">Selecione</option>
                                    {CATEGORIAS.map(c => <option key={c} value={c}>{c}</option>)}
                                </select>
                            </div>
                        </div>

                        <div className="form-row">
                            <div className="form-group">
                                <label>Marca</label>
                                <input placeholder="NGK, Brembo..." value={formData.marca} onChange={e => setFormData({ ...formData, marca: e.target.value })} />
                            </div>
                            <div className="form-group">
                                <label>Preço (R$) *</label>
                                <input type="number" step="0.01" placeholder="0,00" value={formData.preco} onChange={e => setFormData({ ...formData, preco: e.target.value })} />
                            </div>
                        </div>

                        <div className="form-row">
                            <div className="form-group">
                                <label>Quantidade em Estoque</label>
                                <input type="number" min="0" placeholder="0" value={formData.estoque} onChange={e => setFormData({ ...formData, estoque: e.target.value })} />
                            </div>
                        </div>

                        <div className="form-group">
                            <label>Descrição</label>
                            <textarea placeholder="Descreva a peça, compatibilidade..." value={formData.descricao}
                                onChange={e => setFormData({ ...formData, descricao: e.target.value })} rows={3} />
                        </div>

                        <div className="modal-actions">
                            <button className="btn-cancelar" onClick={() => setModalOpen(false)}>Cancelar</button>
                            <button className="btn-salvar" onClick={salvar}>
                                {editando ? 'Salvar Alterações' : 'Cadastrar Peça'}
                            </button>
                        </div>
                    </div>
                </div>
            )}

        </div>
    )
}

export default Pecas