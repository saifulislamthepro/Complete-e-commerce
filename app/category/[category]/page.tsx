import { connectDB } from "@/lib/db";
import Product from "@/models/Product";
import Products from "@/components/Products";
import './style.css';



export default async function ({ params }: { params: Promise<{ category: string }>}) {
    await connectDB();
    const param = await params;
    const products =JSON.parse(JSON.stringify( await Product.find({category: param.category})));


    return(
        <div className="category-product-page page">
            <div className="flex">
                <section>
                    <h3>{param.category.toLocaleUpperCase()} Category products</h3>
                    <Products products={products}/>
                </section>
            </div>
        </div>
    )
}