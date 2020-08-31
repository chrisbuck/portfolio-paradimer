import React from 'react';
import { connect } from 'react-redux';
import HoldingForm from './HoldingForm';
import { startEditHolding, startRemoveHolding } from '../actions/holdings';

const EditHoldingPage = (props) => {
    console.log(props);
    return(
    <div>
        <div className="page-header">
            <div className="content-container">
                <h1 className="page-header__title">Edit Coin</h1>
            </div>
        </div>
        <div className="content-container">
            <HoldingForm
                holding={props.holding}
                onSubmit={(holding) => {
                    // Dispatch the action to edit the expense
                    props.dispatch(startEditHolding(props.holding.id, holding));
                    // Redirect to the dashboard
                    props.history.push('/holdings');
                    console.log('updated', holding);
                }}
            />
            <button className="button button--secondary" onClick={() => {
                props.dispatch(startRemoveHolding({id: props.holding.id}));
                props.history.push('/holdings');
            }} >Remove Coin</button>
        </div>
    </div>
    )
};

const mapStateToProps = (state, props) => {
    return {
        holding: state.holdings.find((holding) => holding.id === props.match.params.id)
    }
};

export default connect(mapStateToProps)(EditHoldingPage);