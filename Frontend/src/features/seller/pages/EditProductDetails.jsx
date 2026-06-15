import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSeller } from '../hook/useSeller';
import { variantSchema } from '../../products/validations/productValidation';
import ProductImageUploader from '../../products/components/ProductImageUploader';
import Add_Variant from '../../products/components/AddVariant';



const EditProductDetails = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const { handleAddProductVariant } = useSeller();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [images, setImages] = useState([]);
  const [sizes, setSizes] = useState([{ size: '', stock: '' }]);
  const [variantData, setVariantData] = useState({
    color: '',
    priceAmount: '',
  });
 


  const handleSubmit = async (e, shouldNavigate = true) => {
    e.preventDefault();
    try {
      const data = {
        color: variantData.color,
        priceAmount: variantData.priceAmount,
        sizes,
        images
      }

      const paresedData = variantSchema.parse(data)
      const formData = new FormData()

      formData.append('color', paresedData.color)
      formData.append('priceAmount', paresedData.priceAmount)
      formData.append('sizes', JSON.stringify(paresedData.sizes))
      paresedData.images.forEach(img => formData.append('images', img.file))

      await handleAddProductVariant(productId, formData)

      if (shouldNavigate) {
        navigate('/seller/dashboard/products');
      } else {
        // Reset form for "Add More"
        setVariantData({ color: '', priceAmount: '' });
        setImages([]);
        setSizes([{ size: '', stock: '' }]);
        alert('Variant added successfully! You can add another one.');
      }

    } catch (err) {
      if (err.name === "ZodError") {
      const messages = err.issues.map(e => e.message);
      alert(messages.join("\n"));
      return;
      }
    }
    finally {
      setIsSubmitting(false)
    }
  }

 
  return (
    <>
      <link
        href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400&family=Inter:wght@300;400;500;600&display=swap"
        rel="stylesheet"
      />

      <div
        className="min-h-screen selection:bg-[#C9A96E]/30"
        style={{ backgroundColor: '#fbf9f6', fontFamily: "'Inter', sans-serif" }}
      >
        <div className="max-w-6xl mx-auto px-8 lg:px-16 xl:px-24">

          {/*    Page Header    */}
          <div className="pt-4 pb-0">
            <h1
              className="text-4xl lg:text-5xl font-light leading-tight"
              style={{ fontFamily: "'Cormorant Garamond', serif", color: '#1b1c1a' }}
            >
              Add Variant
            </h1>
            <div className="mt-4 w-14 h-px" style={{ backgroundColor: '#C9A96E' }} />
          </div>

          {/*    Form    */}
          <form onSubmit={(e) => handleSubmit(e, true)} className="pt-12 pb-24">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-20 lg:items-start">

              {/*    LEFT COLUMN: Context & Text Fields    */}
              <Add_Variant 
              sizes={sizes} 
              setSizes={setSizes} 
              variantData={variantData}
              setVariantData={setVariantData}
              />



              {/*    RIGHT COLUMN: Images    */}
             <ProductImageUploader 
                  images={images} 
                  setImages={setImages} 
              />
            </div>


            {/*    Submit Area    */}
            <div className="mt-16 lg:mt-24 flex flex-col sm:flex-row gap-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 py-5 text-[11px] uppercase tracking-[0.3em] font-medium transition-all duration-300 disabled:opacity-50"
                style={{ backgroundColor: '#1b1c1a', color: '#fbf9f6' }}
                onMouseEnter={e => { e.currentTarget.style.backgroundColor = '#C9A96E'; e.currentTarget.style.color = '#1b1c1a'; }}
                onMouseLeave={e => { e.currentTarget.style.backgroundColor = '#1b1c1a'; e.currentTarget.style.color = '#fbf9f6'; }}
              >
                {isSubmitting ? 'Processing...' : 'Save & Exit'}
              </button>

              <button
                type="button"
                onClick={(e) => handleSubmit(e, false)}
                disabled={isSubmitting}
                className="flex-1 py-5 text-[11px] uppercase tracking-[0.3em] font-medium border border-[#1b1c1a] transition-all duration-300 disabled:opacity-50"
                style={{ backgroundColor: 'transparent', color: '#1b1c1a' }}
                onMouseEnter={e => { e.currentTarget.style.backgroundColor = '#1b1c1a'; e.currentTarget.style.color = '#fbf9f6'; }}
                onMouseLeave={e => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.color = '#1b1c1a'; }}
              >
                Add More Variant
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default EditProductDetails;
