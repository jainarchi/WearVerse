import React from "react";
import { Link } from "react-router-dom";
import Brandname from "./Brandname";
import { useSelector } from "react-redux";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const user = useSelector((state) => state.auth.user);

  return (
    <footer className="bg-[#f8f2ec] border-t border-[#C9A96E]/20 ">

      {
        user?.role === 'seller' ? (
          <div className="max-w-8xl mx-auto font-[family-name:var(--font-sans)] text-md text-snitch-warm py-4 flex justify-around">
            <p className="text-sm tracking-[0.08em] text-[#6b645a]">
              © 2026 WearVerse Seller Portal
            </p>

            <p className="flex items-center gap-2 font-[family-name:var(--font-sans)] text-sm ">
              Secure • Reliable • Efficient
            </p>
          </div>

        ) : (
          <>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-16">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-12 mb-12">
                {/* Brand Section */}
                <div className="col-span-1 sm:col-span-2 lg:col-span-1 animate-fade-in pr-12 max-w-[28rem]">
                  <div className="mb-6 group cursor-pointer">
                    <Brandname />
                  </div>
                  <p className="font-[family-name:var(--font-sans)] text-[12px] leading-relaxed text-[#9b9387] mb-6">
                    Curating the essentials of modern heritage. A sanctuary for the
                    discerning collector where textiles meet architectural precision.
                  </p>
                </div>

                {/* Collections */}
                <div className="animate-fade-in" style={{ animationDelay: "100ms" }}>
                  <h3 className="text-sm font-semibold text-black mb-4 tracking-[0.1em] uppercase">
                    SHOP
                  </h3>
                  <ul className="space-y-2">
                    {[
                      ["New Arrivals", "/"],
                      ["Cart", "/cart"],
                    ].map((item) => (
                      <li key={item[0]}>
                        <a
                          href={item[1]}
                          className="text-sm text-[#9b9387] hover:text-[#C9A96E] transition-colors duration-300 relative group font-[family-name:var(--font-sans)]"
                        >
                          {item[0]}
                          <span className="absolute bottom-0 left-0 w-0 h-px bg-[#C9A96E] group-hover:w-full transition-all duration-300"></span>
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Company */}
                <div className="animate-fade-in" style={{ animationDelay: "200ms" }}>
                  <h3 className="text-sm font-semibold text-black mb-4 tracking-[0.1em] uppercase">
                    ACCOUNT
                  </h3>
                  <ul className="space-y-2">
                    {[
                      ["Login", "/login"],
                      ["Register", "/register"],
                      ["Your Orders", "/orders"],
                    ].map((item) => (
                      <li key={item[0]}>
                        <a
                          href={item[1]}
                          className="text-sm text-[#9b9387] hover:text-[#C9A96E] transition-colors duration-300 relative group font-[family-name:var(--font-sans)]"
                        >
                          {item[0]}
                          <span className="absolute bottom-0 left-0 w-0 h-px bg-[#C9A96E] group-hover:w-full transition-all duration-300"></span>
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Assistance */}
                <div className="animate-fade-in" style={{ animationDelay: "300ms" }}>
                  <h3 className="text-sm font-semibold text-black mb-4 tracking-[0.1em] uppercase">
                    ASSISTANCE
                  </h3>
                  <ul className="space-y-2">
                    {["Secure Payment", "Fast Delivery", "24/7 Customer Support"].map(
                      (item) => (
                        <li className="text-sm text-[#9b9387] hover:text-[#C9A96E] transition-colors duration-300 relative group font-[family-name:var(--font-sans)]">
                          {item}
                        </li>
                      ),
                    )}
                  </ul>
                </div>
              </div>
            </div>
            {/* Bottom Footer */}
            <div className=" bg-[#f8f2ec] backdrop-blur-sm">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-6 flex flex-col sm:flex-row items-center justify-between gap-4">
                <p className="font-[family-name:var(--font-sans)] text-xs tracking-[0.08em] text-[#6b645a]">
                  © {currentYear} WEARVERSE STUDIO. ALL RIGHTS RESERVED.
                </p>
              </div>
            </div>

          </>

        )
      }


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
  );
};

export default Footer;
