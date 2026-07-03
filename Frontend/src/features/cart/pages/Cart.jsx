import React, { useEffect , useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useCart } from '../hook/useCart';
import CartItem from '../components/CartItem';
import { toast } from 'react-toastify';
import Loading from '../../shared/Loading';
import { useNavigate } from 'react-router-dom';



const loadRazorpay = () => {
  return new Promise((resolve) => {
    if (window.Razorpay) {
      resolve(true)
      return
    }
    const script = document.createElement('script')
    script.src = 'https://checkout.razorpay.com/v1/checkout.js'
    script.onload = () => resolve(true)
    script.onerror = () => resolve(false)
    document.body.appendChild(script)
  })
}

const Cart = () => {

  const { handleGetCart, handleRemoveItem, handleDecrementCartItemQuantity, handleIncrementCartItemQuantity, handleCreateCartOrder, handleVerifyCartOrder } = useCart();

  const cart = useSelector((state) => state.cart.userCart);
  const loading = useSelector((state) => state.cart.loading);
  const user = useSelector((state) => state.auth.user);
  const [selectedAddressId, setSelectedAddressId] = useState(null)


  const navigate = useNavigate()



  useEffect(() => {
    const fetchCart = async () => {
      await handleGetCart();
    }
    fetchCart();
  }, []);



  const increaseQuantity = async (itemId) => {
    const res = await handleIncrementCartItemQuantity(itemId)
    if (!res.success) {
      toast.error(res.message)
    }
  }


  const decreaseQuantity = async (itemId) => {
    const res = await handleDecrementCartItemQuantity(itemId)
    if (!res.success) {
      toast.error(res.message)
    }
  }



  const calculateSubtotal = (items = []) => {
    return items.reduce((total, item) => {
      return total + (
        item.variant.price.amount * item.quantity
      )
    }, 0)
  }


  const subtotal = calculateSubtotal(cart?.items)





  const handleCheckoutOrder = async () => {
      if (!selectedAddressId) {
       toast.error('Please select a delivery address')
    return
  }
    const loaded = await loadRazorpay()
    if (!loaded) {
      toast.error('error to load razorpay this time please try later')
      return
    }

    const data = await handleCreateCartOrder()

    if (data.success) {
      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: data.paymentOrder.amount,
        currency: data.paymentOrder.currency,
        name: "WearVerse",
        description: "Test Transaction",
        order_id: data.paymentOrder.id,
        handler: async (response) => {
          
          const isValid = await handleVerifyCartOrder({
            razorpay_order_id: response.razorpay_order_id,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature,
            addressId: selectedAddressId
          })


          if (isValid.success) {
            navigate(`/order-confirmed?order_id=${isValid.orderId}`)
          } else {
            toast.error('Payment verification failed')
          }
        },
        prefill: {
          name: user?.fullname,
          email: user?.email,
          contact: user?.contact,
        },
        theme: { color: "#745a27" },
        modal: {
          ondismiss: () => toast.info('Payment cancelled')
        }
      }

      const rzp = new window.Razorpay(options)  // window.Razorpay
      rzp.open()
    } else {
      toast.error("Unable to create order")
    }
  }




  if (loading) {
    return (
      <Loading />
    )
  }



  return (
    <>
      <link
        href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400&family=Inter:wght@300;400;500;600&display=swap"
        rel="stylesheet"
      />

      <div className="min-h-screen bg-[#fbf9f6] text-[#1b1c1a] 
        font-[family-name:var(--font-sans)] selection:bg-[#C9A96E]/30">

        <main className="max-w-[1200px] mx-auto 
          px-4 sm:px-8 lg:px-12 xl:px-16 
          py-10 sm:py-14 lg:py-20">

          <header className="mb-12 sm:mb-16 lg:mb-20 
            animate-[wishlistFadeIn_0.8s_ease-out_forwards]">
            <p className="text-[9px] sm:text-[10px] tracking-[0.3em] uppercase text-[#C9A96E] 
              font-[family-name:var(--font-sans)] font-medium mb-4 sm:mb-5">
              Your Selection
            </p>

            <h1
              className="font-[family-name:var(--font-serif)] font-light italic 
                text-[clamp(40px,8vw,78px)] leading-[0.95] text-[#1b1c1a] 
                mb-6 sm:mb-8"
            >
              Shopping Bag
            </h1>

            <div className="flex items-center gap-4 sm:gap-5">
              <div className="w-10 sm:w-10 h-px bg-[#d0c5b5]" />
              <p className="font-[family-name:var(--font-serif)] italic text-sm sm:text-base 
                text-[#7A6E63] font-light tracking-[0.01em]">
                Review your items before proceeding to checkout.
              </p>
            </div>
          </header>

          {!cart || cart?.items?.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-24 sm:py-32 gap-6 
              animate-[wishlistFadeIn_0.6s_ease-out_forwards]">

              {/* Empty bag icon */}
              <div className="w-20 h-20 flex items-center justify-center 
                bg-[#eae8e5] rounded-full mb-2">
                <svg className="w-8 h-8 text-[#B5ADA3]" viewBox="0 0 24 24"
                  fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path strokeLinecap="round" strokeLinejoin="round"
                    d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
              </div>

              <p className="font-[family-name:var(--font-serif)] text-2xl sm:text-3xl 
                text-[#4d463a] italic font-light">
                Your bag is empty.
              </p>
              <p className="text-[11px] tracking-[0.12em] text-[#B5ADA3] uppercase max-w-xs text-center">
                Your collection awaits its first addition.
              </p>

              <Link
                to="/"
                className="mt-4 py-3 px-8 
                  bg-[#1b1c1a] text-[#fbf9f6] 
                  text-[10px] tracking-[0.2em] uppercase 
                  transition-all duration-300 
                  hover:bg-[#C9A96E] hover:text-[#1b1c1a]"
              >
                Continue Shopping
              </Link>
            </div>
          ) : (

            <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-12 lg:gap-20 items-start
              animate-[wishlistFadeIn_0.8s_ease-out_0.2s_forwards] opacity-0">

              {/*  LEFT: Item List  */}
              <section className="flex flex-col gap-10" aria-label="Cart items">
                {cart?.items?.map((item) => (
                  <CartItem
                    key={item._id}
                    item={item}
                    increaseQuantity={increaseQuantity}
                    decreaseQuantity={decreaseQuantity}
                    removeItem={handleRemoveItem}
                  />
                ))}
              </section>

              {/*  RIGHT: Order Summary  */}
              <aside
                className="bg-[#f5f3f0] p-8 sm:p-10 sticky top-20"
                aria-label="Order summary"
              >


                <section className="mb-8">
                  <h2
                    className="text-xl font-light text-[#1b1c1a] mb-8 font-[family-name:var(--font-serif)] italic"
                  >
                    Deliver to Address
                  </h2>

                  {!selectedAddressId && (
                    <p className="text-[11px] text-red-400 mb-3">No address selected. To add new address go to Your profile.</p>
                  )}


                  <div className="flex flex-col  gap-3">
                    {user?.addresses?.map(addr => (
                      <div
                        key={addr._id}
                        onClick={() => setSelectedAddressId(addr._id)}
                        className={`cursor-pointer flex gap-3 items-start transition-all duration-200 }`}
                      >
                        {/* Radio */}
                        <div className={`w-4 h-4 min-w-3 border-[1.5px] border-zinc-400 mt-0.5 flex items-center justify-center`}>
                          {selectedAddressId === addr._id && (
                            <div className="w-2 h-2 bg-[#404040] rounded-full" />
                          )}
                        </div>

                        <div>
                          <span className={`text-[12px] tracking-[0.15em] uppercase px-2 py-0.5  mb-1.5 
            ${selectedAddressId === addr._id ? ' text-[#272727]' : ' text-[#6c6c6a]'}`}>
                            {addr.label}
                          </span>
                          <p className="text-[13px] text-[#1b1c1a]">{addr.addressLine}</p>
                          <p className="text-[12px] text-[#7A6E63]">{addr.city}, {addr.state} — {addr.pincode}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
                  {/*  divider */}
                  <div className="h-px bg-[#d0c5b5]/40 mb-8" />


                <section>
                  <h2
                    className="text-xl font-light text-[#1b1c1a] mb-8 font-[family-name:var(--font-serif)] italic"
                  >
                    Order Summary
                  </h2>

                  {/* Summary Rows */}
                  <div className="flex flex-col gap-5 mb-8">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] tracking-wider uppercase text-[#7A6E63] font-medium">
                        Subtotal
                        <span className="ml-1 opacity-60">({cart.items.length})</span>
                      </span>
                      <span className="text-sm font-medium text-[#1b1c1a]">
                        ₹{(subtotal).toLocaleString('en-IN')}
                      </span>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-[11px] tracking-wider uppercase text-[#7A6E63] font-medium">Shipping</span>
                      <span className="text-[10px] font-semibold text-[#C9A96E] tracking-[0.15em] uppercase">
                        Complimentary
                      </span>
                    </div>
                  </div>

                  {/* Tonal divider */}
                  <div className="h-px bg-[#d0c5b5]/40 mb-8" />

                  {/* Total */}
                  <div className="flex items-center justify-between mb-10">
                    <span className="text-[11px] tracking-[0.2em] uppercase text-[#1b1c1a] font-bold">
                      Total
                    </span>
                    <span
                      className="text-lg font-medium text-[#1b1c1a]"
                    >
                      ₹{(subtotal).toLocaleString('en-IN')}
                    </span>
                  </div>


                  <button
                    onClick={handleCheckoutOrder}
                    id="cart-checkout-btn"
                    className="w-full bg-[#1b1c1a] text-[#fbf9f6] py-4 px-8 
                    text-[10px] tracking-[0.2em] uppercase
                    transition-all duration-300 
                    hover:bg-[#C9A96E] hover:text-[#1b1c1a]
                    focus:outline-none"
                   
                  >
                    Proceed to Checkout
                  </button>

                  {/* Continue Shopping */}
                  <div className="mt-8 text-center">
                    <Link
                      to="/"
                      className="text-[9px] tracking-[0.2em] uppercase text-[#7A6E63]
                      underline underline-offset-8 decoration-[#d0c5b5]
                      transition-colors duration-300 hover:text-[#C9A96E] hover:decoration-[#C9A96E]"
                    >
                      Continue Shopping
                    </Link>
                  </div>

                </section>
              </aside>

            </div>
          )}
        </main>
      </div>
    </>
  );
};

export default Cart;
