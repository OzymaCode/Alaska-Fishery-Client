import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js'

export default function PayPal() {
  return (
    <div className="p-10 w-full">
      <PayPalScriptProvider options={{ 'client-id': 'test' }}>
        <PayPalButtons
          createOrder={(data, action) => {
            return action.order.create({
              purchase_units: [
                {
                  amount: {
                    value: '1.99',
                  },
                },
              ],
            })
          }}
          onApprove={(data, actions) => {
            return actions.order.capture().then((details) => {
              const name = details.payer.name.given_name
              alert(`Transaction completed by ${name}`)
            })
          }}
        />
      </PayPalScriptProvider>
    </div>
  )
}
