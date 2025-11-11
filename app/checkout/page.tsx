
import "./style.css";

export default function CheckoutPage() {
  return (
    <div className="page checkout">
        <div className="page-title flex">            
            <h1>Checkout Page</h1>
        </div>
      {/* Add your checkout components and logic here */}
      
      <div className="flex">
        <section className="grid">
            <form className="grid">
                <h2>Billing Details</h2>

                <div className="fname">
                    <label htmlFor="fname">First Name:</label>
                    <input type="text" id="name" name="fname" required />
                </div>

                <div className="lname">
                    <label htmlFor="lname">Last Name:</label>
                    <input type="text" id="name" name="lname" required />
                </div>

                <div className="phone">
                    <label htmlFor="phone">Phone:</label>
                    <input type="tel" id="phone" name="phone" required />
                </div>
                
                <div className="email">
                    <label htmlFor="email">Email:</label>   
                    <input type="email" id="email" name="email" required />
                </div>

                <div className="address">
                    <label htmlFor="address">Address:</label>
                    <textarea id="address" name="address" rows={10} required />
                </div>
                
                
                <div className="notes">
                    <label htmlFor="notes">Order Notes:</label>
                    <textarea id="notes" name="notes" rows={10} />
                </div>
            </form>
            <div className="order-summary">
                <h2>Order Summary</h2>
                <hr />
                <div className="title flex">
                    <strong>Product</strong>
                    <strong>Qty</strong>
                    <strong>Total</strong>
                </div>
                <div className="summary-item flex">
                    <span>Product 1</span>
                    <span>1</span>
                    <span>$10.00</span>
                </div>
                <div className="summary-item flex">
                    <span>Product 2</span>
                    <span>1</span>
                    <span>$15.00</span>
                </div>
                <hr />
                <div className="summary-total flex">
                    <strong>Subtotal</strong>
                    <strong>$25.00</strong>
                </div>
                <hr />
                <div className="shipping flex">
                    <p>Shipping</p>
                    <p>+ ৳60</p>
                </div>
                <hr />
                <div className="total flex">
                    <strong>Total</strong>
                    <strong>$25.00</strong>
                </div>

                <div className="cod">
                    <input type="checkbox" name="cod" /> <span> Cash On Delivery</span>
                </div>
                <div className="ssl">                    
                    <input type="checkbox" name="online" /> <span>Pay Online (credit/Debit card/ Mobile Banking/ Net banking/ bkash)</span> 
                </div>
                <div className="btn">
                    <a href="/dashboard"><button>Order now</button></a>
                </div>
            </div>
        </section>
      </div>
    </div>
  );
}