import { StrictMode } from 'react'
import { MantineProvider } from '@mantine/core';
import { createRoot } from 'react-dom/client'
import '@mantine/core/styles.css';
import '@mantine/dates/styles.css';
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <MantineProvider>
    <StrictMode>
      <App />
    </StrictMode>
  </MantineProvider>
)
