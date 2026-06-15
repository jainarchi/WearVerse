import React, { useEffect } from 'react'
import { useProducts } from '../hook/useProducts.js'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import ProductCard from '../components/ProductCard.jsx'
import Navbar from '../../shared/navbar/Nabvar.jsx'
import Footer from '../../shared/Footer.jsx'
import Loading from '../../shared/Loading.jsx'

const Hero = () => (
  <section
    className="max-w-[1400px] mx-auto
               px-5 sm:px-8 lg:px-12 xl:px-16
               pt-20 sm:pt-24 lg:pt-28
               pb-14 sm:pb-16 lg:pb-20"
               
  >
    <div className="max-w-4xl">

      <h1
        className="font-[family-name:var(--font-serif)] font-light
               
                   leading-[1.25]
                   tracking-[-0.04em]
                   text-[#1b1c1a]
                   text-[clamp(42px,8vw,88px)]
                   mb-6"
      >
        Discover Fashion
        <br />
        That Fits Your Style.
      </h1>

      <p
        className="max-w-2xl
                   text-[15px] sm:text-[17px]
                   leading-relaxed
                   text-[#6d6458]
                   mb-8"
      >
        Explore curated collections with modern designs, versatile
        essentials, and timeless pieces crafted for everyday confidence.
      </p>

      <div className="flex items-center gap-4">
        <div className="w-12 h-px bg-[#C9A96E]" />
        <span className="text-sm text-[#8f867a]">
          New arrivals updated regularly
        </span>
      </div>
    </div>
  </section>
);



const Home = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { handleGetAllProducts, clearError } = useProducts()
  const loading = useSelector((s) => s.products.loading.allProducts)
  const error = useSelector((s) => s.products.error.allProducts)
  const allProducts = useSelector((s) => s.products.allProducts)


  useEffect(() => {
    handleGetAllProducts()
    return () => { dispatch(clearError('allProducts')) }
  }, [])


  if (loading) {
    return (<Loading />)
  }




  return (
    <>
      {/* Google Fonts */}
      <link
        href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400&family=Inter:wght@300;400;500;600&display=swap"
        rel="stylesheet"
      />

      <div className="bg-[#fbf9f6] text-[#1b1c1a] min-h-screen
                      font-[family-name:var(--font-sans)] selection:bg-[#C9A96E]/30">

        <Hero />

        {/* ── Collection section ── */}
        <section
          id="collection"
          className="max-w-[1400px] mx-auto
                     px-5 sm:px-8 lg:px-12 xl:px-16
                     pb-24 sm:pb-32 lg:pb-40"
        >
          {/* Section header */}
          <div className="mb-10 sm:mb-14">
            <p className="font-[family-name:var(--font-sans)] text-[10px]
                          tracking-[0.28em] uppercase text-[#C9A96E] font-medium mb-3">
              All Products
            </p>
            <h2 className="font-[family-name:var(--font-serif)] font-light
                           leading-tight text-[#1b1c1a] text-[clamp(28px,4vw,52px)]">
              The Collection.
            </h2>
          </div>

          {/* Loading */}
          {loading && (
            <div className="flex justify-center py-20">
              <p className="font-[family-name:var(--font-sans)] text-[13px]
                            tracking-[0.15em] text-[#B5ADA3] uppercase">
                Loading collection…
              </p>
            </div>
          )}

          {/* Error */}
          {error && (
            <div className="flex justify-center py-20">
              <p className="font-[family-name:var(--font-sans)] text-[13px] text-red-500">
                {error}
              </p>
            </div>
          )}

          {/* Empty state */}
          {!loading && !error && (!allProducts || allProducts.length === 0) && (
            <div className="flex justify-center py-20">
              <p className="font-[family-name:var(--font-sans)] text-[13px]
                            tracking-[0.15em] text-[#B5ADA3] uppercase">
                No products yet.
              </p>
            </div>
          )}

          {/* Product grid
              mobile: 1 col | sm (640+): 2 col | lg (1024+): 3 col | 2xl (1536+): 4 col */}
          {!loading && !error && allProducts && allProducts.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4
                            gap-x-6 sm:gap-x-8 lg:gap-x-10
                            gap-y-10 sm:gap-y-12 lg:gap-y-16">
              {allProducts.map((product , index) => (
                <ProductCard
                  key={product._id}
                  product={product}
                  onClick={() => navigate(`/products/${product._id}`)}
                  isPriority={index < 8}
                />
              ))}
            </div>
          )}
        </section>

      </div>
    </>
  )
}

export default Home
