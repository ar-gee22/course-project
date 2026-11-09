import { Routes, Route } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import NavBar from './NavBar.jsx'
import Footer from './Footer.jsx'
import HomePage from './HomePage.jsx'
import FilmsPage from './FilmsPage.jsx'

function App() {
  return <div>
      <NavBar />
      <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/films" element={<FilmsPage />} />
      </Routes>
      <Footer />
  </div>;

}

export default App
