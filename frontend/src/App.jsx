import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import PrivateRoute from './routes/PrivateRoute'
import AppLayout from './layouts/AppLayout'
import Ocorrencias from './pages/Ocorrencias'
import Viaturas from './pages/Viaturas'
import Mapa from './pages/Mapa'
import Alertas from './pages/Alertas'
import DetalheOcorrencia from './pages/DetalheOcorrencia'
import NovaOcorrencia from './pages/NovaOcorrencia'

export default function App() {
  return (
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
        <Route 
          element={<PrivateRoute>
            <AppLayout />
          </PrivateRoute>
          }>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/ocorrencias" element={<Ocorrencias />} />
            <Route path="/viaturas" element={<Viaturas />} />
            <Route path="/mapa" element={<Mapa />} />
            <Route path="/alertas" element={<Alertas />} />
            <Route path="/ocorrencias/nova" element={<NovaOcorrencia />}/>
            <Route path="/ocorrencias/:id" element={<DetalheOcorrencia />}/>
          </Route>
      </Routes>
    </BrowserRouter>
  )
}
