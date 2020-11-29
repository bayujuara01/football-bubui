import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';

import '../styles/index.css';
import "materialize-css/dist/css/materialize.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

import Nav from './components/Nav';
import Footer from './components/Footer';

import Home from './pages/Home';
import Klasemen from './pages/Klasemen';
import Jadwal from './pages/Jadwal';
import Favorit from './pages/Favorit';
import DetailMatch from './pages/DetailMatch';

// console.log(logo)

class App extends React.Component {
  render(){
    return <Router >
      <Nav />
        <Switch>
          <Route path="/" component={Home} exact></Route>
          <Route path="/klasemen" component={Klasemen}></Route>
          <Route path="/jadwal" component={Jadwal}></Route>
          <Route path="/favorit" component={Favorit}></Route>
          <Route path="/match" component={DetailMatch} />
        </Switch>
      <Footer />
      </Router>;
  }
}

export default App;