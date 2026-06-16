# WearVerse

**A modern full-stack e-commerce platform for fashion and apparel**

WearVerse is a comprehensive online marketplace designed to provide seamless shopping experiences for customers while empowering sellers to manage their product catalogs and track their sales efficiently.

---

## 🎯 Features

### For Customers
- 🛍️ **Browse Products** - Explore a wide variety of fashion items
- 🔐 **Secure Authentication** - Sign up and login with email or Google
- 🛒 **Shopping Cart** - Add items to cart and manage quantities
- ❤️ **Wishlist** - Save favorite items for later
- 🔍 **Product Discovery** - Search and filter products by categories
- 📝 **Product Details** - View detailed product information with images and variants
- 💳 **Checkout** - Secure payment processing

### For Sellers
- 📊 **Dashboard** - Comprehensive seller dashboard with analytics
- 📦 **Product Management** - Create, edit, and manage product listings
- 📸 **Image Upload** - Upload and manage product images
- 📈 **Revenue Tracking** - Monitor sales and revenue
- 📋 **Order Management** - Track and manage customer orders
- ⚙️ **Settings** - Configure seller profile and preferences

---

## 🛠️ Tech Stack

### Frontend
- **Framework**: React 19
- **Build Tool**: Vite
- **State Management**: Redux Toolkit
- **Styling**: Tailwind CSS
- **HTTP Client**: Axios
- **Form Validation**: Zod
- **Routing**: React Router v7
- **UI Notifications**: React Toastify
- **Icon Library**: Remix Icon

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js v5
- **Database**: MongoDB (Mongoose)
- **Authentication**: JWT & Google OAuth (Passport.js)
- **Input Validation**: Express Validator & Zod
- **Image Storage**: ImageKit
- **Token_Blacklisting**: Redis (ioredis)
- **Payment Processing**: Razorpay
- **File Upload**: Multer
- **Server Logging**: Morgan

---

## 📁 Project Structure

```
WearVerse/
├── Backend/
│   ├── src/
│   │   ├── app.js                    # Express app setup
│   │   ├── config/                   # Configuration files
│   │   │   ├── cache.js              # Redis caching config
│   │   │   ├── config.js             # General configuration
│   │   │   └── db.js                 # MongoDB connection
│   │   ├── constants/                # Application constants
│   │   │   └── categories.js         # Product categories
│   │   ├── controllers/              # Route controllers
│   │   │   ├── account.controllers.js
│   │   │   ├── auth.controllers.js
│   │   │   ├── cart.controllers.js
│   │   │   ├── location.controller.js
│   │   │   ├── order.controllers.js
│   │   │   ├── product.controllers.js
│   │   │   ├── seller.controllers.js
│   │   │   └── wishlist.controllers.js
│   │   ├── dao/                      # Data access objects
│   │   │   └── cart.dao.js
│   │   ├── middlewares/              # Custom middlewares
│   │   │   └── auth.middleware.js
│   │   ├── models/                   # MongoDB models
│   │   │   ├── address.model.js
│   │   │   ├── cart.model.js
│   │   │   ├── order.model.js
│   │   │   ├── payment.model.js
│   │   │   ├── price.model.js
│   │   │   ├── product.model.js
│   │   │   ├── subOrder.model.js
│   │   │   ├── user.model.js
│   │   │   └── wishlist.model.js
│   │   ├── routes/                   # API routes
│   │   │   ├── account.routes.js
│   │   │   ├── auth.routes.js
│   │   │   ├── cart.routes.js
│   │   │   ├── location.routes.js
│   │   │   ├── order.routes.js
│   │   │   ├── product.routes.js
│   │   │   ├── seller.routes.js
│   │   │   └── wishlist.routes.js
│   │   ├── services/                 # Business logic services
│   │   │   ├── image.service.js      # ImageKit integration
│   │   │   └── payment.service.js    # Razorpay integration
│   │   └── validation/               # Input validation (Express Validator + Zod)
│   │       ├── account.validator.js
│   │       ├── auth.validator.js
│   │       ├── cart.validation.js
│   │       ├── product.validator.js
│   │       └── wishlist.validator.js
│   ├── server.js                      # Server entry point
│   └── package.json
│
└── Frontend/
    ├── src/
    │   ├── app/                       # App configuration & routing
    │   │   ├── App.jsx                # Main app component
    │   │   ├── app.routes.jsx         # Route definitions
    │   │   ├── app.store.js           # Redux store setup
    │   │   └── AppLayout.jsx          # Main layout wrapper
    │   ├── features/                  # Feature-based modular structure
    │   │   ├── account/               # User account management
    │   │   │   ├── components/
    │   │   │   ├── pages/
    │   │   │   ├── services/
    │   │   │   ├── validation/        # Zod schemas
    │   │   │   └── hook/
    │   │   ├── auth/                  # Authentication (login/signup)
    │   │   │   ├── components/
    │   │   │   ├── pages/
    │   │   │   ├── service/
    │   │   │   ├── state/             # Redux slices
    │   │   │   ├── validation/        # Zod schemas
    │   │   │   └── hook/
    │   │   ├── cart/                  # Shopping cart
    │   │   │   ├── components/
    │   │   │   ├── pages/
    │   │   │   ├── services/
    │   │   │   ├── state/             # Redux slices
    │   │   │   └── hook/
    │   │   ├── order/                 # Order management
    │   │   │   ├── component/
    │   │   │   ├── pages/
    │   │   │   ├── services/
    │   │   │   ├── utils/
    │   │   │   └── hook/
    │   │   ├── products/              # Product browsing & details
    │   │   │   ├── components/
    │   │   │   ├── pages/
    │   │   │   ├── services/
    │   │   │   ├── state/             # Redux slices
    │   │   │   ├── constants/
    │   │   │   ├── validations/       # Zod schemas
    │   │   │   └── hook/
    │   │   ├── seller/                # Seller dashboard
    │   │   │   ├── components/
    │   │   │   ├── pages/
    │   │   │   ├── services/
    │   │   │   ├── state/             # Redux slices
    │   │   │   ├── layout/
    │   │   │   └── hook/
    │   │   ├── wishlist/              # Wishlist feature
    │   │   │   ├── components/
    │   │   │   ├── pages/
    │   │   │   ├── services/
    │   │   │   ├── state/             # Redux slices
    │   │   │   └── hook/
    │   │   └── shared/                # Shared components & utilities
    │   │       ├── BackButton.jsx
    │   │       ├── Brandname.jsx
    │   │       ├── Footer.jsx
    │   │       ├── Loading.jsx
    │   │       ├── navbar/            # Navigation components
    │   │       ├── icons/             # Icon components
    │   │       └── utils/             # Utility functions
    │   ├── main.jsx                   # React entry point
    │   └── index.css                  # Global styles
    ├── index.html
    ├── vite.config.js
    └── package.json
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- MongoDB instance (local or cloud)

### Installation

#### 1. Clone the Repository
```bash
git clone <repository-url>
cd WearVerse
```

#### 2. Backend Setup
```bash
cd Backend
npm install
```

Create a `.env` file in the Backend directory:
```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
REDIS_URL=your_redis_connection_url
IMAGEKIT_PRIVATE_KEY=your_imagekit_private_key
IMAGEKIT_PUBLIC_KEY=your_imagekit_public_key
IMAGEKIT_URL_ENDPOINT=your_imagekit_url_endpoint
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret
```

#### 3. Frontend Setup
```bash
cd ../Frontend
npm install
```

Create a `.env` file in the Frontend directory:
```env
VITE_API_URL=http://localhost:5000
VITE_GOOGLE_CLIENT_ID=your_google_client_id
```

---

## 📦 Key Dependencies

### Backend
```json
{
  "express": "^5.2.1",
  "mongoose": "^9.4.1",
  "express-validator": "^7.3.2",
  "jsonwebtoken": "^9.0.3",
  "bcryptjs": "^3.0.3",
  "ioredis": "^5.11.1",
  "@imagekit/nodejs": "^7.5.0",
  "razorpay": "^2.9.6",
  "passport": "^0.7.0",
  "passport-google-oauth20": "^2.0.0",
  "multer": "^2.1.1"
}
```

### Frontend
```json
{
  "react": "^19.1.1",
  "react-dom": "^19.1.1",
  "redux": "via @reduxjs/toolkit ^2.11.2",
  "react-redux": "^9.2.0",
  "react-router-dom": "^7.14.0",
  "axios": "^1.15.0",
  "zod": "^4.4.3",
  "tailwindcss": "^4.2.2",
  "react-toastify": "^11.1.0"
}
```

---

### Backend
```bash
cd Backend
npm start
# or for development with auto-reload
npm run dev
```
The backend will run on `http://localhost:5000`

### Frontend
```bash
cd Frontend
npm run dev
```
The frontend will run on `http://localhost:5173`

---

## 📚 API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/logout` - Logout user
- `GET /api/auth/profile` - Get user profile

### Products
- `GET /api/products` - Get all products with filters
- `GET /api/products/:id` - Get product details
- `POST /api/products` - Create new product (seller)
- `PUT /api/products/:id` - Update product (seller)
- `DELETE /api/products/:id` - Delete product (seller)

### Cart
- `GET /api/cart` - Get user cart
- `POST /api/cart/add` - Add item to cart
- `PUT /api/cart/:itemId` - Update cart item quantity
- `DELETE /api/cart/:itemId` - Remove item from cart
- `DELETE /api/cart` - Clear entire cart

### Wishlist
- `GET /api/wishlist` - Get user wishlist
- `POST /api/wishlist/add` - Add item to wishlist
- `DELETE /api/wishlist/:itemId` - Remove item from wishlist

### Orders
- `GET /api/orders` - Get user orders
- `GET /api/orders/:orderId` - Get order details
- `POST /api/orders` - Create new order
- `PUT /api/orders/:orderId` - Update order status
- `GET /api/orders/:orderId/track` - Track order status

### Seller
- `GET /api/seller/dashboard` - Get seller analytics
- `GET /api/seller/orders` - Get seller's orders
- `GET /api/seller/products` - Get seller's products
- `PUT /api/seller/settings` - Update seller settings

### Accounts
- `PUT /api/account/profile` - Update user profile
- `POST /api/account/change-password` - Change password
- `GET /api/account/addresses` - Get user addresses
- `POST /api/account/addresses` - Add new address
- `PUT /api/account/addresses/:addressId` - Update address

---

## 🔐 Authentication & Security

WearVerse supports two authentication methods:
1. **Email & Password** - Traditional sign-up/login with JWT
2. **Google OAuth** - Single sign-on with Google (Passport.js)

### Security Features
- JWT tokens for stateless authentication
- Password encryption with bcryptjs
- Protected API routes with auth middleware
- Input validation with Express Validator & Zod
- CORS configuration for cross-origin requests
- Secure session management

---

## 🏗️ Architecture & Design Patterns

### Backend Architecture
- **MVC Pattern**: Controllers handle requests, Models define data structure
- **Modular Routes**: Separated route files for each feature (auth, products, cart, etc.)
- **Service Layer**: Business logic isolated in service layer (image uploads, payments)
- **DAO Pattern**: Data access objects for complex queries (e.g., cart operations)
- **Middleware**: Authentication and custom request processing
- **Caching**: Redis integration for performance optimization

### Frontend Architecture
- **Feature-Based Structure**: Each feature (auth, products, cart) is self-contained
- **Redux State Management**: Centralized state for cart, orders, user authentication
- **Custom Hooks**: Feature-specific logic abstracted into reusable hooks
- **Modular Components**: Components organized by feature with clear responsibilities
- **API Services**: Axios-based service layer for all backend communication

---

## ✅ Validation Strategy

WearVerse uses a dual validation approach for robust data integrity:

### Backend Validation
- **Express Validator**: Used for server-side request validation, sanitization, and middleware-level checks
- **Zod**: TypeScript-first schema validation for complex data structures and type safety
- Validators are organized by feature (auth, cart, product, etc.)
- All API endpoints validate incoming data before processing

### Frontend Validation
- **Zod**: Client-side form validation for immediate user feedback
- Validation schemas are co-located with feature components
- Real-time validation improves user experience and reduces invalid submissions

---

## 📝 Features in Detail

### Product Management
- Create, read, update, and delete products with multiple variants
- Product image upload and management via ImageKit
- Set pricing, inventory levels, and product specifications
- Organize products by categories
- Search and filter products efficiently with caching
- Product ratings and reviews

### Seller Dashboard
- Comprehensive analytics and revenue tracking
- Order history and status management
- Product inventory management
- Real-time sales monitoring
- Seller profile and settings configuration

### Shopping Experience
- Responsive design optimized for all devices
- Fast and intuitive product search and filtering
- Shopping cart with persistent storage
- Wishlist for saving favorite items
- Multi-step checkout process with payment validation
- Secure payment processing via Razorpay
- Order tracking and history
- Address management for multiple shipping locations

### User Account
- Profile management and editing
- Password change and security settings
- Order history and tracking
- Wishlist management
- Multiple address management
- Account preferences

---

## 🏃 Running the Application

### Backend Scripts
```bash
cd Backend

# Start production server
npm start

# Start development server with auto-reload
npm run dev

# Run tests (when configured)
npm test
```

The backend runs on `http://localhost:5000`

### Frontend Scripts
```bash
cd Frontend

# Start development server with hot reload
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run ESLint
npm run lint
```

The frontend runs on `http://localhost:5173`

---

## 🔧 Development Workflow

### Code Structure Guidelines
- **Controllers**: Handle HTTP requests and responses
- **Services**: Contain business logic and integrate external services
- **Models**: Define database schema
- **Routes**: Define API endpoints
- **Validation**: Validate incoming data with Express Validator / Zod
- **Middleware**: Authentication, error handling, logging
- **Components**: Reusable React components with clear responsibilities
- **Hooks**: Custom React hooks for feature logic
- **Store**: Redux slices for state management
---

### Database Models
- **User**: User account and authentication
- **Product**: Product listings with variants
- **Cart**: User shopping cart items
- **Order**: Purchase orders and order items
- **SubOrder**: Individual orders from different sellers
- **Wishlist**: Saved favorite items
- **Address**: User shipping addresses
- **Payment**: Payment transaction records
- **Price**: Product pricing information

---

## 📚 Documentation Files
- `README.md` - Project overview and setup guide
- `design.md` - Design specifications and UI guidelines
- `cartOrderPlain.md` - Cart and order implementation details

---

## 🙏 Acknowledgments

- React community for amazing libraries and tools
- MongoDB for reliable and scalable database solutions
- Express.js for powerful backend framework
- Google Cloud for authentication services
- ImageKit for efficient image management
- Razorpay for payment processing
- Tailwind CSS for modern styling utilities

---

**Happy Shopping with WearVerse!**
