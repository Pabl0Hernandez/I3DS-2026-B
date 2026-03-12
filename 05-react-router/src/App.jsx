import { Route, Routes } from 'react-router';
import './App.css';

import Sobre from "./pages/Sobre";
import Home from "./pages/Home";
import Header from './components/header/Header';

function App() {
  return (
    <>
    <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sobre" element={<Sobre />} />
      </Routes>
    </>
  );
}

export default App;
