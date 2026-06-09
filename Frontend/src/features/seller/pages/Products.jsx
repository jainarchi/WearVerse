import React, { useEffect, useState, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useSeller } from '../hook/useSeller';
import SellerProductCard  from '../components/SellerProductCard';
import Icons from '../../shared/icons/Icons';



const GridIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/>
    <rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/>
  </svg>
);

const ListIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/>
    <line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/>
    <line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/>
  </svg>
);


const XIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
  </svg>
);

const PackageIcon = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="text-snitch-faint">
    <line x1="16.5" y1="9.4" x2="7.5" y2="4.21"/>
    <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
    <polyline points="3.27 6.96 12 12.01 20.73 6.96"/>
    <line x1="12" y1="22.08" x2="12" y2="12"/>
  </svg>
);

/*  ─ Skeleton Card  ─ */
const SkeletonCard = () => (
  <div className="bg-snitch-cream border border-snitch-border/20 overflow-hidden animate-pulse">
    <div className="bg-snitch-card" style={{ aspectRatio: '4/3' }} />
    <div className="p-4 sm:p-5 space-y-3">
      <div className="flex justify-between gap-3">
        <div className="h-4 bg-snitch-card rounded w-2/3" />
        <div className="h-4 bg-snitch-card rounded w-1/4" />
      </div>
      <div className="h-3 bg-snitch-card rounded w-1/3" />
      <div className="h-px bg-snitch-border/20" />
      <div className="flex justify-between">
        <div className="h-3 bg-snitch-card rounded w-1/5" />
        <div className="h-3 bg-snitch-card rounded w-1/5" />
      </div>
    </div>
  </div>
);

/*   Sort options   */
const SORT_OPTIONS = [
  { value: 'newest',   label: 'Newest First' },
  { value: 'oldest',   label: 'Oldest First' },
  { value: 'price_hi', label: 'Price: High → Low' },
  { value: 'price_lo', label: 'Price: Low → High' },
  { value: 'name_az',  label: 'Name A → Z' },
  { value: 'name_za',  label: 'Name Z → A' },
];





const Products = () => {
  const navigate  = useNavigate();
  const { handleGetAllProductsBySeller, handleDeleteProduct } = useSeller();

  const sellerProducts = useSelector(state => state.seller?.products ?? []);
  const loading        = useSelector(state => state.seller?.loading?.products ?? false);

  const [query,     setQuery]     = useState('');
  const [sort,      setSort]      = useState('newest');
  const [view,      setView]      = useState('grid');
  const [deletingId, setDeletingId] = useState(null);

  useEffect(() => {
    handleGetAllProductsBySeller();
    
  }, []);

  

  /*   delete handler   */
  const handleDelete = async (productId) => {
    setDeletingId(productId);
    try {
      await handleDeleteProduct(productId);
    } catch(err) {
       console.log(err)
    } finally {
      setDeletingId(null);
    }
  };

  /*   filtered + sorted products   */
  const displayed = useMemo(() => {
    let list = [...sellerProducts];

    if (query.trim()) {
      const q = query.toLowerCase();
      list = list.filter(p =>
        p.title?.toLowerCase().includes(q) ||
        p.category?.toLowerCase().includes(q)
      );
    }

    switch (sort) {
      case 'oldest':
        list.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt)); break;
      case 'price_hi':
        list.sort((a, b) => (b.price?.amount ?? 0) - (a.price?.amount ?? 0)); break;
      case 'price_lo':
        list.sort((a, b) => (a.price?.amount ?? 0) - (b.price?.amount ?? 0)); break;
      case 'name_az':
        list.sort((a, b) => (a.name ?? '').localeCompare(b.name ?? '')); break;
      case 'name_za':
        list.sort((a, b) => (b.name ?? '').localeCompare(a.name ?? '')); break;
      case 'newest':
      default:
        list.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)); break;
    }

    return list;
  }, [sellerProducts, query, sort]);

 
  const totalProducts = sellerProducts.length;
  const inStock  = sellerProducts.filter(p => Number(p.totalStock) > 0).length;
  const outOfStock = totalProducts - inStock;



  return (
    <div className="flex flex-col min-h-screen bg-snitch-cream">

    
      
      <header className="px-5 sm:px-8 md:px-10 xl:px-14 pt-10 pb-8 border-b border-snitch-border/20 bg-snitch-cream">

        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6">
          <div>
            <p className="font-label text-[0.58rem] tracking-[0.2em] uppercase text-snitch-warm m-0 mb-3">
              Seller Dashboard · Inventory
            </p>
            <h1 className="font-serif text-[2rem] sm:text-[2.6rem] md:text-[3rem] font-normal text-snitch-charcoal m-0 leading-[1.12]">
              Your&nbsp;Products.
            </h1>
          </div>

          {/* <button
            onClick={() => navigate('/seller/create-product')}
            className="self-start sm:self-auto shrink-0 flex items-center gap-2 bg-snitch-charcoal text-snitch-cream font-label text-[0.65rem] tracking-[0.14em] uppercase px-6 py-3.5 border-0 cursor-pointer hover:bg-snitch-gold transition-colors duration-300"
          >
            <Icons.Add />
            Add Product
          </button> */}
        </div>

        {/*   Stats row   */}
        <div className="flex flex-wrap gap-6 sm:gap-10 mt-8">
          {[
            { label: 'Total Listed',  value: totalProducts },
            { label: 'In Stock',      value: inStock,    accent: true },
            { label: 'Out of Stock',  value: outOfStock, warn: outOfStock > 0 },
          ].map(({ label, value, accent, warn }) => (
            <div key={label} className="flex flex-col gap-0.5">
              <span
                className={[
                  ' text-[1.8rem] sm:text-[2.2rem] font-normal leading-none',
                  warn    ? 'text-amber-600'
                  : accent ? 'text-snitch-gold'
                  : 'text-snitch-charcoal',
                ].join(' ')}
              >
                {value}
              </span>
              <span className="font-label text-[0.55rem] tracking-[0.14em] uppercase text-snitch-faint">
                {label}
              </span>
            </div>
          ))}
        </div>
      </header>

      {/*  TOOLBAR — search + sort + view  */}
      <div className="bg-snitch-cream/95 backdrop-blur-md border-b border-snitch-border/15 px-5 sm:px-8 md:px-10 xl:px-14 py-3.5">
        <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">

          {/* Search */}
          <div className="relative flex-1 max-w-sm">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-snitch-faint pointer-events-none">
              <Icons.Search />
            </span>
            <input
              type="text"
              placeholder="Search by name or category…"
              value={query}
              onChange={e => setQuery(e.target.value)}
              className="w-full bg-snitch-card border border-snitch-border/30 pl-9 pr-8 py-2.5 font-body text-[0.82rem] text-snitch-charcoal placeholder:text-snitch-faint outline-none focus:border-snitch-gold transition-colors duration-300"
            />
            {query && (
              <button
                onClick={() => setQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-snitch-faint hover:text-snitch-charcoal bg-transparent border-none cursor-pointer p-0"
              >
                <XIcon />
              </button>
            )}
          </div>

          {/* Sort */}
          <select
            value={sort}
            onChange={e => setSort(e.target.value)}
            className="bg-snitch-card border border-snitch-border/30 px-3 py-2.5 font-label text-[0.7rem] tracking-[0.06em] text-snitch-warm outline-none focus:border-snitch-gold transition-colors duration-300 cursor-pointer"
          >
            {SORT_OPTIONS.map(opt => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>

          {/* View toggle */}
          <div className="flex items-center border border-snitch-border/30 bg-snitch-card overflow-hidden shrink-0">
            {[
              { key: 'grid', Icon: GridIcon, title: 'Grid view'  },
              { key: 'list', Icon: ListIcon, title: 'List view'  },
            ].map(({ key, Icon, title }) => (
              <button
                key={key}
                onClick={() => setView(key)}
                title={title}
                className={[
                  'flex items-center justify-center w-9 h-9 bg-transparent border-none cursor-pointer transition-all duration-300',
                  view === key
                    ? 'bg-snitch-charcoal text-snitch-cream'
                    : 'text-snitch-faint hover:text-snitch-charcoal',
                ].join(' ')}
              >
                <Icon />
              </button>
            ))}
          </div>

          {/* Result count pill */}
          <span className="font-label text-[0.6rem] tracking-[0.1em] uppercase text-snitch-faint shrink-0 hidden sm:block">
            {displayed.length} / {totalProducts} items
          </span>
        </div>
      </div>

      {/*  MAIN CONTENT AREA  */}
      <main className="flex-1 px-5 sm:px-8 md:px-10 xl:px-14 py-8 sm:py-10">

        {/*   Loading skeleton   */}
        {loading && (
          <div className={
            view === 'grid'
              ? 'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-5 sm:gap-6'
              : 'flex flex-col gap-4'
          }>
            {Array.from({ length: 8 }).map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        )}

        {/*   Empty state   */}
        {!loading && totalProducts === 0 && (
          <div className="flex flex-col items-center justify-center py-24 sm:py-36 gap-5 text-center">
            <PackageIcon />
            <div>
              <p className="font-serif text-[1.3rem] text-snitch-charcoal m-0 mb-2">
                Your collection awaits.
              </p>
              <p className="font-body text-[0.82rem] text-snitch-muted m-0">
                No products listed yet. Add your first item to start selling.
              </p>
            </div>
            <button
              onClick={() => navigate('/seller/create-product')}
              className="mt-2 flex items-center gap-2 bg-snitch-gold text-white font-label text-[0.65rem] tracking-[0.14em] uppercase px-8 py-3.5 border-0 cursor-pointer hover:bg-snitch-charcoal transition-colors duration-300"
            >
              <Icons.Add />
              Add First Product
            </button>
          </div>
        )}

        {/*   No search results   */}
        {!loading && totalProducts > 0 && displayed.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20 gap-4 text-center">
            <Icons.Search />
            <div>
              <p className="font-serif text-[1.2rem] text-snitch-charcoal m-0 mb-1">
                No results found.
              </p>
              <p className="font-body text-[0.8rem] text-snitch-muted m-0">
                Try a different search term or clear the filter.
              </p>
            </div>
            <button
              onClick={() => setQuery('')}
              className="font-label text-[0.65rem] tracking-[0.12em] uppercase text-snitch-gold underline decoration-transparent hover:decoration-snitch-gold bg-transparent border-none p-0 cursor-pointer transition-all duration-300"
            >
              Clear Search
            </button>
          </div>
        )}

        {/*   Grid view   */}
        {!loading && displayed.length > 0 && view === 'grid' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-5 sm:gap-6 md:gap-7">
            {displayed.map(product => (
              <SellerProductCard
                key={product._id}
                product={product}
                onDelete={handleDelete}
                isDeleting={deletingId === product._id}
              />
            ))}
          </div>
        )}

        {/*   List view   */}
        {!loading && displayed.length > 0 && view === 'list' && (
          <div className="flex flex-col gap-3 sm:gap-4">
            {displayed.map(product => (
              <SellerProductCard 
                alignment ='row'
                key={product._id}
                product={product}
                onDelete={handleDelete}
                isDeleting={deletingId === product._id}
              />
            ))}
          </div>
        )}

      </main>

    </div>
  );
};

export default Products;
