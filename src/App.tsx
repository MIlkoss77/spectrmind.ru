import { Routes, Route } from 'react-router'
import Home from './pages/Home'
import Privacy from './pages/Privacy'
import Terms from './pages/Terms'
import Tools from './pages/Tools'
import { useAnalytics } from './hooks/useAnalytics'

function AnalyticsWrapper({ children }: { children: React.ReactNode }) {
  useAnalytics();
  return <>{children}</>;
}

export default function App() {
  return (
    <AnalyticsWrapper>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/tools" element={<Tools />} />
      </Routes>
    </AnalyticsWrapper>
  )
}
