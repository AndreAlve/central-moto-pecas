import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useCarrinho } from '../../context/CarrinhoContext'
import './Navbar.css'
import logo from '../../assets/Logo.png'

function Navbar({ simples }) {
    const [scrolled, setScrolled] = useState(false)
    const { totalItens } = useCarrinho()

    useEffect(() => {
        function handleScroll() {
            setScrolled(window.scrollY > 60)
        }
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    return (
        <nav className={scrolled ? 'nav-scrolled' : ''}>
            <div className="nav-logo">
                <img src={logo} alt="Central Moto Peças" />
            </div>

            {/* Só mostra os links se NÃO for simples */}
            {!simples && (
                <ul className="nav-links">
                    <li><Link to="/">Início</Link></li>
                    <li><Link to="/catalogo">Catálogo</Link></li>
                    <li><a href="#servicos">Serviços</a></li>
                    <li><a href="#contato">Contato</a></li>
                </ul>
            )}

            <div className="nav-btn">
                <Link to="/carrinho" className="btn-carrinho">
                    🛒 <span className="carrinho-contador">{totalItens()}</span>
                </Link>

                {/* Só mostra o WhatsApp se NÃO for simples */}
                {!simples && (
                    <a href="https://wa.me/558196498803" target="_blank">📲 WhatsApp</a>
                )}
            </div>
        </nav>
    )
}

export default Navbar