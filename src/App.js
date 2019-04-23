import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Provider } from 'mobx-react';
import './App.scss';
import { store } from './stores';
import routes from './routes';

class App extends React.Component {

  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <React.Suspense fallback={'Loading...'}>
            <Switch>
              {
                routes.map((r, i)=>{
                  return r.component ? (
                    <Route exact path={r.path} key={i} render={_ => <r.component />} />
                  ) : (null);
                })
              }
            </Switch>
          </React.Suspense>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;
