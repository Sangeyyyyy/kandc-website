import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import App from './App.tsx'
import ArchivesPage from './ArchivesPage.tsx'
import WhoWeArePage from './WhoWeArePage.tsx'
import ServicesPage from './ServicesPage.tsx'
import UpcomingEventsPage from './UpcomingEventsPage.tsx'
import TestPage from './TestServicesLayouts.tsx'
import { PageTransition, GlobalLayout } from './SharedComponents.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <GlobalLayout>
        <PageTransition>
          <Routes>
            <Route path="/" element={<App />} />
            <Route path="/who-we-are" element={<WhoWeArePage />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/our-work" element={<ArchivesPage />} />
            <Route path="/upcoming-events" element={<UpcomingEventsPage />} />
            <Route path="/services-test" element={<TestPage />} />
          </Routes>
        </PageTransition>
      </GlobalLayout>
    </BrowserRouter>
  </StrictMode>,
)
