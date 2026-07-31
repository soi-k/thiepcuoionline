import { Routes, Route } from 'react-router-dom'
import InvitationPage from './pages/InvitationPage.jsx'
import GeneratorPage from './pages/GeneratorPage.jsx'

function App() {
  return (
    <Routes>
      <Route path="/" element={<InvitationPage />} />
      <Route path="/tao-thiep" element={<GeneratorPage />} />
    </Routes>
  )
}

export default App
