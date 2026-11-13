import Director from './Director.jsx'
import Films from './Films.jsx'
import { TypeAnimation } from 'react-type-animation'

const FILM_TITLES = ['There Will Be Blood', 'One Battle After Another', 'Magnolia', 'Phantom Thread']


function HomePage() {

    const pageStyle = {
        textAlign: 'left',
        padding: '0 40px'
    }

    const titleStyle = {
        textAlign: 'center'
    }

    const sStyle = {
        maxWidth: 900,
        margin: '0 auto'
    }

    const hStyle = {
        textTransform: 'uppercase',
        letterSpacing: 'clamp(0.05em, 1.5vw, 0.4em)',
        fontSize: 'clamp(12px, 3vw, 18px)',
        textAlign: 'justify',
        textAlignLast: 'justify'
    }

    const gradientStyle = {
        fontSize: '2em',
        display: 'block',
        marginBottom: 5,
        lineHeight: 1.3,
        paddingBottom: '0.1em',
        background: 'linear-gradient(90deg, #ff512f, #f09819, #dd2476)',
        WebkitBackgroundClip: 'text',
        backgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        color: 'transparent'
    }

    return <div>
        <title>Heavy Film</title>


        <div style={pageStyle}>
            <div  style={titleStyle}>

                <h1><TypeAnimation
                    sequence={['Heavy Film', 2000]}
                    speed={10}
                    repeat={1}
                    style={gradientStyle}
                /></h1>

                <p style={{marginBottom: 50}}>Stories in film, and the artists who make them</p>

            </div>
            <Director
                name="Paul Thomas Anderson"
                info={["Paul Thomas Anderson (born June 26, 1970), also known by his initials PTA, is an American filmmaker. ",
                    "Often described as one of the preeminent filmmakers of his generation, he is the recipient of numerous accolades, including three Academy Awards, ",
                    "three Golden Globe Awards and four BAFTAs, as well as a nomination for a Grammy Award. He is the only person to have won the Academy Award for Best ",
                    "Director and directorial prizes at Europe's three major film festivals: Cannes Film Festival, ",
                    "Venice Film Festival, and the Berlin International Film Festival.",
                    "\n\nHeavy Film recommends Anderson's There Will Be Blood, as it stands to be one of the best American films of the 21st century."
                ]}
                imageUrl="/images/PTA.png"
                imageAlt="Paul Thomas Anderson"
            />
            <div style={sStyle}>
                <h2 style={hStyle}>The Works of Paul Thomas Anderson</h2>
                <Films titles={FILM_TITLES} />
            </div>
        </div>

    </div>;

}

export default HomePage
