function Footer() {
    const style = {
        textAlign: 'center',
        padding: '20px 0',
        marginTop: 40,
        borderTop: '1px solid var(--border)',
        fontSize: 14
    }

    return <footer style={style}>The site uses TMDB API</footer>;
}

export default Footer