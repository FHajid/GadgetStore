import React, { useRef } from 'react';
import "./css/Seller-carusel.css";

import Iphone13Pro from "../Items/Iphone/Iphone 13/iphone_13";
import IpadPro from "../Items/Ipad/Ipad_pro/Ipad.jsx";
import Macbook from "../Items/Macbook/Macbookpro/Mackbookpro.jsx";
import Applewatch from "../Items/Apple_watch/Apple_watch_s3/Apple_watch.jsx";
import Airpodspro from "../Items/Airpods/Airpods.jsx";
import Appleremote from "../Items/TV/Remote/Appleremote.jsx";

export default function Sellercarusel() {
  const productContainerRef = useRef(null);

  const handleNext = () => {
    const container = productContainerRef.current;
    const containerWidth = container.offsetWidth;
    console.log('Scroll Left Before:', container.scrollLeft);
    container.scrollLeft += containerWidth;
    console.log('Scroll Left After:', container.scrollLeft);
  };

  const handlePrevious = () => {
    const container = productContainerRef.current;
    const containerWidth = container.offsetWidth;
    console.log('Scroll Left Before:', container.scrollLeft);
    container.scrollLeft -= containerWidth;
    console.log('Scroll Left After:', container.scrollLeft);
  };

  return (
    <section className="product"> 
      <button className="pre-btn" onClick={handlePrevious}>
        <i class="bi bi-arrow-left fs-2"></i>
      </button>
      <button className="nxt-btn" onClick={handleNext}>
        <i class="bi bi-arrow-right fs-2"></i>
      </button>
      <div className="product-container" ref={productContainerRef}>
        {/* Items */}
        <Iphone13Pro/>
        <IpadPro/>
        <Macbook/>
        <Applewatch/>
        <Airpodspro/>
        <Appleremote/>
        
      </div>
    </section>
  );
}
