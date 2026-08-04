import React, { useState } from 'react';

export default function Checkout() {
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [isProcessing, setIsProcessing] = useState(false);

  const handlePaymentSubmit = (e) => {
    e.preventDefault();
    setIsProcessing(true);
    
    // This is where your backend API call to Stripe/PayPal will go
    setTimeout(() => {
      setIsProcessing(false);
      alert('Payment Successful! Coordinate your meetup via Chat.');
    }, 2000);
  };

  return (
    <div className="page-home" style={{ padding: '60px 0', maxWidth: '800px', margin: '0 auto' }}>
      <h1 className="hero-section__title" style={{ fontSize: '2.5rem', marginBottom: '12px', textAlign: 'left' }}>
        Secure Checkout
      </h1>
      <p style={{ color: 'var(--page-muted)', marginBottom: '32px' }}>
        Your payment is protected by CampusMart Escrow until you receive your item.
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: '32px', alignItems: 'start' }}>
        
        {/* Left Column: Payment Form */}
        <div style={{ background: '#fff', padding: '24px', borderRadius: '16px', boxShadow: '0 4px 20px rgba(0,0,0,0.05)', border: '1px solid var(--page-border)' }}>
          <h3 style={{ fontSize: '1.2rem', fontWeight: '700', marginBottom: '16px' }}>Payment Method</h3>
          
          <div style={{ display: 'flex', gap: '12px', marginBottom: '24px' }}>
            <button 
              className={paymentMethod === 'card' ? 'primary-button' : 'secondary-button'}
              style={{ flex: 1, padding: '10px', borderRadius: '8px' }}
              onClick={() => setPaymentMethod('card')}
            >
              Credit/Debit Card
            </button>
            <button 
              className={paymentMethod === 'p2p' ? 'primary-button' : 'secondary-button'}
              style={{ flex: 1, padding: '10px', borderRadius: '8px' }}
              onClick={() => setPaymentMethod('p2p')}
            >
              Campus UPI / PayPal
            </button>
          </div>

          <form onSubmit={handlePaymentSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {paymentMethod === 'card' ? (
              <>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <label style={{ fontWeight: '500' }}>Cardholder Name</label>
                  <input type="text" placeholder="John Doe" required style={{ padding: '12px', borderRadius: '8px', border: '1px solid var(--page-border)' }} />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <label style={{ fontWeight: '500' }}>Card Number</label>
                  <input type="text" placeholder="•••• •••• •••• ••••" required style={{ padding: '12px', borderRadius: '8px', border: '1px solid var(--page-border)' }} />
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <label style={{ fontWeight: '500' }}>Expiry Date</label>
                    <input type="text" placeholder="MM/YY" required style={{ padding: '12px', borderRadius: '8px', border: '1px solid var(--page-border)' }} />
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <label style={{ fontWeight: '500' }}>CVV</label>
                    <input type="password" placeholder="•••" required style={{ padding: '12px', borderRadius: '8px', border: '1px solid var(--page-border)' }} />
                  </div>
                </div>
              </>
            ) : (
              <div style={{ textAlign: 'center', padding: '20px', color: 'var(--page-muted)' }}>
                You will scan the seller's secure dynamic QR code or authorize via wallet upon physical exchange approval.
              </div>
            )}

            <button 
              type="submit" 
              className="primary-button" 
              style={{ width: '100%', marginTop: '16px', height: '48px' }}
              disabled={isProcessing}
            >
              {isProcessing ? 'Processing Transaction...' : 'Pay Securely'}
            </button>
          </form>
        </div>

        {/* Right Column: Order Summary */}
        <div style={{ background: 'rgba(238, 242, 255, 0.5)', padding: '24px', borderRadius: '16px', border: '1px solid var(--page-border)' }}>
          <h3 style={{ fontSize: '1.1rem', fontWeight: '700', marginBottom: '16px' }}>Order Summary</h3>
          <div style={{ display: 'flex', gap: '12px', marginBottom: '16px', paddingBottom: '16px', borderBottom: '1px solid var(--page-border)' }}>
            <div style={{ width: '60px', height: '60px', backgroundColor: '#cbd5e1', borderRadius: '8px' }}></div>
            <div>
              <h4 style={{ margin: 0, fontWeight: '600' }}>Essential Calculus Textbook</h4>
              <p style={{ margin: 0, fontSize: '12px', color: 'var(--page-muted)' }}>Condition: Like New</p>
            </div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
            <span>Item Price</span>
            <strong>$45.00</strong>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px', paddingBottom: '16px', borderBottom: '1px solid var(--page-border)' }}>
            <span>Campus Escrow Fee</span>
            <strong>$1.50</strong>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.2rem', fontWeight: '700' }}>
            <span>Total</span>
            <span style={{ color: 'var(--page-accent)' }}>$46.50</span>
          </div>
        </div>

      </div>
    </div>
  );
}
