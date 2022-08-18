import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Link from 'next/link'

import { motion } from 'framer-motion'

export default function Home() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex flex-col h-screen"
    >
      <Head>
        <title>Alaskan Fishery | Home</title>
        <link rel="icon" href="/fish-icon.webp" />
      </Head>
      <div className="text-gray-600">
        <div id="photos">
          <div className="flex lg:flex-row flex-col justify-center items-center">
            <div className="h-full w-full flex flex-col justify-center items-center">
              <h1>Alaskan Fishery</h1>
              <p>From the frontier to your door-step</p>
            </div>

            <motion.img
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              src="halibut-hand.jpg"
              className="object-cover lg:w-8/12 w-full"
            />
          </div>
          <Link href="/shop">
            <a className="flex flex-row justify-start items-center">
              <motion.img
                whileHover={{ scale: 1.05 }}
                src="shop.jpg"
                className="object-cover w-6/12 m-10"
              />
              <h1>Take a look at our shop</h1>
            </a>
          </Link>
          <Link href="/contact">
            <a className="flex flex-row justify-end items-center">
              <h1>Contact Us</h1>
              <motion.img
                whileHover={{ scale: 1.05 }}
                src="fishing-boat.jpg"
                className="object-cover w-6/12 m-10"
              />
            </a>
          </Link>
        </div>
      </div>
    </motion.div>
  )
}
