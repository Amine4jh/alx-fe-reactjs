import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Home from './components/Home'
import About from './components/About'
import Services from './components/Services'
import Contact from './components/Contact'
import Navbar from './components/Navbar'
import './App.css'

// const router = BrowserRouter([
//   {path:"/",element:<Home/>},
//   {path:"/about",element:<About/>},
//   {path:"/services",element:<Services/>},
//   {path:"/contact",element:<Contact/>}
// ])

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
