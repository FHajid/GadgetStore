
import React from 'react'
import Login from './Pages/Login.jsx'
import Home from './Pages/Home.jsx'
import Singup from './Pages/Sing-up.jsx'
import Contact from './Pages/Contact.jsx'
import About from './Pages/About.jsx'

import Categories from './Pages/Categories.jsx'
import Wishlist from './user/wishlist.jsx'
import Cart from './user/cart.jsx'
import Payment from './user/Payment.jsx'

import {BrowserRouter, Routes, Route} from 'react-router-dom'

// Admin
import AdminDashboard from './admin/dashboard.jsx'
import Admincategories from './admin/admin-categories.jsx'
import Adminorder from './admin/admin-order.jsx'
import AdminUser from './admin/admin-user.jsx'

// Items

// View 3D
import Iphone13d from './Items/Iphone/Iphone13D.jsx'
import Macbookpro3D from './Items/Macbook/Macbook3D.jsx'
import Ipadpro3D from './Items/Ipad/Ipad3D.jsx'
import Watch3D from './Items/Apple_watch/Watch3D.jsx'
import Airpods3D from './Items/Airpods/Airpods3D.jsx'
import Remote3D from './Items/TV/Remote3D.jsx'


// test import 
import Iphone13prodetail from './Items/Iphone/Iphone 13/iphone13_detail.jsx'
import Mackbookprodetail from './Items/Macbook/Macbookpro/Macbookpro_detail.jsx'
import Ipadprodetail from './Items/Ipad/Ipad_pro/Ipadpro_detail.jsx'
import Applewatchdetail from './Items/Apple_watch/Apple_watch_s3/Applewatch_detail.jsx'
import Airpodsprodetail from './Items/Airpods/Airpods_pro_detail.jsx'
import Appleremotedetail from './Items/TV/Remote/remotedetail.jsx'
import AdminProduct from './admin/admin-product.jsx'
import AdminReport from './admin/admin-report.jsx'
import AdminAddProduct from './admin/admin-add-product.jsx'
import AdminMessages from './admin/admin-contact.jsx'
import ProfileUser from './user/Profile.jsx'

  
function App() {
    return (
      <div>
        <BrowserRouter>
          <Routes>
            <Route index element={<Login />}/>
            <Route path='/Login' element={<Login />} />
            <Route path='/Sign-up' element={<Singup />} />
            <Route path='/Profile' element={<ProfileUser />} />
            
            {/* Shopping */}
            <Route path='/Home' element={<Home />} />
            {/* Contact  */}
            <Route path= '/Contact' element={<Contact />} />
            {/* About */}
            <Route path= '/About' element={<About />} />
            {/* Categories */}
            <Route path= '/Categories' element={<Categories />} />

            <Route path= '/Wishlist' element={<Wishlist />} />

            <Route path= '/Cart' element={<Cart />} />

            <Route path= '/Payment' element={<Payment />} />



            {/* view 3d Model */}
            <Route path= '/Iphone13d' element={<Iphone13d/>} />
            <Route path= '/MacbookPro3d' element={<Macbookpro3D/>} />
            <Route path= '/IpadPro3d' element={<Ipadpro3D/>} />
            <Route path= '/Watch3D' element={<Watch3D/>} />
            <Route path= '/Airpods3D' element={<Airpods3D/>} />
            <Route path= '/Remote3D' element={<Remote3D/>} />

            {/* VIEW detail Iphone */}
            <Route path= '/Iphone13pro-detail' element={<Iphone13prodetail />} />

            <Route path= '/Mackbookpro-detail' element={<Mackbookprodetail />} />

            <Route path= '/Ipadpro-detail' element={<Ipadprodetail />} />

            <Route path= '/Applewatch-detail' element={<Applewatchdetail />} />

            <Route path= '/Airpodspro-detail' element={<Airpodsprodetail />} />

            <Route path= '/Appleremote-detail' element={<Appleremotedetail />} />

            


            {/* Admin */}
            <Route path= '/admin-dashboard' element={<AdminDashboard />} />
            <Route path= '/admin-categories' element={<Admincategories />} />
            <Route path= '/admin-Order' element={<Adminorder />} />
            <Route path= '/admin-user' element={<AdminUser />} />
            <Route path= '/admin-Product' element={<AdminProduct />} />
            <Route path= '/admin-Report' element={<AdminReport />} />
            <Route path= '/admin-Addproduct' element={<AdminAddProduct />} />
            <Route path= '/admin-Messages' element={<AdminMessages />} />
          </Routes>
        </BrowserRouter>
      </div>
    )
}

export default App