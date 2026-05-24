import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Home from './pages/Home'
import Shield from './pages/Shield'
import Breath from './pages/Breath'
import Deeds from './pages/Deeds'
import Solidarity from './pages/Solidarity'

export default function App() {
  return (
    <BrowserRouter>
      <div style={{ maxWidth: 480, margin: '0 auto', minHeight: '100dvh', position: 'relative' }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shield" element={<Shield />} />
          <Route path="/breath" element={<Breath />} />
          <Route path="/deeds" element={<Deeds />} />
          <Route path="/solidarity" element={<Solidarity />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}
