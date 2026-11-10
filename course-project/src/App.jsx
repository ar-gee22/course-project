import { Routes, Route } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import NavBar from './NavBar.jsx'
import Footer from './Footer.jsx'
import HomePage from './HomePage.jsx'
import FilmsPage from './FilmsPage.jsx'
import GamePage from './GamePage.jsx'

function App() {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <NavBar />
            <main style={{ flex: 1 }}>
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/films" element={<FilmsPage />} />
                    <Route path="/game" element={<GamePage />} />
                </Routes>
            </main>
            <Footer />
        </div>
    )
}

export default App
