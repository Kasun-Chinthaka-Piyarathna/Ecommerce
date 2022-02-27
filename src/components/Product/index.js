import React, {useContext} from 'react';
import {MdShoppingCart} from 'react-icons/md';
import '../../App.css';
import {addToCart, CartDispatchContext} from "../../contexts/cart";

export default function Product({data}) {

    const dispatch = useContext(CartDispatchContext);

    function handleProduct() {
        console.log(data);
        const product = {...data, quantity: 1};
        addToCart(dispatch, product);
    };

    return (
        <div key={data.id}>
            <li className="cartItem" key={data.id}>
                <img className="cartItemImg" src={data.image} alt={data.laptop}/>
                <strong className="cartItemTitle">{data.laptop}</strong>
                <button className="cartItemButton" type="button" onClick={() => handleProduct()}>
                    <div className="cartItemFooter">
                        <MdShoppingCart size={16} key={data.id} color="#FFF"/>
                        0
                    </div>
                    <span className="cartItemSpan">Add to cart</span>
                </button>
            </li>
        </div>
    );
}
