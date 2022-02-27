import './App.css';
import Header from './components/Header';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import CartProvider from "./contexts/cart";
import OrderStatus from "./pages/OrderStatus";

function App() {
    return (
        <div className="app">
            <CartProvider>
                <BrowserRouter>
                    <Header/>
                    <Routes>
                        <Route path="/" exact element={<Home/>}/>
                        <Route path="/checkout" element={<Cart/>}/>
                        <Route path="/order-status" element={<OrderStatus/>}/>
                    </Routes>
                </BrowserRouter>
            </CartProvider>
        </div>
    );
}

export default App;
