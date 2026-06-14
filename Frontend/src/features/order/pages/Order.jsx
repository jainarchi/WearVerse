import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useOrder } from '../hook/useOrder';
import OrderCard from '../component/OrderCard';
import Icons from '../../shared/icons/Icons';



const FILTERS = [
  { key: 'all',       label: 'Active Orders' },
  { key: 'delivered', label: 'Past Orders'   },
];

const Order = () => {
  const { handleGetUserOrders } = useOrder();
  const [orders,  setOrders]  = useState([]);
  const [loading, setLoading] = useState(false);
  const [error,   setError]   = useState(null);
  const [filter,  setFilter]  = useState('all');


  const fetchOrders = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await handleGetUserOrders();
      if (data.success) {
        setOrders(data.orders ?? []);
      } else {
        setError(data.message || 'Could not load orders.');
      }
    } catch (err) {
      setError(err.message || 'Something went wrong.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchOrders(); }, []);

  /* ── Filtered list ── */
  const filtered =
    filter === 'all'
      ? orders
      : orders.filter(o => (o.status || '').toLowerCase() === filter);

  const orderCount = filtered.length;

  return (
    <>
   
      <link
        href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400&family=Inter:wght@300;400;500;600&display=swap"
        rel="stylesheet"
      />

      <div className="min-h-screen bg-[#fbf9f6] text-[#1b1c1a] selection:bg-[#C9A96E]/30 pb-20">

        <main className="max-w-[1200px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 py-10">

          <header
            id="order-history-header"
            className="mb-10 sm:mb-14 lg:mb-16 animate-[orderFadeIn_0.8s_ease-out_forwards]"
          >
           
            <p className="
              text-[9px] sm:text-[10px] tracking-[0.3em] uppercase text-[#C9A96E]
              font-[family-name:var(--font-sans)] font-medium mb-4 sm:mb-5
            ">
              Account&nbsp;/&nbsp;Orders
            </p>

            {/* Main title */}
            <h1 className="
              font-[family-name:var(--font-serif)] font-light italic
              text-[clamp(38px,7vw,80px)] leading-[0.95] text-[#1b1c1a]
              mb-4 sm:mb-8
            ">
              Your Orders
            </h1>

            {/* Divider + subtitle */}
            <div className="flex items-center gap-4 sm:gap-5">
              <div className="w-10 sm:w-14 h-px bg-[#d0c5b5]" />
              <p className="
                font-[family-name:var(--font-serif)] italic text-sm sm:text-base
                text-[#7A6E63] font-light tracking-[0.01em]
              ">
                Showing your active curation
              </p>
            </div>
          </header>

        
          {!loading && orders.length > 0 && (
            <div
              className="
                flex gap-0 mb-8 sm:mb-10 overflow-x-auto
                scrollbar-none pb-0.5
                animate-[orderFadeIn_0.6s_ease-out_0.15s_forwards] opacity-0
              "
              role="tablist"
              aria-label="Filter orders"
            >
              {FILTERS.map(({ key, label }) => (
                <button
                  key={key}
                  role="tab"
                  aria-selected={filter === key}
                  id={`filter-${key}`}
                  onClick={() => setFilter(key)}
                  className={`
                    shrink-0
                    px-4 sm:px-5 py-2.5
                    font-[family-name:var(--font-sans)]
                    text-[9px] sm:text-[10px] tracking-[0.18em] uppercase
                    transition-all duration-300 cursor-pointer border-b-2

                    ${filter === key
                      ? 'border-[#1b1c1a] text-[#1b1c1a] font-medium'
                      : 'border-transparent text-[#B5ADA3] hover:text-[#7A6E63] hover:border-[#d0c5b5]'
                    }
                  `}
                >
                  {label}
                </button>
              ))}
            </div>
          )}

          {/* Loading Skeleton */}
          {loading && (
            <div
              id="order-loading-skeleton"
              className="flex flex-col divide-y divide-[#d0c5b5]/40"
            >
              {[...Array(3)].map((_, i) => (
                <div key={i} className="py-6 sm:py-7 animate-pulse">
                  <div className="flex gap-4 sm:gap-6">
                    <div className="w-[72px] h-[90px] sm:w-[88px] sm:h-[110px] bg-[#eae8e5] shrink-0" />
                    <div className="flex-1 space-y-3">
                      <div className="h-3 bg-[#eae8e5] w-16" />
                      <div className="h-5 bg-[#eae8e5] w-3/4" />
                      <div className="h-3 bg-[#eae8e5] w-1/2" />
                      <div className="h-3 bg-[#eae8e5] w-1/4 mt-6" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

      
          {!loading && error && (
            <div
              id="order-error-state"
              className="
                flex flex-col items-center justify-center py-20 sm:py-28 gap-6
                animate-[orderFadeIn_0.6s_ease-out_forwards]
              "
            >
              <div className="w-16 h-16 flex items-center justify-center bg-[#eae8e5]">
                <svg className="w-6 h-6 text-[#B5ADA3]" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round"
                    d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
                </svg>
              </div>
              <p className="font-[family-name:var(--font-serif)] text-xl sm:text-2xl text-[#4d463a] italic font-light text-center">
                Something went wrong.
              </p>
              <p className="text-[11px] tracking-[0.12em] text-[#B5ADA3] uppercase max-w-xs text-center">
                {error}
              </p>
              <button
                id="retry-orders"
                onClick={fetchOrders}
                className="
                  mt-2 py-3 px-8
                  bg-[#1b1c1a] text-[#fbf9f6]
                  font-[family-name:var(--font-sans)]
                  text-[10px] tracking-[0.2em] uppercase
                  transition-all duration-300 cursor-pointer
                  hover:bg-[#C9A96E] hover:text-[#1b1c1a]
                "
              >
                Try Again
              </button>
            </div>
          )}

        
          {!loading && !error && orderCount === 0 && (
            <div
              id="order-empty-state"
              className="
                flex flex-col items-center justify-center py-24 sm:py-32 gap-6
                animate-[orderFadeIn_0.6s_ease-out_forwards]
              "
            >
              {/* Empty bag icon */}
              <div className="w-20 h-20 flex items-center justify-center bg-[#eae8e5] mb-2">
                <Icons.Order className="w-8 h-8 text-[#B5ADA3]" />
              </div>

              <p className="font-[family-name:var(--font-serif)] text-2xl sm:text-3xl text-[#4d463a] italic font-light">
                {filter === 'all' ? 'No orders yet.' : `No ${filter} orders.`}
              </p>
              <p className="text-[11px] tracking-[0.12em] text-[#B5ADA3] uppercase max-w-xs text-center">
                {filter === 'all'
                  ? 'Your order history will appear here after your first purchase.'
                  : 'Try viewing all orders or explore the collection.'}
              </p>

              <div className="flex flex-col min-[400px]:flex-row items-center gap-4 mt-2">
                {filter !== 'all' && (
                  <button
                    id="clear-filter-btn"
                    onClick={() => setFilter('all')}
                    className="
                      py-3 px-6
                      border border-[#d0c5b5] text-[#7A6E63]
                      font-[family-name:var(--font-sans)]
                      text-[10px] tracking-[0.18em] uppercase
                      transition-all duration-300 cursor-pointer
                      hover:border-[#1b1c1a] hover:text-[#1b1c1a]
                    "
                  >
                    View All
                  </button>
                )}
                <Link
                  to="/"
                  id="explore-from-empty"
                  className="
                    py-3 px-8
                    bg-[#1b1c1a] text-[#fbf9f6]
                    font-[family-name:var(--font-sans)]
                    text-[10px] tracking-[0.2em] uppercase
                    transition-all duration-300
                    hover:bg-[#C9A96E] hover:text-[#1b1c1a]
                  "
                >
                  Explore Collection
                </Link>
              </div>
            </div>
          )}

          {/* ── Orders List ── */}
          {!loading && !error && orderCount > 0 && (
            <>
              
                <p className="
                  font-[family-name:var(--font-sans)]
                  text-[10px] tracking-[0.2em] uppercase text-[#B5ADA3]
                     animate-[orderFadeIn_0.6s_ease-out_0.2s_forwards] opacity-0
                ">
                  {orderCount}&nbsp;{orderCount === 1 ? 'Order' : 'Orders'}
                </p>


             
              <div
                id="order-list"
                className="flex flex-col gap-4 gap-5"
              >
                {filtered.map((order, idx) => (
                  <OrderCard
                    key={order._id ?? order.id ?? idx}
                    order={order}
                    index={idx}
                  />
                ))}
              </div>

           
            </>
          )}

        </main>
      </div>
    </>
  );
};

export default Order;
