import { useState, useEffect } from 'react'

function FilmsPage() {
    const [films, setFilms] = useState([]) //Elokuvalista
    const [query, setQuery] = useState('') //Hakukenttän nykyinen kirjoitus
    const [search, setSearch] = useState('') //Hakusana
    const [page, setPage] = useState(1) //Nykyinen sivu
    const [totalPages, setTotalPages] = useState(1) //Montako sivua yhteensä
    const [loadedFor, setLoadedFor] = useState('') //Mille haulle tulokset on ladattu

    const requestKey = `${search}|${page}` //Hakusana + sivunumero
    const loading = loadedFor !== requestKey //Lataus on kesken, kun ladattu haku ei vastaa haluttua hakua

    useEffect(() => {
        const key = import.meta.env.VITE_TMDB_KEY
        const endpoint = search ? 'search/movie' : 'movie/popular' //Hakusanalla haku tai muuten suositut elokuvat
        let url = `https://api.themoviedb.org/3/${endpoint}?api_key=${key}&page=${page}`
        if (search) url += `&query=${encodeURIComponent(search)}` //Muuttaa erikoismerkit kelpoisiksi

        let ignore = false

        fetch(url)
            .then(res => res.json())
            .then(data => {
                if (ignore) return
                setFilms(prev => page === 1 ? data.results : [...prev, ...data.results]) //Sivu 1: korvaa lista, muuten uudet vanhojen perään
                setTotalPages(data.total_pages)
                setLoadedFor(`${search}|${page}`)
            })
            .catch(err => console.error(err))

        return () => { ignore = true } //Tämä estää vanhan, hitaamman haun saapumista uuden jälkeen (ylikirjoittaisi sen)
    }, [search, page])

    function handleSubmit(e) {
        e.preventDefault()
        setPage(1)
        setSearch(query.trim())
    }

    const pageStyle = { maxWidth: 1100, margin: '0 auto', padding: '0 40px 40px' }
    const formStyle = { display: 'flex', gap: 10, justifyContent: 'center', marginBottom: 30 }
    const gridStyle = { display: 'flex', flexWrap: 'wrap', gap: 24, justifyContent: 'center' }
    const cardStyle = { width: 180, textAlign: 'center' }
    const posterStyle = { width: '100%', height: 'auto', borderRadius: 12 }

    return (
        <div style={pageStyle}>
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

            <div style={gridStyle}>
                {films.map(film => (
                    <div key={film.id} style={cardStyle}>
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

            {!loading && page < totalPages && (
                <div style={{ textAlign: 'center', marginTop: 30 }}>
                    <button className="btn btn-dark" onClick={() => setPage(p => p + 1)}>
                        Load more
                    </button>
                </div>
            )}
        </div>
    )
}

export default FilmsPage