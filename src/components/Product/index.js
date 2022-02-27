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
            <li className="cartItem" key={data.id}>
                <img className="cartItemImg" src={data.image} alt={data.laptop}/>
                <strong className="cartItemTitle">{data.laptop}</strong>
                <span className="span">{getPrice(data.price)}</span>
                <button className={!isAdded ? "cartItemButton" : "cartItemButtonClicked"} type="button"
                        onClick={() => handleProduct()}>
                    <span className="cartItemSpan"> {!isAdded ? "ADD TO CART" : "✔ ADDED"}</span>
                </button>
            </li>
        </div>
    );
}
