import React, { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import Icons from '../icons/Icons'
import Brandname from '../Brandname'
import { useSelector , useDispatch } from 'react-redux'




const SellerNavbar
 = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const allProducts = useSelector((s) => s.products.allProducts)
  const navigate = useNavigate()
  const dispatch = useDispatch()


  // Close search on ESC key or click outside
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape' && isSearchOpen) {
        setIsSearchOpen(false)
      }
    }
    const handleClickOutside = () => {
      if (isSearchOpen) {
        setIsSearchOpen(false)
      }
    }
    window.addEventListener('keydown', handleEsc)
    document.addEventListener('click', handleClickOutside)
    return () => {
      window.removeEventListener('keydown', handleEsc)
      document.removeEventListener('click', handleClickOutside)
    }
  }, [isSearchOpen])

  const handleSearch = (e) => {
    e.preventDefault()
     const list = [...allProducts]

     const filtered = list.filter((p) =>{
          return p.title.toLowerCase().includes(searchQuery.toLowerCase())
     })
     
    }
  

  return (
    <nav className="sticky top-0 z-50 bg-gradient-to-b from-[#1a1815] to-[#0f0d0a] border-b border-[#C9A96E]/20 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" onClick={(e) => e.stopPropagation()}>
        
        <div className="flex items-center justify-between h-16 sm:h-16">

         <Brandname />

         
          {!isSearchOpen ? (
            <div className="hidden md:flex items-center gap-8">
              <Link
                to="/collections"
                className="text-sm font-medium text-[#B5ADA3] hover:text-[#C9A96E] relative group transition-colors duration-200"
              >
                COLLECTIONS
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#C9A96E] group-hover:w-full transition-all duration-500"></span>
              </Link>
              <Link
                to="/seller/create-product"
                className="text-sm font-medium text-[#B5ADA3] hover:text-[#C9A96E] relative group transition-colors duration-200"
              >
                ADD PRODUCT
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#C9A96E] group-hover:w-full transition-all duration-500"></span>
              </Link>
              <Link
                to="/seller/dashboard"
                className="text-sm font-medium text-[#B5ADA3] hover:text-[#C9A96E] relative group transition-colors duration-200"
              >
                DASHBOARD
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#C9A96E] group-hover:w-full transition-all duration-500"></span>
              </Link>
            </div>
          ) : (
            <div className=" absolute top-14 z-50 left-0 w-[90%] bg-white md:bg-transparent px-4 sm:px-6 lg:px-8 md:static flex items-center flex-1 ml-8 gap-4 h-16 " onClick={(e) => e.stopPropagation()}>

              <Icons.Search size={20} className="text-[#C9A96E] flex-shrink-0" />

              <form onSubmit={handleSearch} className="flex-1 flex items-center gap-2">
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Escape') {
                      setIsSearchOpen(false)
                      setSearchQuery('')
                    }
                  }}
                  autoFocus
                  onClick={(e) => e.stopPropagation()}
                  className="flex-1 bg-transparent text-md text-black md:text-white placeholder-[#9b9387] focus:outline-none border-b border-[#C9A96E]/30 focus:border-[#C9A96E] pb-1 transition-colors duration-300 font-[family-name:var(--font-sans)] caret-[#C9A96E]"
                />
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation()
                    setIsSearchOpen(false)
                    setSearchQuery('')
                  }}
                  className="p-1 hover:bg-[#2a2620] rounded-lg transition-colors duration-200"
                >
                  <Icons.Close size={18} className="text-[#C9A96E]" />
                </button>
              </form>
            </div>
          )}

          {/* Right Side Icons & Search */}
          <div className="flex items-center gap-4 sm:gap-6" onClick={(e) => e.stopPropagation()}>



            {/* Profile */}
            <Link
              to="/seller/dashboard/settings"
              className="p-2 hover:bg-[#2a2620] rounded-lg transition-all duration-300 hover:scale-110 hidden sm:block"
              aria-label="Profile"
            >
              <Icons.Profile size={20} className="text-[#C9A96E]" />
            </Link>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 hover:bg-[#2a2620] rounded-lg transition-all duration-300 hover:scale-110"
              aria-label="Menu"
            >
              {isMobileMenuOpen ? (
                <Icons.Close size={20} className="text-[#C9A96E]" />
              ) : (
                <Icons.Hamburger size={20} className="text-[#C9A96E]" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden absolute bg-snitch-charcoal w-full border-t border-[#C9A96E]/20 py-4 animate-in fade-in slide-in-from-top-2 duration-200 left-0">
            <div className="flex flex-col gap-4">
              <Link
                to="/collections"
                className="px-4 py-2 text-sm font-medium text-[#B5ADA3] hover:text-[#C9A96E] hover:bg-[#2a2620] rounded-lg transition-colors relative group"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                COLLECTIONS
                <span className="absolute bottom-1 left-4 w-0 h-0.5 bg-[#C9A96E] group-hover:w-12 transition-all duration-500"></span>
              </Link>
              <Link
                to="/archives"
                className="px-4 py-2 text-sm font-medium text-[#B5ADA3] hover:text-[#C9A96E] hover:bg-[#2a2620] rounded-lg transition-colors relative group"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                ARCHIVES
                <span className="absolute bottom-1 left-4 w-0 h-0.5 bg-[#C9A96E] group-hover:w-12 transition-all duration-500"></span>
              </Link>
              <Link
                to="/seller/dashboard"
                className="px-4 py-2 text-sm font-medium text-[#B5ADA3] hover:text-[#C9A96E] hover:bg-[#2a2620] rounded-lg transition-colors relative group"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                DASHBOARD
                <span className="absolute bottom-1 left-4 w-0 h-0.5 bg-[#C9A96E] group-hover:w-8 transition-all duration-500"></span>
              </Link>

             

              <Link
                to="/seller/dashboard/settings"
                className="px-4 py-2 text-sm font-medium text-[#B5ADA3] hover:text-[#C9A96E] hover:bg-[#2a2620] rounded-lg transition-colors sm:hidden flex items-center gap-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                PROFILE
              </Link>
            </div>
          </div>
        )}
      </div>

      {/* Custom Animations */}
      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
        .animate-slideDown {
          animation: slideDown 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
        }
      `}</style>
    </nav>
  )
}

export default SellerNavbar

