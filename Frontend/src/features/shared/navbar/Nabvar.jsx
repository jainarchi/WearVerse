import React, { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import Icons from '../Icons/Icons'
import Brandname from '../Brandname'

const Navbar = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const navigate = useNavigate()

  
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
    if (searchQuery.trim()) {
      navigate(`/products?search=${searchQuery}`)
      setSearchQuery('')
      setIsSearchOpen(false)
    }
  }

  return (
    <nav className="sticky top-0 z-50 bg-gradient-to-b from-[#1a1815] to-[#0f0d0a] border-b border-[#C9A96E]/20 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" onClick={(e) => e.stopPropagation()}>
        {/* Main Navbar Container */}
        <div className="flex items-center justify-between h-16 sm:h-16">

          
           <Brandname />

          
          { isSearchOpen &&  (
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

            {/* Search Icon Button */}
            {!isSearchOpen && <button
              onClick={() => setIsSearchOpen(true)}
              className="p-2 hover:bg-[#2a2620] rounded-lg transition-all duration-300 hover:scale-110"
              aria-label="Search"
            >
              <Icons.Search size={20} className="text-[#C9A96E]" />
            </button>}


            <Link
              to="/"
              className="p-2 hover:bg-[#2a2620] rounded-lg transition-all duration-300 hover:scale-110 relative group hidden sm:block"
              aria-label="home"
            >
              <Icons.Home size={20} className="text-[#C9A96E]" />
            </Link>



            <Link
              to="/wishlist"
              className="p-2 hover:bg-[#2a2620] rounded-lg transition-all duration-300 hover:scale-110 relative group hidden sm:block"
              aria-label="Wishlist"
            >
              <Icons.Heart size={20} className="text-[#C9A96E]" />
              {/* <span className="absolute -top-1 -right-1 bg-[#C9A96E] text-[#1a1815] text-xs rounded-full w-5 h-5 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                0
              </span> */}
            </Link>


            <Link
              to="/orders"
              className="p-2 hover:bg-[#2a2620] rounded-lg transition-all duration-300 hover:scale-110 relative group hidden sm:block
              "
              aria-label="Cart"
            >
              <Icons.Order size={20} className="text-[#C9A96E]" />
              {/* <span className="absolute -top-1 -right-1 bg-[#C9A96E] text-[#1a1815] text-xs rounded-full w-5 h-5 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                0
              </span> */}
            </Link>

             <Link
              to="/cart"
              className="p-2 hover:bg-[#2a2620] rounded-lg transition-all duration-300 hover:scale-110 relative group"
              aria-label="Cart"
            >
              <Icons.Cart size={20} className="text-[#C9A96E]" />
              {/* <span className="absolute -top-1 -right-1 bg-[#C9A96E] text-[#1a1815] text-xs rounded-full w-5 h-5 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                0
              </span> */}
            </Link>



            {/* Profile */}
            <Link
              to="/profile"
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
          <div className="md:hidden border-t border-[#C9A96E]/20 py-4 animate-in fade-in slide-in-from-top-2 duration-200">
            <div className="flex flex-col">
             
               <Link
                to="/"
                className="px-4 py-4 text-sm font-medium text-[#B5ADA3] hover:text-[#C9A96E] hover:bg-[#2a2620] rounded-lg transition-colors sm:hidden flex items-center gap-4"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <Icons.Home size={20} /> COLLECTION
              </Link>
       



              <Link
                to="/orders"
                className="px-4 py-4 text-sm font-medium text-[#B5ADA3] hover:text-[#C9A96E] hover:bg-[#2a2620] rounded-lg transition-colors sm:hidden flex items-center gap-4"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <Icons.Order size={16} /> ORDERS
              </Link>



              <Link
                to="/wishlist"
                className="px-4 py-4 text-sm font-medium text-[#B5ADA3] hover:text-[#C9A96E] hover:bg-[#2a2620] rounded-lg transition-colors sm:hidden flex items-center gap-4"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <Icons.Heart size={16} /> WISHLIST
              </Link>



              <Link
                to="/profile"
                className="px-4 py-4 text-sm font-medium text-[#B5ADA3] hover:text-[#C9A96E] hover:bg-[#2a2620] rounded-lg transition-colors sm:hidden flex items-center gap-4"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <Icons.Profile size={16} /> PROFILE
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

export default Navbar
