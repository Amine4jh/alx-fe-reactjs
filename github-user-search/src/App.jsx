import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'
import Home from './components/Home';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home />}/>
        {/* <Route path='/' element={}/> */}
      </Routes>
    </Router>
  )
}

export default App
