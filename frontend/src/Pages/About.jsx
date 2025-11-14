import React from "react" 
import './css/About.css'
import Footer from "../Component/Footer"
import Logheader from "../Component/Header-login"



function About(){
    return(
        <div>
            <Logheader />

            <div class="Main">
            <div class="above">
            <div class="about-us">
                <h1> Our Mission </h1>
                <p>
                    Exclusive is dedicated to transforming the online shopping experience as Asia's leading marketplace, rooted in a vibrant presence in Indonesia. 
                    Our mission is to empower and enhance the lives of three million customers across the region by providing a seamless, personalized, and trusted platform. 
                </p>
                <br/>
                <h1> Our Vision </h1>
                <p>
                    Exclusive envisions becoming Asia's foremost online shopping marketplace, firmly establishing its presence in Indonesia and beyond. 
                    With a commitment to providing unparalleled customer experiences.
                </p>
            </div>
            <div class="pic-left">
                <img src="/Picture/Item/store-utama.jpg" alt="Store utama" id="pic-left"/>
            </div>
            
            </div>
        {/* mid start */}
        <div class="mid">
            <div className="cardmen-container">
            <div class="cardmen">
                <i id="money" class="bi bi-person-check" style={{color:'white'}} ></i>   
                <h2>10,3 K</h2>
                <h3> Custumer Activity </h3>

            </div>

            <div class="cardmen">
                <i id="money" class="bi bi-coin " style={{color:'white'}} ></i>
                <h2>12,3 k</h2>
                <h3> Transaction Reports </h3>
            </div>
            
            <div class="cardmen">
                <i id="money" class="bi bi-box " style={{color:'white'}} ></i>
                <h2>20 k </h2>
                <h3>Our limited Item</h3>
            </div>

            <div class="cardmen">
                <i id="money" class="bi bi-graph-up-arrow " style={{color:'white'}} ></i>
                <h2>8,2 k</h2>
                <h3> Annual Gross Sales </h3>
            </div>
            </div>

        </div>

        {/* mid2 start */}

        <div class="mid2">
            <div class="card-ceo">
                <img id="worker" src="/Picture/Item/worker_1.png" alt=""/>
                <h2>Savana willgerb</h2>
                <p>Specialis consultant</p>
            </div>

            <div class="card-ceo">
                <img id="worker" src="/Picture/Item/worker3.png" alt=""/>
                <h2>James</h2>
                <p>CEO</p>
            </div>

            <div class="card-ceo">
                <img id="worker" src="/Picture/Item/worker2.png" alt=""/>
                <h2>Carol</h2>
                <p>Constusltan manager</p>
            </div>

        </div>

        {/* stripe3 */}

        <div class="stripe-3">
        
        <div className="cardmen-container">
            <div class="cardmen">
            
            <img id="money" src="/Picture/Icon/icon-delivery.png" alt="Delivery Icon"/>
           
            <h3>Delivery system</h3>

            </div>
            
            <div class="cardmen">
                <i id="money" class="bi bi-headset" style={{color:'white'}} ></i>
                
                <h3> Costumer Support</h3>

            </div>

            <div class="cardmen">
                <i id="money" class="bi bi-shield-check" style={{color:'white'}} ></i>
                
                <h3> Powerfull website </h3>

            
            </div>
            </div>
        </div>

        </div>




            <Footer />
        </div>
    )
}

export default About