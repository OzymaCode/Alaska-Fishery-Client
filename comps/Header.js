import { CgShoppingCart } from 'react-icons/cg'
import Link from 'next/link'
import { BsJustifyRight } from 'react-icons/bs'
import { TbGridDots } from 'react-icons/tb'
import { TbDotsVertical } from 'react-icons/tb'
import { MdOutlineDarkMode } from 'react-icons/md'
import { MdOutlineLightMode } from 'react-icons/md'
import { useRouter } from 'next/router'
import { Button, Checkbox } from '@mui/material'
import { useState, useEffect } from 'react'
import { connect, useDispatch, useSelector } from 'react-redux'
import { toggle } from '../redux/reducers/settingsReducer'
import { updatePrices } from '../redux/reducers/cartReducer'

const Header = (props) => {
  const dispatch = useDispatch()
  const settings = useSelector((state) => state.settings)
  const { total } = useSelector((state) => state.cart)
  const [openMenu, setOpenMenu] = useState(false)
  const [sidebarActive, setSidebarActive] = useState(false)
  const [lightTheme, setLightTheme] = useState(true)
  const router = useRouter()

  useEffect(() => {
    dispatch(updatePrices())
  }, [])

  const handleThemeChange = () => {
    setLightTheme((lightTheme) => !lightTheme)
  }

  const handleGetProducts = async () => {
    const res = await fetch(
      'https://alaskan-fishery-server.herokuapp.com/products',
    )
      .then((res) => res.json())
      .catch((error) => console.log(error))
  }

  return (
    <div>
      <div className="lg:block hidden">
        <div className="h-auto w-full  flex flex-row  top-0 items-center justify-between p-5 bg-white border ">
          <div>
            <h1>Alaskan Fishery</h1>
          </div>
          <div>
            <ul className="flex flex-row ">
              <li className="flex items-center">
                <Button disableRipple>${total}</Button>
              </li>
              <li className="flex items-center">
                <Link href="/">
                  <Button
                    color={router.pathname == '/' ? 'secondary' : 'primary'}
                  >
                    Home
                  </Button>
                </Link>
              </li>
              <li className="flex items-center">
                <Link href="/shop">
                  <Button
                    color={router.pathname == '/shop' ? 'secondary' : 'primary'}
                  >
                    Shop
                  </Button>
                </Link>
              </li>
              <li className="flex items-center">
                <Link href="/contact">
                  <Button
                    color={
                      router.pathname == '/contact' ? 'secondary' : 'primary'
                    }
                  >
                    Contact
                  </Button>
                </Link>
              </li>
              <li className="flex items-center">
                <Link href="/cart">
                  <Button
                    color={router.pathname == '/cart' ? 'secondary' : 'primary'}
                  >
                    <div className="flex flex-row relative">
                      <CgShoppingCart size={25} />
                      {props.cartItems.length != 0 && (
                        <div className="inline-flex absolute bottom-3 left-3 justify-center items-center w-6 h-6 text-xs font-bold text-white bg-blue-500 rounded-full border-2 border-white dark:border-gray-900">
                          {props.cartItems.length}
                        </div>
                      )}
                    </div>
                  </Button>
                </Link>
              </li>
              {router.pathname == '/shop' && (
                <li className="flex items-center">
                  <Button>
                    {!settings.shopGrid ? (
                      <TbGridDots
                        onClick={() => {
                          dispatch(toggle())
                        }}
                        size={30}
                      />
                    ) : (
                      <TbDotsVertical
                        onClick={() => {
                          dispatch(toggle())
                        }}
                        size={30}
                      />
                    )}
                  </Button>
                </li>
              )}
              {/* <li className="flex items-center">
                <Button onClick={handleThemeChange}>
                  {lightTheme ? (
                    <MdOutlineLightMode size={30} />
                  ) : (
                    <MdOutlineDarkMode size={30} />
                  )}
                </Button>
              </li> */}
            </ul>
          </div>
        </div>
      </div>
      <div className="lg:hidden block">
        <div className="h-auto w-full  flex flex-row  top-0 items-center justify-between p-5 bg-white border ">
          <Button>
            <BsJustifyRight
              size={35}
              onClick={() => setOpenMenu((openMenu) => !openMenu)}
            />
          </Button>
        </div>
        {openMenu && (
          <div className="fixed border top-0 left-0 bottom-0 w-2/3 bg-white">
            <Button color="secondary">
              <BsJustifyRight
                size={35}
                onClick={() => setOpenMenu((openMenu) => !openMenu)}
                className="m-5"
              />
            </Button>
            <hr />
            <div className="flex flex-col justify-center items-center child:p-5">
              <div>
                <ul className="flex flex-col justify-center items-center ">
                  <li className="flex items-center">
                    <Link href="/">
                      <Button
                        className="text-6xl p-10"
                        color={router.pathname == '/' ? 'secondary' : 'primary'}
                      >
                        Home
                      </Button>
                    </Link>
                  </li>
                  <li className="flex items-center">
                    <Link href="/shop">
                      <Button
                        className="text-6xl p-10"
                        color={
                          router.pathname == '/shop' ? 'secondary' : 'primary'
                        }
                      >
                        Shop
                      </Button>
                    </Link>
                  </li>
                  <li className="flex items-center">
                    <Link href="/contact">
                      <Button
                        className="text-6xl p-10"
                        color={
                          router.pathname == '/contact'
                            ? 'secondary'
                            : 'primary'
                        }
                      >
                        Contact
                      </Button>
                    </Link>
                  </li>
                  <li className="flex items-center">
                    <Link href="/cart">
                      <Button
                        color={
                          router.pathname == '/cart' ? 'secondary' : 'primary'
                        }
                      >
                        <div className="flex flex-row relative">
                          <CgShoppingCart size={50} />
                          {props.cartItems.length != 0 && (
                            <div className="inline-flex absolute bottom-3 left-3 justify-center items-center w-6 h-6 text-xs font-bold text-white bg-blue-500 rounded-full border-2 border-white dark:border-gray-900">
                              {props.cartItems.length}
                            </div>
                          )}
                        </div>
                      </Button>
                    </Link>
                  </li>

                  {/* <li className="flex items-center">
                <Button onClick={handleThemeChange}>
                  {lightTheme ? (
                    <MdOutlineLightMode size={30} />
                  ) : (
                    <MdOutlineDarkMode size={30} />
                  )}
                </Button>
              </li> */}
                </ul>
              </div>
            </div>
            <hr />
          </div>
        )}
      </div>
    </div>
  )
}

const mapStateToProps = (state) => {
  const cartItems = state.cart.items
  const settings = state.settings
  return {
    cartItems,
    settings,
  }
}

export default connect(mapStateToProps)(Header)
