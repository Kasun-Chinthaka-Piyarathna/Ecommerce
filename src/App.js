import './App.css';
import Header from './components/Header';
import {BrowserRouter,Routes, Route} from 'react-router-dom';
import Home from "./pages/Home";

function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <Header/>
                <Routes>
                <Route path="/home" exact component={Home}/>
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
