import React, { useContext, useRef } from 'react'
import './Navbar.css'
import logo  from '../Assets/logo.png';
import cart_icon  from '../Assets/cart_icon.png'
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShopContext } from '../../Context/ShopContext';
import na6v_dropdown from  '../Assets/nav_dropdown.png';
export const Navbar = () => {

    const  [menu, setmenu] = useState("shop");
    const {getTotalCartItems} =  useContext(ShopContext);
    const  menuRef = useRef();

    const dropdown_toggle =(e)=>{
    menuRef.current.classList.toggle('nav-menu-visible')
    e.target.classList.toggle('open');
  }

  return (
 <div className='navbar'>
        <div className="nav-logo">
        <img src={logo} alt="" />
        <p>SHOPPER</p>
         </div>
         <img style={{height:20}} onClick={dropdown_toggle} src={nav_dropdown} className='nav-dropdown' alt="" />
         {localStorage.getItem('auth-token')? 
          <ul ref={menuRef} className="nav-menu">
            <li onClick={()=>setmenu("shop")}><Link style={{textDecoration:'none',}} to='/'>Shop  </Link>{menu==="shop"?<hr/>:<></>}  </li>
            <li onClick={()=>setmenu("men")}><Link style={{textDecoration:'none',}} to='/mens'>Men</Link>{menu==="men"?<hr/>:<></>}</li>
            <li onClick={()=>setmenu("women")}><Link style={{textDecoration:'none',}} to='/womens'>Women</Link>{menu==="women"?<hr/>:<></>}</li>
            <li onClick={()=>setmenu("kids")}><Link style={{textDecoration:'none',}} to='/kids'>Kids</Link>{menu==="kids"?<hr/>:<></>}</li>
        </ul>:     <ul ref={menuRef} className="nav-menu">
       <li onClick={()=>setmenu("shop")}><Link style={{textDecoration:'none',}} to='/'>Shop  </Link>{menu==="shop"?<hr/>:<></>}  </li>
       <li onClick={()=>setmenu("men")}><Link style={{textDecoration:'none',}} to='/'>Men</Link>{menu==="men"?<hr/>:<></>}</li>
       <li onClick={()=>setmenu("women")}><Link style={{textDecoration:'none',}} to='/'>Women</Link>{menu==="women"?<hr/>:<></>}</li>
       <li onClick={()=>setmenu("kids")}><Link style={{textDecoration:'none',}} to='/'>Kids</Link>{menu==="kids"?<hr/>:<></>}</li>
   </ul>}
        <div className="nav-login-cart">
         {localStorage.getItem('auth-token')?<button  onClick={()=>{localStorage.removeItem('auth-token');window.location.replace('/')}} >Logout</button>:<Link to='./login'><button>Login</button> </Link>}
         {localStorage.getItem('auth-token')?<Link to='./cart'>   <img src={cart_icon} alt="" /></Link> :<Link to='/'>   <img src={cart_icon} alt="" /></Link>}
            
            <div className="nav-cart-count">{getTotalCartItems()}</div>
             </div>
    </div>
       )
}


