import React, {useContext, useState, useEffect} from 'react';
import './style.css';
import {MdDelete} from 'react-icons/md';
import {CartDispatchContext, CartStateContext, removeFromCart,clearCart} from "../../contexts/cart";
import {Link,useNavigate} from 'react-router-dom';
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

        if(!validateFailed){
            setDisable(false);
        }else {
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
        return (window.confirm('Are you sure you wish to remove this item?'))? removeFromCart(dispatch, productId):false;
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        //clear cart
        clearCart(dispatch);
        if(inputValues.cardNumber.includes("1234")){
            //simulate order failure
            navigate('/order-status',{state:{name:inputValues.firstName+" "+inputValues.lastName,status:false}});
        }else{
            //simulate order success
            navigate('/order-status',{state:{name:inputValues.firstName+" "+inputValues.lastName,status:true}});
        }

    };


    return (
        <div>
            <div className="CartContainer">
                <div className="cartTable">
                    <thead className="cartTableHead">
                    <tr className="table-heads">
                        <th className="cartTableHead">PRODUCT</th>
                        <th className="cartTableHead">DESCRIPTION</th>
                        <th className="cartTableHead">AMOUNT</th>
                        <th className="cartTableHead">SUB TOTAL</th>
                        <th className="cartTableHead">ACTION</th>
                    </tr>
                    </thead>
                    <tbody className="cartTableBody">
                    {cartItems.map(product => (
                        <tr className="table-heads">
                            <td className="cartTableBody">
                                <img className="imagePreview"
                                     src={product.image}
                                     alt={product.laptop}
                                />
                            </td>
                            <td >
                                <strong className="cartTableTextStrong">{product.laptop}</strong>
                                <span className="cartTableTextSpan">{getPrice(product.price)}</span>
                            </td>
                            <td >
                                <strong className="cartTableTextStrong">{product.quantity}</strong>
                            </td>
                            <td >
                                <strong className="cartTableTextStrong">{getPrice(getSubTotal(product))}</strong>
                            </td>
                            <td>
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
                        <strong className="TotalAmount">{getPrice(cartTotal)}</strong>
                    </div>
                </footer>
            </div>
            <div>
                <form onSubmit={handleSubmit}>

                    <div className="grid-container">
                        <label className="form-title">Personal Information</label>
                        <label className="form-title">Card Information</label>
                        <div className="grid-item">
                            <div className="field-group">
                                <div>
                                    <input type="text"
                                           name='firstName'
                                           value={inputValues.firstName}
                                           placeholder="First Name"
                                           required
                                           className="formInput"
                                           onChange={(e) => handleChange(e)}/>
                                    {validation.firstName && <p className="errorMsg">{validation.firstName}</p>}
                                </div>
                                <div>
                                    <input type="text"
                                           name='lastName'
                                           value={inputValues.lastName}
                                           placeholder="Last Name"
                                           required
                                           className="formInput"
                                           onChange={(e) => handleChange(e)}/>
                                    {validation.lastName && <p className="errorMsg">{validation.lastName}</p>}
                                </div>
                            </div>
                            <div className="field-group">
                                <div>
                                    <input type="text"
                                           name='phoneNumber'
                                           value={inputValues.phoneNumber}
                                           placeholder="Phone Number"
                                           required
                                           className="formInput"
                                           onChange={(e) => handleChange(e)}/>
                                    {validation.phoneNumber && <p className="errorMsg">{validation.phoneNumber}</p>}
                                </div>
                                <div>
                                    <input type="text"
                                           name='street'
                                           value={inputValues.street}
                                           placeholder="Door No. & Street"
                                           required
                                           className="formInput"
                                           onChange={(e) => handleChange(e)}/>
                                    {validation.street && <p className="errorMsg">{validation.street}</p>}
                                </div>
                            </div>
                            <div className="field-group">
                                <div>
                                    <input type="text"
                                           name='city'
                                           value={inputValues.city}
                                           placeholder="City"
                                           required
                                           className="formInput"
                                           onChange={(e) => handleChange(e)}/>
                                    {validation.city && <p className="errorMsg">{validation.city}</p>}
                                </div>
                                <div>
                                    <input type="text"
                                           name='state'
                                           value={inputValues.state}
                                           placeholder="State"
                                           required
                                           className="formInput"
                                           onChange={(e) => handleChange(e)}/>
                                    {validation.state && <p className="errorMsg">{validation.state}</p>}
                                </div>
                            </div>
                            <div className="field-group">
                                <div>
                                    <input type="text"
                                           name='postalCode'
                                           value={inputValues.postalCode}
                                           placeholder="ZIP/Postal Code"
                                           required
                                           className="formInput"
                                           onChange={(e) => handleChange(e)}/>
                                    {validation.postalCode && <p className="errorMsg">{validation.postalCode}</p>}
                                </div>
                                <div>
                                    <input type="text"
                                           name='country'
                                           value={inputValues.country}
                                           placeholder="Country"
                                           required
                                           className="formInput"
                                           onChange={(e) => handleChange(e)}/>
                                    {validation.country && <p className="errorMsg">{validation.country}</p>}
                                </div>
                            </div>

                        </div>
                        <div className="grid-item">
                            <div className="field-group">
                                <div>
                                    <input type="text"
                                           name='cardholderName'
                                           value={inputValues.cardholderName}
                                           placeholder="Card Holder Name"
                                           required
                                           className="formInput"
                                           onChange={(e) => handleChange(e)}/>
                                    {validation.cardholderName && <p className="errorMsg">{validation.cardholderName}</p>}
                                </div>
                                <div>
                                    <input type="text"
                                           name='cardNumber'
                                           value={inputValues.cardNumber}
                                           placeholder="Card Number"
                                           required
                                           className="formInput"
                                           onChange={(e) => handleChange(e)}/>
                                    {validation.cardNumber && <p className="errorMsg">{validation.cardNumber}</p>}
                                </div>
                            </div>
                            <div className="field-group">
                                <div>
                                    <input type="text"
                                           name='expiration'
                                           value={inputValues.expiration}
                                           placeholder="Expiration (mm/yy)"
                                           required
                                           className="formInput"
                                           onChange={(e) => handleChange(e)}/>
                                    {validation.expiration && <p className="errorMsg">{validation.expiration}</p>}
                                </div>
                                <div>
                                    <input type="text"
                                           name='securityCode'
                                           value={inputValues.securityCode}
                                           placeholder="Security Code"
                                           required
                                           className="formInput"
                                           onChange={(e) => handleChange(e)}/>
                                    {validation.securityCode && <p className="errorMsg">{validation.securityCode}</p>}
                                </div>
                            </div>
                        </div>
                    </div>

                    <input type="submit" className="checkout-btn" disabled={disable} value="Place Order"/>

                </form>
            </div>
        </div>
    );
}
