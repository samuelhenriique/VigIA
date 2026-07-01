import { useEffect, useMemo, useState } from 'react'
import { CircleMarker, MapContainer, Popup, TileLayer } from 'react-leaflet'
import api from '../api/client'

const mapCenter = [-27.59487, -48.54822]

const occurrenceStatusOptions = [
  { value: 'aberta', label: 'Aberta' },
  { value: 'em_atendimento', label: 'Em atendimento' },
  { value: 'finalizada', label: 'Finalizada' },
  { value: 'cancelada', label: 'Cancelada' },
]

const priorityOptions = [
  { value: 'baixa', label: 'Baixa' },
  { value: 'media', label: 'Media' },
  { value: 'alta', label: 'Alta' },
  { value: 'critica', label: 'Critica' },
]

const vehicleStatusOptions = [
  { value: 'disponivel', label: 'Disponivel' },
  { value: 'em_atendimento', label: 'Em atendimento' },
  { value: 'indisponivel', label: 'Indisponivel' },
  { value: 'manutencao', label: 'Manutencao' },
]

function hasCoordinates(item) {
  return Number.isFinite(Number(item.latitude)) && Number.isFinite(Number(item.longitude))
}

function occurrenceColor(priority) {
  const colors = {
    baixa: '#16a34a',
    media: '#ca8a04',
    alta: '#ea580c',
    critica: '#dc2626',
  }

  return colors[priority] ?? '#2563eb'
}

function vehicleColor(status) {
  const colors = {
    disponivel: '#059669',
    em_atendimento: '#2563eb',
    indisponivel: '#64748b',
    manutencao: '#9333ea',
  }

  return colors[status] ?? '#334155'
}

export default function Mapa() {
  const [occurrences, setOccurrences] = useState([])
  const [vehicles, setVehicles] = useState([])
  const [regions, setRegions] = useState([])
  const [occurrenceTypes, setOccurrenceTypes] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [suggestion, setSuggestion] = useState(null)
  const [suggestionLoading, setSuggestionLoading] = useState(false)
  const [suggestionError, setSuggestionError] = useState('')

  const [filters, setFilters] = useState({
    occurrenceStatus: '',
    priority: '',
    occurrenceTypeId: '',
    regionId: '',
    vehicleStatus: '',
  })

  useEffect(() => {
    async function loadMapData() {
      try {
        const [
          occurrencesResponse,
          vehiclesResponse,
          regionsResponse,
          occurrenceTypesResponse,
        ] = await Promise.all([
          api.get('/occurrences'),
          api.get('/vehicles'),
          api.get('/regions'),
          api.get('/occurrence-types'),
        ])

        setOccurrences(occurrencesResponse.data.data ?? occurrencesResponse.data)
        setVehicles(vehiclesResponse.data.data ?? vehiclesResponse.data)
        setRegions(regionsResponse.data.data ?? regionsResponse.data)
        setOccurrenceTypes(occurrenceTypesResponse.data.data ?? occurrenceTypesResponse.data)
      } catch (error) {
        console.error(error)
        setError('Nao foi possivel carregar os dados do mapa.')
      } finally {
        setLoading(false)
      }
    }

    loadMapData()
  }, [])

  const filteredOccurrences = useMemo(() => {
    return occurrences.filter((occurrence) => {
      const matchesStatus =
        !filters.occurrenceStatus || occurrence.status === filters.occurrenceStatus

      const matchesPriority =
        !filters.priority || occurrence.ai_priority === filters.priority

      const matchesType =
        !filters.occurrenceTypeId ||
        String(occurrence.occurrence_type_id) === filters.occurrenceTypeId

      const matchesRegion =
        !filters.regionId || String(occurrence.region_id) === filters.regionId

      return matchesStatus && matchesPriority && matchesType && matchesRegion
    })
  }, [occurrences, filters])

  const filteredVehicles = useMemo(() => {
    return vehicles.filter((vehicle) => {
      const matchesStatus =
        !filters.vehicleStatus || vehicle.status === filters.vehicleStatus

      const matchesRegion =
        !filters.regionId || String(vehicle.region_id) === filters.regionId

      return matchesStatus && matchesRegion
    })
  }, [vehicles, filters])

  function handleFilterChange(event) {
    const { name, value } = event.target

    setFilters((currentFilters) => ({
      ...currentFilters,
      [name]: value,
    }))
  }

  function clearFilters() {
    setFilters({
      occurrenceStatus: '',
      priority: '',
      occurrenceTypeId: '',
      regionId: '',
      vehicleStatus: '',
    })
  }

  async function handleSuggestVehicle(occurrenceId) {
    setSuggestionLoading(true)
    setSuggestionError('')
    setSuggestion(null)

    try {
      const response = await api.get(`/occurrences/${occurrenceId}/suggest-vehicle`)
      setSuggestion(response.data)
    } catch (error) {
      console.error(error)
      setSuggestionError('Nao foi possivel sugerir uma viatura para esta ocorrencia.')
    } finally {
      setSuggestionLoading(false)
    }
  }

  if (loading) {
    return <p className="text-sm text-slate-600">Carregando mapa...</p>
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
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">
            Mapa operacional
          </h1>

          <p className="mt-2 text-sm text-slate-600">
            Visualizacao geografica de ocorrencias e viaturas.
          </p>
        </div>

        <div className="flex gap-3 text-sm">
          <div className="rounded-md border border-slate-200 bg-white px-3 py-2">
            <span className="font-medium text-slate-900">
              {filteredOccurrences.length}
            </span>{' '}
            ocorrencias
          </div>

          <div className="rounded-md border border-slate-200 bg-white px-3 py-2">
            <span className="font-medium text-slate-900">
              {filteredVehicles.length}
            </span>{' '}
            viaturas
          </div>
        </div>
      </div>

      <section className="mt-6 grid gap-4 rounded-lg border border-slate-200 bg-white p-4 shadow-sm md:grid-cols-3 lg:grid-cols-6">
        <label className="text-sm">
          <span className="mb-1 block font-medium text-slate-700">
            Status ocorrencia
          </span>

          <select
            name="occurrenceStatus"
            value={filters.occurrenceStatus}
            onChange={handleFilterChange}
            className="w-full rounded-md border border-slate-300 px-3 py-2 text-slate-700"
          >
            <option value="">Todos</option>
            {occurrenceStatusOptions.map((status) => (
              <option key={status.value} value={status.value}>
                {status.label}
              </option>
            ))}
          </select>
        </label>

        <label className="text-sm">
          <span className="mb-1 block font-medium text-slate-700">
            Prioridade
          </span>

          <select
            name="priority"
            value={filters.priority}
            onChange={handleFilterChange}
            className="w-full rounded-md border border-slate-300 px-3 py-2 text-slate-700"
          >
            <option value="">Todas</option>
            {priorityOptions.map((priority) => (
              <option key={priority.value} value={priority.value}>
                {priority.label}
              </option>
            ))}
          </select>
        </label>

        <label className="text-sm">
          <span className="mb-1 block font-medium text-slate-700">
            Tipo
          </span>

          <select
            name="occurrenceTypeId"
            value={filters.occurrenceTypeId}
            onChange={handleFilterChange}
            className="w-full rounded-md border border-slate-300 px-3 py-2 text-slate-700"
          >
            <option value="">Todos</option>
            {occurrenceTypes.map((type) => (
              <option key={type.id} value={String(type.id)}>
                {type.name}
              </option>
            ))}
          </select>
        </label>

        <label className="text-sm">
          <span className="mb-1 block font-medium text-slate-700">
            Regiao
          </span>

          <select
            name="regionId"
            value={filters.regionId}
            onChange={handleFilterChange}
            className="w-full rounded-md border border-slate-300 px-3 py-2 text-slate-700"
          >
            <option value="">Todas</option>
            {regions.map((region) => (
              <option key={region.id} value={String(region.id)}>
                {region.name}
              </option>
            ))}
          </select>
        </label>

        <label className="text-sm">
          <span className="mb-1 block font-medium text-slate-700">
            Status viatura
          </span>

          <select
            name="vehicleStatus"
            value={filters.vehicleStatus}
            onChange={handleFilterChange}
            className="w-full rounded-md border border-slate-300 px-3 py-2 text-slate-700"
          >
            <option value="">Todos</option>
            {vehicleStatusOptions.map((status) => (
              <option key={status.value} value={status.value}>
                {status.label}
              </option>
            ))}
          </select>
        </label>

        <div className="flex items-end">
          <button
            type="button"
            onClick={clearFilters}
            className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
          >
            Limpar filtros
          </button>
        </div>
      </section>

      <section className="mt-6 overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm">
        <MapContainer
          center={mapCenter}
          zoom={12}
          scrollWheelZoom
          className="h-[560px] w-full"
        >
          <TileLayer
            attribution='&copy; OpenStreetMap contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {filteredOccurrences.filter(hasCoordinates).map((occurrence) => (
            <CircleMarker
              key={`occurrence-${occurrence.id}`}
              center={[Number(occurrence.latitude), Number(occurrence.longitude)]}
              radius={9}
              pathOptions={{
                color: occurrenceColor(occurrence.ai_priority),
                fillColor: occurrenceColor(occurrence.ai_priority),
                fillOpacity: 0.85,
              }}
            >
              <Popup>
                <div className="space-y-1 text-sm">
                  <p className="font-semibold text-slate-900">
                    {occurrence.code} - {occurrence.title}
                  </p>
                  <p>Status: {occurrence.status}</p>
                  <p>Prioridade: {occurrence.ai_priority ?? 'Nao definida'}</p>
                  <p>Tipo: {occurrence.occurrence_type?.name ?? 'Nao informado'}</p>
                  <p>Regiao: {occurrence.region?.name ?? 'Nao informada'}</p>

                  <button
                    type="button"
                    onClick={() => handleSuggestVehicle(occurrence.id)}
                    className="mt-2 rounded-md bg-blue-600 px-3 py-1.5 text-xs font-medium text-white hover:bg-blue-700"
                  >
                    Sugerir viatura
                  </button>
                </div>
              </Popup>
            </CircleMarker>
          ))}

          {filteredVehicles.filter(hasCoordinates).map((vehicle) => (
            <CircleMarker
              key={`vehicle-${vehicle.id}`}
              center={[Number(vehicle.latitude), Number(vehicle.longitude)]}
              radius={7}
              pathOptions={{
                color: vehicleColor(vehicle.status),
                fillColor: vehicleColor(vehicle.status),
                fillOpacity: 0.85,
                weight: 3,
              }}
            >
              <Popup>
                <div className="space-y-1 text-sm">
                  <p className="font-semibold text-slate-900">
                    {vehicle.code}
                  </p>
                  <p>Equipe: {vehicle.team_name ?? 'Nao informada'}</p>
                  <p>Status: {vehicle.status}</p>
                  <p>Patrulhamento: {vehicle.patrol_type ?? 'Nao informado'}</p>
                  <p>Regiao: {vehicle.region?.name ?? 'Nao informada'}</p>
                </div>
              </Popup>
            </CircleMarker>
          ))}
        </MapContainer>
      </section>

      {suggestionLoading && (
        <p className="mt-4 text-sm text-slate-600">
          Buscando viatura mais proxima...
        </p>
      )}

      {suggestionError && (
        <p className="mt-4 rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {suggestionError}
        </p>
      )}

      {suggestion?.suggested_vehicle && (
        <section className="mt-4 rounded-lg border border-blue-200 bg-blue-50 p-4">
          <h2 className="text-sm font-semibold text-blue-900">
            Viatura sugerida para {suggestion.occurrence.code}
          </h2>

          <div className="mt-3 grid gap-3 text-sm text-blue-900 md:grid-cols-4">
            <p>
              <span className="block font-medium">Viatura</span>
              {suggestion.suggested_vehicle.code}
            </p>

            <p>
              <span className="block font-medium">Equipe</span>
              {suggestion.suggested_vehicle.team_name}
            </p>

            <p>
              <span className="block font-medium">Distancia</span>
              {suggestion.suggested_vehicle.distance_km} km
            </p>

            <p>
              <span className="block font-medium">Chegada estimada</span>
              {suggestion.suggested_vehicle.estimated_arrival_minutes} min
            </p>
          </div>

          <p className="mt-3 text-xs text-blue-800">
            {suggestion.criteria}
          </p>
        </section>
      )}

      <div className="mt-4 flex flex-wrap gap-3 text-xs text-slate-600">
        <span className="rounded-full bg-green-100 px-3 py-1 text-green-800">
          Verde: baixa/disponivel
        </span>
        <span className="rounded-full bg-yellow-100 px-3 py-1 text-yellow-800">
          Amarelo: media
        </span>
        <span className="rounded-full bg-orange-100 px-3 py-1 text-orange-800">
          Laranja: alta
        </span>
        <span className="rounded-full bg-red-100 px-3 py-1 text-red-800">
          Vermelho: critica
        </span>
        <span className="rounded-full bg-blue-100 px-3 py-1 text-blue-800">
          Azul: viatura em atendimento
        </span>
      </div>
    </div>
  )
}
