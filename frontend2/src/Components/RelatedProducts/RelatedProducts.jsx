import React from 'react'
import './RelatedProducts.css'
import Item from '../Item/Item'
import data_product from '../Assets/all_product';

export const RelatedProducts = (props) => {

    console.log("Dekhta hun");
    console.log( props.product.category);
    return (
    <div className='relatedproducts'>
    <h2>Related Products</h2>
    <hr/>
    <div className="relatedproducts-item">
    {data_product.map((item,i)=>{
    if(props.product.category === item.category){
     return<Item key={i}id={item.id}name={item.name}image={item.image}new_price={item.new_price}old_price={item.old_price}/>
    }
})

}
        
    </div>

    </div>
  )
}
