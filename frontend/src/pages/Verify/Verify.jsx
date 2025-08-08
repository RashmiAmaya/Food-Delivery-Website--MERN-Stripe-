import React, { useEffect, useState } from "react";
import "./verify.css";
import { useNavigate, useSearchParams } from "react-router-dom";
import { DOMAIN } from "../../config";
import axios from "axios";
import { toast } from "react-toastify";
import { CheckCircleIcon, XCircleIcon } from "@heroicons/react/24/outline";

function Verify() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const success = searchParams.get("success");
  const orderId = searchParams.get("orderId");
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState(null);

  const verifyPayment = async () => {
    try {
      if (!success || !orderId) {
        setStatus('error');
        toast.error("Invalid verification URL");
        setTimeout(() => navigate("/"), 2000);
        return;
      }

      const response = await axios.post(`${DOMAIN}/api/order/verify`, {
        success,
        orderId,
      });

      if (response.data.success) {
        setStatus('success');
        toast.success("Order placed successfully!");
        setTimeout(() => navigate("/myorders"), 2000);
      } else {
        setStatus('error');
        toast.error(response.data.message || "Verification failed");
        setTimeout(() => navigate("/"), 2000);
      }
    } catch (error) {
      setStatus('error');
      console.error("Verification error:", error);
      toast.error("Verification failed. Please try again.");
      setTimeout(() => navigate("/"), 2000);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    verifyPayment();
  }, []);

  return (
    <div className="verify">
      {loading ? (
        <div className="spinner"></div>
      ) : (
        <div className="verify-status">
          {status === 'success' ? (
            <div className="verify-success">
              <CheckCircleIcon className="status-icon success" />
              <h2>Order Placed Successfully!</h2>
              <p>Redirecting to your orders...</p>
            </div>
          ) : (
            <div className="verify-error">
              <XCircleIcon className="status-icon error" />
              <h2>Verification Failed</h2>
              <p>Redirecting to home...</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Verify;
