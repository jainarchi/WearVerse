import React from 'react'
import { formatPrice } from '../../shared/utils/formatPrice'


const ProductCard = ({ product, onClick, isPriority }) => {

  return (
    <div
      onClick={onClick}
      className="cursor-pointer group"
    >
      {/* ── Image ── */}
      <div className="relative overflow-hidden bg-[#eae8e5] mb-4 sm:mb-5"
           style={{ aspectRatio: '3/4' }}>
        {product?.image ? (
          <img
            src={product.image}
            alt={product.title || 'Product'}
            loading={isPriority ? "eager" : "lazy"}        
            decoding={isPriority ? "sync" : "async"}        
            fetchPriority={isPriority ? "high" : "low"}
            className="w-full h-full object-cover transition-transform duration-[600ms] ease-[cubic-bezier(0.4,0,0.2,1)] hover:scale-102"
            
          />
        ) : (
          <div className="w-full h-full bg-[#e4e2df] flex items-center justify-center">
            {/* Placeholder icon */}
            <svg
              className="w-8 h-8 sm:w-10 sm:h-10 text-[#B5ADA3]"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
            >
              <rect x="3" y="3" width="18" height="18" rx="0" />
              <circle cx="8.5" cy="8.5" r="1.5" />
              <polyline points="21 15 16 10 5 21" />
            </svg>
          </div>
        )}
      </div>

      {/* ── Info ── */}
      <div className="space-y-1.5">
        <p
          className="font-[family-name:var(--font-serif)] text-lg sm:text-xl font-normal text-[#1b1c1a]
                     leading-snug inline-block border-b border-transparent
                     transition-[border-color] duration-300
                     group-hover:border-snitch-faint  "
        >
          {product.title || 'Untitled'}
        </p>

        <p className="font-[family-name:var(--font-sans)] text-xs sm:text-[13px] font-light
                      text-[#7A6E63] tracking-[0.02em]">
          {formatPrice(product?.price)}
        </p>
      </div>
    </div>
  )
}

export default ProductCard