import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import { Root } from './app/router/Root.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Root />
  </StrictMode>,
)
