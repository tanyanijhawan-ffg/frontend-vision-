import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import App from './App';

import './index.css';

const base = import.meta.env.BASE_URL;

createRoot(document.getElementById('root')!).render(
  <BrowserRouter basename={base.endsWith('/') ? base.slice(0, -1) : base}>
    <App />
  </BrowserRouter>
);
