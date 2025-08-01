import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'
import Home from './components/Home';
import Search from './components/Search';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path='/' element={
            <>
              <Home />
              <div style={{ padding: '1rem' }}>
                <Search />
              </div>
            </>
          }
        />
      </Routes>
    </Router>
  )
}

export default App
