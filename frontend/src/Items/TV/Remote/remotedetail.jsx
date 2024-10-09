import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "../Css/remote.css";
import Logheader from "../../../Component/Header-login";
import Footer from "../../../Component/Footer";

import IpadPro from "../../Ipad/Ipad_pro/Ipad.jsx";
import Macbook from "../../Macbook/Macbookpro/Mackbookpro.jsx";
import { useNavigate } from 'react-router-dom';
import Iphone13Pro from '../../Iphone/Iphone 13/iphone_13.jsx';
import Applewatch from '../../Apple_watch/Apple_watch_s3/Apple_watch.jsx';

export default function Appleremotedetail() {
    const navigate = useNavigate();
    const [product, setProduct] = useState(null);
    const [count, setCount] = useState(1);
    const [selectedSize, setSelectedSize] = useState(null);
    const [selectedColor, setSelectedColor] = useState("");
    const [mainImgSrc, setMainImgSrc] = useState("/Picture/Item/TV/Apple_tv1.jpg");

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await axios.get('http://localhost:8082/product/6');
                console.log('Fetched product:', response.data);  // Log the fetched product
                setProduct(response.data);
            } catch (error) {
                console.error('Error fetching product:', error);
            }
        };
        fetchProduct();
    }, []);
    

    const viewobject = () => {
        navigate('/Remote3D');
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
                    <i id="active-link-breadcrumb"> Apple remote </i>
                </div>

                <div className="product-detail">
                    <div className="left">
                        <div className="contain-left">
                            <img
                                src="/Picture/Item/TV/Apple_tv1.jpg"
                                alt="Apple Remote"
                                onClick={() => handleImageClick("/Picture/Item/TV/Apple_tv1.jpg")}
                            />
                            <img
                                src="/Picture/Item/TV/Apple_tv3.jpg"
                                alt="Iphone 13 Pro Blue"
                                onClick={() => handleImageClick("/Picture/Item/TV/Apple_tv3.jpg")}
                            />
                            <img
                                src="/Picture/Item/TV/Apple_tv4.jpg"
                                alt="Iphone 13 Pro White"
                                onClick={() => handleImageClick("/Picture/Item/TV/Apple_tv4.jpg")}
                            />
                            {/* <img
                                src="/Picture/Item/Iphone/iphone13pro-gold.jpeg"
                                alt="Iphone 13 Pro Gold"
                                onClick={() => handleImageClick("/Picture/Item/Iphone/iphone13pro-gold.jpeg")}
                            /> */}
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
                                {['Siri'].map((size, index) => (
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
                                        className={`warna1remote ${selectedColor === "White" ? "selected" : ""}`}
                                        onClick={() => handleColorClick("White")}
                                    >
                                    </button>
                                    {/* <button
                                        className={`warna2 ${selectedColor === "warna2" ? "selected" : ""}`}
                                        onClick={() => handleColorClick("White")}
                                    >
                                    </button>
                                    <button
                                        className={`warna3 ${selectedColor === "warna3" ? "selected" : ""}`}
                                        onClick={() => handleColorClick("Yellow")}
                                    >
                                    </button>
                                    <button
                                        className={`warna4 ${selectedColor === "warna4" ? "selected" : ""}`}
                                        onClick={() => handleColorClick("Black")}
                                    >
                                    </button> */}
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
                        <Macbook />
                        <IpadPro />
                        <Iphone13Pro />
                        <Applewatch />
                    </div>
                </div>

                <Footer />
            </div>
        </div>
    );  
}
