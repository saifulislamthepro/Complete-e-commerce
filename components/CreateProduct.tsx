'use client'

import { useEffect, useState, ChangeEvent, MouseEvent, FormEvent } from "react"
import "./CreateProduct.css"

type Size = {
    name: string,
    stock: number
}

type Product = {
    title: string,
    price: number,
    stock: Size[],
    category: string,
    description: string
}

export default function CreateProduct() {
    const [mounted, setMounted] = useState(false);
    const [size, setSize] = useState<Size>({
        name: "",
        stock: 0
    });

    const [sizeAndStock, setSizeAndStock] = useState<Size[]>([]);
    const [product, setProduct] = useState<Product>({
        title: "",
        price: 0,
        category: "",
        stock: [],
        description: ""
    });

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    const handleSizeStockChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setSize(prev => ({
            ...prev,
            [name]: name === "stock" ? Number(value) || 0 : value
        }));
    };

    const handleSave = (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        if (size.name && size.stock > 0) {
            setSizeAndStock(prev => [...prev, size]);
            setSize({ name: "", stock: 0 });
        }
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setProduct(prev => ({
            ...prev,
            [name]: name === "price" ? parseFloat(value) || 0 : value
        }));
    };

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const finalProduct = {
            ...product,
            stock: sizeAndStock
        };
        
        console.log("Final Product:", finalProduct);
        // TODO: Send finalProduct to backend or API

        setProduct({
        title: "",
        price: 0,
        category: "",
        stock: [],
        description: ""
    })
    };

    return (
        <div className="create-product">
            <form onSubmit={handleSubmit}>
                <div className="input-container flex column">
                    <label htmlFor="title">Name:</label>
                    <input type="text" name="title" value={product.title} onChange={handleChange} />
                </div>

                <div className="input-container flex column">
                    <label htmlFor="price">Price:</label>
                    <input type="number" name="price" value={String(product.price)} onChange={handleChange} />
                </div>

                <div className="input-container flex column">
                    <label htmlFor="category">Category:</label>
                    <select name="category" value={product.category} onChange={handleChange}>
                        <option value="">Select</option>
                        <option value="jeans">Jeans</option>
                        <option value="shirts">Shirts</option>
                        <option value="t-shirts">T-shirts</option>
                    </select>
                </div>

                <div className="input-container flex column">
                    {sizeAndStock.map((size, i) => (
                        <div key={i}>
                            <h4>Size: {size.name} - Stock: {size.stock}</h4>
                        </div>
                    ))}
                </div>

                <div className="input-container flex size-stock">
                    <div className="flex column">
                        <label htmlFor="size">Size:</label>
                        <input type="text" name="name" value={size.name} onChange={handleSizeStockChange} />
                    </div>
                    <div className="flex column">
                        <label htmlFor="stock">Stock:</label>
                        <input type="number" name="stock" value={String(size.stock)} onChange={handleSizeStockChange} />
                    </div>
                    <button onClick={handleSave}>Add</button>
                </div>

                <div>
                    <div dangerouslySetInnerHTML={{ __html:(product.description) }} />
                </div>

                <div className="input-container flex column">
                    <label htmlFor="description">Description:</label>
                    <textarea name="description" rows={8} value={product.description} onChange={handleChange} />
                </div>

                <div className="input-container flex column">
                    <label htmlFor="image">Image:</label>
                    <input type="file" name="image" id="image" />
                </div>

                <button type="submit">Create</button>
            </form>
        </div>
    );
}