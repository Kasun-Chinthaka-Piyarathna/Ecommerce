import React, {useContext} from 'react';
import {Link} from 'react-router-dom';
import {MdShoppingCart} from 'react-icons/md';
import '../../App.css';
import {CartStateContext} from "../../contexts/cart";

export default function Header() {
    const {items: cartItems} = useContext(CartStateContext);
    const cartQuantity = cartItems.length;
    return (
        <div className="Header">
            <Link to="/">
                <h1>LAPTOP HUB</h1>
            </Link>
            <div className="Cart">
                <Link to="/checkout">
                    <div>
                        <strong>My cart</strong>
                    </div>
                    <div>
                        <MdShoppingCart size={36} color="#FFFFFF"/>
                        {cartQuantity}
                    </div>
                </Link>
            </div>
        </div>
    );
}
