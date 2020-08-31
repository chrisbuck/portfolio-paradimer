import React from 'react';
import moment from 'moment';
import numeral from 'numeral';
import Modal from 'react-modal';
import { connect } from 'react-redux';
//import { startEditHolding } from '../actions/holdings';
import { database } from '../firebase/firebase';

const updateIncreaseHolding = (id, uid, qty, basis, basisPrice) => {
    let updates = {
        qty, basis, basisPrice
    };
    return database.ref(`users/${uid}/holdings/${id}`).update(updates).then(()=>{
        console.log('Current Price Edited in Firebase');
    });
};

class Calculator extends React.Component {
    constructor(props){
        super(props);
        let holding = this.props.holding;
        this.state = {
            id: holding.id,
            basis: holding.basis,
            basisPrice: holding.basisPrice,
            qty: holding.qty,
            additionalQty: 0,
            additionalBasis: 0,
            previewQty: 0,
            previewBasis: 0,
            previewBasisPrice: holding.basisPrice,
            visible: false
        };
    }
    onExitButton = (e) => {
        e.preventDefault();
        this.setState({visible: false});
    };
    onPlusButton = (e) => {
        e.preventDefault();
        this.setState({visible: true});
    };

    onQtyChange = (e) => {
        const qty = parseFloat(this.state.qty);
        const additionalQty = parseFloat(e.target.value);
        let previewQty = qty + additionalQty;
        let basis = parseFloat(this.state.basis);
        let basisPrice = this.state.basisPrice;
        if( basis !== '' ){
            basisPrice = basis / qty;
        }
        this.setState({basis, basisPrice, qty, additionalQty, previewQty});
    };
    componentDidMount = () => {
        //let qty = this.state.qty;
    };
    onSubmit = (e) => {
        e.preventDefault();
        let uid = this.props.uid;
        let holding = this.state.holding;
        let id = this.state.id;
        let qty = this.state.qty;
        let basis = this.state.basis;
        let basisPrice = this.state.basisPrice;
        updateIncreaseHolding(id, uid, qty, basis, basisPrice);
        console.log(qty);
    };
    render(){
        const appEl = document.querySelector('#app');
        const isVisible = this.state.visible;

        const qty = this.state.qty;
        const basis = this.state.basis;
        const basisPrice = this.state.basisPrice;

        const id = this.state.id;
        const holding = this.props.holding;

        return (
            <div>
                <i className="far fa-plus-square" onClick={this.onPlusButton}></i>
                <Modal 
                    isOpen={isVisible}
                    contentLabel={"Example Modal"}
                    appElement={appEl}
                >
                    <form className="modal__content" onSubmit={this.onSubmit}>
                        <div className="modal__content--header">
                            <div className="modal__content--header-title">
                                <h2>Calculator</h2>
                            </div>
                            <div className="modal__content--header-exit">
                                <a href="#" onClick={this.onExitButton}><i className="fas fa-times-circle"></i></a>
                            </div>
                        </div>
                        <div className="modal__content--body">
                            <div className="modal__content--body--inputs">
                                <input className="modal__input--qty" type="number" placeholder="Qty" onChange={this.onQtyChange} />
                                <input className="modal__input--basis" type="text" placeholder="Basis" />
                                <input className="modal__input--price" type="text" placeholder="Price" />
                            </div>
                            <div className="modal__content--body--summary">
                                <label><span>Quantity: </span></label><span>{qty}</span>
                                <label><span>Basis: </span></label><span>{basis}</span>
                                <label><span>Basis Price: </span></label><span>{basisPrice}</span>
                            </div>
                        </div>
                        <div className="modal__content--footer">
                            <button>Submit</button>
                        </div>
                    </form>
                </Modal>
            </div>
        );
    };
}

const mapStateToProps = (state) => {
    return {
        uid: state.auth.uid
    };
};

// export default connect(mapStateToProps)(Calculator);
export default connect(mapStateToProps)(Calculator);