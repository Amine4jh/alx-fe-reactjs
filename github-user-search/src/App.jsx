import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<h1>Welcome Home!</h1>}/>
        {/* <Route path='/about' element={<h1>About</h1>}/> */}
      </Routes>
    </Router>
  )
}

export default App
