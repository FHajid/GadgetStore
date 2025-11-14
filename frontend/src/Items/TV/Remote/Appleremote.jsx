import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import "../../CSS/CardItem.css"
import { useNavigate } from 'react-router-dom';

export default function Appleremote() {
    const navigate = useNavigate();
    return(
        <div class="card" style={{width: "300px"}} onClick={() => navigate('/Appleremote-detail')}>
        <img class="card-img-top" src="/Picture/Item/TV/Apple_tv1.jpg" alt="Remote" 
        style={{border: "1px solid grey",
                borderRadius: "15px",
                height:"300px"
         }}
        />
            <div class="card-body">
                <h3 class="card-title">Apple Remote </h3>
                <p class="card-text">RP. 1.000.000,00</p>
            </div>
        </div>
    )
}