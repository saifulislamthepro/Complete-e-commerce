'use client'

import "./SizeQty.css"
export default function SizeQty() {





    return(
        <div className="client-container grid">            
            <div className="size-quantity flex">
                <div className="price-container flex">
                    <p className="price">৳690 </p> 
                    <span className="stock">In Stock</span>
                </div>
                <div className="size flex">
                    <p>Size:</p>
                    <div className="size-container">                    
                        <strong>M</strong>
                        <strong>L</strong>
                        <strong>XL</strong>
                    </div>
                </div>
                <div className="qty flex">
                    <p>Qty:</p>
                    <div className="updater flex">
                        <strong>-</strong>
                        <strong>1</strong>
                        <strong>+</strong>
                    </div>
                </div>
            </div>
            <button>Order Now</button>
            <button>Add to Cart</button>
        </div>
    )
}