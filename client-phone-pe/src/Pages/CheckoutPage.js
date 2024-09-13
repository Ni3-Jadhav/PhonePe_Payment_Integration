import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";


const CheckoutPage = () => {

    const navigate = useNavigate();

    const [ formData , getFormData ] = useState({
        name : '',
        mobile : '',
        product : '',
        amount : ''

    });

    const handleFormInput = (eventTrigger) => {
        const { name , value } = eventTrigger.target;
        getFormData((formDetail) => ({ ...formDetail , [name]:value }));
    };

    const handlePaymentProcees = async (eventTrigger) => {
        eventTrigger.preventDefault()

        const checkoutPayData = {
            userName : formData.name,
            payAmount : parseFloat(formData.amount),
            selectProduct : formData.product,
            userMo_No : formData.mobile,
            MID : 'MID'+ Date.now(),
            transactionID : 'T_ID' + Date.now()
        };

        console.log(checkoutPayData);
        
       try {
        await axios.post('http://localhost:3050/payOrder',checkoutPayData).then(res => {
          console.log(res.data);
          if(res.data.success === true){
            window.location.href = res.data.data.instrumentResponse.redirectInfo.url
          }

        }).catch(err => {
            console.log('ERROR in api',err);
            
        })
       } catch (error) {
        console.log('ERROR in api',error);
        
       }
    }

    return (
        <>
            <div class="checkout-container">
                <h2>Checkout</h2>
                <form class="checkout-form">
                    <div class="form-group">
                        <label for="name">User Name</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            onChange={handleFormInput}
                            value={formData.name}
                            placeholder="Enter your name"
                            required
                        />
                    </div>
                    <div class="form-group">
                        <label for="mobile">Mobile Number</label>
                        <input
                            type="tel"
                            id="mobile"
                            name="mobile"
                            onChange={handleFormInput}
                            value={ formData.mobile}
                            placeholder="Enter your mobile number"
                            required
                        />
                    </div>
                    <div class="form-group">
                        <label for="product">Product Name</label>
                        <input
                            type="text"
                            id="product"
                            name="product"
                            onChange={handleFormInput}
                            value={formData.product}
                            placeholder="Enter product name"
                            required
                        />
                    </div>
                    <div class="form-group">
                        <label for="amount">Pay Amount</label>
                        <input
                            type="text"
                            id="amount"
                            name="amount"
                            onChange={handleFormInput}
                            value={formData.amount}
                            placeholder="Enter amount"
                            required
                        />
                    </div>
                    <button
                        type="button"
                        class="pay-btn"
                        onClick={handlePaymentProcees}
                    >
                        Pay Now
                    </button>
                </form>
                <br></br>
                <button
                    type="button"
                    class="pay-btn"
                    onClick={() => navigate("/payHistory")}
                >
                    Payment History
                </button>
            </div>
        </>
    );
};

export default CheckoutPage;