
import Products from "@/components/Products";
import SizeQty from "@/components/SizeQty";
import "./style.css"

export default function Product () {




    return(
        <div className="single-product page flex">
            <section>
                <div className="shortcuts">
                    <p>Products / product</p>
                </div>
            </section>
            <section>
                <div className="container grid">
                    <div className="image-container">
                        <img src="/file.svg" alt="image" />
                    </div>
                    <div className="details">
                        <h2>Product title is here</h2>
                        <SizeQty/>
                        <p>১০০% লিলিন কটন শার্ট 
                            স্টাইলিশ ও আরামদায়ক

                            স্পেসিফিকেশন:
                            উপাদান: খাঁটি ১০০% লিলিন কটন 
                            হাতা: হাফ হাতা (Half Sleeve) – ফ্যাশনেবল ও প্রফেশনাল লুক
                            ফিটিং: স্ট্যান্ডার্ড/স্লিম ফিট – আপনার শরীর অনুযায়ী নিখুঁত মাপ
                            বোতাম: উন্নত মানের বোতাম – স্টাইলিশ ও টেকসই
                            ব্যবহার: অফিস, ঘোরাঘুরি, পার্টি কিংবা প্রতিদিনের স্টাইল
                            পরিচর্যা: হালকা সাবানে হ্যান্ডওয়াশ / মেশিন ওয়াশে উপযোগী

                            Estimate delivery : 2-3 Days

                            Estimate delivery : 2-3 Days
                            Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                            Quia laboriosam error labore? Sit soluta, doloremque at
                            porro possimus debitis reprehenderit. Laboriosam fugiat 
                            officia nemo corporis? Numquam veritatis sint at quisquam?</p>
                    </div>
                </div>
                <div className="related">
                    <h2>Related Products</h2>
                    <Products/>
                </div>
            </section>
        </div>
    )
}