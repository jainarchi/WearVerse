import React, { useEffect, useState, useCallback, useMemo } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useProducts } from '../hook/useProducts'
import Navbar from '../../shared/navbar/Nabvar.jsx'
import Footer from '../../shared/Footer.jsx'
import Loading from '../../shared/Loading.jsx'
import BackButton from '../../shared/BackButton.jsx'
import { useCart } from '../../cart/hook/useCart.js'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import Icons from '../../shared/icons/Icons.js'
import { useWishlist } from '../../wishlist/hook/useWishlist.js'
import { selectWishlistIds } from '../../wishlist/state/wishlist.slice.js'
import { formatPrice } from '../../shared/utils/formatPrice.js'
import Wishlist from '../../wishlist/pages/Wishlist.jsx'


const formatDate = (iso) => {
  if (!iso) return ''
  return new Date(iso).toLocaleDateString('en-IN', {
    year: 'numeric', month: 'long', day: 'numeric',
  })
}

/*  Action button  */
const ActionButton = ({ label, variant, onClick, disabled = false }) => {
  const isPrimary = variant === 'primary'

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`w-full py-3 px-5
        uppercase transition-all duration-300
        ${isPrimary
          ? 'bg-[#1b1c1a] text-[#fbf9f6] hover:bg-[#C9A96E] hover:text-[#1b1c1a]'
          : 'border border-[#1b1c1a] text-[#1b1c1a] hover:bg-[#1b1c1a] hover:text-[#fbf9f6]'
        }
        disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer`}
    >
      {label}
    </button>
  )
}

/* Selection Button */
const SelectionButton = ({ label, isSelected, onClick, disabled }) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`min-w-[3rem] px-4 py-2.5 text-[11px] tracking-[0.1em] uppercase transition-all duration-300 cursor-pointer
        ${isSelected
          ? 'bg-[#1b1c1a] text-[#fbf9f6] border border-[#1b1c1a]'
          : 'bg-transparent text-[#1b1c1a] border border-[#d6d4d1] hover:border-[#1b1c1a]'
        }
        disabled:opacity-40 disabled:cursor-not-allowed
      `}
    >
      {label}
    </button>
  )
}

/*  Thumbnail  */
const Thumbnail = React.memo(({ url, alt, isActive, onClick }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className="group relative w-full overflow-hidden bg-[#eae8e5] cursor-pointer"
      style={{
        aspectRatio: '1/1',
        outline: isActive
          ? '1.5px solid #C9A96E'
          : '1px solid transparent',
        outlineOffset: '2px',
      }}
      aria-label={alt}
    >
      <img
        src={url}
        alt={alt}
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
      />
    </button>
  )
})

const ProductDetails = () => {
  const navigate = useNavigate()
  const { productId } = useParams()
  const { handleGetProductDetails } = useProducts()
  const {handleToggleProductInWishlist} = useWishlist()
  const { handleAddToCart } = useCart()

  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)

  const [selectedColor, setSelectedColor] = useState(null)
  const [selectedSize, setSelectedSize] = useState(null)
  const [activeIdx, setActiveIdx] = useState(0)
  const user = useSelector(state => state.auth.user)

 

  async function fetchProductDetails() {
    try {
      setLoading(true);
      const data = await handleGetProductDetails(productId);
      setProduct(data);

      // Initialize selections
      if (data?.variants?.length > 0) {
        const firstAvailable = data.variants.find(v => v.stock > 0) || data.variants[0];
        setSelectedColor(firstAvailable.color);
        setSelectedSize(firstAvailable.size);
      } else if (data?.imagesByColor) {
        const colors = Object.keys(data.imagesByColor);
        if (colors.length > 0) setSelectedColor(colors[0]);
      }

      setActiveIdx(0)
    }
    catch (err) {
      console.log(err);
    }
    finally {
      setLoading(false);
    }
  }

  
 // check in set of ids is product in wishlist
  const wishlistIds = useSelector(selectWishlistIds);
  const [isWishlisted, setIsWishlisted] = useState(null)

 
  
  useEffect(() => {
    fetchProductDetails();
  }, [])

  useEffect(() => {
    setIsWishlisted(wishlistIds.has(productId))
  
  }, [wishlistIds , productId])
  


  const handleToggleFavorite = async (productId) =>{
      
      const res = await handleToggleProductInWishlist(productId)

      if(res.success){
        toast.success(res.message)
        setIsWishlisted(!isWishlisted)
      }
      else {
        toast.error(res.message)
      }
  }



  // Derived state
  const availableColors = useMemo(() => {
    if (!product) return [];
    if (product.imagesByColor) return Object.keys(product.imagesByColor);
    if (product.variants) {
      const colors = new Set(product.variants.map(v => v.color));
      return Array.from(colors);
    }
    return [];
  }, [product]);

  const availableVariantsForColor = useMemo(() => {
    if (!product || !product.variants) return [];
    const variantsForColor = product.variants.filter(v => v.color === selectedColor);
    const uniqueSizes = new Map();
    variantsForColor.forEach(v => {
      if (!uniqueSizes.has(v.size)) {
        uniqueSizes.set(v.size, v);
      } else if (v.stock > 0 && uniqueSizes.get(v.size).stock <= 0) {
        uniqueSizes.set(v.size, v);
      }
    });
    return Array.from(uniqueSizes.values());
  }, [product, selectedColor]);

  // Handle color change
  const handleColorSelect = (color) => {
    setSelectedColor(color);
    setActiveIdx(0);
    // Auto-select first available size for this color
    if (product && product.variants) {
      const variants = product.variants.filter(v => v.color === color);
      const firstInStock = variants.find(v => v.stock > 0) || variants[0];
      if (firstInStock) {
        setSelectedSize(firstInStock.size);
      } else {
        setSelectedSize(null);
      }
    }
  }

  // Get current images
  const images = useMemo(() => {
    if (!product) return [];
    if (product.imagesByColor && selectedColor && product.imagesByColor[selectedColor]) {
      return product.imagesByColor[selectedColor];
    }
    return product.images || [];
  }, [product, selectedColor]);

  const total = images.length
  const activeImage = images[activeIdx]?.url ?? null

  const prev = useCallback(() => {
    setActiveIdx(i => (i - 1 + total) % total)
  }, [total])

  const next = useCallback(() => {
    setActiveIdx(i => (i + 1) % total)
  }, [total])


  const addToCart = async () => {
    console.log(user)

    if (!user) {
      navigate('/login', { replace: true })
    }

    const res = await handleAddToCart(product._id, selectedVariant._id)

    if (res.success) {
      toast.success(res.message)
    }
    else {
      toast.error(res.message)
    }

    console.log('Add to Cart:', product._id, selectedVariant._id)
  }




  const selectedVariant = useMemo(() => {
    return availableVariantsForColor.find(v => v.size === selectedSize);
  }, [availableVariantsForColor, selectedSize]);

  const currentPrice = selectedVariant?.price || product?.price;
  const isOutOfStock = selectedVariant ? selectedVariant.stock <= 0 : false;


  return (
    <>
      <link
        href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400&family=Inter:wght@300;400;500;600&display=swap"
        rel="stylesheet"
      />

      <div className="bg-[#fbf9f6] text-[#1b1c1a] min-h-screen
                      font-[family-name:var(--font-sans)] selection:bg-[#C9A96E]/30">


        {loading && <Loading />}

        {/*  Not found  */}
        {!loading && !product && (
          <div className="flex flex-col items-center justify-center gap-4"
            style={{ minHeight: 'calc(100vh - 56px)' }}>
            <p className="text-xs tracking-[0.15em] uppercase text-[#B5ADA3]">
              Product not found.
            </p>
            <a href="/"
              className="text-[10px] tracking-[0.2em] uppercase text-[#C9A96E]
                          underline underline-offset-4 hover:text-[#1b1c1a]
                          transition-colors duration-300">
              Back to Home
            </a>
          </div>
        )}

        {/* ── Product content ── */}
        {!loading && product && (
          <main className="max-w-[1400px] mx-auto
                           px-4 sm:px-8 lg:px-12 xl:px-16
                           py-8 sm:py-12 lg:py-16 pb-16 sm:pb-20 lg:pb-24">

            <div className="flex flex-col gap-12 md:flex-row justify-center  ">

              <div className="w-full max-w-[24rem] flex flex-col h-fit md:pt-10 gap-3">


                {/*  Main image (4:5) with prev/next arrows  */}
                <div
                  className="group relative overflow-hidden flex-1 w-full max-w-[22rem] bg-red-200 "
                  style={{ aspectRatio: '3/4' }}
                >
                  {/* Image */}
                  {activeImage ? (
                    <img
                      src={activeImage}
                      alt={product.title}
                      className="absolute inset-0 w-full aspect-[3/4] object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                    />
                  ) : (
                    <div className="absolute inset-0 bg-[#e4e2df] flex items-center justify-center">
                      <svg className="w-10 h-10 text-[#B5ADA3]" viewBox="0 0 24 24"
                        fill="none" stroke="currentColor" strokeWidth="1">
                        <rect x="3" y="3" width="18" height="18" rx="0" />
                        <circle cx="8.5" cy="8.5" r="1.5" />
                        <polyline points="21 15 16 10 5 21" />
                      </svg>
                    </div>
                  )}

                  {/* Prev / Next — visible on hover when >1 image */}
                  {total > 1 && (
                    <>
                      {/* Prev */}
                      <button
                        onClick={prev}
                        aria-label="Previous image"
                        className="absolute left-3 top-1/2 -translate-y-1/2
                   w-8 h-8 flex items-center justify-center
                   bg-[#fbf9f6]/80 backdrop-blur-sm
                   text-[#1b1c1a] border-none cursor-pointer
                   transition-all duration-300
                   opacity-0 group-hover:opacity-100
                   pointer-events-none group-hover:pointer-events-auto
                   hover:bg-[#1b1c1a] hover:text-[#fbf9f6]"
                      >
                        <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none"
                          stroke="currentColor" strokeWidth="2">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                        </svg>
                      </button>

                      {/* Next */}
                      <button
                        onClick={next}
                        aria-label="Next image"
                        className="absolute right-3 top-1/2 -translate-y-1/2
                   w-8 h-8 flex items-center justify-center
                   bg-[#fbf9f6]/80 backdrop-blur-sm
                   text-[#1b1c1a] border-none cursor-pointer
                   transition-all duration-300
                   opacity-0 group-hover:opacity-100
                   pointer-events-none group-hover:pointer-events-auto
                   hover:bg-[#1b1c1a] hover:text-[#fbf9f6]"
                      >
                        <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none"
                          stroke="currentColor" strokeWidth="2">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                        </svg>
                      </button>

                      {/* Dot indicator */}
                      <div
                        className="absolute bottom-3 left-1/2 -translate-x-1/2
                   flex gap-1.5 transition-opacity duration-300
                   opacity-40 group-hover:opacity-100"
                      >
                        {images.map((_, idx) => (
                          <button
                            key={idx}
                            onClick={() => setActiveIdx(idx)}
                            className="border-none cursor-pointer p-0 rounded-full transition-all duration-300"
                            style={{
                              width: activeIdx === idx ? '18px' : '6px',
                              height: '6px',
                              backgroundColor: activeIdx === idx ? '#C9A96E' : 'rgba(251,249,246,0.7)',
                            }}
                            aria-label={`Go to image ${idx + 1}`}
                          />
                        ))}
                      </div>
                    </>
                  )}
                </div>

                {/*  Thumbnail */}
                {total > 1 && (
                  <div
                    className="flex gap-2 sm:w-[72px] lg:w-[80px] flex-shrink-0 overflow-x-auto sm:overflow-visible "
                  >
                    {images.map((img, idx) => (
                      <div key={img._id ?? idx} className="w-16 sm:w-full flex-shrink-0">
                        <Thumbnail
                          url={img.url}
                          alt={`${product.title} — view ${idx + 1}`}
                          isActive={activeIdx === idx}
                          onClick={() => setActiveIdx(idx)}
                        />
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="w-full lg:p-2 lg:max-w-lg ">


                <div className="flex justify-between py-2 items-center">
                                  <p className="text-[9px] tracking-[0.28em] uppercase text-[#C9A96E]
                              font-[family-name:var(--font-sans)] font-medium ">
                  Product
                </p>

                
                {user?.role === 'buyer' &&
                  <span 
                      onClick={() => handleToggleFavorite(product._id)} >
                    {
                     isWishlisted ?  
                     <Icons.FilledHeart 
                      size={20}
                      className='cursor-pointer' 
                     /> : 
                      <Icons.Heart  
                       size={20} 
                       className="cursor-pointer"
                      />
                    }
                    
                  
                  </span>
                }
                 
                   
                </div>




                {/* Product name */}
                <h1 className="font-[family-name:var(--font-serif)] font-light
                               leading-[1.08] text-[#1b1c1a] mb-4
                               text-[clamp(28px,3.5vw,32px)]">
                  {product.title}
                </h1>

                {/* Gold rule */}
                <div className="w-8 h-px bg-[#C9A96E] mb-6" />

                {/* Currency & Price */}
                <div className="mb-8">
                  <p className="text-[9px] tracking-[0.2em] uppercase text-[#B5ADA3]
                                 mb-1.5">
                    {currentPrice?.currency ?? 'INR'}
                  </p>
                  <p className="font-normal
                                text-[#1b1c1a] -tracking-[0.01em]
                                text-[clamp(20px,3vw,26px)]">
                    {formatPrice(currentPrice)}
                  </p>
                </div>

                {/* Colors */}
                {availableColors.length > 0 && (
                  <div className="mb-8">
                    <p className="text-[9px] tracking-[0.2em] uppercase text-[#B5ADA3]
                                  font-[family-name:var(--font-sans)] mb-3">
                      Color <span className="text-[#1b1c1a] ml-2 font-medium">{selectedColor}</span>
                    </p>
                    <div className="flex flex-wrap gap-2.5">
                      {availableColors.map(color => (
                        <SelectionButton
                          key={color}
                          label={color}
                          isSelected={selectedColor === color}
                          onClick={() => handleColorSelect(color)}
                        />
                      ))}
                    </div>
                  </div>
                )}

                {/* Sizes */}
                {availableVariantsForColor.length > 0 && (
                  <div className="mb-8">
                    <div className="flex justify-between items-end mb-3">
                      <p className="text-[9px] tracking-[0.2em] uppercase text-[#B5ADA3]
                                    font-[family-name:var(--font-sans)]">
                        Size <span className="text-[#1b1c1a] ml-2 font-medium">{selectedSize}</span>
                      </p>
                      {isOutOfStock && (
                        <p className="text-[9px] tracking-[0.1em] uppercase text-red-800
                                      font-[family-name:var(--font-sans)] bg-red-50 px-2 py-1">
                          Out of Stock
                        </p>
                      )}
                    </div>
                    <div className="flex flex-wrap gap-2.5">
                      {availableVariantsForColor.map(variant => (
                        <SelectionButton
                          key={variant.size}
                          label={variant.size}
                          isSelected={selectedSize === variant.size}
                          onClick={() => setSelectedSize(variant.size)}
                          disabled={variant.stock <= 0}
                        />
                      ))}
                    </div>
                  </div>
                )}

                {/* Description */}
                {product.description && (
                  <div className="mb-8 mt-2">
                    <p className="text-[9px] tracking-[0.2em] uppercase text-[#B5ADA3]
                                  font-[family-name:var(--font-sans)] mb-3">
                      Description
                    </p>
                    <p className="text-[13px] leading-[1.8] text-[#4d463a]
                                  font-[family-name:var(--font-sans)] font-light">
                      {product.description}
                    </p>
                  </div>
                )}

               




                <div className="flex flex-col gap-3 mt-4">
                  {/* <ActionButton
                    label={isOutOfStock ? 'Out of Stock' : 'Buy Now'}
                    variant="primary"
                    disabled={user?.role === 'seller' || isOutOfStock || !selectedVariant}
                    onClick={() => {
                      console.log('Buy Now:', product._id, selectedVariant)
                      if (!user) {
                        navigate('/login', { replace: true })
                      }
                      //  handleBuyNow(product._id, selectedVariant._id)
                    }}
                  /> */}

                    {
                      isOutOfStock && (
                            <h4 className="font-label text-[0.65rem] tracking-[0.12em] uppercase text-red-600 bg-red-50 border text-center border-red-100 px-2 py-0.5">Out of Stock</h4>
                      )
                    }
                    

                  <ActionButton
                    label="Add to Cart"
                    variant="secondary"
                    disabled={user?.role === 'seller' || isOutOfStock || !selectedVariant}
                    onClick={addToCart}
                  />
                </div>




              </div>
            </div>
          </main>
        )}

      </div>
    </>
  )
}

export default ProductDetails


