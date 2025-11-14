import React, {useRef, useState} from "react";
import './css/Home.css'
import Logheader from "../Component/Header-login";
import Footer from "../Component/Footer";
import SimpleCarousel from "../Component/Iklan-carusel";
import Sellercarusel from "../Component/Seller-carusel.jsx";
import { useNavigate } from 'react-router-dom';


// Items Product
import Iphone13Pro from "../Items/Iphone/Iphone 13/iphone_13";
import IpadPro from "../Items/Ipad/Ipad_pro/Ipad.jsx";
import Macbook from "../Items/Macbook/Macbookpro/Mackbookpro.jsx";
import Applewatch from "../Items/Apple_watch/Apple_watch_s3/Apple_watch.jsx";
import Airpodspro from "../Items/Airpods/Airpods.jsx";
import Appleremote from "../Items/TV/Remote/Appleremote.jsx";

function Home () {
  const navigate = useNavigate();

   // Dragging state
   const [isDragging, setIsDragging] = useState(false);
   const [startX, setStartX] = useState(0);
   const [scrollLeft, setScrollLeft] = useState(0);
   const itemsRef = useRef(null);  // Reference for the items container
 
   // Handle mouse down or touch start
   const startDrag = (e) => {
     setIsDragging(true);
     setStartX(e.pageX || e.touches[0].pageX);  // Use mouse or touch position
     setScrollLeft(itemsRef.current.scrollLeft);  // Set the current scroll position
   };
 
   // Handle dragging
   const onDrag = (e) => {
     if (!isDragging) return;
     const x = e.pageX || e.touches[0].pageX;
     const walk = (x - startX) * 2;  // Increase scroll speed
     itemsRef.current.scrollLeft = scrollLeft - walk;
   };
 
   // Stop dragging
   const stopDrag = () => {
     setIsDragging(false);
   }; 

  return(
<div>

    <Logheader />


            {/* <-- 
        header end
        Main Start 
        -->  */}

  <div className="Main-home">
    
      <div className="home-upper-iklan">
        <div className="iklan-text">
              <ul>
                <li> Iphone </li>
                <li> Ipad </li>
                <li> Mac </li>
                <li> Watch </li>
                <li> Airpods </li>
                <li> Tv & Homes </li>
              </ul>
        </div>

        <div className="iklan-gambar">

              <SimpleCarousel/>

        </div>

      </div>

      {/* carusel itemn */}


    <div className="home-carusel-item">
        <div class="hot-sale">
            <div class="rectangle"></div>
                <h2>Hot Sale</h2>
            </div>

            <div class="best-product">
            <h1>Best Product</h1>
            
        </div>

        <div className="carusel-hot">
              <Sellercarusel/>
        </div>

    </div>
      


      <div className="home-categori">
        <div class="hot-sale">
        <div class="rectangle"></div>
        <h2>Categories</h2>
        </div>

        <div class="best-product">
            <h1>Browse Categories</h1>
        </div>

        <div class="grup-cata">
        <div class="cata"onClick={() => navigate('/Categories')} >
            <i class="bi bi-phone " style={{color: "#7a7a7a"}}></i>
            <p>Iphone</p>
        </div>

        <div class="cata" onClick={() => navigate('/Categories')} >
            <i class="bi bi-tablet" style={{color: "#7a7a7a"}}></i>
            <p>Tablet</p>
        </div>
        <div class="cata" onClick={() => navigate('/Categories')} >
            <i class="bi bi-laptop" style={{color: "#7a7a7a"}}></i>
            <p>Laptop</p>
        </div>
        <div class="cata" onClick={() => navigate('/Categories')} >
            <i class="bi bi-smartwatch" style={{color: "#7a7a7a"}}></i>
            <p>Watch</p>
        </div>
        <div class="cata" onClick={() => navigate('/Categories')} >
            <i class="bi bi-headphones" style={{color: "#7a7a7a"}}></i>
            <p>Airpods</p>
        </div>
        <div class="cata"onClick={() => navigate('/Categories')} >
            <i class="bi bi-tv" style={{color: "#7a7a7a"}}></i>
            <p>Tv</p>
        </div>
    </div>

            

      </div>


      <div className="home-items">
          <div className="hot-sale">
            <div className="rectangle"></div>
            <h2>Our Product</h2>
          </div>

          <div className="best-product">
            <h1>Explore Our Product</h1>
          </div>

          <div
            className="Items-produck"
            ref={itemsRef}
            onMouseDown={startDrag}
            onMouseLeave={stopDrag}
            onMouseUp={stopDrag}
            onMouseMove={onDrag}
            onTouchStart={startDrag}
            onTouchEnd={stopDrag}
            onTouchMove={onDrag}
          >
            <Iphone13Pro />
            <IpadPro />
            <Macbook />
            <Applewatch />
            <Airpodspro />
            <Appleremote />
          </div>
        </div>
      </div>    

{/* Footer Start */}
    <Footer/>

</div>

)}

export default Home