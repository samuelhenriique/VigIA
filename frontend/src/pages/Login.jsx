import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../api/client'

export default function Login() {

const navigate = useNavigate()
const [email, setEmail] = useState('')
const [password, setPassword] = useState('')
const [error, setError] = useState('')
const [loading, setLoading] = useState(false)

    useEffect(() => {
        const token = localStorage.getItem('token')

        if (token) {
          navigate('/dashboard')
        }
  }, [navigate])

    async function handleSubmit(event) {
    event.preventDefault()

    setError('')
    setLoading(true)

    try {
        const response = await api.post('/login', { 
            email, password 
        })

        localStorage.setItem('token', response.data.token)
        localStorage.setItem('token_type', response.data.token_type)
        localStorage.setItem('user', JSON.stringify(response.data.user))
        
        navigate('/dashboard')
        
    console.log('Login realizado com sucesso')
    console.log(response.data)
} catch (error) {
    console.error(error)
    setError('E-mail ou senha inválidos. Por favor, tente novamente.')
} finally {
    setLoading(false)
}
    }

    return (
        <main className="min-h-screen bg-slate-100 flex items-center justify-center px-4"> 
        <section className="w-full max-w-md bg-white border border-slate-200 rounded-lg shadow-sm p-8">

            <h1 className="text-3xl font-bold text-slate-900"> 
            Login
            </h1>

            <p className="mt-2 text-sm text-slate-800">
                Acesso ao painel operacional.
            </p>

            <form onSubmit={handleSubmit} className="mt-8 space-y-5">
                <div>
                    <label className="block text-sm font-medium text-slate-700">
                        E-mail
                    </label>

                    <input 
                        type="email"
                        placeholder="admin@vigia.local"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="mt-2 w-full rounded-md border border-slate-300 px-3 py-2 text-sm outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                    />
                </div>

                 <div>
                   <label className="block text-sm font-medium text-slate-700">
                     Senha
                   </label>

                   <input
                     type="password"
                     placeholder="Digite sua senha"
                     value={password}
                     onChange={(e) => setPassword(e.target.value)}
                     className="mt-2 w-full rounded-md border border-slate-300 px-3 py-2 text-sm outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                   />
                 </div>

                {error && (
                     <p className="rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
                     {error}
                     </p>
                 )}                 

                 <button
                   type="submit"
                   disabled={loading}
                   className="w-full rounded-md bg-blue-700 px-4 py-2.5 text-sm font-semibold text-white hover:bg-blue-800 disabled:cursor-not-allowed disabled:bg-blue-400"
                 >
                   {loading ? 'Carregando...' : 'Entrar'}
                 </button>
            </form>
        </section>
        </main>
    )
}