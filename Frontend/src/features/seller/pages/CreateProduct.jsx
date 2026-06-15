import React, { useState } from 'react';
import { useSeller } from '../hook/useSeller.js'
import { useNavigate } from 'react-router';
import ProductImageUploader from '../../products/components/ProductImageUploader.jsx';
import AddVariant from '../../products/components/AddVariant.jsx';
import { createProductSchema } from '../../products/validations/productValidation.js';
import { CATEGORIES } from '../../products/constants/categories.js';

const CURRENCIES = ['INR', 'USD', 'EUR', 'GBP'];
const MAX_IMAGES = 5;

const CreateProduct = () => {
    const { handleCreateProduct } = useSeller();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        title: '',
        description: '',
        priceAmount: '',
        priceCurrency: 'INR',
        category : ""
    });
    const [images, setImages] = useState([]);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const [variantData, setVariantData] = useState({
        color: '',
    });
    const [sizes, setSizes] = useState([{ size: '', stock: '' }]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {

            const data = {
                title: formData.title,
                description: formData.description,
                priceAmount: formData.priceAmount,
                priceCurrency: formData.priceCurrency,
                color: variantData.color,
                category : formData.category,
                sizes,
                images

            }

            const paresedData = createProductSchema.parse(data)

            const form_data = new FormData();
            form_data.append('title', paresedData.title);
            form_data.append('description', paresedData.description);
            form_data.append('priceAmount', paresedData.priceAmount);
            form_data.append('priceCurrency', paresedData.priceCurrency);
            form_data.append('color', paresedData.color);
            form_data.append('sizes', JSON.stringify(paresedData.sizes));
            form_data.append('category', paresedData.category);

            images.forEach(img => form_data.append('images', img.file));
            await handleCreateProduct(form_data);

            navigate('/seller/dashboard/products');

        } catch (err) {
            if (err.name === "ZodError") {
                const messages = err.issues.map(e => e.message);
                alert(messages.join("\n"));
                return;
            }

        } finally {
            setIsSubmitting(false);
        }
    };



    const inputClass = "w-full bg-transparent outline-none py-4 text-sm transition-colors duration-300 placeholder:text-[#d0c5b5]";
    const inputStyle = { color: '#1b1c1a', borderBottom: '1px solid #d0c5b5', fontFamily: "'Inter', sans-serif" };
    const handleFocus = (e) => { e.target.style.borderBottomColor = '#C9A96E'; };
    const handleBlur = (e) => { e.target.style.borderBottomColor = '#d0c5b5'; };

    return (
        <>
            {/* Google Fonts */}
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
                            New Listing
                        </h1>
                        {/* Gold rule separator */}
                        <div className="mt-4 w-14 h-px" style={{ backgroundColor: '#C9A96E' }} />
                    </div>

                    {/*    Form    */}
                    <form onSubmit={handleSubmit} className="pt-14 pb-24">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-20 lg:items-start">

                            {/*    LEFT COLUMN: Text Fields    */}
                            <div className="flex flex-col gap-12">

                                {/* Product Title */}
                                <div className="flex flex-col gap-2">
                                    <label
                                        htmlFor="cp-title"
                                        className="text-[10px] uppercase tracking-[0.2em] font-medium"
                                        style={{ color: '#7A6E63' }}
                                    >
                                        Product Title
                                    </label>
                                    <input
                                        id="cp-title"
                                        type="text"
                                        name="title"
                                        value={formData.title}
                                        onChange={handleChange}
                                        required
                                        placeholder="e.g. Oversized Linen Shirt"
                                        className={inputClass}
                                        style={inputStyle}
                                        onFocus={handleFocus}
                                        onBlur={handleBlur}
                                    />
                                </div>

                                {/* Description */}
                                <div className="flex flex-col gap-2">
                                    <label
                                        htmlFor="cp-description"
                                        className="text-[10px] uppercase tracking-[0.2em] font-medium"
                                        style={{ color: '#7A6E63' }}
                                    >
                                        Description
                                    </label>
                                    <textarea
                                        id="cp-description"
                                        name="description"
                                        value={formData.description}
                                        onChange={handleChange}
                                        rows={5}
                                        placeholder="Describe the product — material, fit, details..."
                                        className="w-full bg-transparent outline-none py-4 text-sm transition-colors duration-300 resize-none leading-relaxed placeholder:text-[#d0c5b5]"
                                        style={inputStyle}
                                        onFocus={handleFocus}
                                        onBlur={handleBlur}
                                    />
                                </div>
                                {/* Category */}
                                <div className="flex flex-col gap-2">
                                    <label
                                        htmlFor="cp-category"
                                        className="text-[10px] uppercase tracking-[0.2em] font-medium"
                                        style={{ color: '#7A6E63' }}
                                    >
                                        Category
                                    </label>

                                    <select
                                        id="cp-category"
                                        name="category"
                                        value={formData.category}
                                        onChange={handleChange}
                                        className="w-full bg-transparent outline-none py-4 text-sm cursor-pointer appearance-none transition-colors duration-300"
                                        style={inputStyle}
                                        onFocus={handleFocus}
                                        onBlur={handleBlur}
                                    >
                                        <option value="" disabled  >Select Category</option>

                                        {CATEGORIES.map((category) => (
                                            <option
                                                key={category}
                                                value={category}
                                                style={{ backgroundColor: "#fbf9f6", color: "#1b1c1a" }}
                                                required
                                            >
                                                {category}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                {/* Price */}
                                <div className="flex flex-col gap-3">
                                    <label className="text-[10px] uppercase tracking-[0.2em] font-medium" style={{ color: '#7A6E63' }}>
                                        Price
                                    </label>
                                    <div className="flex gap-5 items-end">
                                        {/* Amount */}
                                        <div className="flex flex-col gap-1 flex-[3]">
                                            <span className="text-[9px] uppercase tracking-[0.18em]" style={{ color: '#B5ADA3' }}>Amount (INR)</span>
                                            <input
                                                id="cp-priceAmount"
                                                type="number"
                                                name="priceAmount"
                                                value={formData.priceAmount}
                                                onChange={handleChange}
                                                required
                                                min="0"
                                                step="0.01"
                                                placeholder="0.00"
                                                className={inputClass}
                                                style={inputStyle}
                                                onFocus={handleFocus}
                                                onBlur={handleBlur}
                                            />
                                        </div>
                                      
                                        
                                    </div>
                                </div>

                                <AddVariant
                                    newProduct={true}
                                    variantData={variantData}
                                    setVariantData={setVariantData}
                                    sizes={sizes}
                                    setSizes={setSizes}
                                />
                            </div>

                            {/*    RIGHT COLUMN: Images    */}
                            <ProductImageUploader
                                images={images}
                                setImages={setImages}
                            />
                        </div>

                        {/*    Submit Button    */}
                        <div className="mt-16 lg:mt-20">
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full py-5 text-[11px] uppercase tracking-[0.3em] font-medium transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                                style={{
                                    backgroundColor: isSubmitting ? '#7A6E63' : '#1b1c1a',
                                    color: '#fbf9f6',
                                    fontFamily: "'Inter', sans-serif"
                                }}
                                onMouseEnter={e => {
                                    if (!isSubmitting) {
                                        e.currentTarget.style.backgroundColor = '#C9A96E';
                                        e.currentTarget.style.color = '#1b1c1a';
                                    }
                                }}
                                onMouseLeave={e => {
                                    if (!isSubmitting) {
                                        e.currentTarget.style.backgroundColor = '#1b1c1a';
                                        e.currentTarget.style.color = '#fbf9f6';
                                    }
                                }}
                            >
                                {isSubmitting ? 'Publishing...' : 'Publish Listing'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

export default CreateProduct;