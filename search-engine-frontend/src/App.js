import { Routes, Route } from 'react-router-dom';
import './App.css';
import Dashboard from './pages/Admin/Dashboard/Dashboard';
import Login from './pages/Admin/Login/Login';

import Home from './pages/Home/Home'
import SearchResult from  './pages/SearchResult/SearchResult'

function App() {
  const routes = (
    <Routes>
      <Route path="result" element={ <SearchResult />} />
      <Route path="admin-login" element={ <Login />} />
      <Route path="admin-dash" element={ <Dashboard />} />
      <Route path="/" element={ <Home />} />
    </Routes>
  )
  
  return (
    <div className="App">
      { routes }
    </div>
  );
}

export default App;
