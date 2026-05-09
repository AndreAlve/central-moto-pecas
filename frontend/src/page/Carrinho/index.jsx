import { Link } from 'react-router-dom'
import { useCarrinho } from '../../context/CarrinhoContext'
import { useState } from 'react'
import './style.css'

function Carrinho() {
    const { carrinho, removerItem, removerUm, adicionarItem } = useCarrinho()

    const [nome, setNome] = useState('')
    const [telefone, setTelefone] = useState('')
    const [tipoEntrega, setTipoEntrega] = useState('retirada')
    const [endereco, setEndereco] = useState('')
    const [pagamento, setPagamento] = useState('')
    const [troco, setTroco] = useState('')
    const [pedidoId] = useState(() => Math.floor(Math.random() * 100000))

    const taxaEntrega = tipoEntrega === 'entrega' ? 3 : 0
    const totalProdutos = carrinho.reduce((soma, item) => soma + item.preco * item.quantidade, 0)
    const totalFinal = totalProdutos + taxaEntrega

    const salvarPedido = () => {
        localStorage.setItem(`pedido_${pedidoId}`, JSON.stringify({
            id: pedidoId, nome, telefone, carrinho,
            total: totalFinal, tipoEntrega, endereco, pagamento
        }))
    }

    const mensagemWhatsApp = encodeURIComponent(`
🧾 *Pedido #${pedidoId}*

👤 Nome: ${nome}
📞 Telefone: ${telefone}

🛒 Itens:
${carrinho.map(i => `- ${i.nome} (x${i.quantidade})`).join('\n')}

💵 Produtos: R$ ${totalProdutos.toFixed(2)}
🚚 Entrega: R$ ${taxaEntrega.toFixed(2)}
💰 Total: R$ ${totalFinal.toFixed(2)}

📦 Tipo: ${tipoEntrega}
${tipoEntrega === 'entrega' ? `📍 Endereço: ${endereco}` : ''}

💳 Pagamento: ${pagamento}
${pagamento === 'dinheiro' ? `💵 Troco para: R$ ${troco}` : ''}
${pagamento === 'pix' ? `\n📎 *Comprovante do PIX será enviado em seguida!*` : ''}
`)

    const podeFinalizar =
        nome && telefone && pagamento &&
        (tipoEntrega === 'retirada' || endereco.trim() !== '')

    return (
        <div className="carrinho">
            <Link to="/catalogo" className="btn-voltar">← Voltar ao Catálogo</Link>

            <h2>Meu Carrinho</h2>

            {carrinho.length === 0 ? (
                <div className="carrinho-vazio">
                    <span>🛒</span>
                    <p>Seu carrinho está vazio!</p>
                    <Link to="/catalogo" className="btn-vermelho">Ver Catálogo</Link>
                </div>
            ) : (
                <>
                    {/* LISTA DE ITENS */}
                    {carrinho.map(item => (
                        <div key={item.id} className="carrinho-item">
                            <div className="item-foto">{item.foto}</div>
                            <div className="item-info">
                                <h3>{item.nome}</h3>
                                <p className="item-categoria">{item.categoria}</p>
                                <p className="item-preco-unit">R$ {item.preco.toFixed(2)} cada</p>
                            </div>
                            <div className="item-controles">
                                <button onClick={() => removerUm(item.id)}>−</button>
                                <span>{item.quantidade}</span>
                                <button onClick={() => adicionarItem(item)}>+</button>
                            </div>
                            <div className="item-subtotal">
                                R$ {(item.preco * item.quantidade).toFixed(2)}
                            </div>
                            <button className="btn-remover" onClick={() => removerItem(item.id)}>✕</button>
                        </div>
                    ))}

                    <hr />

                    {/* DADOS DO CLIENTE */}
                    <h3>Seus dados</h3>
                    <input placeholder="Nome" value={nome} onChange={e => setNome(e.target.value)} />
                    <input placeholder="Telefone" value={telefone} onChange={e => setTelefone(e.target.value)} />

                    {/* ENTREGA */}
                    <h3>Entrega</h3>
                    <select onChange={e => setTipoEntrega(e.target.value)}>
                        <option value="retirada">Retirar na loja</option>
                        <option value="entrega">Entrega (+R$ 3,00)</option>
                    </select>
                    {tipoEntrega === 'entrega' && (
                        <input placeholder="Endereço completo" value={endereco} onChange={e => setEndereco(e.target.value)} />
                    )}
                    {tipoEntrega === 'entrega' && (
                        <input
                            placeholder="Endereço completo"
                            value={endereco}
                            onChange={e => setEndereco(e.target.value)}
                        />
                    )}

                    {tipoEntrega === 'entrega' && endereco.trim() !== '' && (

                    <a href = {"https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent (endereco)}
                    target = "_blank" rel ="noopener noreferrer"  classname= "btn-maps" >📍 Ver no Google Maps
                    
                    </a>
)}

            {/* PAGAMENTO */}
            <h3>Pagamento</h3>
            <select onChange={e => setPagamento(e.target.value)}>
                <option value="">Selecione</option>
                <option value="pix">Pix</option>
                <option value="cartao">Cartão</option>
                <option value="dinheiro">Dinheiro</option>
            </select>

            {/* PIX */}
            {pagamento === 'pix' && (
                <div className="pix-box">
                    <p className="pix-titulo">📲 Pague via PIX</p>
                    <img
                        src="https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=81996498803"
                        alt="QR Code PIX"
                        className="pix-qr"
                    />
                    <p className="pix-label">Chave PIX (telefone):</p>
                    <div className="pix-chave">
                        <span>(81) 99566-6335</span>
                        <button onClick={() => {
                            navigator.clipboard.writeText('81996498803')
                            alert('✅ Chave PIX copiada!')
                        }}>
                            📋 Copiar
                        </button>
                    </div>
                    <p className="pix-aviso">⚠️ Após pagar, envie o comprovante no WhatsApp!</p>
                </div>
            )}

            {/* DINHEIRO */}
            {pagamento === 'dinheiro' && (
                <input placeholder="Troco para quanto?" value={troco} onChange={e => setTroco(e.target.value)} />
            )}

            {/* TOTAL */}
            <div className="carrinho-total">
                <span>Produtos:</span>
                <span>R$ {totalProdutos.toFixed(2)}</span>
            </div>
            {tipoEntrega === 'entrega' && (
                <div className="carrinho-total">
                    <span>Entrega:</span>
                    <span>R$ {taxaEntrega.toFixed(2)}</span>
                </div>
            )}
            <div className="carrinho-total total-final">
                <span>Total:</span>
                <span className="total-valor">R$ {totalFinal.toFixed(2)}</span>
            </div>

            {/* BOTÃO FINALIZAR */}

            <a
                href={podeFinalizar ? "https://wa.me/5581995666335?text=" + mensagemWhatsApp : '#'}
                onClick={(e) => {
                    if (!podeFinalizar) {
                        e.preventDefault()
                        alert('Preencha todos os campos!')
                    } else {
                        salvarPedido()
                    }
                }}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-wpp"
            >
                📲 Finalizar no WhatsApp
            </a>
        </>
    )
}
        </div >
    )
}

export default Carrinho