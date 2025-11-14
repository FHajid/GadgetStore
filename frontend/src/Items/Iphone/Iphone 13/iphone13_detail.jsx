import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "../Css/Iphone_13.css";
import Logheader from "../../../Component/Header-login";
import Footer from "../../../Component/Footer";

// Items Product
// import Iphone13Pro from "../Items/Iphone/Iphone 13/iphone_13";
// import Applewatch from "../Items/Apple_watch/Apple_watch_s3/Apple_watch.jsx";

import { useNavigate } from 'react-router-dom';
import Appleremote from '../../TV/Remote/Appleremote.jsx';
import Airpodspro from '../../Airpods/Airpods.jsx';
import Macbook from '../../Macbook/Macbookpro/Mackbookpro.jsx';
import IpadPro from '../../Ipad/Ipad_pro/Ipad.jsx';

export default function Iphone13prodetail() {
    const navigate = useNavigate();
    const [product, setProduct] = useState(null);
    const [count, setCount] = useState(1);
    const [selectedSize, setSelectedSize] = useState(null);
    const [selectedColor, setSelectedColor] = useState("");
    const [mainImgSrc, setMainImgSrc] = useState("/Picture/Item/Iphone/iphone13pro.jpg");

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await axios.get('http://localhost:8082/product/1');
                console.log('Fetched product:', response.data);  // Log the fetched product
                setProduct(response.data);
            } catch (error) {
                console.error('Error fetching product:', error);
            }
        };
        fetchProduct();
    }, []);
    

    const viewobject = () => {
        navigate('/Iphone13d');
    };

    const increment = () => {
        setCount(prev => (prev < 20 ? prev + 1 : prev));
    };

    const decrement = () => {
        setCount(prev => (prev > 1 ? prev - 1 : prev));
    };

    const handleSizeClick = (size) => {
        setSelectedSize(size);
    };

    const handleColorClick = (color) => {
        setSelectedColor(color);
    };

    const handleImageClick = (src) => {
        setMainImgSrc(src);
    };

    const handleAddToWishlist = async () => {
        const loginId = localStorage.getItem('Login_Id');
    
        if (product && loginId) {
            console.log('Product object:', product); // Log the product object
    
            // Correct the case of the Product_id reference
            const wishlistItem = {
                Login_Id: parseInt(loginId, 10),  // Convert Login_Id to an integer
                Product_Id: product.Product_id,   // Corrected case
                Name: product.Name,
                size: selectedSize,
                color: selectedColor,
                quantity: count,
            };
    
            console.log('Wishlist item:', wishlistItem); // Log the wishlist item
    
            try {
                const response = await axios.post('http://localhost:8082/wishlist', wishlistItem, { withCredentials: true });
                if (response.data.status === "Success") {
                    alert('Product added to wishlist!');
                } else {
                    alert('Failed to add product to wishlist.');
                }
            } catch (error) {
                console.error('Error adding to wishlist:', error.response ? error.response.data : error.message);
                alert(`Failed to add product to wishlist: ${error.response ? error.response.data.message : error.message}`);
            }
        } else {
            console.error('Login_Id is missing or product is not available.');
        }
    };
    
    
    
    

    if (!product) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <Logheader />

            <div className="detail_main">
                <div className="breadcrumb">
                    <a href="/Home"> Home /</a>
                    <a href="/Home"> Categories /</a>
                    <i id="active-link-breadcrumb"> Iphone 13 Pro Detail </i>
                </div>

                <div className="product-detail">
                    <div className="left">
                        <div className="contain-left">
                            <img
                                src="/Picture/Item/Iphone/iphone13pro.jpg"
                                alt="Iphone 13 Pro"
                                onClick={() => handleImageClick("/Picture/Item/Iphone/iphone13pro.jpg")}
                            />
                            <img
                                src="/Picture/Item/Iphone/iphone13pro-blue.jpg"
                                alt="Iphone 13 Pro Blue"
                                onClick={() => handleImageClick("/Picture/Item/Iphone/iphone13pro-blue.jpg")}
                            />
                            <img
                                src="/Picture/Item/Iphone/iphone13pro-white.jpg"
                                alt="Iphone 13 Pro White"
                                onClick={() => handleImageClick("/Picture/Item/Iphone/iphone13pro-white.jpg")}
                            />
                            <img
                                src="/Picture/Item/Iphone/iphone13pro-gold.jpeg"
                                alt="Iphone 13 Pro Gold"
                                onClick={() => handleImageClick("/Picture/Item/Iphone/iphone13pro-gold.jpeg")}
                            />
                        </div>
                    </div>

                    <div className="middle">
                        <div className="mainpic">
                            <img src={mainImgSrc} id="imagebox" alt="Main Iphone" />
                        </div>
                    </div>

                    <div className="right">
                        <div className="container-right">
                            <h1 className="Tittle-product">{product.Name}</h1>

                            <div className="harga">
                                <h3>Rp {product.Price}</h3>
                                
                            </div>

                            <div className="descripsi">
                                <br />
                                <h2>Description</h2>
                                <br />
                                <p className="deskripsion">{product.Description}</p>
                            </div>

                            <div className="contain-capasitas">
                                {['4GB', '8GB', '16GB'].map((size, index) => (
                                    <button
                                        key={index}
                                        className={`size-ram ${selectedSize === size ? 'special' : ''}`}
                                        onClick={() => handleSizeClick(size)}
                                    >
                                        {size}
                                    </button>
                                ))}
                                <i id="eye" className="bi bi-eye fs-2" onClick={viewobject}></i>
                            </div>

                            <div className="contain-warna">
                                <h2>Color</h2>
                                <div className="warna-kelompok">
                                <button
                                    className={`warna1 ${selectedColor === "Blue" ? "selected" : ""}`}  // Match actual color name
                                    onClick={() => handleColorClick("Blue")}
                                    >
                                    </button>
                                    <button
                                        className={`warna2 ${selectedColor === "White" ? "selected" : ""}`}  // Match actual color name
                                        onClick={() => handleColorClick("White")}
                                    >
                                    </button>
                                    <button
                                        className={`warna3 ${selectedColor === "Yellow" ? "selected" : ""}`}  // Match actual color name
                                        onClick={() => handleColorClick("Yellow")}
                                    >
                                    </button>
                                    <button
                                        className={`warna4 ${selectedColor === "Black" ? "selected" : ""}`}  // Match actual color name
                                        onClick={() => handleColorClick("Black")}
                                    >
                                    </button>
                                </div>
                            </div>

                            <div className="contain-buying">
                                <div className="add-delete">
                                    <span className="minus" onClick={decrement}> - </span>
                                    <span className="num"> {count < 10 ? `0${count}` : count} </span>
                                    <span className="plus" onClick={increment}> + </span>
                                </div>

                                <div className="buy">
                                    <button id="wishlist" onClick={handleAddToWishlist}><i className="bi bi-heart-fill" style={{ color: "#fff04d;" }}></i></button>
                                </div>
                               
                            </div>
                        </div>
                    </div>
                </div>

                <div className="itemlain">
                    <div className="hot-sale">
                        <div className="rectangle"></div>
                        <h2>Categories</h2>
                    </div>

                    <div className="Items-produck">
                        <IpadPro />
                        <Macbook />
                        <Appleremote/>
                        <Airpodspro />
                    </div>
                </div>

                <Footer />
            </div>
        </div>
    );  
}
