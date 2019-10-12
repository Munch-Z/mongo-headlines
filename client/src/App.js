import * as React from 'react';
import './App.css';
import ArticleWrapper from './Components/ArticleWrapper';
import {BrowserRouter, Switch, Route} from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path='/' exact>
        <ArticleWrapper />
        </Route>
        <Route path='/:articleid/comments'>
          
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
