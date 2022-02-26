import React, {useState, useEffect} from 'react';
import {stockData} from "../../data";

export default function Home() {

    function handleProduct(id) {
    };

    useEffect(() => {
    });

    return (
        <div>
            {stockData.map((data, key) => {
                console.log(data);
                return (
                    <div key={key}>
                        <li key={data.id}>
                            <img src={data.image} alt={data.laptop}/>
                            <strong>{data.laptop}</strong>
                            <button type="button" onClick={() => handleProduct(data.id)}>
                                <span>Add to cart</span>
                            </button>
                        </li>
                    </div>
                );
            })}
        </div>
    );
}
