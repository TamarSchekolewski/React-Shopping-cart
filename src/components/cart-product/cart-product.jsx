import React, { useState } from "react";
import ProductsList from "../../data/product-items.json";
import deleteIcon from "../../assets/delete.svg";
import plusIcon from "../../assets/plus.svg";
import minusIcon from "../../assets/minus.svg";
import "./cart-product.css";

export default props => {
    const [cartsProducts, setCartsProducts] = useState(
        localStorage.getItem("myCart") !== null ? JSON.parse(localStorage.getItem('myCart')) : new Array()
    );

    const handleIncrement = productId => {
        try {
            const myCart = JSON.parse(localStorage.getItem('myCart'));
            const index = myCart.map((e) => {
                return e.id;
            }).indexOf(productId);
            myCart[index].count++;
            localStorage.setItem('myCart', JSON.stringify(myCart));
            setCartsProducts(myCart);
            props.getTotalPrice();
        } catch (error) {
            console.error(error);
        }
    }

    const handleReduction = productId => {
        try {
            const myCart = JSON.parse(localStorage.getItem('myCart'));
            const index = myCart.map((e) => {
                return e.id;
            }).indexOf(productId);
            if (myCart[index].count !== 1) {
                myCart[index].count--;
                localStorage.setItem('myCart', JSON.stringify(myCart));
                setCartsProducts(myCart);
                props.getTotalPrice();
            }
        } catch (error) {
            console.error(error);
        }
    }
    const index = ProductsList.map((e) => {
        return e.id;
    }).indexOf(props.product.id);
    const product = ProductsList[index];

    const i = cartsProducts.map((e) => {
        return e.id;
    }).indexOf(props.product.id);
    const count = i !== -1 ? cartsProducts[i].count : 1;

    return (
        <div className="product-cart">
            <img
                src={require(`../../assets/images/${product.imageUrl}`)}
                className="img">
            </img>
            <div className="details">
                <h4>{product.name}</h4>
                <p>Product code {product.id}</p>
            </div>
            <span className="txt">Qty: {count}</span>
            <p className="txt">${product.price.toFixed(2)}</p>
            <img src={plusIcon} alt="plus" className="icon" onClick={() => { handleIncrement(product.id) }}></img>
            <img src={minusIcon} alt="minus" className="icon" onClick={() => { handleReduction(product.id) }}></img>
            <img src={deleteIcon} alt="delete" className="icon" onClick={() => { props.onDelete(product.id) }}></img>
            <p className="txt">Total price ${(product.price * count).toFixed(2)}</p>
        </div>
    );
}

