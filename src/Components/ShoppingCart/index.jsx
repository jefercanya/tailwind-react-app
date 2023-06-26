import { useContext } from 'react'
import { ShoppingBagIcon } from '@heroicons/react/24/solid'
import { ShoppingCartContext } from '../../Context'

const ShoppingCart = () => {
  const context = useContext(ShoppingCartContext)

  const openCheckoutSideMenu = () => {
    context.openCheckoutSideMenu()
    context.closeProductDetail()
  }

  return (
    <div className='relative flex gap-0.5 items-center' onClick={() => openCheckoutSideMenu()}>
      <ShoppingBagIcon className='w-6 h-6 fill-none stroke-white cursor-pointer'/>
      <div className='absolute bottom-3.5 left-3.5 flex justify-center items-center
      rounded-full bg-white w-4 h-4 text-xs text-black'>
        {context.cartProducts.length}
      </div>
    </div>
  )
}

export default ShoppingCart