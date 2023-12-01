import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './Pages/Home/Home';
import CoinPage from './Pages/CoinPage/CoinPage'
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/coins/:id' element={<CoinPage/>} />
        </Routes>
      </BrowserRouter>
      
    </div>
  );
}

export default App;
