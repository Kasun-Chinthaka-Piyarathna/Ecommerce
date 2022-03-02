import './style.css';
import React from 'react';
import {useLocation} from 'react-router-dom';

export default function OrderStatus() {
    const location = useLocation();
    let status = location.state.status;

    return (
        <div className="container">
            {status === true > 0 &&
                <div className="card">
                    <div className="checkmark-parent">
                        <i className="checkmark">✓</i>
                    </div>
                    <h1 className="status">Success</h1>
                    <p className="message">Dear {location.state.name},<br/> We received your purchase
                        request.<br/> we'll be in touch shortly!</p>
                </div>
            }
            {status === false > 0 &&
                <div className="card">
                    <div className="checkmark-parent">
                        <i className="failed-mark">?</i>
                    </div>
                    <h1 className="status">Failed</h1>
                    <p className="message">Dear {location.state.name},<br/> Your payment was not successfully processed.<br/> Please
                        contact our customer support!</p>
                </div>
            }
        </div>
    );
}
