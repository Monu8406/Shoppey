import React, { useContext } from 'react'
import axios from 'axios'
import { useState } from 'react';
import './CartItems.css'
import { ShopContext } from '../../Context/ShopContext';
import remove_icon from '../Assets/cart_cross_icon.png';

export const CartItems = () => {


    const { getTotalCartAmount, all_product, cartItems, removeFromCart } = useContext(ShopContext);

const amount = getTotalCartAmount();
      const [book, setBook] = useState({
		name: "The Fault In Our Stars",
		author: "John Green",
		img: "https://images-na.ssl-images-amazon.com/images/I/817tHNcyAgL.jpg",
		price: 250,
	  });

	const initPayment = (data) => {
		const options = {
			key:"rzp_test_QVlD8d4I2cj1Ak",
			amount: getTotalCartAmount,
			currency: data.currency,
			name: book.name,
			description: "Test Transaction",
   		image:book.img,
			order_id: data.id,
			handler: async (response) => {
				try {
					const verifyUrl = "http://localhost:8080/api/payment/verify";
					const { data } = await axios.post(verifyUrl, response);
					console.log(data);
				} catch (error) {
					console.log(error);
				}
			},
			theme: {
				color: "#3399cc",
			},
		};
		const rzp1 = new window.Razorpay(options);
		rzp1.open();
	};

	const handlePayment = async () => {
		try {
			const orderUrl = "http://localhost:4000/api/payment/orders";
			const { data } = await axios.post(orderUrl, { amount: amount });
			console.log(data);
			initPayment(data.data);
		} catch (error) {
			console.log(error);
		}
	};

    

    return (
        <div className='cartitems'>
            <div className="cartitems-format-main">
                <p>Products</p>
                <p>Title</p>
                <p>Price</p>
                <p>Quantity</p>
                <p>Total</p>
                <p>Remove</p>
             </div>

            <hr />

           {all_product.map((e) => {
                if (cartItems[e.id] > 0) {
                    return <div>   <div className="cartitems-format">
                        <img src={e.image} alt="" className='carticon-product-icon' />
                        <p>{e.name}</p>
                        <p>{e.new_price} Rs</p>
                        <button className='cartitems-quantity'>{cartItems[e.id]} </button>
                        <p>{e.new_price * cartItems[e.id]} Rs</p>
                        <img className='carticon-remove-icon' src={remove_icon} onClick={() => { removeFromCart(e.id) }} alt="" />
                    </div>
                        <hr /></div>
                }
                return null;
            })
            }
            <div className="cartitems-down">
              <div className="cartitems-total">
                    <h1>Cart Total</h1>
                    <div className="cartitems-total-item">
                        <p>Subtatal</p>
                        {<p>${getTotalCartAmount()}</p>}

                    </div>

                    <div className="cartitems-total-item">
                        <p>Shipping Fee</p>
                        <p>Free</p>
                    </div>
                    <hr />
                    <div className="cartitems-total-item">
                        <h3>Total</h3>
                        <h3>${amount}</h3>
                    </div>
                    <button>PROCEED TO CHECKOUT</button>
                </div>

            </div>
            <div className="cartitems-promocode">
                <p>If you  a promo code,Enter it here </p>
                <div className="cartitems-promobox">
                    <input type="submit" value="" />
                    <button onClick={handlePayment} >Submit</button>
                </div>
            </div>
        </div>

    )
}
