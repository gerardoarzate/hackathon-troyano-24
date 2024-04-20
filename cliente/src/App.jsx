import { useState } from "react";
import Home from "./components/Home";
import Login from "./components/Login";

function App() {
    const [ token, setToken ] = useState(localStorage.getItem('token'));
    const tokenStorageKey = 'token';

    const login = (email, pass) => {
        const newToken = 'si';
        localStorage.setItem(tokenStorageKey, newToken);
        setToken(newToken);
    }

    const logout = () => {
        localStorage.removeItem(tokenStorageKey);
        setToken(undefined);
    }

    return token ? <Home logoutHandler={logout}/> : <Login loginHandler={login}/>;
}

export default App;

