import { BrowserRouter, Routes, Route } from 'react-router-dom';
import BinaryHunt from './components/BinaryHunt';
import CodeReveal from './components/CodeReveal';
import QRGenerator from './components/QRGenerator';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<BinaryHunt />} />
        <Route path="/reveal/:id" element={<CodeReveal />} />
        <Route path="/qr-generator" element={<QRGenerator />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
