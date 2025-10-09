import { Route, Routes } from 'react-router'
import './App.css'
import { lazy, Suspense } from "react";
import DisplayBooks from './pages/DisplayBooks/DisplayBooks'
import Home from './pages/Home/Home'
import EditBook from './pages/EditBook/EditBook'
import Admin from './pages/Admin/Admin'
import Signup from './pages/Signup/SignupPage'
import Signin from './pages/Signin/SigninPage'
import ProtectedRoutes from './utils/ProtectedRoutes'
import AddBook from './pages/AddBook/AddBook'
import ResetPassword from './pages/ForgotPasswordForm/ForgotPasswordForm'
import ResetPasswordForm from './pages/ResetPasswordForm/ResetPasswordForm'
import EditAuthor from './pages/EditAuthor/EditAuthor'
import ProtectedAdminRoute from './utils/ProtectedAdminRoute'
const UserProfile = lazy(() => import('./pages/UserProfile/UserProfile'))
import OrderInfo from './pages/OrderInfo/OrderInfo'
import Cart from './pages/Cart/Cart'
import UserEdit from './pages/UserEdit/UserEdit'
import Checkout from './pages/Checkout/Checkout'
import Spinner from './components/Spinner/Spinner';
import OTP from './pages/OTP/OTP';

function App() {
  return (
    <>
      <Routes>
        <Route path='/signup' element={<Signup />} />
        <Route path='/signin' element={<Signin />} />
        <Route path='/resetPassword' element={<ResetPassword />} />
        <Route path="/reset-password/:id/:token" element={<ResetPasswordForm />} />

        <Route path='/' element={
          <ProtectedRoutes>
            <Home />
          </ProtectedRoutes>
        } />

        <Route path='/otp-verify' element={
          <OTP />
        } />

        <Route path='/books' element={
          <ProtectedRoutes>
            <DisplayBooks />
          </ProtectedRoutes>
        } />

        <Route path='/user' element={
          <ProtectedRoutes>
            <Suspense fallback={<Spinner />}>
              <UserProfile />
            </Suspense>
          </ProtectedRoutes>
        } />

        <Route path='/user/edit' element={
          <ProtectedRoutes>
            <UserEdit />
          </ProtectedRoutes>
        } />

        <Route path='/user/orders/:orderId' element={
          <ProtectedRoutes>
            <OrderInfo />
          </ProtectedRoutes>
        } />

        <Route path='/cart' element={
          <ProtectedRoutes>
            <Cart checkout={"no"} amount={0}/>
          </ProtectedRoutes>
        } />

        <Route path='/checkout' element={
          <ProtectedRoutes>
            <Checkout />
          </ProtectedRoutes>
        } />

        <Route path="/admin" element={<ProtectedAdminRoute />}>
          <Route index element={<Admin />} />
          <Route path="EditAuthor" element={<EditAuthor />} />
          <Route path="addBook" element={<AddBook />} />
          <Route path='EditBook' element={<EditBook />} />
        </Route>

      </Routes >
    </>
  )
}

export default App
