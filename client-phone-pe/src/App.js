import { BrowserRouter, Routes, Route } from "react-router-dom";

import './App.css';

import PayFail from "./Pages/PayFail";
import PaySuccess from "./Pages/PaySuccess";
import PayHistory from "./Pages/PayHistory";
import CheckoutPage from "./Pages/CheckoutPage";

const App = () => {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<CheckoutPage/>}/>
          <Route path="/payFail" element={<PayFail/>}/>
          <Route path="/paySuccess" element={<PaySuccess/>}/>
          <Route path="/payHistory" element={<PayHistory/>}/>
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
