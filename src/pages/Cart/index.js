import React, {useContext} from 'react';
import './style.css';
import '../../App.css';
import {
    MdDelete
} from 'react-icons/md';
import {CartStateContext} from "../../contexts/cart";

export default function Cart() {

    const {items: cartItems} = useContext(CartStateContext);
    const cartTotal = cartItems
        .map((item) => item.price * item.quantity)
        .reduce((prev, current) => prev + current, 0);

    function getSubTotal(product) {
        return product.price * product.quantity;
    }

    return (
        <div className="CartContainer">
            <div className="cartTable">
                <thead className="cartTableHead">
                <tr>
                    <th>PRODUCT</th>
                    <th>QTD</th>
                    <th>SUBTOTAL</th>
                </tr>
                </thead>
                <tbody className="cartTableBody">
                {cartItems.map(product => (
                    <tr>
                        <td>
                            <img className="imagePreview"
                                 src={product.image}
                                 alt={product.laptop}
                            />
                        </td>
                        <td>
                            <strong>{product.laptop}</strong>
                            <span>{product.price}</span>
                        </td>
                        <td>
                            <strong>{product.quantity}</strong>
                        </td>
                        <td/>
                        <td>
                            <strong>{getSubTotal(product)}</strong>
                        </td>
                        <td>
                            <button type="button">
                                <MdDelete size={20} color="#7159c1"/>
                            </button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </div>

            <footer className="cartPageFooter">
                <div className="Total">
                    <span className="TotalTitle">TOTAL</span>
                    <strong className="TotalAmount">{cartTotal}</strong>
                </div>
            </footer>
        </div>
    );
}
