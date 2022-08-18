import { useDispatch, useSelector } from 'react-redux'
import { useState, useEffect } from 'react'
import { replace, add } from '../redux/reducers/cartReducer'

const Persist = () => {
  const dispatch = useDispatch()
  let stateCart = useSelector((state) => state.cart)
  useEffect(() => {
    let cookies = window.localStorage.getItem('THIS_CART')
    let parsedCookies = JSON.parse(cookies)
    if (parsedCookies != null) {
      dispatch(replace(parsedCookies))
    }
  }, [])
  useEffect(() => {
    setTimeout(() => {
      let currentState = JSON.stringify(stateCart.items)
      window.localStorage.setItem('THIS_CART', currentState)
    }, 100)
  }, [stateCart])
}

export default Persist
