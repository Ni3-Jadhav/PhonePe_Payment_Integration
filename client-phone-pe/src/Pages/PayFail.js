import { useNavigate } from "react-router-dom";

const PayFail = () => {

    const navigate = useNavigate();

    return (
        <>
            <h2> Payment Failed </h2>
            <button
                type="button"
                class="pay-btn"
                onClick={() => navigate("/")}
            >
                Checkout Page
            </button>
            <br></br>
            <button
                type="button"
                class="pay-btn"
                onClick={() => navigate("/payHistory")}
            >
                Payment History
            </button>
        </>
    );
};

export default PayFail;