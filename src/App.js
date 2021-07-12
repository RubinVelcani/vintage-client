import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import { signout } from './actions/userActions';
import CartPage from './pages/CartPage';
import HomePage from './pages/HomePage';
import OrderHistoryPage from './pages/OrderHistoryPage';
import OrderPage from './pages/OrderPage';
import PaymentMethodPage from './pages/PaymentMethodPage';
import PlaceOrderPage from './pages/PlaceOrderPage';
import ProductPage from './pages/ProductPage';
import ProfilePage from './pages/ProfilePage';
import RegisterPage from './pages/RegisterPage';
import ShippingAddressPage from './pages/ShippingAddressPage';
import SignInPage from './pages/SignInPage';
import PrivateRoute from './components/PrivateRoute';

function App() {

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  
  const dispatch = useDispatch();
  const signoutHandler = () => {
    dispatch(signout());
  }

  return (
    <BrowserRouter>
      <div className="grid-container">
        <header className="row">
          <Link className="brand" to="/">VintAge</Link>
          <div>
            <Link to="/cart">Cart
              {cartItems.length > 0 && (
                <span className="badge">
                  {cartItems.length}
                </span>
              )}
            </Link>
            {
              userInfo ? (
                <div className="dropdown">
                  <Link to="#">{userInfo.name}<i className="fa fa-caret-down"></i></Link>
                  <ul className="dropdown-content">
                    <li>
                      <Link to="/profile">User Profile</Link>
                    </li>
                    <li>
                      <Link to="/orderhistory">Order History</Link>
                    </li>
                    <li>
                      <Link to="#signout" onClick={signoutHandler}>Sign Out</Link>
                    </li>
                  </ul>
                </div>
              ) :
                (
                  <Link to="/signin">Sign In</Link>
                )
            }
            {
              userInfo && userInfo.isAdmin && (
                <div className="dropdown">
                  <Link to="#admin">Admin {' '} <i className="fa fa-caret-down"></i></Link>
                  <ul className="dropdown-content">
                    <li>
                      <Link to="/dashboard">Dashboard</Link>
                    </li>
                    <li>
                      <Link to="/projectlist">Products</Link>
                    </li>
                    <li>
                      <Link to="/orderlist">Orders</Link>
                    </li>
                    <li>
                      <Link to="/userList">Users</Link>
                    </li>
                  </ul>
                </div>
              )
            }
          </div>
        </header>
        <main>
          <Route path='/cart/:id?' component={CartPage} />
          <Route path='/products/:id' component={ProductPage} />
          <Route path='/register' component={RegisterPage} />
          <Route path='/signin' component={SignInPage} />
          <Route path='/shipping' component={ShippingAddressPage} />
          <Route path='/payment' component={PaymentMethodPage} />
          <Route path='/placeorder' component={PlaceOrderPage} />
          <Route path='/order/:id' component={OrderPage} />
          <Route path='/orderhistory' component={OrderHistoryPage} />
          <PrivateRoute path='/profile' component={ProfilePage} />
          <Route path='/' component={HomePage} exact />
        </main>
        <footer className="row center">
          All rights reserved
        </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;