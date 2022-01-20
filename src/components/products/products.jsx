import React, { useState } from "react";
import ProductsList from "../../data/product-items.json";
import Product from "../product/product";
import "./products.css";

export default props => {
    
    const [productsItems, setProductsItems] = useState(ProductsList);

    const handleSearchInput = event => {
        try {
            const productsItemsList = new Array();
            ProductsList.map((e) => {
                if (e.name.toLowerCase().includes(event.target.value.toLowerCase())) {
                    productsItemsList.push(e);
                }
            });
            setProductsItems(productsItemsList);
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div>
            <form action="#" method="get" className="search-form">
                <input
                    type="search"
                    placeholder="Search products"
                    className="search-keyword"
                    onChange={handleSearchInput}
                />
                <button
                    className="search-button"
                    type="submit"
                />
            </form>
            <div className="products">
                {
                    productsItems.length > 0 && (productsItems.map(product =>
                        <Product
                            key={product.id}
                            product={product}
                            {...props}
                        />)
                    )}
                {productsItems.length === 0 && (
                    <div>No products found</div>
                )}
            </div>
        </div>
    );

}