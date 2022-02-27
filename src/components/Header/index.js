import React, {useContext} from 'react';
import {Link} from 'react-router-dom';
import '../../App.css';
import './style.css';
import {CartStateContext} from "../../contexts/cart";
import {MdShoppingCart} from "react-icons/md";
import {useNavigate} from "react-router-dom";


export default function Header() {
    const {items: cartItems} = useContext(CartStateContext);
    let navigate = useNavigate();
    const itemsInCart = cartItems.length;
    const cartTotal = cartItems
        .map((item) => item.price * item.quantity)
        .reduce((prev, current) => prev + current, 0);
    const cartQuantity = cartItems
        .map((item) => item.quantity)
        .reduce((prev, current) => prev + current, 0);

    const handleCartButton = (event) => {
        event.preventDefault();
        navigate("/checkout");
    };

    return (
        <div className="Header">
            <Link to="/">
                <h1>LAPTOP HUB</h1>
            </Link>
            <div className="Cart">
                <div className="cart-info">
                    <table>
                        <tbody>
                        <tr>
                            <td>No. of items</td>
                            <td>:</td>
                            <td>
                                <strong>{itemsInCart}</strong>
                            </td>
                        </tr>
                        <tr>
                            <td>No. of Quantity</td>
                            <td>:</td>
                            <td>
                                <strong>{cartQuantity}</strong>
                            </td>
                        </tr>
                        <tr>
                            <td>Sub Total</td>
                            <td>:</td>
                            <td>
                                <strong>{cartTotal}</strong>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </div>
                <a className="cart-icon" href="#" onClick={handleCartButton}>
                    <MdShoppingCart size={48} color="#FFF"/>
                </a>
            </div>
        </div>
    );
}
