function FilmCard({ film, onClick }) {
    const cardStyle = {
        width: 180,
        textAlign: 'center'
    }

    const posterStyle = {
        width: '100%',
        height: 'auto',
        borderRadius: 12
    }

    const content = (
        <>
            {film.poster_path && (
                <img
                    src={`https://image.tmdb.org/t/p/w342${film.poster_path}`}
                    alt={film.title}
                    style={posterStyle}
                />
            )}
            <h4 style={{fontSize: 16, marginTop: 8}}>{film.title}</h4>
            <p>{film.release_date?.slice(0,4)}</p>
        </>
    )

    if (onClick) {
        return (
            <button
                type="button"
                onClick={()=>onClick(film)}
                style={{...cardStyle, background: 'none', border: 'none', padding: 0, cursor: 'pointer', color: 'inherit'}}
            >{content}</button>
        )
    }
    return <div style={cardStyle}>{content}</div>
}
export default FilmCard