import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';

// import * as Sentry from '@sentry/browser';
// import { BrowserTracing } from '@sentry/tracing';
//import { ENVIRONMENT } from './constant/StaticData';
import { AuthContextProvider } from './context/AuthContext';

// Sentry.init({
//   dsn: 'https://5ab4f4089961442d9514d5a0af207172@o1294739.ingest.sentry.io/6519249',
//   integrations: [new BrowserTracing()],
//   tracesSampleRate: 1.0,
//   environment: ENVIRONMENT,
// });

ReactDOM.render(
  <React.StrictMode>
    <AuthContextProvider>
      <App />
    </AuthContextProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
