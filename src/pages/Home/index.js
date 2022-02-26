import React, {useState, useEffect} from 'react';
import {stockAvailable} from "../../data";
import { MdShoppingCart } from 'react-icons/md';

export default function Home() {

    function handleProduct(id) {
    };

    useEffect(() => {
    });

    return (
        <div className="Container">
            {stockAvailable.map((data, key) => {
                console.log(data);
                return (
                    <div key={key}>
                        <li className="cartItem" key={data.id}>
                            <img className="cartItemImg" src={data.image} alt={data.laptop}/>
                            <strong className="cartItemTitle">{data.laptop}</strong>
                            <button className="cartItemButton" type="button" onClick={() => handleProduct(data.id)}>
                                <div className="cartItemFooter">
                                    <MdShoppingCart size={16} color="#FFF" />
                                    0
                                </div>
                                <span className="cartItemSpan">Add to cart</span>
                            </button>
                        </li>
                    </div>
                );
            })}
        </div>
    );
}
