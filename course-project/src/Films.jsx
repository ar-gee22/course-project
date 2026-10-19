import { useState, useEffect } from 'react'

function Films(props) {
    const [films, setFilms] = useState([])

    useEffect(() => {
        const key = import.meta.env.VITE_TMDB_KEY

        Promise.all(
            props.titles.map(title =>
                fetch(`https://api.themoviedb.org/3/search/movie?api_key=${key}&query=${encodeURIComponent(title)}`)
                    .then(res => res.json())
                    .then(data => data.results[0])
            )
        )
            .then(results => setFilms(results.filter(Boolean)))
            .catch(err => console.error(err))

    }, [])

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
        <div style={listStyle}> 
            {films.map(film => (
                <div key={film.id} style={cardStyle}>
                    <img src= {`https://image.tmdb.org/t/p/w342${film.poster_path}`} 
                    alt={film.title}
                    style={posterStyle}
                    />
                    <p>{film.title} ({film.release_date?.slice(0,4)})</p>
                    
                </div>
            ))}
        </div>

    )

}

export default Films