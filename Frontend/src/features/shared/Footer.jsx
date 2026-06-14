import React from 'react'
import { Link } from 'react-router-dom'
import Brandname from './Brandname'


const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-[#f8f2ec] border-t border-[#C9A96E]/20 ">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-12 mb-12">
          
          {/* Brand Section */}
          <div className="col-span-1 sm:col-span-2 lg:col-span-1 animate-fade-in pr-12 max-w-[28rem]">
            <div className="mb-6 group cursor-pointer">
               <Brandname />
            </div>
            <p className="font-[family-name:var(--font-sans)] text-[12px] leading-relaxed text-[#9b9387] mb-6">
              Curating the essentials of modern heritage. A sanctuary for the discerning collector where textiles meet architectural precision.
            </p>
            
          </div>

          {/* Collections */}
          <div className="animate-fade-in" style={{ animationDelay: '100ms' }}>
            <h3 className="text-sm font-semibold text-black mb-6 tracking-[0.1em] uppercase">
              COLLECTIONS
            </h3>
            <ul className="space-y-3">
              {['The Archives', 'New Arrivals', 'Curated Sets'].map((item) => (
                <li key={item}>
                  <a href="#" className="text-sm text-[#9b9387] hover:text-[#C9A96E] transition-colors duration-300 relative group font-[family-name:var(--font-sans)]">
                    {item}
                    <span className="absolute bottom-0 left-0 w-0 h-px bg-[#C9A96E] group-hover:w-full transition-all duration-300"></span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div className="animate-fade-in" style={{ animationDelay: '200ms' }}>
            <h3 className="text-sm font-semibold text-black mb-6 tracking-[0.1em] uppercase">
              COMPANY
            </h3>
            <ul className="space-y-3">
              {['Our Story', 'Editorial', 'Careers'].map((item) => (
                <li key={item}>
                  <a href="#" className="text-sm text-[#9b9387] hover:text-[#C9A96E] transition-colors duration-300 relative group font-[family-name:var(--font-sans)]">
                    {item}
                    <span className="absolute bottom-0 left-0 w-0 h-px bg-[#C9A96E] group-hover:w-full transition-all duration-300"></span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Assistance */}
          <div className="animate-fade-in" style={{ animationDelay: '300ms' }}>
            <h3 className="text-sm font-semibold text-black mb-6 tracking-[0.1em] uppercase">
              ASSISTANCE
            </h3>
            <ul className="space-y-3">
              {['Shipping', 'Returns', 'Privacy'].map((item) => (
                <li key={item}>
                  <a href="#" className="text-sm text-[#9b9387] hover:text-[#C9A96E] transition-colors duration-300 relative group font-[family-name:var(--font-sans)]">
                    {item}
                    <span className="absolute bottom-0 left-0 w-0 h-px bg-[#C9A96E] group-hover:w-full transition-all duration-300"></span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Newsletter Signup */}
        {/* <div className="border-t border-[#C9A96E]/20 pt-12 pb-8">
          <div className="max-w-md">
            <h3 className="text-sm font-semibold text-[#C9A96E] mb-4 tracking-[0.1em] uppercase">
              STAY INFORMED
            </h3>
            <p className="text-xs text-[#9b9387] mb-4 font-[family-name:var(--font-sans)]">
              BE THE FIRST TO KNOW ABOUT PRIVATE ARCHIVE RELEASES
            </p>
            <form className="flex gap-2">
              <input
                type="email"
                placeholder="EMAIL ADDRESS"
                className="flex-1 bg-[#2a2620] border border-[#C9A96E]/30 px-4 py-3 text-xs text-[#B5ADA3] placeholder-[#6b645a] focus:outline-none focus:border-[#C9A96E] focus:ring-1 focus:ring-[#C9A96E]/50 transition-all duration-300 font-[family-name:var(--font-sans)]"
              />
              <button
                type="submit"
                className="bg-[#C9A96E] hover:bg-[#d4b78e] text-[#1a1815] px-6 py-3 text-xs font-semibold tracking-[0.08em] transition-all duration-300 hover:shadow-lg hover:shadow-[#C9A96E]/20 uppercase"
              >
                →
              </button>
            </form>
          </div>
        </div> */}
      </div>

      {/* Bottom Footer */}
      <div className=" bg-[#f8f2ec] backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="font-[family-name:var(--font-sans)] text-xs tracking-[0.08em] text-[#6b645a]">
            © {currentYear} WEARVERSE STUDIO. ALL RIGHTS RESERVED.
          </p>
       
        </div>
      </div>

      {/* Custom Animations */}
      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fadeIn 0.6s ease-out forwards;
          opacity: 0;
        }
      `}</style>
    </footer>
  )
}

export default Footer
