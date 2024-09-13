import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";

const PayHistory = () => {

    const navigate = useNavigate();

    const [payments, setPayments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    
  
    useEffect(() => {
  
      const fetchPayments = async () => {
        try {
          const response = await axios.get('http://localhost:3050/payHistory');
          setPayments(response.data);
          setLoading(false);
        } catch (err) {
          setError('Error fetching payment data');
          setLoading(false);
        }
      };
  
      fetchPayments();
    }, []);
  
    if (loading) {
      return <p>Loading payments...</p>;
    }
  
    if (error) {
      return <p>{error}</p>;
    }
    return (
        <>
           
            <div className="payment-history-container">
      <h2>Transaction History</h2>
      <table className="payment-table">
        <thead>
          <tr>
            <th>#</th>
            <th>User Name</th>
            <th>Mobile</th>
            <th>Product</th>
            <th>Amount</th>
            <th>Transaction ID</th>
            <th>Status</th>

          </tr>
        </thead>
        <tbody>
          {payments.map((payment, index) => (
            <tr key={payment._id}>
              <td>{index + 1}</td>
              <td>{payment.userName}</td>
              <td>{payment.mobile}</td>
              <td>{payment.product}</td>
              <td>INR {payment.amount} ₹</td>
              <td>{payment.transactionID}</td>
              <td>{payment.paymentStatus}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <button
        type="submit"
        class="pay-btn"
        onClick={() => navigate('/')}
      >
        Checkout Page
      </button>
    </div>
        </>
    );
};

export default PayHistory;