import CssBaseline from '@mui/material/CssBaseline';
import React, { Suspense, useLayoutEffect, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import MakeGame from './components/MaakGame';
import NoInternet from './components/noInternet';
import Login from './pages/auth/Login';
import CleanupScreen from './pages/CleanupScreen/CleanupScreen';
import Dashboard from './pages/dashboard';
import GameView from './pages/GameView/index.js';
import LanguageView from './pages/LanguageView.js';
import LeaderBoard from './pages/leaderboard';
import NoGame from './pages/NoGame';
import AdminProtected from './pages/protected/AdminProtected';
import Protected from './pages/protected/Protected';
import SelfieAndPostScreen from './pages/SelfieAndPostScreen';
import SplashScreen from './pages/SplashScreen';
import SuspenseFallback from './pages/SuspenseFallback';
import UserInfo from './pages/userinfo/UserInfo.jsx';
import { database } from './utils/firebase.js';
import { useConnected } from './utils/use.js';

const App = () => {
  let is_connected = useConnected(database);

  let [was_connected, set_was_connected] = useState(false);
  useLayoutEffect(() => {
    if (!was_connected) {
      set_was_connected(is_connected);
    }
    document.title = 'Patient 0';
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [is_connected]);

  if (!is_connected) {
    if (!was_connected)
      return (
        <div
          className='height-height'
          style={{ backgroundColor: 'var(--background-color)' }}
        >
          <div style={{ padding: 32 }}>Reconnecting...</div>
        </div>
      );
    return <NoInternet />;
  }

  return (
    <div
      className='height-height'
      style={{ backgroundColor: 'var(--background-color)' }}
    >
      <CssBaseline />
      <Suspense fallback={<SuspenseFallback />}>
        <BrowserRouter>
          <Routes>
            <Route index element={<NoGame />} />
            <Route
              path='score-today'
              element={<LeaderBoard scoreboard={true} to={-1} />}
            />

            <Route
              path='de-kist/login'
              element={
                <Login />
              }
            />
            <Route
              path='de-kist/dashboard'
              element={
                <AdminProtected>
                  <Dashboard />
                </AdminProtected>
              }
            />

            <Route path=':kist_naam/' element={<LanguageView />} />
            <Route path=':kist_naam/:language' element={<MakeGame />} />
            <Route path=':kist_naam/:language/game' element={<MakeGame />} />
            <Route path=':kist_naam/:language/game/:id'>
              <Route index element={<SplashScreen />} />
              <Route path='play' element={<GameView />} />
              <Route path='end/*' element={<Protected />}>
                <Route
                  path='leader-board'
                  element={<LeaderBoard to='../photo-moment' />}
                />
                <Route
                  path='photo-moment'
                  element={<SelfieAndPostScreen to='/cleanup' />}
                />
              </Route>
            </Route>
            <Route path='cleanup' element={<CleanupScreen to='/' />} />
          </Routes>
        </BrowserRouter>
      </Suspense>
    </div>
  );
};

export default App;
