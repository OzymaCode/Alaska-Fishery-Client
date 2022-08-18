import Link from 'next/link'
import { BsJustifyRight } from 'react-icons/bs'
import { AiOutlineRight } from 'react-icons/ai'
import { HiOutlineDotsVertical } from 'react-icons/hi'
import { useState } from 'react'
import Head from 'next/head'
import Button from '@mui/material/Button'
import { useSelector } from 'react-redux'
import { motion } from 'framer-motion'

export const getStaticProps = async (context) => {
  const res = await fetch(
    'https://alaskan-fishery-server.herokuapp.com/products',
  )
    .then((res) => res.json())
    .catch((error) => console.log(error))

  return {
    props: res,
  }
}

const Shop = ({ products, cookiesChanged }) => {
  const [sidebarActive, setSidebarActive] = useState(false)
  const gridActive = useSelector((state) => state.settings.shopGrid)

  const handleSwitch = () => {
    setStyleSwitch(!styleSwitch)
  }

  return (
    <div className="flex flex-row">
      <Head>
        <title>Alaskan Fishery | Shop</title>
        <link rel="icon" href="/fish-icon.webp" />
      </Head>
      {gridActive ? (
        <div className="border flex flex-col w-full">
          {products.map((product, i) => {
            return (
              <Link href={'shop/' + product.name} key={i}>
                <a>
                  <div className="p-5 border rounded-md w-full flex lg:flex-row flex-col justify-center lg:justify-start items-center">
                    <motion.img
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      whileHover={{ scale: 1.05 }}
                      layoutId={product.id}
                      src={product.image}
                      className="object-contain lg:w-1/4 w-full"
                    />
                    <h1 className="text-6xl pl-5">{product.name}</h1>
                    <h1 className="text-6xl pl-5">${product.price}/kg</h1>
                  </div>
                </a>
              </Link>
            )
          })}
        </div>
      ) : (
        <div className="grid lg:grid-cols-3 grid-cols-1 gap-4">
          {products.map((product, i) => {
            return (
              <Link href={'shop/' + product.name} key={i}>
                <a>
                  <div className="flex border p-5 flex-col justify-center items-center">
                    <motion.img
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      whileHover={{ scale: 1.05 }}
                      layoutId={product.id}
                      src={product.image}
                      className="object-contain h-2/3 "
                    />
                    <h1 className="text-6xl pl-5">{product.name}</h1>
                    <h1 className="text-6xl pl-5">${product.price}/kg</h1>
                  </div>
                </a>
              </Link>
            )
          })}
        </div>
      )}
    </div>
  )
}

export default Shop
