import { useEffect, useState } from 'react'
import api from '../api/client'
import { Link } from 'react-router-dom'

export default function Ocorrencias() {
  const [ocorrencias, setOcorrencias] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    async function loadOcorrencias() {
      try {
        const response = await api.get('/occurrences')
        setOcorrencias(response.data.data ?? response.data)
      } catch (error) {
        console.error(error)
        setError('Nao foi possivel carregar as ocorrencias.')
      } finally {
        setLoading(false)
      }
    }

    loadOcorrencias()
  }, [])

  if (loading) {
    return <p className="text-sm text-slate-600">Carregando ocorrencias...</p>
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
      <h1 className="text-2xl font-bold text-slate-900">
        Ocorrencias
      </h1>

      <p className="mt-2 text-sm text-slate-600">
        Listagem de ocorrencias cadastradas no sistema.
      </p>

      <div className="mt-6 overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-50 text-slate-600">
            <tr>
              <th className="px-6 py-3 font-medium">ID</th>
              <th className="px-6 py-3 font-medium">Status</th>
              <th className="px-6 py-3 font-medium">Prioridade</th>
              <th className="px-6 py-3 font-medium">Descricao</th>
              <th className="px-6 py-3 font-medium">Acoes</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-200">
            {ocorrencias.map((occurrence) => (
              <tr key={occurrence.id}>
                <td className="px-4 py-3 text-slate-700">
                  {occurrence.id}
                </td>

                <td className="px-4 py-3 text-slate-700">
                  {occurrence.status}
                </td>

                <td className="px-4 py-3 text-slate-700">
                  {occurrence.ai_priority}
                </td>

                <td className="px-4 py-3 text-slate-700">
                  {occurrence.description}
                </td>

                <td className="px-4 py-3">
                  <Link
                    to={`/ocorrencias/${occurrence.id}`}
                    className="font-medium text-blue-700 hover:text-blue-900"
                  >
                    Ver detalhes
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
