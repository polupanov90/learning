import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {CssBaseline} from "@mui/material";
import App from './App.tsx'
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';


createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <CssBaseline enableColorScheme />
      <App />
  </StrictMode>,
)
