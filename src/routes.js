import React from 'react';
import { Navigate } from 'react-router-dom';
import { OAuthCallback } from '@carto/react/oauth';
import Main from 'components/views/Main';
import NotFound from 'components/views/NotFound';
import Aoi from 'components/views/Aoi.js';
// [hygen] Import views

const routes = [
  {
    path: '/',
    element: <Main />,
    children: [
      // { path: '/', element: <Navigate to='/<your default view>' /> },
      { path: '/aoi', element: <Aoi /> },

      // [hygen] Add routes
    ],
  },
  { path: '/oauthCallback', element: <OAuthCallback /> },
  { path: '404', element: <NotFound /> },
  { path: '*', element: <Navigate to='/404' /> },
];

export default routes;
