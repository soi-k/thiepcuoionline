import { Routes, Route } from 'react-router-dom'
import { WeddingConfigProvider } from './hooks/useWeddingConfig.jsx'
import InvitationPage from './pages/InvitationPage.jsx'
import GeneratorPage from './pages/GeneratorPage.jsx'
import SettingsPage from './pages/SettingsPage.jsx'

function App() {
  return (
    <WeddingConfigProvider>
      <Routes>
        <Route path="/" element={<InvitationPage />} />
        <Route path="/tao-thiep" element={<GeneratorPage />} />
        <Route path="/tuy-chinh" element={<SettingsPage />} />
      </Routes>
    </WeddingConfigProvider>
  )
}

export default App
