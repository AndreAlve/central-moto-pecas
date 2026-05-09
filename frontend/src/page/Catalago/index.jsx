import './style.css'
import { useCarrinho } from '../../context/CarrinhoContext'
import { Link } from 'react-router-dom'
import Navbar from '../../components/Navbar/Navbar'

const pecas = [
    { id: 1, nome: 'Filtro de Óleo', preco: 25.90, categoria: 'Motor', foto: '🛢️', descricao: 'Compatível com Honda, Yamaha e Suzuki.' },
    { id: 2, nome: 'Vela de Ignição', preco: 18.50, categoria: 'Motor', foto: '⚡', descricao: 'Vela de alta performance para melhor desempenho.' },
    { id: 3, nome: 'Pastilha de Freio', preco: 45.00, categoria: 'Freios', foto: '🛑', descricao: 'Alta durabilidade e frenagem precisa.' },
    { id: 4, nome: 'Corrente de Transmissão', preco: 120.00, categoria: 'Transmissão', foto: '⛓️', descricao: 'Kit relação reforçado com corrente, coroa e pinhão.' },
    { id: 5, nome: 'Pneu Dianteiro', preco: 210.00, categoria: 'Pneus', foto: '🏍️', descricao: 'Ótima aderência para pista e asfalto.' },
    { id: 6, nome: 'Pneu Traseiro', preco: 250.00, categoria: 'Pneus', foto: '🏍️', descricao: 'Reforçado para maior durabilidade e estabilidade.' },
]

function Catalogo() {
    const { adicionarItem } = useCarrinho()


    return (

        <div>
            <Navbar simples={true}></Navbar>
            <div className="catalogo">
                <Link to="/" className="btn-voltar">← Voltar para o início</Link>
                <h2>Catálogo de Peças</h2>
                <p className="secao-sub">Encontre a peça certa para sua moto</p>
                <div className="pecas-grid">
                    {pecas.map(peca => (
                        <div className="peca-card" key={peca.id}>
                            <div className="peca-foto">{peca.foto}</div>
                            <span className="peca-categoria">{peca.categoria}</span>
                            <h3>{peca.nome}</h3>
                            <p className="peca-descricao">{peca.descricao}</p>
                            <p className="peca-preco">R$ {peca.preco.toFixed(2)}</p>
                            <button
                                className="btn-adicionar"
                                onClick={() => adicionarItem(peca)}
                            >
                                🛒 Adicionar
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Catalogo