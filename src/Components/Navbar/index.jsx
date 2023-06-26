import { useContext, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { ShoppingCartContext } from '../../Context'
import ShoppingCart from '../ShoppingCart'
import Dropdown from '../Dropdown';

const Navbar = () => {
  const context = useContext(ShoppingCartContext)

  const activeStyle = 'bg-gray-900 px-3 py-2 rounded-md'
  const deactiveStyle = 'hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md'
  const activeStyleResponsive = 'bg-gray-700 text-gray-300 block px-3 py-2 rounded-md font-medium'
  const deactiveStyleResponsive = 'text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium'
  const navLinkStyles = 'hover:text-white px-3 py-2 rounded-md text-sm font-medium'
  const itemsMenu = 'flex items-center gap-4 text-gray-300 -md text-sm font-medium';

  // Sign Out
  const signOut = localStorage.getItem('sign-out')
  const parsedSignOut = JSON.parse(signOut)
  const isUserSignOut = context.signOut || parsedSignOut
  // Account
  const account = localStorage.getItem('account')
  const parsedAccount = JSON.parse(account)
  // Has an account
  const noAccountInLocalStorage = parsedAccount ? Object.keys(parsedAccount).length === 0 : true
  const noAccountInLocalState = context.account ? Object.keys(context.account).length === 0 : true
  const hasUserAnAccount = !noAccountInLocalStorage || !noAccountInLocalState

  const handleSignOut = () => {
    const stringifiedSignOut = JSON.stringify(true)
    localStorage.setItem('sign-out', stringifiedSignOut)


    context.setSignOut(true)
  }

  const renderView = () => {
    if (hasUserAnAccount && !isUserSignOut) {
      return (
        <>
          <Dropdown className={{ isActive: activeStyle, deactive: deactiveStyle }} text={parsedAccount?.email} />

          <NavLink
            to='/my-orders'
            className={({ isActive }) => isActive ? activeStyle : deactiveStyle}>
            My Orders
          </NavLink>

          < NavLink
            to='/my-account'
            className={({ isActive }) => isActive ? activeStyle : deactiveStyle}>
            My Account
          </NavLink>

          <NavLink
            to='/sign-in'
            className={({ isActive }) => isActive ? activeStyle : deactiveStyle}
            onClick={() => handleSignOut()}>
            Sign Out
          </NavLink>

          <ShoppingCart />
        </>
      )
    }
    else {
      return (
        <>
          <NavLink
            to="/sign-in"
            className={({ isActive }) => isActive ? activeStyle : deactiveStyle}
            onClick={() => handleSignOut()}>
            Sign in
          </NavLink>
        </>
      )
    }
  }

  const [isOpen, setIsOpen] = useState(false);

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <NavLink to={`${isUserSignOut ? '/sign-in' : '/'}`}>
                <img
                  className="h-10"
                  src="./shopi-logo.png"
                  alt="Logo"
                />
              </NavLink>
            </div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                <ul className={itemsMenu}>
                  <li>
                    <NavLink
                      to="/"
                      onClick={() => context.setSearchByCategory()}
                      className={({ isActive }) =>
                        isActive ? activeStyle : deactiveStyle
                      }
                    >
                      All
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to='/clothes'
                      onClick={() => context.setSearchByCategory('clothes')}
                      className={({ isActive }) =>
                        isActive ? activeStyle : deactiveStyle
                      }>
                      Clothes
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to='/electronics'
                      onClick={() => context.setSearchByCategory('electronics')}
                      className={({ isActive }) =>
                        isActive ? activeStyle : deactiveStyle
                      }>
                      Electronics
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to='/furnitures'
                      onClick={() => context.setSearchByCategory('furnitures')}
                      className={({ isActive }) =>
                        isActive ? activeStyle : deactiveStyle
                      }>
                      Furnitures
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to='/toys'
                      onClick={() => context.setSearchByCategory('toys')}
                      className={({ isActive }) =>
                        isActive ? activeStyle : deactiveStyle
                      }>
                      Toys
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to='/others'
                      onClick={() => context.setSearchByCategory('others')}
                      className={navLinkStyles}>
                      Others
                    </NavLink>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          {/* Agregar las opciones dos alineadas a la derecha */}
          <div className="hidden md:block">
            <div className="ml-4 flex items-center md:ml-6 gap-5">
              <div className={itemsMenu}>
                {renderView()}
              </div>
            </div>
          </div>
          <div className="-mr-2 flex items-center space-x-5 md:hidden">
            {hasUserAnAccount && !isUserSignOut ? <ShoppingCart /> : null}
            <button
              onClick={toggleNavbar}
              className="bg-gray-900 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
              aria-expanded="false"
            >
              <span className="sr-only">Abrir menú</span>
              {!isOpen ? (
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              ) : (
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
        {/* Agregar las opciones de navegación cuando el menú está abierto */}
        {isOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-2 sm:pt-0">
              <NavLink
                to="/"
                onClick={() => {
                  context.setSearchByCategory();
                  toggleNavbar();
                }}
                className={({ isActive }) =>
                  isActive ? activeStyleResponsive : deactiveStyleResponsive
                }
              >
                All
              </NavLink>

              <NavLink
                to='/clothes'
                onClick={() => { context.setSearchByCategory('clothes'), toggleNavbar(); }}
                className={({ isActive }) =>
                  isActive ? activeStyleResponsive : deactiveStyleResponsive
                }
              >
                Clothes
              </NavLink>

              <NavLink
                to='/electronics'
                onClick={() => { context.setSearchByCategory('electronics'), toggleNavbar(); }}
                className={({ isActive }) =>
                  isActive ? activeStyleResponsive : deactiveStyleResponsive
                }
              >
                Electronics
              </NavLink>

              <NavLink
                to='/furnitures'
                onClick={() => { context.setSearchByCategory('furnitures'), toggleNavbar(); }}
                className={({ isActive }) =>
                  isActive ? activeStyleResponsive : deactiveStyleResponsive
                }
              >
                Furnitures
              </NavLink>

              <NavLink
                to='/toys'
                onClick={() => { context.setSearchByCategory('toys'), toggleNavbar(); }}
                className={({ isActive }) =>
                  isActive ? activeStyleResponsive : deactiveStyleResponsive
                }
              >
                Toys
              </NavLink>

              <NavLink
                to='/others'
                onClick={() => { context.setSearchByCategory('others'), toggleNavbar(); }}
                className={({ isActive }) =>
                  isActive ? activeStyleResponsive : deactiveStyleResponsive
                }
              >
                Others
              </NavLink>
            </div>

            {/* Agregar las opciones dos debajo de las opciones del carrito compras */}
            <div className="border-t border-gray-700">
              <div className="flex flex-col items-end  px-2 pt-2 pb-3 space-y-1 sm:px-2 sm:pt-0">
                {/* Opciones dos */}
                {hasUserAnAccount && !isUserSignOut ? (
                  <>
                    <Dropdown className={{ isActive: activeStyleResponsive, deactive: deactiveStyleResponsive }} text={parsedAccount?.email} />
                    <NavLink
                      to='/my-orders'
                      onClick={toggleNavbar}
                      className={({ isActive }) => isActive ? activeStyleResponsive : deactiveStyleResponsive}
                    >

                      My Orders
                    </NavLink>
                    < NavLink
                      to='/my-account'
                      onClick={toggleNavbar}
                      className={({ isActive }) => isActive ? activeStyleResponsive : deactiveStyleResponsive}
                    >
                      My Account
                    </NavLink>
                    <NavLink
                      to='/sign-in'
                      onClick={() => { handleSignOut(), toggleNavbar() }}
                      className={({ isActive }) => isActive ? activeStyleResponsive : deactiveStyleResponsive}
                    >
                      Sign Out
                    </NavLink>

                  </>
                )
                  :
                  (
                    <NavLink
                      to='/sign-in'
                      onClick={() => { handleSignOut(), toggleNavbar() }}
                      className={({ isActive }) => isActive ? activeStyleResponsive : deactiveStyleResponsive}
                    >
                      Sign In
                    </NavLink>
                  )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );





}

export default Navbar