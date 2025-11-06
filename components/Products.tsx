

import "./Products.css";


export default function Products () {



    return(
        <div className="products flex">
            <section className="grid">
                <a className="card" href="/product">
                    <img src="/window.svg" alt="card" />
                    <h2>Premium Jeans Vikings jeans</h2>
                    <strong>Price: 50 টাকা</strong>
                    <p>This is the best products. you get 50% discounts</p>
                </a>
                <div className="card">
                    <img src="/window.svg" alt="card" />
                    <h2>Premium Jeans Vikings jeans</h2>
                    <strong>Price: 50 টাকা</strong>
                    <p>This is the best products. you get 50% discounts</p>
                </div>
                <div className="card">
                    <img src="/window.svg" alt="card" />
                    <h2>Premium Jeans Vikings jeans</h2>
                    <strong>Price: 50 টাকা</strong>
                    <p>This is the best products. you get 50% discounts</p>
                </div>
                <div className="card">
                    <img src="/window.svg" alt="card" />
                    <h2>Premium Jeans Vikings jeans</h2>
                    <strong>Price: 50 টাকা</strong>
                    <p>This is the best products. you get 50% discounts</p>
                </div>
            </section>
        </div>
    )
}