
import Categories from "@/components/Categories";
import "./style.css"
import Featured from "@/components/Featured";
import Hero from "@/components/Hero";
import Products from "@/components/Products";

export default function Home() {
  return (
    <div className="">

      <div className="hero flex">
        <Hero/>
      </div>

      <div className="categories flex">
        <Categories/>
      </div>

      <div className="featured-products">
        <div className="flex">
          <section><h2>FEATURED PRODUCTS</h2></section>
        </div>
        <Products/>
      </div>
      
        <div className="cat-container flex">  
          <section className="grid">  
              <div className="texts flex">
                <img src="/vercel.svg" alt="" />
              </div>
            <div className="scroll-container flex">
              <div className="scroll">
                <Products/>
              </div>
            </div>
          </section>      
        </div>
    </div>
  );
}
