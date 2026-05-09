import { useState } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../../components/Navbar/Navbar'
import './style.css'

const SERVICOS_REALIZADOS = [
    {
        id: 1,
        data: '05/05/2026',
        cliente: 'André Alves',
        moto: 'Honda CB 300 2022',
        servico: 'Troca de Óleo',
        funcionario: 'Carlos Souza',
        status: 'Concluído',
        descricao: 'Troca de óleo 10W30 sintético com filtro novo.',
        valor: 'R$ 85,00'
    },
    {
        id: 2,
        data: '28/04/2026',
        cliente: 'João Silva',
        moto: 'Honda Fan 160 2020',
        servico: 'Revisão Completa',
        funcionario: 'Marcos Lima',
        status: 'Concluído',
        descricao: 'Revisão geral com ajuste de freios, corrente e vela.',
        valor: 'R$ 150,00'
    },
    {
        id: 3,
        data: '20/04/2026',
        cliente: 'Pedro Santos',
        moto: 'Yamaha Fazer 250 2021',
        servico: 'Troca de Pneus',
        funcionario: 'Carlos Souza',
        status: 'Concluído',
        descricao: 'Troca dos dois pneus Pirelli com balanceamento.',
        valor: 'R$ 480,00'
    },
    {
        id: 4,
        data: '15/04/2026',
        cliente: 'Maria Costa',
        moto: 'Honda CG 160 2023',
        servico: 'Sistema de Freios',
        funcionario: 'Marcos Lima',
        status: 'Concluído',
        descricao: 'Troca de pastilhas dianteiras e traseiras.',
        valor: 'R$ 120,00'
    },
    {
        id: 5,
        data: '10/04/2026',
        cliente: 'Lucas Ferreira',
        moto: 'Suzuki GSX 150 2022',
        servico: 'Diagnóstico Geral',
        funcionario: 'Carlos Souza',
        status: 'Concluído',
        descricao: 'Diagnóstico completo com relatório detalhado.',
        valor: 'Grátis'
    },
    {
        id: 6,
        data: '08/04/2026',
        cliente: 'Carlos Mendes',
        moto: 'Honda Biz 125 2019',
        servico: 'Troca de Corrente',
        funcionario: 'Marcos Lima',
        status: 'Concluído',
        descricao: 'Kit de relação completo com corrente, coroa e pinhão.',
        valor: 'R$ 180,00'
    },
]

function VerServicos() {
    const [busca, setBusca] = useState('')
    const [selecionado, setSelecionado] = useState(null)

    const filtrados = SERVICOS_REALIZADOS.filter(s =>
        s.cliente.toLowerCase().includes(busca.toLowerCase()) ||
        s.moto.toLowerCase().includes(busca.toLowerCase()) ||
        s.servico.toLowerCase().includes(busca.toLowerCase())
    )

    return (
        <div className="ver-servicos-page">
            <Navbar />

            {/* HERO */}
            <section className="vs-hero">
                <h1>🔧 Serviços Realizados</h1>
                <p>Transparência total — veja o histórico completo da nossa oficina</p>
            </section>

            {/* STATS */}
            <section className="vs-stats">
                <div className="vs-stat">
                    <span>{SERVICOS_REALIZADOS.length}</span>
                    <p>Serviços Realizados</p>
                </div>
                <div className="vs-stat">
                    <span>{new Set(SERVICOS_REALIZADOS.map(s => s.cliente)).size}</span>
                    <p>Clientes Atendidos</p>
                </div>
                <div className="vs-stat">
                    <span>{new Set(SERVICOS_REALIZADOS.map(s => s.servico)).size}</span>
                    <p>Tipos de Serviço</p>
                </div>
                <div className="vs-stat">
                    <span>100%</span>
                    <p>Satisfação</p>
                </div>
            </section>

            {/* BUSCA */}
            <section className="vs-conteudo">
                <input
                    className="vs-busca"
                    placeholder="🔍 Buscar por cliente, moto ou serviço..."
                    value={busca}
                    onChange={e => setBusca(e.target.value)}
                />

                {/* CARDS */}
                <div className="vs-grid">
                    {filtrados.length === 0 ? (
                        <div className="vs-vazio">
                            <span>🔍</span>
                            <p>Nenhum serviço encontrado</p>
                        </div>
                    ) : filtrados.map(s => (
                        <div className="vs-card" key={s.id} onClick={() => setSelecionado(s)}>
                            <div className="vs-card-top">
                                <span className="vs-data">📅 {s.data}</span>
                                <span className="vs-status">✅ {s.status}</span>
                            </div>
                            <h3>{s.servico}</h3>
                            <p className="vs-moto">🏍️ {s.moto}</p>
                            <p className="vs-cliente">👤 {s.cliente}</p>
                            <div className="vs-card-bottom">
                                <span className="vs-funcionario">👷 {s.funcionario}</span>
                                <span className="vs-valor">{s.valor}</span>
                            </div>
                            <button className="btn-detalhes">Ver detalhes →</button>
                        </div>
                    ))}
                </div>
            </section>

            {/* MODAL DE DETALHES */}
            {selecionado && (
                <div className="modal-overlay" onClick={() => setSelecionado(null)}>
                    <div className="vs-modal" onClick={e => e.stopPropagation()}>
                        <div className="vs-modal-top">
                            <h2>{selecionado.servico}</h2>
                            <button className="btn-fechar" onClick={() => setSelecionado(null)}>✕</button>
                        </div>

                        <div className="vs-modal-info">
                            <div className="vs-info-item">
                                <span className="vs-info-label">📅 Data</span>
                                <span>{selecionado.data}</span>
                            </div>
                            <div className="vs-info-item">
                                <span className="vs-info-label">👤 Cliente</span>
                                <span>{selecionado.cliente}</span>
                            </div>
                            <div className="vs-info-item">
                                <span className="vs-info-label">🏍️ Moto</span>
                                <span>{selecionado.moto}</span>
                            </div>
                            <div className="vs-info-item">
                                <span className="vs-info-label">👷 Mecânico</span>
                                <span>{selecionado.funcionario}</span>
                            </div>
                            <div className="vs-info-item">
                                <span className="vs-info-label">💰 Valor</span>
                                <span className="vs-valor-modal">{selecionado.valor}</span>
                            </div>
                            <div className="vs-info-item">
                                <span className="vs-info-label">✅ Status</span>
                                <span className="vs-status-modal">{selecionado.status}</span>
                            </div>
                        </div>

                        <div className="vs-descricao">
                            <span className="vs-info-label">📝 Descrição do serviço</span>
                            <p>{selecionado.descricao}</p>
                        </div>


                        <a href={"https://wa.me/558196498803?text=Olá! Gostaria de agendar um serviço de " + selecionado.servico}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn-agendar-modal"
                        >
                            📲 Agendar este serviço
                        </a>
                    </div>
                </div>
            )
            }

            {/* CTA */}
            <section className="vs-cta">
                <h2>Sua moto precisa de cuidados?</h2>
                <p>Agende agora e garanta qualidade e agilidade!</p>
                <div className="vs-cta-btns">
                    <Link to="/servicos" className="btn-vermelho">📅 Agendar Serviço</Link>
                    <a href="https://wa.me/558196498803" target="_blank" rel="noreferrer" className="btn-verde">
                        💬 Falar no WhatsApp
                    </a>
                </div>
            </section>

            <footer className="footer">
                <p>© 2026 Central Moto Peças — Alisson Mecânico</p>
                <p className="footer-dev">Desenvolvido por Sigma Orbitek — André Alves</p>
                <Link to="/login" className="link-admin">⚙️ Área do sistema</Link>
            </footer>
        </div >
    )
}

export default VerServicos;