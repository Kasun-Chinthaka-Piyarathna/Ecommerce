import React, {useEffect} from 'react';
import {stockAvailable} from "../../data";
import {useNavigate} from "react-router-dom";
import Product from "../../components/Product";


export default function Home() {
    let navigate = useNavigate();
    useEffect(() => {
    });

    return (
        <div className="Container">
            {stockAvailable.map((data, key) => {
                return <Product key={data.id} data={data}/>;
            })}
        </div>
    );
}
