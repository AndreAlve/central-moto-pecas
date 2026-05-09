import { createContext, useState, useContext } from 'react'

const CarrinhoContext = createContext()

export function CarrinhoProvider({ children }) {
    const [carrinho, setCarrinho] = useState([])

    function adicionarItem(peca) {
        setCarrinho(prev => {
            const existe = prev.find(item => item.id === peca.id)
            if (existe) {
                return prev.map(item =>
                    item.id === peca.id
                        ? { ...item, quantidade: item.quantidade + 1 }
                        : item
                )
            }
            return [...prev, { ...peca, quantidade: 1 }]
        })
    }

    function removerItem(id) {
        setCarrinho(prev => prev.filter(item => item.id !== id))
    }

    function totalItens() {
        return carrinho.reduce((soma, item) => soma + item.quantidade, 0)
    }

    return (
        <CarrinhoContext.Provider value={{ carrinho, adicionarItem, removerItem, totalItens }}>
            {children}
        </CarrinhoContext.Provider>
    )
}

export function useCarrinho() {
    return useContext(CarrinhoContext)
}