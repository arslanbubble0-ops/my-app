import React, { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

const stripePromise = loadStripe('pk_test_your_publishable_key_here'); // Replace with your Stripe key

const PaymentForm = ({ plan, formData, onSuccess, onBack }) => {
  const [processing, setProcessing] = useState(false);
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setProcessing(true);

    if (!stripe || !elements) {
      return;
    }

    // Simulate payment processing
    setTimeout(() => {
      setProcessing(false);
      onSuccess();
    }, 2000);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="bg-gray-50 p-4 rounded-lg mb-4">
        <div className="flex justify-between items-center mb-2">
          <span className="font-medium">Plan:</span>
          <span className="font-semibold">{plan}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="font-medium">Domain:</span>
          <span className="font-semibold">{formData.domain}</span>
        </div>
      </div>

      <div>
        <label className="block text-gray-700 mb-2 font-medium">Card Details</label>
        <div className="border border-gray-300 rounded-lg p-3">
          <CardElement 
            options={{
              style: {
                base: {
                  fontSize: '16px',
                  color: '#424770',
                  '::placeholder': {
                    color: '#aab7c4',
                  },
                },
              },
            }}
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <button
          type="button"
          onClick={onBack}
          className="py-3 px-4 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
          disabled={processing}
        >
          Back
        </button>
        <button
          type="submit"
          className="btn-primary py-3 rounded-lg font-semibold flex items-center justify-center"
          disabled={!stripe || processing}
        >
          {processing ? (
            <>
              <i className="fas fa-spinner fa-spin mr-2"></i>
              Processing...
            </>
          ) : (
            `Pay Now - ${plan === 'Starter' ? '£12.99' : plan === 'Professional' ? '£19.99' : '£29.99'}`
          )}
        </button>
      </div>

      <div className="text-center text-sm text-gray-500 mt-4">
        <i className="fas fa-lock mr-2"></i>
        Your payment is secure and encrypted
      </div>
    </form>
  );
};

const WrappedPaymentForm = (props) => (
  <Elements stripe={stripePromise}>
    <PaymentForm {...props} />
  </Elements>
);

export default WrappedPaymentForm;