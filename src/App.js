import React from 'react';

import {Switch, Route} from 'react-router-dom'

import HomePage from './pages/homepage/homepage.component'
import AboutUs from './pages/about-us-page/about-us-page.component'
import Header from './components/header/header.component'

import './App.css';

function App() {
  return (
    <div className="App">
      <Header />
      <Switch>
          <Route exact path='/' component={HomePage} />
          <Route exact path='/onama' component={AboutUs} />
      </Switch>
    </div>
  )
}

export default App;
