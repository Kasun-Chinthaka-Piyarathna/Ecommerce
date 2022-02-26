import React from 'react';
import {Link} from 'react-router-dom';
import {MdShoppingCart} from 'react-icons/md';
import '../../App.css';

export default function Header() {
    return (
        <div className="Header">
            <Link to="/">
                <h1>LAPTOP HUB</h1>
            </Link>
            <div className="Cart">
                <Link to="/cart">
                    <div>
                        <strong>My cart</strong>
                    </div>
                    <MdShoppingCart size={36} color="#FFFFFF"/>
                </Link>
            </div>
        </div>
    );
}
