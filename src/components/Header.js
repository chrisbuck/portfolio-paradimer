import React from 'react';
import { Link, NavLink } from  'react-router-dom';
import { connect } from 'react-redux';
import { startLogout} from '../actions/auth';

const Header = ({ startLogout }) => (
    <header className="header">
        <div className="content-container">
            <div className="header__content">
                <Link className="header__title" to="/dashboard"><h1>Paradimer</h1></Link>
                <button className="button button--link" onClick={startLogout}>Logout</button>
            </div>
        </div>
        <div className="header__nav">
            <div className="content-container">
                <div className="header__nav--links">
                    <NavLink to="/holdings" activeClassName="is-active">Holdings</NavLink>
                    <NavLink to="/prices" activeClassName="is-active">Prices</NavLink>
                    <NavLink to="/trades" activeClassName="is-active">Trades</NavLink>
                </div>
            </div>
        </div>
    </header>
);

/*
<NavLink to="/dashboard" activeClassName="is-active">Dashboard</NavLink>
*/

const mapDispatchToProps = (dispatch) => ({
    startLogout: () => dispatch(startLogout())
});

export default connect(undefined, mapDispatchToProps)(Header);