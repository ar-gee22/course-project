import { useState, useEffect } from 'react'
import Alert from 'react-bootstrap/Alert'

// Arpoo kaksi eri leffaa, joilla eri arvosanat (siis ei tasureita)
function pickPair(pool) {
    let a, b
    do {
        a = pool[Math.floor(Math.random() * pool.length)]
        b = pool[Math.floor(Math.random() * pool.length)]
    } while (a.id === b.id || a.vote_average === b.vote_average)
    return [a, b]
}

function GamePage() {
    const [pool, setPool] = useState([])       // kaikki haetut elokuvat
    const [pair, setPair] = useState(null)     // kierroksen kaksi elokuvaa
    const [picked, setPicked] = useState(null) // pelaajan valitseman elokuvan id
    const [score, setScore] = useState(0)
    const [best, setBest] = useState(0)
    const [gameOver, setGameOver] = useState(false)
    const [error, setError] = useState(null)

    // Haetaan elokuvat kerran, kun sivu avataan
    useEffect(() => {
        const key = import.meta.env.VITE_TMDB_KEY
        let ignore = false

        async function loadPool() {
            try {
                const results = await Promise.all(
                    [1, 2, 3, 4, 5].map(async p => {
                        const res = await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${key}&language=en-US&vote_count.gte=5000&sort_by=vote_count.desc&page=${p}`)
                        if (!res.ok) throw new Error(`TMDB responded with ${res.status}`)
                        return res.json()
                    })
                )
                if (ignore) return
                const films = results.flatMap(r => r.results).filter(f => f.poster_path)
                setPool(films)
                setPair(pickPair(films))
            } catch (err) {
                if (ignore) return
                console.error(err)
                setError('Could not load the game. Try again later.')
            }
        }

        loadPool()
        return () => {ignore = true}

    }, [])

    function handlePick(film) {
        if (picked !== null) return // vastausta ei voi vaihtaa

        const other = pair.find(f => f.id !== film.id)
        setPicked(film.id)

        if (film.vote_average > other.vote_average) {
            const newScore = score + 1
            setScore(newScore)
            if (newScore > best) setBest(newScore)
        } else {
            setGameOver(true)
        }
    }

    function handleNext() {
        setPair(pickPair(pool))
        setPicked(null)
    }

    function handleRestart() {
        setScore(0)
        setGameOver(false)
        handleNext()
    }

    const pageStyle = { maxWidth: 900, margin: '0 auto', padding: '0 40px 40px', textAlign: 'center' }
    const rowStyle = { display: 'flex', justifyContent: 'center', gap: 40, flexWrap: 'wrap', margin: '30px 0' }

    if (error) return <Alert variant="danger" style={{margin:30}}>{error}</Alert>
    if (!pair) return <p style={{ textAlign: 'center' }}>Loading...</p>

    const higherId = pair[0].vote_average > pair[1].vote_average ? pair[0].id : pair[1].id

    return (
        <div style={pageStyle}>
            <title>Higher or Lower Game</title>
            <h1>Higher or Lower</h1>
            <p>Which film has the higher rating on TMDB?</p>
            <p>Score: {score} | Best: {best}</p>

            <div style={rowStyle}>
                {pair.map(film => {
                    const revealed = picked !== null
                    let border = '4px solid transparent'
                    if (revealed && film.id === higherId) border = '4px solid #2e9e4f'
                    else if (revealed && film.id === picked) border = '4px solid #d63c3c'

                    return (
                        <button
                            key={film.id}
                            onClick={() => handlePick(film)}
                            style={{ background: 'none', border: 'none', padding: 0, width: 260, cursor: revealed ? 'default' : 'pointer' }}
                        >
                            <img
                                src={`https://image.tmdb.org/t/p/w500${film.poster_path}`}
                                alt={film.title}
                                style={{ width: '100%', borderRadius: 12, border }}
                            />
                            <h4 style={{ fontSize: 18, marginTop: 10 }}>{film.title}</h4>
                            <p style={{ fontSize: 28, minHeight: 40 }}>
                                {revealed ? film.vote_average.toFixed(1) : '?'}
                            </p>
                        </button>
                    )
                })}
            </div>

            {picked !== null && !gameOver && (
                <button className="btn btn-dark" onClick={handleNext}>Next</button>
            )}

            {gameOver && (
                <div>
                    <h3>Game over! Final score: {score}</h3>
                    <button className="btn btn-dark" onClick={handleRestart}>Play again</button>
                </div>
            )}
        </div>
    )
}

export default GamePage