import { integerPropType } from '@mui/utils'
import { createSlice, current } from '@reduxjs/toolkit'
import { setCookie, getCookie, deleteCookie } from 'cookies-next'

const addToState = (state, action) => {
  let thisId = action.payload.product.id
  let currentState = current(state.items)
  console.log('currentState: ', currentState)
  let cartIds = currentState.map((item) => item.product.id)
  let newStateItems = []

  // create new state
  if (action.payload.kg < 0 || action.payload.kg > 50) {
    return currentState
  }
  if (cartIds.length == 0) {
    newStateItems = [action.payload]
  } else {
    for (let i = 0; i < cartIds.length; i++) {
      if (cartIds[i] == thisId) {
        newStateItems = [...newStateItems, action.payload]
      } else if (cartIds[i] > thisId && (i == 0 || cartIds[i - 1] < thisId)) {
        newStateItems = [...newStateItems, action.payload, currentState[i]]
      } else if (cartIds[i] < thisId && i == cartIds.length - 1) {
        newStateItems = [...newStateItems, currentState[i], action.payload]
      } else {
        newStateItems = [...newStateItems, currentState[i]]
      }
    }
  }

  // window.localStorage.setItem(
  //   'CLIENT_CART_ITEMS',
  //   JSON.stringify(newStateItems),
  // )
  return newStateItems
}

const removeFromState = (state, action) => {
  let thisId = action.payload.product.id
  let currentState = [...current(state.items)]
  let cartIds = currentState.map((item) => item.product.id)
  let newStateItems = []

  for (let i = 0; i < cartIds.length; i++) {
    if (cartIds[i] == thisId) {
      newStateItems = [...newStateItems]
    } else {
      newStateItems = [...newStateItems, currentState[i]]
    }
  }
  console.log('newStateItems: ', newStateItems)
  return newStateItems
}

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [],
    subtotal: 0,
    tax: 0,
    total: 0,
  },
  reducers: {
    add: (state, action) => {
      state.items = addToState(state, action)
    },
    remove: (state, action) => {
      state.items = removeFromState(state, action)
    },
    clear: (state) => {
      state.items = []
    },
    replace: (state, action) => {
      console.log('new state items (reducer): ', action.payload)
      state.items = action.payload
    },
    updatePrices: (state) => {
      let subtotal
      let tax
      let total
      subtotal = 0
      for (let i = 0; i < state.items.length; i++) {
        subtotal += state.items[i].product.price * state.items[i].kg
      }
      subtotal = subtotal.toFixed(2)
      tax = (subtotal * 0.11).toFixed(2)
      total = (parseFloat(subtotal) + parseFloat(tax)).toFixed(2)

      state.subtotal = subtotal
      state.tax = tax
      state.total = total
      console.log(`subtotal: ${subtotal}, tax: ${tax}, total: ${total}`)
    },
  },
})

export default cartSlice.reducer

export const { add, remove, clear, replace, updatePrices } = cartSlice.actions
