import React, {useContext, useEffect, useState} from 'react';
import './style.css';
import {MdDelete} from 'react-icons/md';
import {CartDispatchContext, CartStateContext, clearCart, removeFromCart} from "../../contexts/cart";
import {useNavigate} from 'react-router-dom';
import {getPrice} from "../../utils/general";

export default function Cart() {
    const {items: cartItems} = useContext(CartStateContext);
    const dispatch = useContext(CartDispatchContext);
    const cartTotal = cartItems
        .map((item) => item.price * item.quantity)
        .reduce((prev, current) => prev + current, 0);
    let navigate = useNavigate();

    const [inputValues, setInputValue] = useState({
        firstName: "",
        lastName: "",
        phoneNumber: "",
        street: "",
        city: "",
        state: "",
        postalCode: "",
        country: "",
        cardholderName: "",
        cardNumber: "",
        expiration: "",
        securityCode: ""
    });

    const [validation, setValidation] = useState({
        firstName: "",
        lastName: "",
        phoneNumber: "",
        street: "",
        city: "",
        state: "",
        postalCode: "",
        country: "",
        cardholderName: "",
        cardNumber: "",
        expiration: "",
        securityCode: ""
    });

    function handleChange(event) {
        const {name, value} = event.target;
        setInputValue({...inputValues, [name]: value});
    }

    const checkValidation = () => {
        let validateFailed = false;
        let errors = validation;

        if (!inputValues.firstName.trim()) {
            errors.firstName = "First Name is required";
            validateFailed = true;
        } else {
            errors.firstName = "";

        }

        if (!inputValues.lastName.trim()) {
            errors.lastName = "Last name is required";
            validateFailed = true;
        } else {
            errors.lastName = "";
        }

        if (!inputValues.phoneNumber.trim()) {
            errors.phoneNumber = "Phone Number is required";
            validateFailed = true;
        } else {
            errors.phoneNumber = "";
        }

        if (!inputValues.street.trim()) {
            errors.street = "Door No. & Street is required";
            validateFailed = true;
        } else {
            errors.street = "";
        }

        if (!inputValues.city.trim()) {
            errors.city = "City is required";
            validateFailed = true;
        } else {
            errors.city = "";
        }

        if (!inputValues.state.trim()) {
            errors.state = "State is required";
            validateFailed = true;
        } else {
            errors.state = "";
        }

        if (!inputValues.postalCode.trim()) {
            errors.postalCode = "ZIP/Postal code is required";
            validateFailed = true;
        } else {
            errors.postalCode = "";
        }

        if (!inputValues.country.trim()) {
            errors.country = "Country is required";
            validateFailed = true;
        } else {
            errors.country = "";
        }

        if (!inputValues.cardholderName.trim()) {
            errors.cardholderName = "CardHolder Name is required";
            validateFailed = true;
        } else {
            errors.cardholderName = "";
        }

        if (!inputValues.cardNumber.trim()) {
            errors.cardNumber = "Card Number is required";
            validateFailed = true;
        } else if (isNaN(inputValues.cardNumber)) {
            errors.cardNumber = "All Characters should be numeric";
            validateFailed = true;
        } else if (inputValues.cardNumber.length !== 16) {
            errors.cardNumber = "Card Number Length is wrong";
            validateFailed = true;
        } else {
            errors.cardNumber = "";
        }

        if (!inputValues.expiration.trim()) {
            errors.expiration = "Expiration DD/YY is required";
            validateFailed = true;
        } else {
            errors.expiration = "";
        }

        if (!inputValues.securityCode.trim()) {
            errors.securityCode = "Security Code is required";
            validateFailed = true;
        } else {
            errors.securityCode = "";
        }

        if (!validateFailed) {
            setDisable(false);
        } else {
            setDisable(true);
        }

        setValidation(errors);
    };

    useEffect(() => {
        checkValidation();
    }, [inputValues]);


    const [disable, setDisable] = useState(true);

    function getSubTotal(product) {
        return product.price * product.quantity;
    }

    function removeProduct(productId) {
        return (window.confirm('Are you sure you wish to remove this item?')) ? removeFromCart(dispatch, productId) : false;
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        //clear cart
        clearCart(dispatch);
        if (inputValues.cardNumber.includes("1234")) {
            //simulate order failure
            navigate('/order-status', {
                state: {
                    name: inputValues.firstName + " " + inputValues.lastName,
                    status: false
                }
            });
        } else {
            //simulate order success
            navigate('/order-status', {
                state: {
                    name: inputValues.firstName + " " + inputValues.lastName,
                    status: true
                }
            });
        }

    };


    return (
        <div>
            <div className="cart-container">
                <div className="cart-table-div">
                    <table>
                        <tr>
                            <th>PRODUCT</th>
                            <th>DESCRIPTION</th>
                            <th>AMOUNT</th>
                            <th>SUB TOTAL</th>
                            <th>ACTION</th>
                        </tr>
                        {cartItems.map(product => (
                            <tr>
                                <td className="cart-table-data">
                                    <img className="image-preview"
                                         src={product.image}
                                         alt={product.laptop}
                                    />
                                </td>
                                <td>
                                    <strong className="cart-table-text-strong">{product.laptop}</strong>
                                    <span className="cart-table-text-span">{getPrice(product.price)}</span>
                                </td>
                                <td className="cart-table-data">
                                    <strong className="cart-table-text-strong">{product.quantity}</strong>
                                </td>
                                <td className="cart-table-data">
                                    <strong className="cart-table-text-strong">{getPrice(getSubTotal(product))}</strong>
                                </td>
                                <td className="cart-table-data">
                                    <button type="button" onClick={() => removeProduct(product.id)}>
                                        <MdDelete size={20} color="#7159c1"/>
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </table>
                </div>

                <footer className="cart-page-footer">
                    <div className="total">
                        <span className="total-title">TOTAL</span>
                        <strong className="total-amount">{getPrice(cartTotal)}</strong>
                    </div>
                </footer>
            </div>
            <div>
                <form onSubmit={handleSubmit}>

                    <div className="order-information-form">
                        <label className="form-title">CHECKOUT</label>
                        <div className="grid-container">
                            <div className="grid-input">
                                <input type="text"
                                       name='firstName'
                                       value={inputValues.firstName}
                                       placeholder="First Name"
                                       required
                                       className="form-input"
                                       onChange={(e) => handleChange(e)}/>
                                {validation.firstName && <p className="error-msg">{validation.firstName}</p>}
                            </div>
                            <div className="grid-input">
                                <input type="text"
                                       name='lastName'
                                       value={inputValues.lastName}
                                       placeholder="Last Name"
                                       required
                                       className="form-input"
                                       onChange={(e) => handleChange(e)}/>
                                {validation.lastName && <p className="error-msg">{validation.lastName}</p>}
                            </div>
                            <div className="grid-input">
                                <input type="text"
                                       name='phoneNumber'
                                       value={inputValues.phoneNumber}
                                       placeholder="Phone Number"
                                       required
                                       className="form-input"
                                       onChange={(e) => handleChange(e)}/>
                                {validation.phoneNumber && <p className="error-msg">{validation.phoneNumber}</p>}
                            </div>
                            <div className="grid-input">
                                <input type="text"
                                       name='street'
                                       value={inputValues.street}
                                       placeholder="Door No. & Street"
                                       required
                                       className="form-input"
                                       onChange={(e) => handleChange(e)}/>
                                {validation.street && <p className="error-msg">{validation.street}</p>}
                            </div>
                            <div className="grid-input">
                                <input type="text"
                                       name='city'
                                       value={inputValues.city}
                                       placeholder="City"
                                       required
                                       className="form-input"
                                       onChange={(e) => handleChange(e)}/>
                                {validation.city && <p className="error-msg">{validation.city}</p>}
                            </div>
                            <div className="grid-input">
                                <input type="text"
                                       name='state'
                                       value={inputValues.state}
                                       placeholder="State"
                                       required
                                       className="form-input"
                                       onChange={(e) => handleChange(e)}/>
                                {validation.state && <p className="error-msg">{validation.state}</p>}
                            </div>
                            <div className="grid-input">
                                <input type="text"
                                       name='postalCode'
                                       value={inputValues.postalCode}
                                       placeholder="ZIP/Postal Code"
                                       required
                                       className="form-input"
                                       onChange={(e) => handleChange(e)}/>
                                {validation.postalCode && <p className="error-msg">{validation.postalCode}</p>}
                            </div>
                            <div className="grid-input">
                                <input type="text"
                                       name='country'
                                       value={inputValues.country}
                                       placeholder="Country"
                                       required
                                       className="form-input"
                                       onChange={(e) => handleChange(e)}/>
                                {validation.country && <p className="error-msg">{validation.country}</p>}
                            </div>
                            <div className="grid-input">
                                <input type="text"
                                       name='cardholderName'
                                       value={inputValues.cardholderName}
                                       placeholder="Card Holder Name"
                                       required
                                       className="form-input"
                                       onChange={(e) => handleChange(e)}/>
                                {validation.cardholderName &&
                                    <p className="error-msg">{validation.cardholderName}</p>}
                            </div>
                            <div className="grid-input">
                                <input type="text"
                                       name='cardNumber'
                                       value={inputValues.cardNumber}
                                       placeholder="Card Number"
                                       required
                                       className="form-input"
                                       onChange={(e) => handleChange(e)}/>
                                {validation.cardNumber && <p className="error-msg">{validation.cardNumber}</p>}
                            </div>
                            <div className="grid-input">
                                <input type="text"
                                       name='expiration'
                                       value={inputValues.expiration}
                                       placeholder="Expiration (mm/yy)"
                                       required
                                       className="form-input"
                                       onChange={(e) => handleChange(e)}/>
                                {validation.expiration && <p className="error-msg">{validation.expiration}</p>}
                            </div>
                            <div className="grid-input">
                                <input type="text"
                                       name='securityCode'
                                       value={inputValues.securityCode}
                                       placeholder="Security Code"
                                       required
                                       className="form-input"
                                       onChange={(e) => handleChange(e)}/>
                                {validation.securityCode && <p className="error-msg">{validation.securityCode}</p>}
                            </div>
                        </div>
                        <input type="submit" className="checkout-btn" disabled={disable} value="Place Order"/>
                    </div>


                </form>
            </div>
        </div>
    )
        ;
}
