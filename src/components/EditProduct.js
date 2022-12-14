import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { TextField } from "@mui/material";
import Button from "@mui/material";

const EditProduct = () => {
    const [title, setTittle] = useState('');
    const [price, setPrice] = useState('');
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        getProductById();
    }, []);

    const getProductById = async () => {
        const response = await fetch(`http://localhost:8080/products/${id}`);
        const data = await response.json();
        setTittle(data.title);
        setPrice(data.price);
    }

    const updateProduct = async (e) => {
        e.preventDefault();
        const product = { title, price };
        await fetch(`http://localhost:8080/products/${id}`, {
            method: "PUT",
            body: JSON.stringify(product),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        navigate.push("/");
    }

    return (
        <div>
            <form onSubmit={updateProduct}>
                <div className="field">
                    {/* <label className="label">Title</label> */}
                    <div className="control">
                        <TextField className="input" value={title} onChange={(e) => setTittle(e.target.value)} label="Nama Produk" type="text" placeholder="Title" />
                    </div>
                </div>

                <div className="field">
                    {/* <label className="label">Price</label> */}
                    <div className="control">
                        <TextField className="input" value={price} onChange={(e) => setPrice(e.target.value)} label="Harga" type="text" placeholder="Price" />
                    </div>
                </div>
                
                <div className="field">
                    <div className="control">
                        <button className="button is-primary">Update</button>
                    </div>
                </div>
            </form>
        </div>
    )
}
export default EditProduct