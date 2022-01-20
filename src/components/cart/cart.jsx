import React, { useState, useEffect } from "react";
import CartProduct from "../cart-product/cart-product";
import ProductsList from "../../data/product-items.json";
import "./cart.css";

export default props => {

    const getCartList = () =>{
        return localStorage.getItem("myCart") !== null ? JSON.parse(localStorage.getItem('myCart')) : new Array();
    }

    const [cartsProducts, setCartsProducts] = useState(getCartList());

    const [totalPrice, setTotalPrice] = useState();

    const getTotalPrice = () => {
        let price = 0;
        const cartsList =  getCartList();
        cartsList.forEach(product => {
            const index = ProductsList.map((e) => {
                return e.id;
            }).indexOf(product.id);
            price += ProductsList[index].price * product.count;
        });
        setTotalPrice(price.toFixed(2));
    }

    useEffect(() => {
        getTotalPrice();
    }, []);

    const handleDelete = productId => {
        try {
            const myCart = JSON.parse(localStorage.getItem('myCart'));
            const cart = myCart.filter(p => p.id !== productId);
            localStorage.setItem('myCart', JSON.stringify(cart));
            setCartsProducts(cart);
            props.updateCountCart(cart.length);
            getTotalPrice();
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div>
            {cartsProducts.length > 0 && (cartsProducts.map(product =>
                <CartProduct
                    key={product.id}
                    product={product}
                    onDelete={handleDelete}
                    getTotalPrice={getTotalPrice}
                />
            )
            )}
            {cartsProducts.length === 0 && (
                <div>Cart is empty</div>
            )}
            <div className="cart-total">
                TOTAL BEFORE SHIPPING: {cartsProducts.length} items (${totalPrice})
            </div>
        </div>
    );
}
