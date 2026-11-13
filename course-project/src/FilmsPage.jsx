import { useState, useEffect } from 'react'
import Modal from 'react-bootstrap/Modal'
import Alert from 'react-bootstrap/Alert'

function FilmsPage() {
    const [films, setFilms] = useState([]) //Elokuvalista
    const [query, setQuery] = useState('') //Hakukentän nykyinen kirjoitus
    const [search, setSearch] = useState('') //Hakusana
    const [page, setPage] = useState(1) //Nykyinen sivu
    const [totalPages, setTotalPages] = useState(1) //Montako sivua yhteensä
    const [loadedFor, setLoadedFor] = useState('') //Mille haulle tulokset on ladattu
    const [selected, setSelected] = useState(null) //Klikattu elokuva
    const [details, setDetails] = useState(null) //Klikatun elokuvan lisätiedot (ohjaaja)

    const requestKey = `${search}|${page}` //Hakusana + sivunumero
    const loading = loadedFor !== requestKey //Lataus on kesken, kun ladattu haku ei vastaa haluttua hakua
    const [error, setError] = useState(null)
    const [detailsError, setDetailsError] = useState(false)

    useEffect(() => {
        const key = import.meta.env.VITE_TMDB_KEY
        const endpoint = search ? 'search/movie' : 'movie/popular' //Hakusanalla haku tai muuten suositut elokuvat
        let url = `https://api.themoviedb.org/3/${endpoint}?api_key=${key}&page=${page}`
        if (search) url += `&query=${encodeURIComponent(search)}` //Muuttaa erikoismerkit kelpoisiksi

        let ignore = false

        async function loadFilms() {
            try {
                const res = await fetch(url)
                if (!res.ok) throw new Error(`TMDB responded with ${res.status}`)
                const data = await res.json()
                if (ignore) return

                setFilms(prev => page === 1 ? data.results : [...prev, ...data.results])
                setTotalPages(data.total_pages)
                setError(null)
            } catch (err) {
                if (ignore) return
                console.error(err)
                setError('Could not load films. Try again later.')
            } finally {
                if (!ignore) setLoadedFor (`${search}|${page}`)
            }
        }

        loadFilms()
        return () => { ignore = true } //Tämä estää vanhan, hitaamman haun saapumista uuden jälkeen (ylikirjoittaisi sen)
    }, [search, page])

    //Ohjaajan haku, kun klikataan elokuvasta
    useEffect(() => {
        if (!selected) return

        const key = import.meta.env.VITE_TMDB_KEY
        let ignore = false

        async function loadDetails() {
            try {
                const res = await fetch(`https://api.themoviedb.org/3/movie/${selected.id}?api_key=${key}&append_to_response=credits`)
                if (!res.ok) throw new Error(`TMDB responded with ${res.status}`)
                const data = await res.json()
                if (ignore) return

                setDetails(data)
                setDetailsError(false)
            } catch (err) {
                if (ignore) return
                console.error(err)
                setDetailsError(true)
            }
        }
        
        
        loadDetails()
        return () => { ignore = true }
    }, [selected])

    function handleSubmit(e) {
        e.preventDefault()
        setPage(1)
        setSearch(query.trim())
    }

    //Näytetään ohjaaja vasta, kun haettu data vastaa valittua elokuvaa
    const detailsReady = selected && details && details.id === selected.id
    const directors = detailsReady
        ? details.credits.crew
            .filter(person => person.job === 'Director')
            .map(person => person.name)
            .join(', ')
        : ''

    const pageStyle = { maxWidth: 1100, margin: '0 auto', padding: '0 40px 40px' }
    const formStyle = { display: 'flex', gap: 10, justifyContent: 'center', marginBottom: 30 }
    const gridStyle = { display: 'flex', flexWrap: 'wrap', gap: 24, justifyContent: 'center' }
    const cardStyle = { width: 180, textAlign: 'center', cursor: 'pointer' }
    const posterStyle = { width: '100%', height: 'auto', borderRadius: 12 }

    return (
        <div style={pageStyle}>
            <title>Films</title>
            <h1 style={{ textAlign: 'center' }}>Browse Films</h1>

            <form onSubmit={handleSubmit} style={formStyle}>
                <input
                    type="text"
                    className="form-control"
                    style={{ maxWidth: 400 }}
                    placeholder="Search for a film..."
                    value={query}
                    onChange={e => setQuery(e.target.value)}
                />
                <button type="submit" className="btn btn-dark">Search</button>
            </form>

            {error && <Alert variant="danger">{error}</Alert>}

            <div style={gridStyle}>
                {films.map(film => (
                    <div key={film.id} style={cardStyle} onClick={() => setSelected(film)}>
                        {film.poster_path && (
                            <img
                                src={`https://image.tmdb.org/t/p/w342${film.poster_path}`}
                                alt={film.title}
                                style={posterStyle}
                            />
                        )}
                        <h4 style={{ fontSize: 16, marginTop: 8 }}>{film.title}</h4>
                        <p>{film.release_date?.slice(0, 4)}</p>
                    </div>
                ))}
            </div>

            {loading && <p style={{ textAlign: 'center' }}>Loading...</p>}

            {!loading && !error && films.length === 0 && (
                <p style={{ textAlign: 'center' }}>No films found.</p>
            )}


            {!loading && page < totalPages && (
                <div style={{ textAlign: 'center', marginTop: 30 }}>
                    <button className="btn btn-dark" onClick={() => setPage(p => p + 1)}>
                        Load more
                    </button>
                </div>
            )}

            {/* Infoikkuna, joka näytetään kun elokuva valitaan */}
            <Modal show={selected !== null} onHide={() => setSelected(null)} centered>
                {selected && (
                    <>
                        <Modal.Header closeButton>
                            <Modal.Title>
                                {selected.title} ({selected.release_date?.slice(0, 4)})
                            </Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <p><strong>Director:</strong> {detailsError ? 'Could not load' : detailsReady ? (directors || 'Unknown') : 'Loading...'}</p>
                            <p style={{ marginTop: 12 }}>
                                {selected.overview || 'No description available.'}
                            </p>
                        </Modal.Body>
                    </>
                )}
            </Modal>
        </div>
    )
}

export default FilmsPage