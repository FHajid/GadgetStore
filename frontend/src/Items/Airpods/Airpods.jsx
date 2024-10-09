import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import "../CSS/CardItem.css"
import { useNavigate } from 'react-router-dom';

export default function Airpodspro() {
    const navigate = useNavigate();
    return(
        <div class="card" style={{width: "300px"}} onClick={() => navigate('/Airpodspro-detail')} >
        <img class="card-img-top" src="/Picture/Item/Airpods/airpods_pro_2.jpg" alt="Ipad" 
        style={{border: "1px solid grey",
                borderRadius: "15px",
         }}
        />
            <div class="card-body">
                <h3 class="card-title">Airpods Pro </h3>
                <p class="card-text">RP. 5.000.000,00</p>
            </div>
        </div>
    )
}