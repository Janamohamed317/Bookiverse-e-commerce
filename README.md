# 📚 Bookiverse - Online Bookstore Platform

A full-stack e-commerce platform for buying and selling books, built with React, Node.js, and MongoDB. Bookiverse provides a complete solution for book management, user authentication, order processing, and administrative features.

## ✨ Features

### 🛍️ Customer Features
- **User Authentication & Authorization**
  - Secure signup/signin with JWT tokens
  - Email verification with OTP
  - Password reset functionality
  - Protected routes and role-based access

- **Book Browsing & Shopping**
  - Browse books with search and filtering
  - Detailed book information with images
  - Shopping cart functionality
  - Secure checkout process
  - Order tracking and history

- **User Management**
  - User profile management
  - Order history and tracking
  - Promo code system

### 👨‍💼 Admin Features
- **Book Management**
  - Add, edit, and delete books
  - Upload book images to Cloudinary
  - Manage book inventory and pricing
  - Track book sales statistics

- **Author Management**
  - Add and edit author information
  - Manage author-book relationships

- **User Management**
  - View and manage user accounts
  - Block/unblock users
  - User role management

- **Analytics & Statistics**
  - Monthly profit tracking
  - Order count analytics
  - Top-selling books
  - Revenue visualization with charts

- **Promo Code System**
  - Create and manage promotional codes
  - Set discount amounts and validity periods
  - Track promo code usage

## 🛠️ Tech Stack

### Frontend
- **React 19** - Modern UI library
- **TypeScript** - Type-safe development
- **Vite** - Fast build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **React Router** - Client-side routing
- **Zustand** - State management
- **React Query** - Server state management
- **Framer Motion** - Animation library
- **Recharts** - Data visualization
- **SweetAlert2** - Beautiful alerts
- **FontAwesome** - Icon library

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **JWT** - Authentication tokens
- **bcryptjs** - Password hashing
- **Cloudinary** - Image storage and management
- **Nodemailer** - Email services
- **Multer** - File upload handling
- **Joi** - Data validation
- **Helmet** - Security middleware
- **CORS** - Cross-origin resource sharing

## 📁 Project Structure

```
Bookiverse/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/         # Page components
│   │   ├── hooks/         # Custom React hooks
│   │   ├── services/      # API service functions
│   │   ├── store/         # Zustand stores
│   │   ├── types/         # TypeScript type definitions
│   │   ├── utils/         # Utility functions
│   │   └── assets/        # Static assets
│   └── package.json
├── server/                # Node.js backend
│   ├── controllers/       # Route controllers
│   ├── models/           # Database models
│   ├── routes/           # API routes
│   ├── middlewares/      # Custom middlewares
│   ├── utils/            # Utility functions
│   ├── db/               # Database connection
│   └── images/           # Uploaded images
└── README.md
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v22.20.0 or higher)
- MongoDB (local or cloud instance)
- Cloudinary account (for image storage)
- Email service (for OTP and notifications)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd Bookiverse
   ```

2. **Install server dependencies**
   ```bash
   cd server
   npm install
   ```

3. **Install client dependencies**
   ```bash
   cd ../client
   npm install
   ```

4. **Environment Setup**
   
   Create a `.env` file in the server directory:
   ```env
   # Database
   MONGODB_URI=mongodb://localhost:27017/bookiverse
   
   # JWT
   JWT_SECRET_KEY=your_jwt_secret_key
   
   # Cloudinary
   CLOUDINARY_CLOUD_NAME=your_cloud_name
   CLOUDINARY_API_KEY=your_api_key
   CLOUDINARY_API_SECRET=your_api_secret
   
   # Email (Nodemailer)
   EMAIL_USER=your_email@gmail.com
   EMAIL_PASS=your_app_password
   
   # Server
   PORT=5000
   ```

5. **Start the development servers**

   **Backend (Terminal 1):**
   ```bash
   cd server
   npm start
   ```

   **Frontend (Terminal 2):**
   ```bash
   cd client
   npm run dev
   ```

6. **Access the application**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:5000

## 📱 Usage

### For Customers
1. **Sign Up** - Create a new account with email verification
2. **Browse Books** - Explore the book catalog with search and filters
3. **Add to Cart** - Select books and add them to your shopping cart
4. **Checkout** - Complete your purchase with shipping details
5. **Track Orders** - Monitor your order status and history

### For Administrators
1. **Admin Login** - Access admin panel with admin credentials
2. **Manage Books** - Add, edit, or remove books from the catalog
3. **Manage Authors** - Add and edit author information
4. **View Analytics** - Monitor sales, profits, and user statistics
5. **User Management** - Manage user accounts and permissions
6. **Promo Codes** - Create and manage promotional discounts

## 🔧 API Endpoints

### Authentication
- `POST /api/auth/signup` - User registration
- `POST /api/auth/signin` - User login
- `POST /api/otp/verify` - Email verification

### Books
- `GET /api/books` - Get all books
- `GET /api/books/:id` - Get book by ID
- `POST /api/books` - Create new book (Admin)
- `PUT /api/books/:id` - Update book (Admin)
- `DELETE /api/books/:id` - Delete book (Admin)

### Orders
- `GET /api/order` - Get user orders
- `POST /api/order` - Create new order
- `GET /api/order/:id` - Get order details

### Statistics
- `GET /api/statistics/monthly-profit` - Monthly profit data
- `GET /api/statistics/monthly-orders` - Monthly order count
- `GET /api/statistics/top-sales` - Top selling books

## 🎨 Key Components

- **Responsive Design** - Mobile-first approach with Tailwind CSS
- **Modern UI/UX** - Clean, intuitive interface with smooth animations
- **Real-time Updates** - Dynamic data fetching with React Query
- **Image Management** - Cloudinary integration for optimized image handling
- **Security** - JWT authentication, password hashing, and input validation
- **Error Handling** - Comprehensive error handling and user feedback

## 🔒 Security Features

- JWT-based authentication
- Password hashing with bcryptjs
- Input validation with Joi
- CORS configuration
- Helmet security headers
- Protected routes and role-based access
- Email verification system

## 📊 Database Schema

### Users
- Authentication information
- Profile details
- Admin status and verification
- Promo code associations

### Books
- Book details (title, description, price)
- Author references
- Inventory management
- Sales tracking

### Orders
- Order information
- Book references and quantities
- User and shipping details
- Order status tracking

### Authors
- Author information
- Book associations

### PromoCodes
- Discount codes
- Validity periods
- Usage tracking

## 🚀 Deployment

The application is configured for deployment on Vercel:

1. **Frontend**: Deploy the `client` folder to Vercel
2. **Backend**: Deploy the `server` folder to Vercel or your preferred hosting service
3. **Database**: Use MongoDB Atlas for cloud database
4. **Environment Variables**: Configure all required environment variables

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the ISC License.

## 👥 Authors

- **Your Name** - *Initial work* - [YourGitHub](https://github.com/yourusername)

## 🙏 Acknowledgments

- React and Node.js communities
- MongoDB and Express.js documentation
- Tailwind CSS for the amazing utility classes
- All open-source contributors

---

**Bookiverse** - Your gateway to the world of books! 📚✨
