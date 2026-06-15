import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const formatPrice = (price) => {
  if (!price) return '—';
  const sym =
    price.currency === 'INR' ? '₹'
    : price.currency === 'USD' ? '$'
    : price.currency === 'EUR' ? '€'
    : price.currency === 'GBP' ? '£'
    : price.currency ?? '';
  return `${sym}${Number(price.amount).toLocaleString('en-IN')}`;
};

/* ─── Stock Badge ─── */
const StockBadge = ({ stock }) => {
  const qty = Number(stock ?? 0);
  if (qty === 0) {
    return (
      <span className="inline-flex items-center gap-1 font-label text-[0.55rem] tracking-[0.12em] uppercase text-red-400 bg-red-50 border border-red-100 px-2 py-0.5">
        Out of Stock
      </span>
    );
  }
  if (qty <= 5) {
    return (
      <span className="inline-flex items-center gap-1 font-label text-[0.55rem] tracking-[0.12em] uppercase text-amber-600 bg-amber-50 border border-amber-100 px-2 py-0.5">
        Low · {qty} left
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1 font-label text-[0.55rem] tracking-[0.12em] uppercase text-emerald-600 bg-emerald-50 border border-emerald-100 px-2 py-0.5">
      In Stock · {qty}
    </span>
  );
};

/* ─── Icon: Trash ─── */
const TrashIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14H6L5 6"/>
    <path d="M10 11v6"/><path d="M14 11v6"/>
    <path d="M9 6V4h6v2"/>
  </svg>
);

/* ─── Icon: Eye ─── */
const EyeIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
    <circle cx="12" cy="12" r="3"/>
  </svg>
);

/* ─── Icon: Image Placeholder ─── */
const ImagePlaceholder = () => (
  <svg className="w-8 h-8 text-snitch-faint" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
    <rect x="3" y="3" width="18" height="18" rx="0"/>
    <circle cx="8.5" cy="8.5" r="1.5"/>
    <polyline points="21 15 16 10 5 21"/>
  </svg>
);




const SellerProductCard = ({ product, onDelete, isDeleting = false , alignment = 'vertical' }) => {
  const navigate = useNavigate();
  const [imgHovered, setImgHovered] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
    const [confirm, setConfirm] = useState(false);

   const firstKey = Object.keys(product.imagesByColor)[0];

  const productId  = product?._id;
  const title      = product?.title
  const price      = product?.price;
  const category   = product?.category;
  const stock      = product?.totalStock;
  const image      = product?.imagesByColor?.[firstKey][0].url  ?? null;
  const createdAt  = product?.createdAt
    ? new Date(product.createdAt).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })
    : null;

    const stockColor =
    stock === 0 ? 'text-red-400'
    : stock <= 5 ? 'text-amber-600'
    : 'text-emerald-600';

  const handleView = () => {
    if (productId) navigate(`/seller/dashboard/products/${productId}/variant`);
  };

  const handleDeleteClick = () => {
    if (!confirmDelete) { setConfirmDelete(true); return; }
    onDelete?.(productId);
    setConfirmDelete(false);
  };
 

  return <>{(alignment == 'vertical') ? 
   (
    <div className="group relative bg-snitch-cream border border-snitch-border/30 flex flex-col overflow-hidden transition-shadow duration-300 hover:shadow-[0_8px_32px_rgba(27,28,26,0.08)]">

      {/* ── Image area ── */}
      <div
        className="relative overflow-hidden bg-snitch-card cursor-pointer"
        style={{ aspectRatio: '4/3' }}
        onMouseEnter={() => setImgHovered(true)}
        onMouseLeave={() => setImgHovered(false)}
        onClick={handleView}
      >
        {image ? (
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.4,0,0.2,1)]"
            style={{ transform: imgHovered ? 'scale(1.04)' : 'scale(1)' }}
          />
        ) : (
          <div className="w-full h-full bg-snitch-card-lo flex items-center justify-center">
            <ImagePlaceholder />
          </div>
        )}

        {/* Gold overlay on hover */}
        <div
          className="absolute inset-0 bg-snitch-charcoal/0 transition-colors duration-300 pointer-events-none"
          style={{ backgroundColor: imgHovered ? 'rgba(27,28,26,0.12)' : 'transparent' }}
        />

        {/* "View" quick action */}
        <div
          className="absolute inset-0 flex items-center justify-center transition-opacity duration-300 pointer-events-none"
          style={{ opacity: imgHovered ? 1 : 0 }}
        >
          <span className="font-label text-[0.6rem] tracking-[0.18em] uppercase text-white bg-snitch-charcoal/20 backdrop-blur-sm px-4 py-2 ">
            Add Variant
          </span>
        </div>

      </div>

      {/* ── Content ── */}
      <div className="flex flex-col flex-1 p-4 sm:p-5 gap-3">

        {/* Name + price */}
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <h3
              className="font-serif text-[1.05rem] sm:text-[1.15rem] font-normal text-snitch-charcoal leading-snug m-0 truncate cursor-pointer border-b border-transparent transition-[border-color] duration-300 hover:border-snitch-charcoal"
              onClick={handleView}
              title={title}
            >
              {title}
            </h3>
            
            <h4 className='text-[13px] py-1 text-snitch-faint font-sarif'>{category}</h4>

            {createdAt && (
              <p className="font-label text-[0.55rem] tracking-[0.1em] uppercase text-snitch-faint m-0 mt-1">
                Added {createdAt}
              </p>
            )}
          </div>

          <div className="shrink-0 text-right">
            <p className="font-body text-[0.9rem] font-semibold text-snitch-charcoal m-0">
              {formatPrice(price)}
            </p>
          </div>
        </div>

        {/* Stock badge */}
        <div>
          <StockBadge stock={stock} />
        </div>

        {/* Divider */}
        <div className="border-t border-snitch-border/20 mt-auto" />

        {/* Actions row */}
        <div className="flex items-center justify-between pt-1 gap-2">
          {/* View button */}
          <button
            onClick={handleView}
            className="font-label text-[0.65rem] tracking-[0.1em] uppercase text-snitch-warm hover:text-snitch-gold bg-transparent border-none p-0 cursor-pointer transition-colors duration-300"
          >
           Add Variant
          </button>

          {/* Delete button — two-tap confirm */}
          <button
            onClick={handleDeleteClick}
            disabled={isDeleting}
            onBlur={() => setTimeout(() => setConfirmDelete(false), 200)}
            className={[
              'flex items-center gap-1.5 font-label text-[0.65rem] tracking-[0.1em] uppercase bg-transparent border-none p-0 cursor-pointer transition-all duration-300',
              confirmDelete
                ? 'text-red-500 underline underline-offset-2'
                : 'text-snitch-faint hover:text-red-400',
              isDeleting ? 'opacity-40 cursor-not-allowed' : '',
            ].join(' ')}
          >
            {isDeleting ? (
              <span className="animate-spin inline-block w-3 h-3 border border-current border-t-transparent rounded-full" />
            ) : (
              <TrashIcon />
            )}
            <span>{confirmDelete ? 'Confirm?' : 'Delete'}</span>
          </button>
        </div>

      </div>
    </div>
  ) :(

    <div className="flex items-center gap-4 bg-snitch-cream border border-snitch-border/25 px-4 py-3.5 hover:shadow-[0_4px_16px_rgba(27,28,26,0.06)] transition-shadow duration-300">

      {/* Thumbnail */}
      <div
        className="shrink-0 w-14 h-14 sm:w-16 sm:h-16 overflow-hidden bg-snitch-card cursor-pointer"
        onClick={() => navigate(`products/${productId}`)}
      >
        {image ? (
          <img src={image} alt={name} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
        ) : (
          <div className="w-full h-full bg-snitch-card-lo flex items-center justify-center">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" className="text-snitch-faint">
              <rect x="3" y="3" width="18" height="18"/><circle cx="8.5" cy="8.5" r="1.5"/>
              <polyline points="21 15 16 10 5 21"/>
            </svg>
          </div>
        )}
      </div>

      {/* Name + category */}
      <div className="flex-1 min-w-0">
        <p
          className="font-serif text-[0.95rem] text-snitch-charcoal m-0 leading-snug cursor-pointer truncate hover:text-snitch-gold transition-colors duration-300"
          onClick={() => navigate(`products/${productId}`)}
          title={name}
        >
          {name}
        </p>
       
      </div>

      {/* Price */}
      <div className=" shrink-0 text-right">
        <p className="font-body text-[0.88rem] font-semibold text-snitch-charcoal m-0">
          {formatPrice(price)}
        </p>
      </div>

      {/* Stock */}
      <div className=" shrink-0">
        <p className={`font-label text-[0.74rem] tracking-[0.1em] uppercase m-0 ${stockColor}`}>
          {stock === 0 ? 'Out of Stock' : `${stock} units`}
        </p>
      </div>

      {/* Delete */}
      <button
        onClick={() => {
          if (!confirm) { setConfirm(true); return; }
          onDelete?.(productId);
          setConfirm(false);
        }}
        onBlur={() => setTimeout(() => setConfirm(false), 200)}
        disabled={isDeleting}
        className={[
          'shrink-0 flex items-center gap-1.5 font-label text-[0.6rem] tracking-[0.1em] uppercase bg-transparent border-none p-0 cursor-pointer transition-colors duration-300',
          confirm ? 'text-red-500' : 'text-snitch-muted hover:text-red-400',
          isDeleting ? 'opacity-40 cursor-not-allowed' : '',
        ].join(' ')}
      >
        {isDeleting
          ? <span className="animate-spin inline-block w-3 h-3 border border-current border-t-transparent rounded-full" />
          : (
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14H6L5 6"/>
              <path d="M10 11v6"/><path d="M14 11v6"/>
              <path d="M9 6V4h6v2"/>
            </svg>
          )
        }
        <span>{confirm ? 'Sure?' : 'Delete'}</span>
      </button>
    </div>
  

  )
}
</>

};

export default SellerProductCard