import React from 'react';


import Header from "../header/header";
import Main from "../main/main";
import Footer from "../footer/footer";

import "./app.css";

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