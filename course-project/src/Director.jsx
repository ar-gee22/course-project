

function Director(props) {

    const style = {
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        gap: 20,
        maxWidth: 900,
        margin: '0 auto',
        marginBottom: 50
    }

     const titleStyle = {
        maxWidth: 900,
        margin: '0 auto 24px',
        textTransform: 'uppercase',
        textAlign: 'justify',
        textAlignLast: 'justify',
        letterSpacing: '0.05em'
    }

    const imgStyle = {
        width: 250,
        height: 'auto',
        borderRadius: 16
    }


    return (
        <div>
            <h1 style={titleStyle}>Weekly Visionary</h1>
            <div style={style}>
                <div>
                <h2>{props.name}</h2>
                <p style={{ whiteSpace: 'pre-line' }}>{props.info}</p>
                </div>
                <img src={props.imageUrl} alt={props.imageAlt} style={imgStyle}/>
            </div>
        </div>
    );

}

export default Director;