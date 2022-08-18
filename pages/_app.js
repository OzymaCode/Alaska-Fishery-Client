import '../styles/globals.css'
import { Provider } from 'react-redux'
import store from '../redux/store'
import Header from '../comps/Header'
import CssBaseline from '@mui/material/CssBaseline'
import { CacheProvider } from '@emotion/react'
import theme from '../src/theme'
import createEmotionCache from '../src/createEmotionCache'
import Head from 'next/head'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import PropTypes from 'prop-types'
import Script from 'next/script'
import Persist from '../comps/Persist'
import { AnimateSharedLayout, AnimatePresence } from 'framer-motion'

const clientSideEmotionCache = createEmotionCache()
const lightTheme = createTheme({
  palette: {
    mode: 'light',
  },
})
function MyApp({
  Component,
  pageProps,
  emotionCache = clientSideEmotionCache,
}) {
  return (
    <Provider store={store}>
      <CacheProvider value={emotionCache}>
        <Head>
          <meta name="viewport" content="initial-scale=1, width=device-width" />
        </Head>
        <ThemeProvider theme={lightTheme}>
          <CssBaseline />
          <Persist />
          <Script
            src="https://www.paypal.com/sdk/js?client-id=your-id-goes-here"
            data-sdk-integration-source="button-factory"
            data-namespace="paypal_sdk"
          />
          <div className="flex flex-col h-screen">
            <Header />
            <AnimateSharedLayout>
              <div className="overflow-auto">
                <AnimatePresence mode="wait">
                  <Component {...pageProps} />
                </AnimatePresence>
              </div>
            </AnimateSharedLayout>
          </div>
        </ThemeProvider>
      </CacheProvider>
    </Provider>
  )
}

export default MyApp

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  emotionCache: PropTypes.object,
  pageProps: PropTypes.object.isRequired,
}
