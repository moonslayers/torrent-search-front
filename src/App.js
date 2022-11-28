import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navigation from './components/Navigation';
import QuickSearch from './components/QuickSearch';
import AdvancedSearch from './components/AdvancedSearch';
import AboutUs from './components/AboutUs';

function App() {
  return (
    <Router>
      <Navigation/>
      <div className="container p-4">
      <Route path="/" exact component={QuickSearch} />
      <Route path="/advanced" component={AdvancedSearch} />
      <Route path="/about" component={AboutUs} />
      </div>
    </Router>
  );
}


export default App;

