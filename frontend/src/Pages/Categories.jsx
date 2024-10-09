import React, { useState } from 'react';
import ProductCardItem from '../Component/ProductCardItem.jsx';
import Footer from '../Component/Footer.jsx';
import Logheader from '../Component/Header-login.jsx';
import './css/Categories.css'
import 'bootstrap/dist/css/bootstrap.min.css';

const Categories = () => {
    // State to manage the selected category
    const [selectedCategory, setSelectedCategory] = useState('All');

    // Sample data for products
    const products = [
        {
            id: 1,
            imageSrc: '/Picture/Item/Ipad/ipad_pro.jpg',
            title: 'Ipad Pro',
            price: '14.000.000,00',
            detailLink: '/Ipadpro-detail',
            category: 'Tablet'
        },
        {
            id: 2,
            imageSrc: '/Picture/Item/Macbook/macbook.jpg',
            title: 'Macbook Pro',
            price: '25.000.000,00',
            detailLink: '/Mackbookpro-detail',
            category: 'Laptop'
        },
        {
            id: 3,
            imageSrc: '/Picture/Item/Iphone/iphone13pro.jpg',
            title: 'Iphone 13 Pro',
            price: '12.000.000,00',
            detailLink: '/Iphone13pro-detail',
            category: 'Phone'
        },
       
        {
            id: 4,
            imageSrc: '/Picture/Item/Watch/apple_watch.jpg',
            title: 'Apple Watch s3',
            price: '12.000.000,00',
            detailLink: '/Iphone13pro-detail',
            category: 'Watch'
        },

        {
            id: 5,
            imageSrc: '/Picture/Item/Airpods/Airpods_pro_2.jpg',
            title: 'Airpods Pro',
            price: '5.000.000,00',
            detailLink: '/Airpodspro-detail',
            category: 'Airpods'
        },

        {
            id: 6,
            imageSrc: '/Picture/Item/Tv/Apple_tv1.jpg',
            title: 'Apple remote',
            price: '100.000,00',
            detailLink: '/Appleremote-detail',
            category: 'Tv'
        },

    ];

    // Function to handle category selection
    const handleCategoryClick = (category) => {
        setSelectedCategory(category);
    };

    // Filter products based on the selected category
    const filteredProducts = selectedCategory === 'All'
        ? products
        : products.filter(product => product.category === selectedCategory);

    return (
        <div>
            <Logheader />
            <div className="categories-main">
                
                <div className="home-categories">
                    <div className="grup-cata">
                        <div className="cata" onClick={() => handleCategoryClick('Phone')} >
                            <i className="bi bi-phone" style={{color: "#7a7a7a"}}></i>
                            <p>Phone</p>
                        </div>

                        <div className="cata" onClick={() => handleCategoryClick('Tablet')}>
                            <i className="bi bi-tablet" style={{color: "#7a7a7a"}}></i>
                            <p>Tablet</p>
                        </div>

                        <div className="cata" onClick={() => handleCategoryClick('Laptop')}>
                            <i className="bi bi-laptop" style={{color: "#7a7a7a"}}></i>
                            <p>Laptop</p>
                        </div>

                        <div className="cata" onClick={() => handleCategoryClick('Watch')}>
                            <i className="bi bi-smartwatch" style={{color: "#7a7a7a"}}></i>
                            <p>Watch</p>
                        </div>

                        <div className="cata" onClick={() => handleCategoryClick('Airpods')}>
                            <i className="bi bi-headphones" style={{color: "#7a7a7a"}}></i>
                            <p>Airpods</p>
                        </div>

                        <div className="cata" onClick={() => handleCategoryClick('Tv')}>
                            <i className="bi bi-tv" style={{color: "#7a7a7a"}}></i>
                            <p>Tv</p>
                        </div>

                        <div className="cata" onClick={() => handleCategoryClick('All')}>
                            <i class="bi bi-columns-gap" style={{color: "#7a7a7a"}}></i>
                            <p>All</p>
                        </div>
                    </div>
                </div>

                <div className="ProductCard ">
                    {filteredProducts.map((product) => (
                        <ProductCardItem
                            key={product.id}
                            imageSrc={product.imageSrc}
                            title={product.title}
                            price={product.price}
                            detailLink={product.detailLink}
                        />
                    ))}
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Categories;
