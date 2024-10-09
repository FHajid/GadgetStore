// src/components/ProductCard.jsx
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../Items/CSS/CardItem.css';  
import './css/Productcarditem.css'
import { useNavigate } from 'react-router-dom';

const ProductCardItem = ({ imageSrc, title, price, detailLink }) => {
    const navigate = useNavigate();

    return (
        <div className="card" style={{ width: '300px' }} onClick={() => navigate(detailLink)}>
            <img
                className="card-img-top"
                src={imageSrc}
                alt={title}
                style={{
                    border: '1px solid grey',
                    borderRadius: '15px',
                    cursor: 'pointer',
                }}
            />
            <div className="card-body">
                <h3 className="card-title">{title}</h3>
                <p className="card-text">RP. {price}</p>
            </div>
        </div>
    );
};

export default ProductCardItem;
