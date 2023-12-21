import React from 'react';

import "./app.css";
import Header from "../header/header";
import Main from "../main/main";
import Footer from "../footer/footer";

const App = () => {

    return (
        <section className="todoapp">
            <Header />
            <Main />
            <Footer />
        </section>
    );
};

export default App;