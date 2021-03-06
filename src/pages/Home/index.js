import '../Home/style.css';
import React, {useEffect} from 'react';
import {stockAvailable} from "../../storage/data";
import Product from "../../components/Product";


export default function Home() {
    useEffect(() => {
    });

    return (
        <div className="home-container">
            {stockAvailable.map((data, key) => {
                return <Product key={data.id} data={data}/>;
            })}
        </div>
    );
}
