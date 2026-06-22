import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { GoogleOAuthProvider } from "@react-oauth/google";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import './index.css'
import './App.css'
import App from './App.tsx'
import { Toaster } from 'react-hot-toast'


const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
  <GoogleOAuthProvider
    clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}
  >
    <BrowserRouter>
        <Toaster position="top-center" reverseOrder={false} />
        <QueryClientProvider client={queryClient}>
          <App />
        </QueryClientProvider>
    </BrowserRouter>
  </GoogleOAuthProvider>
)
