import { useState, useEffect } from 'react'
import FilmCard from './FilmCard.jsx'

function Films({titles}) {
    const [films, setFilms] = useState([])
    const [error, setError] = useState(null)

    useEffect(() => {
        const key = import.meta.env.VITE_TMDB_KEY
        let ignore = false

        async function loadFilms() {
            try {
                const results = await Promise.all(
                    titles.map(async title => {
                        const res = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${key}&query=${encodeURIComponent(title)}`)
                        if (!res.ok) throw new Error(`TMDB responded with ${res.status}`)
                        const data = await res.json()
                        return data.results[0]
                })
            )
            if (ignore) return
            setFilms(results.filter(Boolean))
            setError(null)
        } catch (err) {
            if (ignore) return
            console.error(err)
            setError('Could not load films. Try again later.')
            }
        }

        loadFilms()
        return () => { ignore =true}
    }, [titles])

    const listStyle = {
        display: 'flex',
        flexWrap: 'wrap',
        gap: 24,
        justifyContent: 'space-between'
    }

    

    return (
        <div>
            {error && <Alert variant="danger">{error}</Alert>}
            <div style={listStyle}> 
                {films.map(film => (
                    <FilmCard key={film.id} film={film} />
                ))}
            </div>
        </div>
    )

}

export default Films