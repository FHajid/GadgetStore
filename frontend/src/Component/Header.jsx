import React from "react"
import 'bootstrap-icons/font/bootstrap-icons.css';
import './css/Header.css'


function Header () {
    return(
    <div>
    <div className='header' style={{borderBottom: '1px solid grey', textAlign: 'center',
      margin: "10px 0px " ,}}>


      <div className='logo'>
      <h1 >GadgetStore</h1>
      </div>

      <div className='links' >
        <ul style={{listStyle: 'none', orientation: 'horizontal'}} >
          <li> <a href='/Home'>Home</a></li>
          <li><a href='/Contact'>Contact</a></li>
          <li><a href='/About'> About</a></li>
        </ul>
      </div>
      <div className='search' >
      <form action="" class="search-bar">
        <label />
            <input type='text' placeholder="search" id='any' />
            <p class="bi bi-search fs-4"></p>
      </form>
      </div>


    </div>
    </div>
    )
}



export default Header