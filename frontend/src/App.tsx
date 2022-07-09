import React from "react";
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate,
} from "react-router-dom";
import UserProvider from "./Contexts/UserContext";
import UserRoute from "./Routes/UserRoute";
import Game from "./Pages/Game";
import Home from "./Pages/Home";
import "./Scss/styles.scss";

const App = () => {
    return (
        <UserProvider>
            <Router>
                <Routes>
                    <Route path='/' element={<Home />} />
                    <Route path='/' element={<UserRoute />}>
                        <Route path='/game' element={<Game />} />
                    </Route>
                    <Route path='*' element={<Navigate to='/' replace />} />
                </Routes>
            </Router>
        </UserProvider>
    );
};

export default App;
