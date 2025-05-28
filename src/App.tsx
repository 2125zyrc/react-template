import { BrowserRouter } from 'react-router-dom'
import { queryClient } from '@/hooks/useApi'
import { QueryClientProvider } from '@tanstack/react-query'
import Router from './router'

import './App.css'

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Router />
      </BrowserRouter>
    </QueryClientProvider>
  )
}

export default App
