import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./Css/Airpods.css";
import Logheader from "../../Component/Header-login";
import Footer from "../../Component/Footer";


import { useNavigate } from 'react-router-dom';
import IpadPro from '../Ipad/Ipad_pro/Ipad';
import Appleremote from '../TV/Remote/Appleremote.jsx';
import Applewatch from '../Apple_watch/Apple_watch_s3/Apple_watch.jsx';
import Iphone13Pro from '../Iphone/Iphone 13/iphone_13.jsx';

// Items Product


export default function Airpodsprodetail() {
    const navigate = useNavigate();
    const [product, setProduct] = useState(null);
    const [count, setCount] = useState(1);
    const [selectedSize, setSelectedSize] = useState(null);
    const [selectedColor, setSelectedColor] = useState("");
    const [mainImgSrc, setMainImgSrc] = useState("/Picture/Item/Airpods/Airpods_pro_2.jpg");

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await axios.get('http://localhost:8082/product/5');
                console.log('Fetched product:', response.data);  // Log the fetched product
                setProduct(response.data);
            } catch (error) {
                console.error('Error fetching product:', error);
            }
        };
        fetchProduct();
    }, []);
    

    const viewobject = () => {
        navigate('/Airpods3D');
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
                    <i id="active-link-breadcrumb"> Airpods Pro </i>
                </div>

                <div className="product-detail">
                    <div className="left">
                        <div className="contain-left">
                            <img
                                src="/Picture/Item/Airpods/Airpods_pro_2.jpg"
                                alt="Apple Watch"
                                onClick={() => handleImageClick("/Picture/Item/Airpods/Airpods_pro_2.jpg")}
                            />
                            <img
                                src="/Picture/Item/Airpods/Airpods_pro_3.jpg"
                                alt="Apple Watch"
                                onClick={() => handleImageClick("/Picture/Item/Airpods/Airpods_pro_3.jpg")}
                            />
                            <img
                                src="/Picture/Item/Airpods/Airpods_pro_4.jpg"
                                alt="Airpods Pro"
                                onClick={() => handleImageClick("/Picture/Item/Airpods/Airpods_pro_4.jpg")}
                            />
                            <img
                                src="/Picture/Item/Airpods/Airpods_pro_5.jpg"
                                alt="Airpods Pro"
                                onClick={() => handleImageClick("/Picture/Item/Airpods/Airpods_pro_5.jpg")}
                            />
                        </div>
                    </div>

                    <div className="middle">
                        <div className="mainpic">
                            <img src={mainImgSrc} id="imagebox" alt="Apple watch" />
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
                                {['5 Hrs'].map((size, index) => (
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
                                        className={`podswarna1 ${selectedColor === "warna1" ? "selected" : ""}`}
                                        onClick={() => handleColorClick("White")}
                                        style={{width:'30px', height:'30px'}}
                                    >
                                    </button>
                                    {/* <button
                                        className={`warna2watch ${selectedColor === "warna2" ? "selected" : ""}`}
                                        onClick={() => handleColorClick("Blue")}
                                    >
                                    </button>
                                    <button
                                        className={`warna3watch ${selectedColor === "warna3" ? "selected" : ""}`}
                                        onClick={() => handleColorClick("Cream")}
                                    >
                                    </button>
                                    <button
                                        className={`warna4watch ${selectedColor === "warna4" ? "selected" : ""}`}
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
                        <IpadPro/>
                        <Appleremote/>
                        <Applewatch/>
                        <Iphone13Pro/>

                    </div>
                </div>

                <Footer />
            </div>
        </div>
    );  
}
