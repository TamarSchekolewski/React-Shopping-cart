import React, { useState } from "react";
import "./product.css";

export default props => {
    const [countToAdd, setcountToAdd] = useState(0);

    const handleAddItem = () => {
        try {
            if (localStorage.getItem("myCart") === null) {
                localStorage.setItem('myCart', JSON.stringify(new Array()));
            }
            const myCart = JSON.parse(localStorage.getItem('myCart'));
            const index = myCart.map((e) => {
                return e.id;
            }).indexOf(product.id);
            if (index !== -1) {
                myCart[index].count += parseInt(countToAdd);
            } else {
                myCart.push({ id: product.id, count: countToAdd ? countToAdd : 1 });
            }
            localStorage.setItem('myCart', JSON.stringify(myCart));
            props.updateCountCart(myCart.length);
        } catch (error) {
            console.error(error);
        }
    }

    const handleCountToAdd = count => {
        try {
            setcountToAdd(count);
        } catch (error) {
            console.error(error);
        }
    }

    const product = props.product;

    return (
        <div className="product">
            <img
                src={require(`../../assets/images/${product.imageUrl}`)}
                alt="product image"
                className="product-image">
            </img>
            <h3>{product.name}</h3>
            <p>${product.price}</p>
            <div>
                <input
                    type='number'
                    min='1'
                    defaultValue={1}
                    className="count-input"
                    onChange={(e) => handleCountToAdd(e.target.value)}
                />
                <button
                    className="add-to-cart"
                    onClick={handleAddItem}
                    type="submit"
                >
                    Add to Cart
                </button>
            </div>
        </div>
    );
}
