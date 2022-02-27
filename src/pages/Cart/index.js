import React, {useContext} from 'react';
import './style.css';
import {MdDelete} from 'react-icons/md';
import {CartDispatchContext, CartStateContext, removeFromCart,} from "../../contexts/cart";

export default function Cart() {

    const {items: cartItems} = useContext(CartStateContext);
    const dispatch = useContext(CartDispatchContext);
    const cartTotal = cartItems
        .map((item) => item.price * item.quantity)
        .reduce((prev, current) => prev + current, 0);

    function getSubTotal(product) {
        return product.price * product.quantity;
    }

    function removeProduct(productId) {
        return removeFromCart(dispatch, productId);
    }

    return (
        <div className="CartContainer">
            <div className="cartTable">
                <thead className="cartTableHead">
                <tr>
                    <th className="cartTableHead">PRODUCT</th>
                    <th className="cartTableHead">DESCRIPTION</th>
                    <th className="cartTableHead">AMOUNT</th>
                    <th className="cartTableHead">SUBTOTAL</th>
                    <th className="cartTableHead">REMOVE</th>
                </tr>
                </thead>
                <tbody className="cartTableBody">
                {cartItems.map(product => (
                    <tr>
                        <td className="cartTableBody">
                            <img className="imagePreview"
                                 src={product.image}
                                 alt={product.laptop}
                            />
                        </td>
                        <td className="cartTableBody">
                            <strong className="cartTableTextStrong">{product.laptop}</strong>
                            <span className="cartTableTextSpan">{product.price}</span>
                        </td>
                        <td className="cartTableBody">
                            <strong className="cartTableTextStrong">{product.quantity}</strong>
                        </td>
                        <td className="cartTableBody">
                            <strong className="cartTableTextStrong">{getSubTotal(product)}</strong>
                        </td>
                        <td className="cartTableBody">
                            <button type="button" onClick={() => removeProduct(product.id)}>
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
