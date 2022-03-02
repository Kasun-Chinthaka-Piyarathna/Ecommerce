import React, {useContext, useState} from 'react';
import './style.css';
import {addToCart, CartDispatchContext} from "../../contexts/cart";
import {getPrice} from "../../utils/general";

export default function Product({data}) {

    const dispatch = useContext(CartDispatchContext);
    const [isAdded, setIsAdded] = useState(false);

    function handleProduct() {
        const product = {...data, quantity: 1};
        addToCart(dispatch, product);
        setIsAdded(true);
        setTimeout(() => {
            setIsAdded(false);
        }, 1500);
    };

    return (
        <div key={data.id}>
            <li className="cart-item" key={data.id}>
                <img className="cart-item-img" src={data.image} alt={data.laptop}/>
                <strong className="cart-item-title">{data.laptop}</strong>
                <span className="span">{getPrice(data.price)}</span>
                <button className={!isAdded ? "cart-item-button" : "cart-item-button-clicked"} type="button"
                        onClick={() => handleProduct()}>
                    <span className="cart-item-span"> {!isAdded ? "ADD TO CART" : "✔ ADDED"}</span>
                </button>
            </li>
        </div>
    );
}
