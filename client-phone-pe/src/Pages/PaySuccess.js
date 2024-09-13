import { useNavigate } from "react-router-dom";

const PaySuccess = () => {

    const navigate = useNavigate();

    return (
        <>
            <h2> Payment SuccessFull </h2>
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

export default PaySuccess;