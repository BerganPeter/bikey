import React from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";


// Pages
import Home from "./pages/home"
import Error from "./pages/error";
import Bikes from "./pages/bikes";
import Cart from "./pages/cart";
import Checkout from "./pages/checkout";
import BikeDetails from "./pages/bikedetail";
import Admin from './pages/admin';

// Components
import Header from "./components/Header"




const App = () => {
  return (
    <Router>
      <Header />
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/cart">
          <Cart />
        </Route>
        <Route path="/checkout">
          <Checkout />
        </Route>
        <Route exact path="/bikes">
          <Bikes />
        </Route>
        <Route 
        path="/bikes/:id"
        children={<BikeDetails></BikeDetails>}>
          <BikeDetails />
        </Route>
        <Route path="/admin">
          <Admin />
        </Route>
        <Route path="*">
          <Error />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
