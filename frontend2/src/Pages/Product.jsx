import React, { useContext } from 'react'
import { ShopContext } from '../Context/ShopContext'
import { useParams } from 'react-router-dom';
import { Breadcrums } from '../Components/Breadcrums/Breadcrums';
import { PCD } from '../Components/PCD/PCD';
import { useState } from 'react';
import {DescriptionBox} from '../Components/DescriptionBox/DescriptionBox'
import { RelatedProducts } from '../Components/RelatedProducts/RelatedProducts';

 export const Product = () => {
    const { getTotalCartItems,getTotalCartAmount,all_product , cartItems,addToCart,removeFromCart}=useContext(ShopContext);
     const params = useParams();
    
    const product =  all_product.find((e)=>e.id === Number(params.productId));
    
      return (
       <div>
        <Breadcrums product={product}/>
       <PCD product={product} />
        <DescriptionBox />
        
       </div>
  )
}







