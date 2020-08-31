import React from 'react';
//import { BrowserRouter, Route, Switch, Link, NavLink } from 'react-router-dom';
import { Router, Route, Switch, Link, NavLink } from 'react-router-dom';
//import createHistory from 'history';
import * as historyMod from 'history';

//Pages
import AddHoldingPage from '../components/AddHoldingPage';
import AddPricePage from '../components/AddPricePage';
import DashboardPage from '../components/DashboardPage';
import EditHoldingPage from '../components/EditHoldingPage';
import EditPricePage from '../components/EditPricePage';
//import HelpPage from '../components/HelpPage';
import HoldingsPage from '../components/HoldingsPage';
import NotFoundPage from '../components/NotFoundPage';
//import Header from '../components/Header';
import LoginPage from '../components/LoginPage';
import PricesPage from '../components/PricesPage';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';

export const history = historyMod.createBrowserHistory();

const AppRouter = () => (
    <Router history={history}>
        <div>
        <Switch>
            <PublicRoute path="/" component={LoginPage} exact={true} />
            <PrivateRoute path="/dashboard" component={DashboardPage} />
            <PrivateRoute path="/holdings" component={HoldingsPage} exact={true} />
            <PrivateRoute path="/holdings/add" component={AddHoldingPage} exact={true} />
            <PrivateRoute path="/holdings/edit/:id" component={EditHoldingPage} />
            <PrivateRoute path="/prices" component={PricesPage} />
            <PrivateRoute path="/create" component={AddPricePage} />
            <PrivateRoute path="/edit/:id" component={EditPricePage} />
            <Route component={NotFoundPage} />
        </Switch>
        </div>
    </Router>
);
    
export default AppRouter;