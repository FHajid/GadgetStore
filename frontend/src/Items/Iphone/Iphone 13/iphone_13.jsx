import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import "../../CSS/CardItem.css"
import { useNavigate } from 'react-router-dom';

export default function Iphone13Pro() {
    const navigate = useNavigate();
    return(
        <div class="card" style={{width: "300px",}} onClick={() => navigate('/Iphone13pro-detail')}>
        <img class="card-img-top" src="/Picture/Item/Iphone/iphone13pro.jpg" alt="Iphone 13" 
        style={{border: "1px solid grey",
                borderRadius: "15px",
         }}
        />
            <div class="card-body">
                <h3 class="card-title">Iphone 13 Pro </h3>
                <p class="card-text">RP. 18.000.000,00</p>
            </div>
        </div>
    )
}