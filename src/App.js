
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import ComparatoreLeadSystem from './pages/ComparatoreLeadSystem';
import Header from './components/Header';
import Risultati from './pages/Risultati';
import Footer from './components/Footer';

function App() {
  return (
    <Router>
      <Header />
        <Routes>
          <Route path="/" element={<ComparatoreLeadSystem />} />
          <Route path="/universita/risultati" element={<Risultati />} />
        </Routes>
      <Footer />  
    </Router>
  );
}

export default App;
