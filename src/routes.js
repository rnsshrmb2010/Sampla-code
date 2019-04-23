import React from 'react';

const DefaultLayout = React.lazy(() => import('./views/DefaultLayout'));

const routes = [
  { path: '/', name: 'Home', component: DefaultLayout },
];

export default routes;
