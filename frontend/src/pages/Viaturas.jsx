import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import api from '../api/client'

export default function Viaturas() {
  const [viaturas, setViaturas] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    async function loadViaturas() {
      try {
        const response = await api.get('/vehicles')
        setViaturas(response.data.data ?? response.data)
      } catch (error) {
        console.error(error)
        setError('Nao foi possivel carregar as viaturas.')
      } finally {
        setLoading(false)
      }
    }

    loadViaturas()
  }, [])

  if (loading) {
    return <p className="text-sm text-slate-600">Carregando viaturas...</p>
  }

  if (error) {
    return (
      <p className="rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
        {error}
      </p>
    )
  }

  return (
    <div>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">
            Viaturas
          </h1>

          <p className="mt-2 text-sm text-slate-600">
            Listagem de viaturas cadastradas no sistema.
          </p>
        </div>

        <Link
          to="/viaturas/nova"
          className="w-fit rounded-md bg-blue-700 px-4 py-2 text-sm font-medium text-white hover:bg-blue-800"
        >
          Nova viatura
        </Link>
      </div>

      <div className="mt-6 overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-50 text-slate-600">
            <tr>
              <th className="px-6 py-3 font-medium">ID</th>
              <th className="px-6 py-3 font-medium">Codigo</th>
              <th className="px-6 py-3 font-medium">Status</th>
              <th className="px-6 py-3 font-medium">Ativa</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-200">
            {viaturas.map((vehicle) => (
              <tr key={vehicle.id}>
                <td className="px-4 py-3 text-slate-700">
                  {vehicle.id}
                </td>

                <td className="px-4 py-3 text-slate-700">
                  {vehicle.code}
                </td>

                <td className="px-4 py-3 text-slate-700">
                  {vehicle.status}
                </td>

                <td className="px-4 py-3 text-slate-700">
                  {vehicle.active ? 'Sim' : 'Nao'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
