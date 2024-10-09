import React from "react"
import  './css/Footer.css';

function Footer (){
    return(
        <div>
        <div className='bawah'>
        <div className='footer'>
        <div className='left-left'>
        <h2>GadgetStore</h2>
        <p>Get 10% Off on your first order</p>
        <div class="search" id='rec-all'>
            <form action="" class="search-bar" id='rec-any'>
                <input type="text" placeholder="Enter your Email" name="" id="" />
                <p class="bi bi-search fs-4"></p>
            </form>
    
        </div>
        </div>

        <div className='middle-left'>
        <h2>Contact</h2>
        <ul style={{listStyle :'none'}} >
          <li>Jalan mujur, Batam, 20342,Indonesia. </li>
          <li>exclusive.ect@gmail.com </li>
          <li> +62 82-1234-4312 </li>
        </ul>
        </div>


        <div className='middle-right'>
        <h2>Account</h2>
        <ul style={{listStyle :'none'}} >
          <li> My Account </li>
          <li> Login </li>
          <li> Cart </li>
        </ul>
        </div>

        <div className='right-right'>
        <h2>Quick Link</h2>
        <ul style={{listStyle :'none'}} >
          <li> Privacy policy </li>
          <li> Term Of Use </li>
          <li> FAQ </li>
          <li> Contact </li>
        </ul>
        </div>
        
      </div>
      
      </div>
      <div className="line" style={{borderTop : '2px solid grey '}}> <p>&copy; Copyright Farhan hajid 2022. All right reserved</p></div>
      

      </div>
    )
}


export default Footer