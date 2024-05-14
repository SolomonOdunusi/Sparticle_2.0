import { Route, Routes } from "react-router-dom";
import Navbar from "./components/navbar.component";
import UserAuthForm from "./pages/userAuthForm.page";
import { createContext, useEffect } from "react";
import { useState } from "react";
import {getSession} from './common/session'

export const userContext = createContext({});

const App = () => {

    const [userAuth, setUserAuth] = useState({});

    useEffect(() => {
        let userInSession = getSession('user');

        userInSession ? setUserAuth(JSON.parse(userInSession)) : setUserAuth({ access_token: null });
    }, [])

    return (
        <userContext.Provider value={{userAuth, setUserAuth}}>
        <Routes>
            <Route path='/' element={<Navbar />}>
                <Route path="signin" element={<UserAuthForm type='Sign In' />} />
                <Route path="signup" element={<UserAuthForm type='Sign Up' />} />
            </Route>
        </Routes>
        </userContext.Provider>
    )
}

export default App;