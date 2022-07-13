import { useState } from 'react'
import { useRouter } from 'next/router'
import { loadStripe } from '@stripe/stripe-js'
import axios from 'axios'
import { PayPalButtons, PayPalScriptProvider } from '@paypal/react-paypal-js'

const Sponsor = () => {
  const [amount, setAmount] = useState<number | 0>(5)
  const { push } = useRouter()

  const paypalOptions = {
    'client-id': process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID,
    currency: 'USD',
    intent: 'capture',
  }

  const defaultAmounts = [1, 5, 10, 20]
  const createCheckOutSession = async () => {
    const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY)
    const stripe = await stripePromise
    const checkoutSession = await axios.post('/api/prepare-stripe-payment', {
      amount: amount,
    })

    const result = await stripe?.redirectToCheckout({
      sessionId: checkoutSession.data.id,
    })

    if (result?.error) {
      alert(result?.error.message)
    }
  }
  const paypalBtnStyle = {
    color: 'gold',
    layout: 'horizontal',
    tagline: 'false',
  }
  // @ts-ignore
  return (
    <div className="container mx-auto px-4">
      <div className="item-center flex flex-col text-left lg:-mx-4 lg:flex lg:flex-row lg:space-x-5 lg:text-left">
        <div className="pb-16">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white lg:text-5xl">
            Support me ☕
          </h1>
          <p className="mt-6 text-gray-800 dark:text-white">
            Feel free to support me with a donation!{' '}
            <span className="font-bold">If you can</span>
          </p>
          <p className="mt-7 text-2xl lg:text-1xl text-gray-800 dark:text-white">
            Thanks in advance. Each donation of yours means a lot, I will be
            very grateful for it.🥹
          </p>

          <p className="mt-7 lg:text-1xl text-gray-800 dark:text-white">
             payment will not function for some time
          </p>

        </div>
        <div className="item-center flex flex-col-reverse text-center lg:-mx-4 lg:flex lg:flex-row lg:space-x-5 lg:text-left">
          <div className="z-10 w-96 flex-col items-center space-y-5 rounded-md bg-gray-700 p-10 dark:bg-zinc-700">
            <div className="group flex w-full items-center rounded-lg bg-gray-100/30 text-white focus:outline-none">
              <p className="rounded-l-lg bg-gray-400 px-4 py-3 text-lg text-black">
                USD
              </p>
              <input
                type="number"
                className="w-full rounded-lg bg-transparent px-4 py-3 text-gray-300  transition duration-200 focus:outline-none group-hover:opacity-100"
                placeholder="Enter Amount"
                value={amount ? amount : ''}
                onChange={(e) => setAmount(parseInt(e.target.value))}
              />
            </div>
            <div className="flex items-center space-x-2 dark:text-black">
              {defaultAmounts.map((buttonAmount) => (
                <button
                  className={`${
                    amount === buttonAmount
                      ? 'border-orange-500 bg-gray-200'
                      : 'bg-gray-200' +
                        ' border-3 border-2  border-black hover:border-3 hover:border-gray-500'
                  } rounded-full border-2 border-gray-300 px-5 py-2 transition duration-200`}
                  onClick={() => setAmount(buttonAmount)}
                  key={buttonAmount}
                >
                  {buttonAmount}$
                </button>
              ))}
            </div>
            <button
              onClick={createCheckOutSession}
              className="w-full rounded-lg border-2 border-black bg-gray-100 py-3 text-xl font-bold hover:border-2  hover:bg-gray-500"
            >
              <span className="dark:text-black">Support me</span>
            </button>
            <div className="w-full rounded-lg text-xl font-bold">
              <PayPalScriptProvider options={paypalOptions}>
                <PayPalButtons
                  //@ts-ignore
                  style={paypalBtnStyle}
                  createOrder={(data, actions) => {
                    return actions.order.create({
                      purchase_units: [
                        {
                          amount: {
                            value: '' + amount,
                          },
                        },
                      ],
                    })
                  }}
                  onApprove={(data, actions) => {
                    return actions.order.capture().then((details) => {
                      push('/payment-successful').then()
                    })
                  }}
                />
              </PayPalScriptProvider>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Sponsor
