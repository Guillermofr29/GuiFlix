import { useState, useEffect } from 'react'
import MovieSkeleton from './components/MovieSkeleton'
import './App.css'
import 'react-loading-skeleton/dist/skeleton.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch, faTimes } from '@fortawesome/free-solid-svg-icons'

function App() {
  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [searchResults, setSearchResults] = useState([])
  const [isSearching, setIsSearching] = useState(false)
  const [selectedMovie, setSelectedMovie] = useState(null)
  const [loadingDetails, setLoadingDetails] = useState(false)

  const handleSearch = async (e) => {
    e.preventDefault()
    if (searchTerm) {
      setIsSearching(true)
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/search/movie?api_key=${import.meta.env.VITE_API_KEY}&language=es-ES&query=${searchTerm}`
        )
        const data = await response.json()
        setSearchResults(data.results)
      } catch (error) {
        console.error('Error:', error)
      } finally {
        setIsSearching(false)
      }
    }
  }

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/movie/popular?api_key=${import.meta.env.VITE_API_KEY}&language=es-ES`
        )
        const data = await response.json()
        setMovies(data.results)
        setLoading(false)
      } catch (error) {
        console.error('Ocurrió un error:', error)
        setLoading(false)
      }
    }

    fetchMovies()
  }, [])

  const fetchMovieDetails = async (movieId) => {
    setLoadingDetails(true)
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/movie/${movieId}?api_key=${import.meta.env.VITE_API_KEY}&language=es-ES`
      )
      const data = await response.json()
      setSelectedMovie(data)
    } catch (error) {
      console.error('Error al obtener detalles:', error)
    } finally {
      setLoadingDetails(false)
    }
  }

  // Renderizar skeletons
  const renderSkeletons = () => {
    return Array(8).fill(0).map((_, index) => (
      <MovieSkeleton key={index} />
    ))
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl text-red-600 font-bold text-center mb-8">GUIFLIX</h1>
      <form onSubmit={handleSearch} className="mb-8">
        <div className="flex gap-2 max-w-xl mx-auto">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Buscar películas..."
            className="flex-1 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500"
          />
          <button
            type="submit"
            className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors flex items-center gap-2"
          >
            <FontAwesomeIcon icon={faSearch} />
          </button>
        </div>
      </form>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {(loading || isSearching) ? (
          renderSkeletons()
        ) : searchResults.length > 0 || !searchTerm ? (
          // Si hay resultados de búsqueda o no hay término de búsqueda, mostrar películas
          (searchResults.length > 0 ? searchResults : movies).map((movie) => (
            <div 
              key={movie.id} 
              className="bg-white rounded-lg shadow-lg overflow-hidden cursor-pointer transform hover:scale-105 transition-transform"
              onClick={() => fetchMovieDetails(movie.id)}
            >
              <img 
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                className="w-full h-auto"
              />
              <div className="p-4">
                <h2 className="text-xl font-semibold mb-2">{movie.title}</h2>
                <p className="text-gray-600 text-sm mb-2">{movie.release_date}</p>
                <p className="text-gray-700 text-sm line-clamp-3">{movie.overview}</p>
              </div>
            </div>
          ))
        ) : (
          // Mensaje de no encontrado
          <div className="col-span-full text-center py-10">
            <h2 className="text-2xl font-semibold text-gray-600 mb-2">
              No se encontraron películas
            </h2>
            <p className="text-gray-500">
              No hay resultados para &quot;{searchTerm}&quot;. Intenta con otra búsqueda.
            </p>
          </div>
        )}
      </div>

      {/* Modal de detalles */}
      {selectedMovie && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto relative">
            <button 
              onClick={() => setSelectedMovie(null)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
            >
              <FontAwesomeIcon icon={faTimes} size="lg" />
            </button>
            {loadingDetails ? (
              <div className="p-8">
                <MovieSkeleton />
              </div>
            ) : (
              <div className="p-6">
                <div className="flex flex-col md:flex-row gap-6">
                  <img 
                    src={`https://image.tmdb.org/t/p/w500${selectedMovie.poster_path}`}
                    alt={selectedMovie.title}
                    className="w-full md:w-1/3 rounded-lg"
                  />
                  <div className="flex-1">
                    <h2 className="text-3xl font-bold mb-4">{selectedMovie.title}</h2>
                    <p className="text-gray-600 mb-4">{selectedMovie.release_date}</p>
                    <p className="text-lg mb-4">{selectedMovie.overview}</p>
                    <div className="space-y-2">
                      <p><span className="font-semibold">Puntuación:</span> {selectedMovie.vote_average}/10</p>
                      <p><span className="font-semibold">Duración:</span> {selectedMovie.runtime} minutos</p>
                      <p><span className="font-semibold">Géneros:</span> {selectedMovie.genres?.map(g => g.name).join(', ')}</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default App
