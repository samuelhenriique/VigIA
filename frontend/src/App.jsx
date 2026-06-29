import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import PrivateRoute from './routes/PrivateRoute'
import AppLayout from './layouts/AppLayout'

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
          </Route>
      </Routes>
    </BrowserRouter>
  )
}