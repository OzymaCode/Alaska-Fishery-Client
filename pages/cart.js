import Link from 'next/link'
import Head from 'next/head'
import { connect, useDispatch, useSelector } from 'react-redux'
import { Paper, Button, TextField, Badge } from '@mui/material'
import {
  add,
  remove,
  clear,
  updatePrices,
} from '../redux/reducers/cartReducer.js'
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import PayPal from '../comps/PayPal.js'

const cart = () => {
  const dispatch = useDispatch()
  const items = useSelector((state) => state.cart.items)
  const total = useSelector((state) => state.cart.total)
  const subtotal = useSelector((state) => state.cart.subtotal)
  const tax = useSelector((state) => state.cart.tax)
  const [checkout, setCheckout] = useState(true)

  useEffect(() => {
    dispatch(updatePrices())
  }, [])

  const increment = (item) => {
    let newItem = { product: item.product, kg: item.kg + 1 }
    dispatch(add(newItem))
    dispatch(updatePrices())
  }

  const decrement = (item) => {
    let newItem = { product: item.product, kg: item.kg - 1 }
    dispatch(add(newItem))
    dispatch(updatePrices())
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <Head>
        <title>Alaskan Fishery | Cart</title>
        <link rel="icon" href="/fish-icon.webp" />
      </Head>
      {items.length ? (
        <div className="flex lg:flex-row flex-col lg:child:w-1/2">
          <div id="cart-products" className="flex flex-col  ">
            {items.map((item, i) => {
              return (
                <div className="border flex flex-row " key={i}>
                  <div className=" h-full w-full flex justify-center items-center p-5">
                    <Link href={'shop/' + item.product.name}>
                      <a className="border flex flex-row justify-center items-center w-4/5">
                        <Paper elevation={1}>
                          <motion.img
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            whileHover={{ scale: 1.1 }}
                            layoutId={item.product.id}
                            src={`../${item.product.image}`}
                            className="object-contain"
                          />
                        </Paper>
                      </a>
                    </Link>
                  </div>
                  <div className="h-full w-full flex justify-center items-center p-5">
                    <div className="flex flex-col  justify-center items-center child:justify-center child:flex">
                      <Link href={'shop/' + item.product.name}>
                        <a>
                          <h1 className="p-1 underline">{item.product.name}</h1>
                        </a>
                      </Link>
                      <hr />
                      <h1>${item.product.price} / kg</h1>
                      <h1>{item.kg} kg</h1>
                      <div>
                        <Button
                          className="m-2 p-2"
                          variant="outlined"
                          onClick={() => increment(item)}
                        >
                          +
                        </Button>
                        <Button
                          className="m-2 p-2"
                          variant="outlined"
                          onClick={() => decrement(item)}
                        >
                          -
                        </Button>
                      </div>
                    </div>
                  </div>
                  <div className="relative">
                    <Button
                      className="absolute top-0 right-0  h-14"
                      onClick={() => {
                        dispatch(remove(item))
                        dispatch(updatePrices())
                      }}
                    >
                      X
                    </Button>
                  </div>
                </div>
              )
            })}
          </div>
          <div
            id="price"
            className="flex w-full flex-col items-center px-10 pt-2 mb-96"
          >
            <div id="price" className="flex w-full flex-col items-center p-2">
              <h1 className="flex w-full justify-center border-b-2 pb-2">
                Price
              </h1>

              {items &&
                items.map((item, i) => (
                  <div className="flex w-full border-b-2 child:w-1/2" key={i}>
                    <h1 className="flex justify-center">
                      {item.kg} kg {item.product.name}:
                    </h1>
                    <h1 className="flex justify-center">
                      ${(item.product.price * item.kg).toFixed(2)}
                    </h1>
                  </div>
                ))}
            </div>
            <div id="price" className="flex w-full flex-col items-center p-2">
              <div className="flex w-full border-y-2 child:w-1/2">
                <h1 className="flex justify-center">subtotal:</h1>
                <h1 className="flex justify-center">${subtotal}</h1>
              </div>
              <div className="flex w-full border-b-2 child:w-1/2">
                <h1 className="flex justify-center">tax:</h1>
                <h1 className="flex justify-center">${tax}</h1>
              </div>

              <div className="flex w-full border-b-2 child:w-1/2">
                <h1 className="flex justify-center">Total:</h1>
                <h1 className="flex justify-center">${total}</h1>
              </div>
            </div>
            <div className="flex flex-row justify-center items-center w-full ">
              {checkout ? (
                <Button
                  variant="outlined"
                  className="w-full"
                  onClick={() => setCheckout(false)}
                >
                  Checkout
                </Button>
              ) : (
                <PayPal />
              )}
            </div>
          </div>
        </div>
      ) : (
        <div className="flex justify-center p-10">Cart Empty</div>
      )}
    </motion.div>
  )
}

const mapStateToProps = (state) => {
  const cartItems = state.cart.items
  return {
    cartItems,
  }
}

export default connect(mapStateToProps)(cart)
