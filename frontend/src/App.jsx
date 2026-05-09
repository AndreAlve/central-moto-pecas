import { Routes, Route } from 'react-router-dom'
import Home from './page/Home/index.jsx'
import Catalogo from './page/Catalago/index.jsx'
import Carrinho from './page/Carrinho/index.jsx'
import Login from './page/Login/index.jsx'
import Painel from './page/painel/index.jsx'
import OrdensServico from './page/OrdensServico/index.jsx'
import RotaProtegida from './components/RotaProtegida/index.jsx'
import Clientes from './page/Clientes/index.jsx'
import Moto from './page/Motos/index.jsx'
import Pecas from './page/Pecas/index.jsx'
import Funcionarios from './page/Funcionarios/index.jsx'
import Servicos from './page/Serviços/index.jsx'
import VerServicos from './page/VerServicos/index.jsx'

function App() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/catalogo" element={<Catalogo />} />
            <Route path="/carrinho" element={<Carrinho />} />
            <Route path="/servicos" element={<Servicos />} />
            <Route path="/ver-servicos" element={<VerServicos />} />
            <Route path="/login" element={<Login />} />
            <Route path="/painel" element={
                <RotaProtegida>
                    <Painel />
                    <Moto />
                    <Clientes/>
                    <OrdensServico />
                    <Pecas />
                    <Funcionarios />
                </RotaProtegida>
            } />
            <Route path="/painel/ordens" element={<OrdensServico />}/>
            <Route path="/painel/clientes" element={<Clientes/>}/>
            <Route path="/painel/motos"element={<Moto/>}/>
            <Route path="/painel/pecas"element={<Pecas/>}/>
            <Route path="/painel/funcionarios" element={<Funcionarios/>}/>
        </Routes>
    )
}

export default App