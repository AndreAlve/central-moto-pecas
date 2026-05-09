import { useState } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../../components/Navbar/Navbar'
import './style.css'

const SERVICOS = [
    { id: 1, icon: '🛢️', nome: 'Troca de Óleo', preco: 'A partir de R$ 30,00', desc: 'Óleo mineral e sintético para todos os modelos.' },
    { id: 2, icon: '🔍', nome: 'Revisão Completa', preco: 'A partir de R$ 80,00', desc: 'Checklist completo com mais de 20 itens verificados.' },
    { id: 3, icon: '🛑', nome: 'Sistema de Freios', preco: 'A partir de R$ 50,00', desc: 'Pastilhas, discos e regulagem do sistema completo.' },
    { id: 4, icon: '⛓️', nome: 'Troca de Corrente', preco: 'A partir de R$ 60,00', desc: 'Kits de relação originais e paralelos.' },
    { id: 5, icon: '🛞', nome: 'Troca de Pneus', preco: 'A partir de R$ 20,00', desc: 'Pneus das melhores marcas com montagem inclusa.' },
    { id: 6, icon: '🔧', nome: 'Diagnóstico Geral', preco: 'Grátis na 1ª visita', desc: 'Identificamos qualquer problema na sua moto.' },
]

export default function Servicos() {
    const [form, setForm] = useState({
        nome: '', telefone: '', servico: '', moto: '', data: '', obs: ''
    })
    const [enviado, setEnviado] = useState(false)

    function handleEnviar(e) {
        e.preventDefault()

        if (!form.nome || !form.telefone || !form.servico) {
            alert('Preencha nome, telefone e serviço!')
            return
        }

        const msg = encodeURIComponent(
            `🏍️ *Solicitação de Serviço*\n\n` +
            `👤 Nome: ${form.nome}\n` +
            `📞 Telefone: ${form.telefone}\n` +
            `🔧 Serviço: ${form.servico}\n` +
            `🏍️ Moto: ${form.moto || 'Não informado'}\n` +
            `📅 Data preferida: ${form.data || 'Não informado'}\n` +
            `📝 Observações: ${form.obs || 'Nenhuma'}`
        )

        window.open('https://wa.me/558196498803?text=' + msg, '_blank')
        setEnviado(true)
    }

    return (
        <div className="servicos-page">
            <Navbar />

            {/* HERO */}
            <section className="servicos-hero">
                <h1>Nossos Serviços</h1>
                <p>Qualidade e agilidade para manter sua moto em perfeito estado</p>
                <a href="#agendar" className="btn-agendar-hero">📅 Agendar Serviço</a>
            </section>

            {/* CARDS DE SERVIÇOS */}
            <section className="servicos-lista" id="servicos">
                <div className="servicos-grid">
                    {SERVICOS.map(s => (
                        <div className="servico-card" key={s.id}>
                            <div className="servico-emoji">{s.icon}</div>
                            <h3>{s.nome}</h3>
                            <p>{s.desc}</p>
                            <span className="servico-preco">{s.preco}</span>
                        </div>
                    ))}
                </div>
            </section>

            {/* FORMULÁRIO DE AGENDAMENTO */}
            <section className="agendar-section" id="agendar">
                <div className="agendar-box">

                    {enviado ? (
                        <div className="enviado">
                            <span>✅</span>
                            <h2>Solicitação enviada!</h2>
                            <p>Você será redirecionado para o WhatsApp. Aguarde nosso contato!</p>
                            <button onClick={() => setEnviado(false)} className="btn-novo">Fazer novo agendamento</button>
                        </div>
                    ) : (
                        <>
                            <h2>📅 Agendar Serviço</h2>
                            <p className="agendar-sub">Preencha o formulário e entraremos em contato!</p>

                            <form onSubmit={handleEnviar}>
                                <div className="form-row">
                                    <div className="form-group">
                                        <label>Nome *</label>
                                        <input placeholder="Seu nome completo" value={form.nome}
                                            onChange={e => setForm({ ...form, nome: e.target.value })} />
                                    </div>
                                    <div className="form-group">
                                        <label>Telefone *</label>
                                        <input placeholder="(81) 99999-9999" value={form.telefone}
                                            onChange={e => setForm({ ...form, telefone: e.target.value })} />
                                    </div>
                                </div>

                                <div className="form-row">
                                    <div className="form-group">
                                        <label>Serviço desejado *</label>
                                        <select value={form.servico} onChange={e => setForm({ ...form, servico: e.target.value })}>
                                            <option value="">Selecione o serviço</option>
                                            {SERVICOS.map(s => <option key={s.id} value={s.nome}>{s.icon} {s.nome}</option>)}
                                            <option value="Outro">Outro serviço</option>
                                        </select>
                                    </div>
                                    <div className="form-group">
                                        <label>Sua moto</label>
                                        <input placeholder="Ex: Honda CB 300 2022" value={form.moto}
                                            onChange={e => setForm({ ...form, moto: e.target.value })} />
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label>Data preferida</label>
                                    <input type="date" value={form.data}
                                        onChange={e => setForm({ ...form, data: e.target.value })}
                                        min={new Date().toISOString().split('T')[0]}
                                    />
                                </div>

                                <div className="form-group">
                                    <label>Observações</label>
                                    <textarea placeholder="Descreva o problema ou detalhe o serviço..."
                                        value={form.obs} onChange={e => setForm({ ...form, obs: e.target.value })} rows={3} />
                                </div>

                                <button type="submit" className="btn-enviar">
                                    📲 Enviar pelo WhatsApp
                                </button>
                            </form>
                        </>
                    )}
                </div>
            </section>

            {/* FOOTER */}
            <footer className="footer">
                <p>© 2026 Central Moto Peças — Alisson Mecânico</p>
                <p className="footer-dev">Desenvolvido por Sigma Orbitek — André Alves</p>
                <Link to="/login" className="link-admin">⚙️ Área do sistema</Link>
            </footer>

        </div>
    )
}