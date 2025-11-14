import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "../Css/Macbook_pro.css";
import Logheader from "../../../Component/Header-login";
import Footer from "../../../Component/Footer";
import { useNavigate } from 'react-router-dom';

//Links

import IpadPro from "../../Ipad/Ipad_pro/Ipad.jsx";
// import Macbook from "../Items/Macbook/Macbookpro/Mackbookpro.jsx";
// import Applewatch from "../Items/Apple_watch/Apple_watch_s3/Apple_watch.jsx";
import Airpodspro from "../../Airpods/Airpods.jsx";
import Appleremote from "../../TV/Remote/Appleremote.jsx";
import Iphone13Pro from '../../Iphone/Iphone 13/iphone_13.jsx';

export default function Ipadprodetail() {
    const navigate = useNavigate();
    const [product, setProduct] = useState(null);
    const [count, setCount] = useState(1);
    const [selectedSize, setSelectedSize] = useState(null);
    const [selectedColor, setSelectedColor] = useState("");
    const [mainImgSrc, setMainImgSrc] = useState("/Picture/Item/Macbook/Macbookpro.jpg");

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await axios.get('http://localhost:8082/product/3'); // Change the endpoint if needed
                console.log('Fetched product:', response.data);
                setProduct(response.data);
            } catch (error) {
                console.error('Error fetching product:', error);
            }
        };
        fetchProduct();
    }, []);

    const viewobject = () => {
        navigate('/MacbookPro3d');
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
            const wishlistItem = {
                Login_Id: parseInt(loginId, 10),
                Product_Id: product.Product_id,
                Name: product.Name,
                size: selectedSize,
                color: selectedColor,
                quantity: count,
            };

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
                    <i id="active-link-breadcrumb"> Macbook Pro Detail </i>
                </div>

                <div className="product-detail">
                    <div className="left">
                        <div className="contain-left">
                            <img
                                src="/Picture/Item/Macbook/Macbookpro.jpg"
                                alt="Mackbook"
                                onClick={() => handleImageClick("/Picture/Item/Macbook/Macbookpro.jpg")}
                            />
                            <img
                                src="/Picture/Item/Macbook/Macbookpro-black.jpg"
                                alt="Macbook"
                                onClick={() => handleImageClick("/Picture/Item/Macbook/Macbookpro-black.jpg")}
                            />
                            <img
                                src="/Picture/Item/Macbook/Macbookpro-blue.jpg"
                                alt="Macbook"
                                onClick={() => handleImageClick("/Picture/Item/Macbook/Macbookpro-blue.jpg")}
                            />
                            <img
                                src="/Picture/Item/Macbook/Macbookpro-white.jpg"
                                alt="Mackbook"
                                onClick={() => handleImageClick("/Picture/Item/Macbook/Macbookpro-white.jpg")}
                            />
                        </div>
                    </div>

                    <div className="middle">
                        <div className="mainpic">
                            <img src={mainImgSrc} id="imagebox" alt="Main Ipad" />
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
                                {['M2 chip'].map((size, index) => (
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
                                        className={`Macbookwarna1 ${selectedColor === "warna1" ? "selected" : ""}`}
                                        onClick={() => handleColorClick("warna1")}
                                    ></button>
                                    <button
                                        className={`Macbookwarna2 ${selectedColor === "warna2" ? "selected" : ""}`}
                                        onClick={() => handleColorClick("warna2")}
                                    ></button>
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
                        <Appleremote />
                        <Airpodspro/>
                        <Iphone13Pro/>
                    </div>
                </div>

                <Footer />
            </div>
        </div>
    );
}
