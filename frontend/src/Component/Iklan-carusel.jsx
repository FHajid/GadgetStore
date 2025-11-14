import React, { useState, useEffect, useCallback } from 'react';
import './css/iklan-carusel.css';

function SimpleCarousel() {
    const [currentIndex, setCurrentIndex] = useState(0);

    const images = [
        './Picture/Icon/iklan_2.jpg',
        './Picture/Icon/iklan-1.jpg',
        './Picture/Icon/iklan_4.jpeg',
    ];

    // const goToPrevious = useCallback(() => {
    //     const isFirstSlide = currentIndex === 0;
    //     const newIndex = isFirstSlide ? images.length - 1 : currentIndex - 1;
    //     setCurrentIndex(newIndex);
    // }, [currentIndex, images.length]);

    const goToNext = useCallback(() => {
        const isLastSlide = currentIndex === images.length - 1;
        const newIndex = isLastSlide ? 0 : currentIndex + 1;
        setCurrentIndex(newIndex);
    }, [currentIndex, images.length]);

    useEffect(() => {
        const interval = setInterval(goToNext, 3000); // Change slide every 3 seconds
        return () => clearInterval(interval); // Clear interval on component unmount
    }, [goToNext]);

    return (
        <div className="carousel-container">
            <div className="carousel">
                <div 
                    className="carousel-slide" 
                    style={{ backgroundImage: `url(${images[currentIndex]})` }}>
                </div>
                {/* <button onClick={goToPrevious} className="carousel-button prev">&#10094;</button>
                <button onClick={goToNext} className="carousel-button next">&#10095;</button> */}
            </div>
        </div>
    );
}

export default SimpleCarousel;
