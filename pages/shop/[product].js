import { useRouter } from 'next/router'
import Head from 'next/head'
import { BsJustifyRight } from 'react-icons/bs'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Paper from '@mui/material/Paper'
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { add, updatePrices } from '../../redux/reducers/cartReducer'
import { motion } from 'framer-motion'

export async function getServerSideProps(context) {
  const res = await fetch(
    'https://alaskan-fishery-server.herokuapp.com/products',
  )
    .then((res) => res.json())
    .catch((error) => console.log(error))

  const thisProduct = res.products.filter((product) => {
    return product.name == context.query.product
  })[0]

  return {
    props: thisProduct,
  }
}

const productDisplay = (product) => {
  const dispatch = useDispatch()
  const cartItems = useSelector((state) => state.cart.items)
  const [inputkg, setIntputkg] = useState()
  const router = useRouter()

  const addToCart = () => {
    // let price = parseFloat(inputkg) * parseFloat(product.priceKg)
    let newItem = { product, kg: parseFloat(inputkg) }

    dispatch(add(newItem))
    dispatch(updatePrices())
  }

  return (
    <motion.div
      // initial={{ opacity: 0 }}
      // animate={{ opacity: 1 }}
      // exit={}
      className="flex flex-col justify-center items-center"
    >
      <Head>
        <title>Alaskan Fishery | {product.name}</title>
        <link rel="icon" href="/fish-icon.webp" />
      </Head>
      <Paper variant="outlined">
        <div className="h-full w-full flex lg:flex-row flex-col justify-center items-center lg:h-full">
          <div className="h-full w-full flex items-center flex-col lg:py-10 lg:px-0 lg:pl-10 px-10 pt-10">
            <Paper elevation={1}>
              <motion.img
                layoutId={product.id}
                src={`../${product.image}`}
                className="object-contain"
              />
            </Paper>
          </div>
          <div className="h-full w-full flex items-center flex-col p-10 child:p-10">
            <Paper elevation={1}>
              <div className="flex justify-end items-center px-5">
                <div></div>
              </div>
              <div>
                <div className="flex flex-row justify-between items-center">
                  <h1>{product.name}</h1>
                  <Button onClick={() => router.back()}>return</Button>
                </div>
                <hr />
                <br />
                <h1>${product.price}/kg</h1>
                <br />
                <p>{product.details}</p>
                <br />
              </div>
              <div className="flex flex-row justify-end items-center">
                <Paper
                  elevation={1}
                  className="flex flex-row justify-end items-center child:p-5"
                >
                  <div className="flex flex-row justify-center items-center">
                    <h1 className="pr-5">
                      $
                      {inputkg
                        ? (
                            parseFloat(inputkg) * parseFloat(product.price)
                          ).toLocaleString(undefined, {
                            minimumFractionDigits: 2,
                          })
                        : '0.00'}
                    </h1>
                    <TextField
                      id="outlined-number"
                      label="0-50kg"
                      type="number"
                      step="2"
                      InputProps={{
                        inputProps: {
                          max: 50,
                          min: 0,
                        },
                      }}
                      InputLabelProps={{
                        shrink: true,
                      }}
                      onInput={(e) => {
                        if (e.target.value == '') {
                          setIntputkg(e.target.value)
                        } else if (
                          e.target.value != parseInt(e.target.value) ||
                          e.target.value < 0 ||
                          e.target.value > 50
                        ) {
                          e.target.value = inputkg
                        } else {
                          setIntputkg(e.target.value)
                        }
                      }}
                      placeholder="0"
                    />
                  </div>
                  <div>
                    <Button onClick={addToCart}>Add to Cart</Button>
                  </div>
                </Paper>
              </div>
            </Paper>
          </div>
        </div>
      </Paper>
    </motion.div>
  )
}

export default productDisplay
