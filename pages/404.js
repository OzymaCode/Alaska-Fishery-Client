import { useEffect } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import { motion } from 'framer-motion'

const DoesNotExist = () => {
  let router = useRouter()
  useEffect(() => {
    setTimeout(() => {
      router.push('/')
    }, 4000)
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex justify-center items-center p-10"
    >
      <Head>
        <title>Alaskan Fishery | 404</title>
        <link rel="icon" href="/fish-icon.webp" />
      </Head>
      <h1>This Page Doesn't Exist. Sorry.</h1>
    </motion.div>
  )
}

export default DoesNotExist
