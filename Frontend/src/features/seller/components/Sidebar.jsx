import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import Icons from '../../shared/icons/Icons';
import {useAuth} from '../../auth/hook/useAuth';
import Brandname from '../../shared/Brandname';

const NAV_ITEMS = [
  {label: "Collection" , to: '/' , icon : Icons.Home},
  { label: 'Inventory', to: 'products', icon: Icons.Setting },
  { label: 'Orders', to: 'orders', icon: Icons.Order },
  { label: 'Settings', to: 'settings', icon: Icons.Setting },
  { label: 'Add Product', to: 'create-product', icon: Icons.Add },
  
];

const NavItem = ({ to, label, Icon, onClose }) => (
  <NavLink
    to={to}
    onClick={onClose}
    className={({ isActive }) =>
      [
        'flex items-center gap-3 py-3 px-6',
        'font-body text-[0.8125rem] tracking-[0.03em] no-underline',
        'transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]',
        'border-l-2',
        isActive
          ? 'border-snitch-gold text-snitch-gold font-semibold bg-snitch-gold/5'
          : 'border-transparent text-snitch-warm hover:text-snitch-charcoal hover:bg-snitch-card/70',
      ].join(' ')
    }
  >
    {({ isActive }) => (
      <>
        <span className={`shrink-0 transition-colors duration-300 ${isActive ? 'text-snitch-gold' : 'text-snitch-faint group-hover:text-snitch-warm'}`}>
          {Icon && <Icon size={16} />}
        </span>

        <span className='uppercase text-[0.74rem]'>{label}</span>
      </>
    )}
  </NavLink>
);

const SidebarContent = ({ onClose }) => {
  const navigate = useNavigate()
  const { handleLogout } = useAuth();


  return (
    /* h-full + flex col + overflow-hidden = sidebar never scrolls */
    <div className="flex flex-col h-full overflow-hidden bg-snitch-cream">

      {/*  Logo block  */}
      <div className="px-6 py-5 shrink-0 border-b border-snitch-gold/20">
       <Brandname />
        <p className="font-label text-[0.55rem] tracking-[0.18em] uppercase text-snitch-warm mt-2 m-0">
          Seller Dashboard
        </p>
      </div>

      <nav className="shrink-0 pt-3 pb-3">
        {NAV_ITEMS.map(item => (
          <NavItem
            key={item.to}
            to={item.to}
            label={item.label}
            Icon={item.icon}
            onClose={onClose}
          />
        ))}
      </nav>





      {/*section -2*/}
      <div className="shrink-0 px-6 py-5 border-t border-snitch-border/30">
        <p className="font-label text-[0.65rem] text-snitch-border m-0 tracking-[0.14em]">Seller Account</p>


        <button
          onClick={() => {
            handleLogout();
            navigate('/login', { replace: true })
          
          }}
          className="flex items-center gap-1.5 font-label text-[0.7rem] tracking-[0.12em] uppercase text-snitch-gold bg-transparent border-none p-0 cursor-pointer hover:text-snitch-charcoal transition-colors duration-300 py-4"
        >
          <Icons.Logout size={17} className='mr-2' /> Logout
        </button>

      </div>


    </div>


  );
};

/* ─── Main Sidebar (responsive) ─── */
const Sidebar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      {/* ── Mobile hamburger ── */}
      <button
        onClick={() => setMobileOpen(true)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-snitch-cream border border-snitch-border/40 text-snitch-charcoal"
        aria-label="Open navigation menu"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
          <line x1="3" y1="6" x2="21" y2="6" />
          <line x1="3" y1="12" x2="21" y2="12" />
          <line x1="3" y1="18" x2="21" y2="18" />
        </svg>
      </button>

      {/* ── Mobile backdrop ── */}
      {mobileOpen && (
        <div
          className="lg:hidden fixed inset-0 z-40 bg-snitch-charcoal/30 backdrop-blur-sm"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* ── Mobile drawer ── */}
      <aside
        className={[
          'lg:hidden fixed inset-y-0 left-0 z-50 w-64',
          'transform transition-transform duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]',
          mobileOpen ? 'translate-x-0' : '-translate-x-full',
        ].join(' ')}
      >
        <button
          onClick={() => setMobileOpen(false)}
          className="absolute top-4 right-3 p-1 text-snitch-warm hover:text-snitch-charcoal bg-transparent border-none cursor-pointer text-lg leading-none"
        >
          ✕
        </button>
        <SidebarContent onClose={() => setMobileOpen(false)} />
      </aside>

      {/* ── Desktop sidebar — fixed height, no scroll ── */}
      <aside className="hidden lg:block w-48 xl:w-52 h-screen sticky top-0 shrink-0 border-r border-snitch-border/30">
        <SidebarContent onClose={() => { }} />
      </aside>
    </>
  );
};

export default Sidebar;
