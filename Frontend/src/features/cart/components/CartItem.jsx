import React from 'react';
import Loading from '../../shared/Loading';
import Icons from '../../shared/icons/Icons';

const CartItem = ({ item, removeItem , increaseQuantity , decreaseQuantity}) => {
  if (!item) return null;

  const { _id, product, variant, quantity } = item;


  return (
    <article className="flex gap-5 bg-white p-2 sm:p-4 transition-shadow duration-300 hover:shadow-[0_20px_80px_rgba(27,28,26,0.05)]">

      <div className="flex-shrink-0 w-30 bg-[#efeeeb] overflow-hidden aspect-[5/6]">
        {variant.image ? (
          <img
            src={variant.image.url}
            alt={product.title || 'Product'}
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-105 "
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-[#4d463a] text-xs tracking-widest uppercase">
            No Image
          </div>
        )}
      </div>

      {/* ── Item Details ── */}
      <div className="flex flex-1 flex-col justify-between min-w-0">
        {/* Top row: name + price */}
        <div >
          <div>


            <div className='flex justify-between items-center '>
              <p className="text-[10px] tracking-[0.15em] uppercase text-[#a19f96] font-medium font-[Inter] mb-0.5">
                {'SNITCH'}
              </p>


              <Icons.Delete
               size={'16px'} 
               onClick={() => {removeItem(_id)}}
               className=' text-gray-400 hover:text-red-600 cursor-pointer'
               />

            </div>
            <h3 className="text-base py-2 font-semibold text-[#1b1c1a] leading-tight  line-clamp-2">
              {product.title || 'Product'}
            </h3>
            {/* Variant chips */}
            <div className="flex gap-3 mt-2">
              <span className="text-[10px] tracking-[0.12em] uppercase text-[#4d463a] font-[Inter]">
                Color: <span className="text-[#1b1c1a] font-medium">{variant.color}</span>
              </span>
              <span className="text-[10px] tracking-[0.12em] uppercase text-[#4d463a] font-[Inter]">
                Size: <span className="text-[#1b1c1a] font-medium">{variant.size}</span>
              </span>
            </div>
          </div>

          {/* Price */}
          <p className="text-base font-semibold py-2 text-[#1b1c1a] font-[Inter] whitespace-nowrap flex-shrink-0">
            ₹{(variant.price.amount).toLocaleString('en-IN')}
          </p>
        </div>

        {/* Quantity Stepper */}

        <div className="flex items-center gap-0">
          <button
            onClick={() => decreaseQuantity(_id)}
            disabled={quantity <= 1}
            className="w-7 h-7 flex items-center justify-center border border-[#d0c5b5] text-[#1b1c1a] text-sm font-medium
                         transition-all duration-300 hover:border-[#745a27] hover:text-[#745a27]
                         disabled:opacity-30 disabled:cursor-not-allowed focus:outline-none"
            aria-label="Decrease quantity"
          >
            −
          </button>

          <span className="w-10 h-7 flex items-center justify-center border-t border-b border-[#d0c5b5] text-sm font-medium text-[#1b1c1a] font-[Inter] select-none">
            {quantity}
          </span>

          <button
            onClick={() => { 
              increaseQuantity(_id)}}
            className="w-7 h-7 flex items-center justify-center border border-[#d0c5b5] text-[#1b1c1a] text-sm font-medium
                         transition-all duration-300 hover:border-[#745a27] hover:text-[#745a27]
                         focus:outline-none"
            aria-label="Increase quantity"
          >
            +
          </button>
        </div>

        <div className='flex gap-2 pt-2'>
        <h6 className='text-[10px] tracking-[0.12em] uppercase text-[#4d463a] font-[Inter]'>Total :</h6>
        <span className='text-[10px] tracking-[0.12em] uppercase text-[#4d463a] font-[Inter]'> ₹{(quantity * variant.price.amount).toLocaleString('en-IN')}</span>
          
        </div>


      </div>
    </article>
  );
};

export default CartItem;
