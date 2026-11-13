import { useState, useEffect } from 'react'

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

    const cardStyle = {
        width: 200,
        textAlign: 'center'
    }

    const posterStyle = {
        width: '100%',
        height: 'auto',
        borderRadius: 12
    }

    return (
        <div>
            {error && <Alert variant="danger">{error}</Alert>}
            <div style={listStyle}> 
            
                {films.map(film => (
                    <div key={film.id} style={cardStyle}>
                        {film.poster_path && (
                            <img src= {`https://image.tmdb.org/t/p/w342${film.poster_path}`} 
                            alt={film.title}
                            style={posterStyle}
                        />
                        )}
                        <h4 style ={{ fontSize: 16, marginTop: 8 }}> {film.title}</h4>
                        <p>({film.release_date?.slice(0,4)})</p>
                    </div>
                ))}
            </div>
        </div>
    )

}

export default Films