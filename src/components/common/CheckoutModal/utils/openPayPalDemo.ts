interface OpenPayPalDemoParams {
  totalPrice: number;
}

export function openPayPalDemo({ totalPrice }: OpenPayPalDemoParams) {
  const newWindow = window.open(
    'about:blank',
    'paypal_demo',
    'width=500,height=600',
  );

  if (!newWindow) {
    return;
  }

  newWindow.document.write(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>PayPal - Confirm Payment</title>
        <style>
          body { font-family: Arial, sans-serif; margin: 0; padding: 20px; background: #f5f5f5; }
          .container { max-width: 400px; margin: 50px auto; background: white; padding: 30px; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1); text-align: center; }
          h1 { color: #003087; margin-bottom: 10px; }
          .logo { font-size: 32px; margin: 20px 0; }
          p { color: #666; margin: 15px 0; }
          .amount { font-size: 24px; font-weight: bold; color: #333; margin: 20px 0; }
          button { padding: 12px 30px; margin: 10px 5px; border: none; border-radius: 4px; cursor: pointer; font-size: 16px; }
          .confirm-btn { background: #0070ba; color: white; }
          .confirm-btn:hover { background: #005a94; }
          .cancel-btn { background: #e8e8e8; color: #333; }
          .cancel-btn:hover { background: #d0d0d0; }
        </style>
      </head>
      <body>
        <div class="container">
          <h1>PayPal</h1>
          <p>Confirm your payment</p>
          <div class="amount">$${totalPrice}</div>
          <p><small>This is a demo payment confirmation</small></p>
          <button class="confirm-btn" onclick="confirm()">Confirm Payment</button>
          <button class="cancel-btn" onclick="cancel()">Cancel</button>
        </div>
        <script>
          function confirm() {
            window.opener.postMessage({ type: 'paypal_confirmed' }, '*');
            window.close();
          }
          function cancel() {
            window.close();
          }
        </script>
      </body>
    </html>
  `);
}
