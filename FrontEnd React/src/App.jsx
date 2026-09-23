import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Clientes from './components/Clientes'
import Productos from './components/Productos'
import Ventas from './components/Ventas'
import Menu from './components/menu'

function App() {
    return (
        <BrowserRouter>
            <Menu />
            <Routes>
                <Route path="/" element={<h1>Inicio</h1>} />
                <Route path="/clientes" element={<Clientes />} />
                <Route path="/productos" element={<Productos />} />
                <Route path="/ventas" element={<Ventas />} />
            </Routes>

        </BrowserRouter>
    );
}

export default App; 