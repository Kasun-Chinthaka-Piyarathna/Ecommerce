import React from 'react';
import {
    MdRemoveCircleOutline,
    MdAddCircleOutline,
    MdDelete,
} from 'react-icons/md';
import {stockAvailable} from "../../data";

export default function Cart() {

    function increment(product) {
    }

    function decrement(product) {
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
                {/*<tbody className="cartTableBody">*/}
                {/*{stockAvailable.map(product => (*/}
                {/*    <tr>*/}
                {/*        <td>*/}
                {/*            <img*/}
                {/*                src={product.image}*/}
                {/*                alt={product.laptop}*/}
                {/*            />*/}
                {/*        </td>*/}
                {/*        <td>*/}
                {/*            <strong>{product.laptop}</strong>*/}
                {/*            <span>{product.priceFormatted}</span>*/}
                {/*        </td>*/}
                {/*        <td>*/}
                {/*            <div>*/}
                {/*                <button type="button" onClick={() => decrement(product)}>*/}
                {/*                    <MdRemoveCircleOutline size={20} color="#7159c1"/>*/}
                {/*                </button>*/}
                {/*                <input type="number" readOnly value={product.price}/>*/}
                {/*                <button type="button" onClick={() => increment(product)}>*/}
                {/*                    <MdAddCircleOutline size={20} color="#7159c1"/>*/}
                {/*                </button>*/}
                {/*            </div>*/}
                {/*        </td>*/}
                {/*        <td/>*/}
                {/*        <td>*/}
                {/*            <strong>{product.subtotal}</strong>*/}
                {/*        </td>*/}
                {/*        <td>*/}
                {/*            <button type="button">*/}
                {/*                <MdDelete size={20} color="#7159c1"/>*/}
                {/*            </button>*/}
                {/*        </td>*/}
                {/*    </tr>*/}
                {/*))}*/}
                {/*</tbody>*/}
            </div>

            <footer className="cartPageFooter">
                <button className="cartFooterButton" type="button">Finish your order</button>

                <div className="Total">
                    <span className="TotalTitle">TOTAL</span>
                    <strong className="TotalAmount">999</strong>
                </div>
            </footer>
        </div>
    );
}
