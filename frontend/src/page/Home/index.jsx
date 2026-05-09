import Navbar from '../../components/Navbar/Navbar.jsx'
import './style.css'
import logo from '../../assets/Logo.png'
import honda from '../../assets/Honda.png'
import yamaha from '../../assets/Yamaha.png'
import suzuki from '../../assets/Suzuki.png'
import kawasaki from '../../assets/Kawasaki.png'
import shineray from '../../assets/Shineray.png'
import marcas from '../../assets/Marcas.png'
import { Link } from 'react-router-dom'

function Home() {
    return (
        <div>
            <Navbar />

            <div className="hero" id="inicio">
                <img src={logo} alt="Central Moto Peças" />
                <h1>Central Moto Peças</h1>
                <p>Sua Oficina e Loja de Peças completa!</p>

                <div className="hero-btns">
                    <a href="/servicos" className="btn-vermelho">🔧 Agendar seu Serviços</a>
                    <Link to="/catalogo" className="btn-verde">🔩 Ver Catálogo</Link>
                    <a href="/ver-servicos" className="btn-amarelho">🏍️ Ver Serviços feito</a>
                </div>
            </div>

            <section className="stats">
                <div className="stat-item">
                    <span className="stat-numero">5</span>
                    <span className="stat-label">Anos de experiência</span>
                </div>
                <div className="stat-item">
                    <span className="stat-numero">500+</span>
                    <span className="stat-label">Peças disponíveis</span>
                </div>
                <div className="stat-item">
                    <span className="stat-numero">1200</span>
                    <span className="stat-label">Clientes atendidos</span>
                </div>
                <div className="stat-item">
                    <span className="stat-numero">8</span>
                    <span className="stat-label">Marcas atendidas</span>
                </div>
            </section>

            <section className="servicos" id="servicos">
                <h2>Nossos Serviços</h2>
                <p className="secao-sub">Tudo que sua moto precisa em um só lugar</p>

                <div className="servicos-grid">

                    <div className="servico-card">
                        <span className="servico-icon">🛢️</span>
                        <h3>Troca de Óleo</h3>
                        <p>Óleo mineral e sintético para todos os modelos</p>
                    </div>

                    <div className="servico-card">
                        <span className="servico-icon">🔍</span>
                        <h3>Revisão Completa</h3>
                        <p>Revisão geral com checklist completo da sua moto</p>
                    </div>

                    <div className="servico-card">
                        <span className="servico-icon">🛞</span>
                        <h3>Troca de Pneus</h3>
                        <p>Pneus das melhores marcas com montagem inclusa</p>
                    </div>

                    <div className="servico-card">
                        <span className="servico-icon">⛓️</span>
                        <h3>Troca de Corrente</h3>
                        <p>Kits de relação originais e paralelos</p>
                    </div>

                    <div className="servico-card">
                        <span className="servico-icon">🛑</span>
                        <h3>Sistema de Freios</h3>
                        <p>Pastilhas, discos e regulagem do sistema completo</p>
                    </div>

                    <div className="servico-card">
                        <span className="servico-icon">🔧</span>
                        <h3>Diagnóstico</h3>
                        <p>Identificamos qualquer problema na sua moto</p>
                    </div>
                </div>
            </section>

            <section className="marcas" id="catalogo">
                <h2>Catálogo de Peças que Atendemos</h2>
                <p className="secao-sub">Peças para Honda, Yamaha, Suzuki, Kawasaki e muito mais</p>

                <div className="marcas-grid">

                    <div className="marca-card">
                        <img src={honda} alt="Honda" />
                        <p>Honda</p>
                    </div>

                    <div className="marca-card">
                        <img src={yamaha} alt="Yamaha" />
                        <p>Yamaha</p>
                    </div>

                    <div className="marca-card">
                        <img src={suzuki} alt="Suzuki" />
                        <p>Suzuki</p>
                    </div>

                    <div className="marca-card">
                        <img src={kawasaki} alt="Kawasaki" />
                        <p>Kawasaki</p>
                    </div>

                    <div className="marca-card">
                        <img src={shineray} alt="Shineray" />
                        <p>Shineray</p>
                    </div>

                    <div className="marca-card">
                        <img src={marcas} alt="E mais" />
                        <p>E muito mais</p>
                    </div>

                </div>
            </section>

            <section className="contato" id="contato">
                <h2>Entre em Contato</h2>
                <p className="secao-sub">Fale com a gente agora mesmo!</p>

                <div className="contato-grid">

                    <div className="contato-card">
                        <span className="contato-icon">📲</span>
                        <h3>WhatsApp</h3>
                        <p>(81) 9649-8803</p>
                        <a href="https://wa.me/558196498803" target="_blank" className="btn-verde">
                            Chamar no WhatsApp
                        </a>
                    </div>

                    <div className="contato-card">
                        <span className="contato-icon">📍</span>
                        <h3>Endereço</h3>

                        <a href="https://maps.app.goo.gl/X5pyHF2KTaGcuVLB6"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="link-mapa"
                        >
                            Capitaoguilhermino, R. Cap. Guilhermino - Centro, Altinho - PE, 55490-000
                        </a>
                        <span className="mapa-hint">📌 Clique para abrir no mapa</span>
                    </div>

                    <div className="contato-card">
                        <span className="contato-icon">🕐</span>
                        <h3>Horário</h3>
                        <p>Seg–Sex: 08h às 18h</p>
                        <p>Sábado: até às 12h</p>
                    </div>

                </div>
            </section >

            <footer className="footer">
                <p>© 2026 Central Moto Peças — Alisson Mecânico</p>
                <p className="footer-dev">Desenvolvido por Sigma Orbitek — André Alves</p>
                <Link to="/login" className="link-admin">⚙️ Área do sistema</Link>
            </footer>

        </div >
    )
}

export default Home