import React, { Suspense } from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import ErrorBoundary from './components/ErrorBoundary'
import { Loader } from './components/Loader'
import './index.css'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <Suspense fallback={<Loader />}>
    <React.StrictMode>
      <BrowserRouter>
        <ErrorBoundary>
          <App />
        </ErrorBoundary>
      </BrowserRouter>
    </React.StrictMode>
  </Suspense>
)
