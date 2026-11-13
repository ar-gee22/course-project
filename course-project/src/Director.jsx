

function Director(props) {

    const style = {
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        gap: 20,
        maxWidth: 900,
        margin: '0 auto',
        marginBottom: 50
    }

    const textStyle = {
        flex: '1 1 300px'
    }

     const titleStyle = {
        maxWidth: 900,
        margin: '0 auto 24px',
        textTransform: 'uppercase',
        textAlign: 'justify',
        textAlignLast: 'justify',
        letterSpacing: 'clamp(0.05em, 1.5vw, 0.3em)',
        fontSize: 'clamp(12px, 3vw, 18px)'
    }

    const imgStyle = {
        width: 250,
        maxWidth: '100%',
        height: 'auto',
        borderRadius: 16,
        margin: '0 auto'
    }


    return (
        <div>
            <h1 style={titleStyle}>Weekly Visionary</h1>
            <div style={style}>
                <div style = {textStyle}>
                <h2>{props.name}</h2>
                <p style={{ whiteSpace: 'pre-line' }}>{props.info}</p>
                </div>
                <img src={props.imageUrl} alt={props.imageAlt} style={imgStyle}/>
            </div>
        </div>
    );

}

export default Director;