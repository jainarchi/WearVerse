import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useOrder } from '../hook/useOrder';
import { formatPrice } from '../../shared/utils/formatPrice';
import OrderDetailCard from '../component/OrderDetailCard';
import Icons from '../../shared/icons/Icons';

/* ── Helpers ── */
const formatDate = (dateStr) => {
  if (!dateStr) return '—';
  return new Date(dateStr).toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  });
};

const formatTime = (dateStr) => {
  if (!dateStr) return '';
  return new Date(dateStr).toLocaleTimeString('en-IN', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  });
};

const STATUS_CONFIG = {
  pending: { bg: 'bg-amber-100', text: 'text-amber-700', dot: 'bg-amber-500', label: 'Pending' },
  confirmed: { bg: 'bg-[#d4f0dc]', text: 'text-[#2d6a4f]', dot: 'bg-[#2d6a4f]', label: 'Confirmed' },
  processing: { bg: 'bg-blue-100', text: 'text-blue-700', dot: 'bg-blue-500', label: 'Processing' },
  shipped: { bg: 'bg-[#fef3c7]', text: 'text-[#92400e]', dot: 'bg-[#92400e]', label: 'Shipped' },
  delivered: { bg: 'bg-emerald-100', text: 'text-emerald-700', dot: 'bg-emerald-500', label: 'Delivered' },
  cancelled: { bg: 'bg-red-100', text: 'text-red-600', dot: 'bg-red-500', label: 'Cancelled' },
};

/* ── Small Info Block ── */
const InfoBlock = ({ label, value, mono = false }) => (
  <div>
    <p className="
      font-[family-name:var(--font-sans)]
      text-[8px] sm:text-[9px] tracking-[0.24em] uppercase
      text-[#B5ADA3] mb-1
    ">
      {label}
    </p>
    <p className={`
      font-[family-name:var(--font-sans)]
      text-[11px] sm:text-xs text-[#1b1c1a] font-medium
      ${mono ? 'tracking-[0.06em]' : ''}
    `}>
      {value || '—'}
    </p>
  </div>
);


/* ── Section Header ── */
const SectionHeader = ({ label, count }) => (
  <div className="flex items-center gap-4 mb-5 sm:mb-6">
    {/* <div className="w-6 sm:w-8 h-px bg-[#C9A96E]" /> */}
    <p className="
      font-[family-name:var(--font-sans)]
      text-[9px] sm:text-[10px] tracking-[0.28em] uppercase
      text-[#C9A96E] font-medium
    ">
      {label}{count !== undefined ? <span className="ml-1.5 text-[#B5ADA3]">({count})</span> : null}
    </p>
  </div>
);


const JOURNEY_STEPS = [
  {
    key: 'pending', label: 'Order Placed', icon: (
      <Icons.Pending className='w-4 h-4  fill-[#ffffff] ' />
    )
  },
  {
    key: 'confirmed', label: 'Confirmed', icon: (
      <Icons.Confirmed className='w-4 h-4  fill-[#ffffff] ' />
    )
  },
  {
    key: 'processing', label: 'Processing', icon: (
      <Icons.Processing className='w-4 h-4  fill-[#ffffff] ' />
    )
  },
  {
    key: 'shipped', label: 'Shipped', icon: (
      <Icons.Shipped className='w-4 h-4  fill-[#ffffff] ' />
    )
  },
  {
    key: 'delivered', label: 'Delivered', icon: (
      <Icons.Delivered className='w-4 h-4  fill-[#ffffff] ' />
    )
  },
];

const getStepIndex = (status) => {
  const order = ['pending', 'confirmed', 'processing', 'shipped', 'delivered'];
  const idx = order.indexOf(status?.toLowerCase());
  return idx === -1 ? 0 : idx;
};

const OrderJourney = ({ status = 'confirmed' }) => {
  const isCancelled = status?.toLowerCase() === 'cancelled';
  const activeIdx = isCancelled ? -1 : getStepIndex(status);

  if (isCancelled) {
    return (
      <div
        id="order-journey"
        className="
          w-full bg-white p-5 sm:p-6
          animate-[orderFadeIn_0.6s_ease-out_0.1s_both]
          mb-8 sm:mb-10
        "
      >
        <SectionHeader label="Order Journey" />
        <div className="flex items-center gap-3 py-2">
          <span className="w-2 h-2 rounded-full bg-red-500 shrink-0" />
          <p className="
            font-[family-name:var(--font-sans)]
            text-[10px] tracking-[0.18em] uppercase text-red-600 font-medium
          ">
            This order has been cancelled
          </p>
        </div>
      </div>
    );
  }

  return (
    <div
      id="order-journey"
      className="
        w-full bg-white p-5 sm:p-6
        animate-[orderFadeIn_0.6s_ease-out_0.1s_both]
        mb-8 sm:mb-10
      "
    >
      <SectionHeader label="Order Journey" />

      {/* ── Desktop Horizontal Stepper ── */}
      <div className="hidden sm:block">
        <div className="flex items-start">
          {JOURNEY_STEPS.map((step, idx) => {
            const isCompleted = idx < activeIdx;
            const isActive = idx === activeIdx;
            const isFuture = idx > activeIdx;

            return (
              <div key={step.key} className="flex-1 flex flex-col items-center relative group">

                {/* Connector line — left side */}
                {idx > 0 && (
                  <div className="absolute top-[18px] right-1/2 left-[-50%] h-[1.5px] -translate-y-1/2" style={{ left: 0, right: '50%' }}>
                    <div className={`h-full transition-all duration-700 ${isCompleted || isActive ? 'bg-[#C9A96E]' : 'bg-[#e8e4df]'
                      }`} />
                  </div>
                )}

                {/* Connector line — right side */}
                {idx < JOURNEY_STEPS.length - 1 && (
                  <div className="absolute top-[18px] h-[1.5px]" style={{ left: '50%', right: 0 }}>
                    <div className={`h-full transition-all duration-700 ${isCompleted ? 'bg-[#C9A96E]' : 'bg-[#eae8e5]'
                      }`} />
                  </div>
                )}

                {/* Step circle */}
                <div className={`
                  relative z-10 w-9 h-9 flex items-center justify-center
                  transition-all duration-500
                  ${isActive
                    ? 'bg-[#C9A96E] text-white ring-4 ring-[#C9A96E]/20'
                    : isCompleted
                      ? 'bg-[#1b1c1a] text-white'
                      : 'bg-[#eae8e5] text-[#B5ADA3]'
                  }
                `}>
                  {isCompleted ? (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-3.5 h-3.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>
                  ) : (
                    step.icon
                  )}

                  {/* Active pulse ring */}
                  {isActive && (
                    <span className="absolute inset-0 animate-ping bg-[#C9A96E] opacity-20" />
                  )}
                </div>

                {/* Label */}
                <p className={`
                  mt-2.5 text-center
                  font-[family-name:var(--font-sans)]
                  text-[8px] sm:text-[9px] tracking-[0.16em] uppercase
                  transition-colors duration-300
                  ${isActive
                    ? 'text-[#C9A96E] font-semibold'
                    : isCompleted
                      ? 'text-[#1b1c1a] font-medium'
                      : 'text-[#B5ADA3]'
                  }
                `}>
                  {step.label}
                </p>

                {/* Active underline */}
                {isActive && (
                  <div className="mt-1 w-4 h-[1.5px] bg-[#C9A96E] mx-auto" />
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* ── Mobile Vertical Stepper ── */}
      <div className="sm:hidden flex flex-col gap-0">
        {JOURNEY_STEPS.map((step, idx) => {
          const isCompleted = idx < activeIdx;
          const isActive = idx === activeIdx;
          const isFuture = idx > activeIdx;
          const isLast = idx === JOURNEY_STEPS.length - 1;

          return (
            <div key={step.key} className="flex gap-4">
              {/* Left — circle + vertical line */}
              <div className="flex flex-col items-center shrink-0">
                <div className={`
                  w-8 h-8 flex items-center justify-center
                  transition-all duration-500 shrink-0
                  ${isActive
                    ? 'bg-[#C9A96E] text-white ring-4 ring-[#C9A96E]/20'
                    : isCompleted
                      ? 'bg-[#1b1c1a] text-white'
                      : 'bg-[#eae8e5] text-[#B5ADA3]'
                  }
                `}>
                  {isCompleted ? (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-3.5 h-3.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>
                  ) : step.icon}
                </div>
                {!isLast && (
                  <div className={`w-[1.5px] flex-1 min-h-[24px] my-1 transition-colors duration-700 ${isCompleted ? 'bg-[#C9A96E]' : 'bg-[#eae8e5]'
                    }`} />
                )}
              </div>

              {/* Right — label */}
              <div className="pb-5">
                <p className={`
                  font-[family-name:var(--font-sans)]
                  text-[9px] tracking-[0.16em] uppercase mt-1.5
                  transition-colors duration-300
                  ${isActive
                    ? 'text-[#C9A96E] font-semibold'
                    : isCompleted
                      ? 'text-[#1b1c1a] font-medium'
                      : 'text-[#B5ADA3]'
                  }
                `}>
                  {step.label}
                  {isActive && <span className="ml-2 normal-case italic text-[8px] text-[#C9A96E]/70">— Current</span>}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};


/*  Main Component   */



const OrderDetails = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const { handleGetOrderDetails } = useOrder();

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchOrder = async () => {
    if (!orderId) return;
    try {
      setLoading(true);
      setError(null);
      const res = await handleGetOrderDetails(orderId);
      if (res.success) {
        setOrder(res.order);
      } else {
        setError(res.message || 'Could not load order.');
      }
    } catch (err) {
      setError(err.message || 'Something went wrong.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchOrder(); }, [orderId]);

  /* ── Derived data ── */
  const shortId = orderId ? `#SN-${orderId.slice(-6).toUpperCase()}` : '—';
  const subOrders = order?.subOrders ?? [];
  const allItems = subOrders.flatMap(s => s.items ?? []);
  const itemCount = allItems.length;

  return (
    <>
      <link
        href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400&family=Inter:wght@300;400;500;600&display=swap"
        rel="stylesheet"
      />

      <div className="min-h-screen bg-[#fbf9f6] text-[#1b1c1a] selection:bg-[#C9A96E]/30 pb-24">
        <main className="max-w-[1200px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 py-8 sm:py-12">

          {/* ── Back navigation ── */}
          <button
            id="back-to-orders"
            onClick={() => navigate('/orders')}
            className="
              flex items-center gap-2 mb-8 sm:mb-10
              font-[family-name:var(--font-sans)]
              text-[10px] tracking-[0.2em] uppercase text-[#7A6E63]
              transition-all duration-300 cursor-pointer
              hover:text-[#C9A96E]
              group
            "
          >
            <svg
              className="w-3.5 h-3.5 transition-transform duration-300 group-hover:-translate-x-0.5"
              fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
            Order History
          </button>

          {/* ── Loading skeleton ── */}
          {loading && (
            <div id="order-detail-loading" className="animate-pulse space-y-6">
              {/* Header skeleton */}
              <div className="space-y-3 mb-10">
                <div className="h-3 bg-[#eae8e5] w-24" />
                <div className="h-12 bg-[#eae8e5] w-64" />
                <div className="h-3 bg-[#eae8e5] w-40" />
              </div>
              {/* Cards skeleton */}
              {[...Array(3)].map((_, i) => (
                <div key={i} className="flex gap-4 p-5 bg-white">
                  <div className="w-24 h-[120px] bg-[#eae8e5] shrink-0" />
                  <div className="flex-1 space-y-3">
                    <div className="h-3 bg-[#eae8e5] w-16" />
                    <div className="h-5 bg-[#eae8e5] w-3/4" />
                    <div className="h-3 bg-[#eae8e5] w-1/2" />
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* ── Error state ── */}
          {!loading && error && (
            <div
              id="order-detail-error"
              className="
                flex flex-col items-center justify-center py-24 gap-6
                animate-[orderFadeIn_0.6s_ease-out_forwards]
              "
            >
              <div className="w-16 h-16 flex items-center justify-center bg-[#eae8e5]">
                <svg className="w-6 h-6 text-[#B5ADA3]" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round"
                    d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
                </svg>
              </div>
              <p className="font-[family-name:var(--font-serif)] text-xl italic font-light text-[#4d463a]">
                Something went wrong.
              </p>
              <p className="text-[11px] tracking-[0.12em] text-[#B5ADA3] uppercase max-w-xs text-center">{error}</p>
              <button
                id="retry-order-detail"
                onClick={fetchOrder}
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

          {/* ── Main content ── */}
          {!loading && !error && order && (
            <div className="animate-[orderFadeIn_0.7s_ease-out_forwards]">

              {/*Page Header*/}
              <header className="mb-10 sm:mb-14">

                <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3 sm:gap-6">
                  <h1 className="
                    font-[family-name:var(--font-serif)] font-light italic
                    text-[clamp(30px,6vw,62px)] leading-[0.95] text-[#1b1c1a]
                  ">
                    Order Details
                  </h1>

                  {/* Order ID + date */}
                  <div className="text-right shrink-0">
                    <p className="
                      font-[family-name:var(--font-sans)]
                      text-base sm:text-lg font-medium text-[#1b1c1a] tracking-[0.04em]
                    ">
                      {shortId}
                    </p>
                    <p className="
                      font-[family-name:var(--font-sans)]
                      text-[10px] sm:text-[11px] tracking-[0.08em] text-[#7A6E63] mt-0.5
                    ">
                      {formatDate(order.createdAt)}&nbsp;&nbsp;·&nbsp;&nbsp;{formatTime(order.createdAt)}
                    </p>
                  </div>
                </div>

              </header>

              {/* Two-column layout on lg+  */}
              <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] xl:grid-cols-[1fr_380px] gap-8 lg:gap-10 xl:gap-14 items-start">

                {/* ── LEFT COLUMN — Sub-orders ── */}
                <div className="space-y-10 sm:space-y-12">

                  {/* Order Journey Stepper */}
                  <OrderJourney
                    status={subOrders[0]?.status ?? 'confirmed'}
                  />
                  {subOrders.map((subOrder, sIdx) => {
                    const status = (subOrder.status || 'confirmed').toLowerCase();
                    const cfg = STATUS_CONFIG[status] ?? STATUS_CONFIG.confirmed;
                    const items = subOrder.items ?? [];
                    const subTotal = items.reduce(
                      (acc, it) => acc + (it.price?.amount ?? 0) * (it.quantity ?? 1), 0
                    );
                    const currency = items[0]?.price?.currency ?? 'INR';

                    return (
                      <section
                        key={sIdx}
                        id={`suborder-${sIdx}`}
                        className="
                          animate-[orderFadeIn_0.55s_ease-out_both]
                        "
                        style={{ animationDelay: `${sIdx * 100}ms` }}
                      >
                        {/* Sub-order header */}
                        <div className="
                          flex flex-col min-[420px]:flex-row
                          min-[420px]:items-center min-[420px]:justify-between
                          gap-3 mb-5 pb-4 border-b border-[#eae8e5]
                        ">
                          <div className="flex items-center gap-3">
                            <SectionHeader
                              label={`Shipment ${sIdx + 1}`}
                              count={items.length}
                            />
                          </div>

                          {/* Shared shipping status for all items in this sub-order */}
                          <div className="flex items-center gap-2 ml-10 min-[420px]:ml-0">
                            <span className={`
                              inline-flex items-center gap-1.5
                              px-2.5 py-1
                              ${cfg.bg} ${cfg.text}
                              font-[family-name:var(--font-sans)]
                              text-[9px] sm:text-[10px] tracking-[0.18em] uppercase font-semibold
                            `}>
                              <span className={`w-1.5 h-1.5 rounded-full ${cfg.dot}`} />
                              {cfg.label}
                            </span>
                            <span className="
                              font-[family-name:var(--font-sans)]
                              text-[9px] sm:text-[10px] tracking-[0.12em] uppercase
                              text-[#B5ADA3]
                            ">
                              — Same Seller
                            </span>
                          </div>
                        </div>

                        {/* Item cards */}
                        <div className="flex flex-col divide-y divide-[#eae8e5]">
                          {items.map((item, iIdx) => (
                            <OrderDetailCard
                              key={item._id ?? `${sIdx}-${iIdx}`}
                              item={item}
                              status={subOrder.status}
                              index={sIdx * 3 + iIdx}
                            />
                          ))}
                        </div>

                        {/* Sub-order subtotal */}
                        {items.length > 1 && (
                          <div className="
                            flex justify-end mt-4 pt-4 border-t border-dashed border-[#d0c5b5]
                          ">
                            <div className="text-right">
                              <p className="

                                text-[8px] tracking-[0.22em] uppercase text-[#B5ADA3] mb-1
                              ">
                                Shipment Subtotal
                              </p>
                              <p className="
                              
                                text-lg sm:text-xl text-[#1b1c1a]
                              ">
                                {formatPrice({ amount: subTotal, currency })}
                              </p>
                            </div>
                          </div>
                        )}
                      </section>
                    );
                  })}
                </div>

                {/* ── RIGHT COLUMN — Summary sidebar ── */}
                <aside className="space-y-5 lg:sticky lg:top-24">

                  {/* ── Payment Summary Card ── */}
                  <div
                    id="payment-summary"
                    className="
                      bg-white p-5 sm:p-6
                      animate-[orderFadeIn_0.6s_ease-out_0.2s_both]
                    "
                  >
                    <SectionHeader label="Payment Summary" />

                    {/* Payment status */}
                    <div className="flex items-center justify-between py-3 border-b border-[#eae8e5]">
                      <p className="
                        font-[family-name:var(--font-sans)]
                        text-[10px] sm:text-[11px] tracking-[0.1em] text-[#7A6E63]
                      ">
                        Payment Status
                      </p>
                      {order.payment?.status === 'paid' ? (
                        <span className="
                          inline-flex items-center gap-1.5
                          px-2.5 py-0.5
                          bg-[#d4f0dc] text-[#2d6a4f]
                          font-[family-name:var(--font-sans)]
                          text-[9px] tracking-[0.18em] uppercase font-semibold
                        ">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#2d6a4f]" />
                          Paid
                        </span>
                      ) : (
                        <span className="
                          font-[family-name:var(--font-sans)]
                          text-[10px] tracking-[0.14em] uppercase text-[#B5ADA3]
                        ">
                          {order.payment?.status || '—'}
                        </span>
                      )}
                    </div>

                    {/* Razorpay order ID */}
                    {order.payment?.razorpay?.orderId && (
                      <div className="flex items-start justify-between py-3 border-b border-[#eae8e5] gap-4">
                        <p className="
                          font-[family-name:var(--font-sans)]
                          text-[10px] sm:text-[11px] tracking-[0.1em] text-[#7A6E63] shrink-0
                        ">
                          Transaction Ref
                        </p>
                        <p className="
                          font-[family-name:var(--font-sans)]
                          text-[10px] sm:text-[11px] text-[#4d463a]
                          tracking-[0.04em] text-right break-all
                        ">
                          {order.payment.razorpay.orderId}
                        </p>
                      </div>
                    )}

                    {/* Item count */}
                    <div className="flex items-center justify-between py-3 border-b border-[#eae8e5]">
                      <p className="
                        font-[family-name:var(--font-sans)]
                        text-[10px] sm:text-[11px] tracking-[0.1em] text-[#7A6E63]
                      ">
                        Items
                      </p>
                      <p className="
                        font-[family-name:var(--font-sans)]
                        text-[11px] sm:text-xs text-[#1b1c1a] font-medium
                      ">
                        {itemCount}
                      </p>
                    </div>

                    {/* Order total */}
                    <div className="flex items-center justify-between pt-5 mt-1">
                      <p className="
                        font-[family-name:var(--font-sans)]
                        text-[10px] sm:text-[11px] tracking-[0.14em] uppercase text-[#1b1c1a] font-medium
                      ">
                        Order Total
                      </p>
                      <p className="
                        text-2xl sm:text-xl text-[#1b1c1a]
                      ">
                        {formatPrice(order.price ?? order.payment?.totalPrice)}
                      </p>
                    </div>
                  </div>

                  {/* ── Delivery Address Card ── */}
                  {order.deliveryAddress && (
                    <div
                      id="delivery-address"
                      className="
                        bg-white p-5 sm:p-6
                        animate-[orderFadeIn_0.6s_ease-out_0.3s_both]
                      "
                    >
                      <SectionHeader label="Delivery Address" />

                      <div className="flex gap-3 mt-1">
                        {/* Pin icon */}
                        <div className="shrink-0 pt-0.5">
                          <Icons.Location className='w-4 h-4  fill-[#C9A96E] ' />
                        </div>

                        <div>

                          {order.deliveryAddress.label && (
                            <span className="
                              inline-block
                              font-[family-name:var(--font-sans)]
                              text-[10px] tracking-[0.22em] uppercase
                              text-[#C9A96E] mb-1 font-medium
                            ">
                              {order.deliveryAddress.label}
                            </span>
                          )}

                          <p className="
                            font-[family-name:var(--font-sans)]
                            text-[11px] sm:text-xs text-[#1b1c1a] leading-relaxed
                          ">
                            {order.deliveryAddress.addressLine}
                          </p>
                          <p className="
                            font-[family-name:var(--font-sans)]
                            text-[11px] sm:text-xs text-[#4d463a]
                          ">
                            {order.deliveryAddress.city}, {order.deliveryAddress.state}
                          </p>
                          <p className="
                            font-[family-name:var(--font-sans)]
                            text-[11px] sm:text-xs text-[#7A6E63] tracking-[0.06em]
                          ">
                            {order.deliveryAddress.pincode}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                </aside>

              </div>
            </div>
          )}

          {/* ── No order data ── */}
          {!loading && !error && !order && (
            <div
              id="no-order-state"
              className="
                flex flex-col items-center justify-center py-24 gap-6
                animate-[orderFadeIn_0.6s_ease-out_forwards]
              "
            >
              <p className="font-[family-name:var(--font-serif)] text-2xl italic font-light text-[#4d463a]">
                Order not found.
              </p>
              <Link
                to="/orders"
                className="
                  py-3 px-8
                  bg-[#1b1c1a] text-[#fbf9f6]
                  font-[family-name:var(--font-sans)]
                  text-[10px] tracking-[0.2em] uppercase
                  transition-all duration-300
                  hover:bg-[#C9A96E] hover:text-[#1b1c1a]
                "
              >
                Back to Orders
              </Link>
            </div>
          )}

        </main>
      </div>
    </>
  );
};

export default OrderDetails;
