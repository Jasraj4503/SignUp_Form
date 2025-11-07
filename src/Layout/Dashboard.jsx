import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../assets/css/Dashboard.css";

const Dashboard = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [products, setProducts] = useState([]);
    const [form, setForm] = useState({
        name: "",
        category: "",
        price: "",
        stock: "",
    });
    const [editingId, setEditingId] = useState(null);

    const getKey = (email) => `products_${email}`;

    useEffect(() => {
        const logged = JSON.parse(localStorage.getItem("loggedInUser"));
        if (!logged) {
            navigate("/login");
            return;
        }
        setUser(logged);
        const saved = JSON.parse(localStorage.getItem(getKey(logged.email))) || [];
        setProducts(saved);
    }, [navigate]);

    const saveProducts = (updated) => {
        if (!user) return;
        localStorage.setItem(getKey(user.email), JSON.stringify(updated));
        setProducts(updated);
    };

    const handleAdd = (e) => {
        e.preventDefault();
        if (!form.name || !form.category || !form.price || !form.stock)
            return alert("Please fill all fields");

        if (editingId) {
            const updated = products.map((p) =>
                p.id === editingId ? { ...p, ...form } : p
            );
            saveProducts(updated);
            setEditingId(null);
            setForm({ name: "", category: "", price: "", stock: "" });
            return;
        }

        const newProduct = { id: Date.now(), ...form };
        saveProducts([...products, newProduct]);
        setForm({ name: "", category: "", price: "", stock: "" });
    };

    const handleEdit = (product) => {
        setForm({
            name: product.name,
            category: product.category,
            price: product.price,
            stock: product.stock,
        });
        setEditingId(product.id);
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const handleDelete = (id) => {
        if (window.confirm("Are you sure you want to delete this product?")) {
            const updated = products.filter((p) => p.id !== id);
            saveProducts(updated);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem("loggedInUser");
        navigate("/login");
    };

    return (
        <div className="product-container">
            <div className="form-section">
                <h2>Product Inventory System</h2>
                <form onSubmit={handleAdd} className="product-form">
                    <input
                        type="text"
                        placeholder="Product Name"
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                    />
                    <input
                        type="text"
                        placeholder="Category"
                        value={form.category}
                        onChange={(e) => setForm({ ...form, category: e.target.value })}
                    />
                    <input
                        type="number"
                        placeholder="Price"
                        value={form.price}
                        onChange={(e) => setForm({ ...form, price: e.target.value })}
                    />
                    <input
                        type="number"
                        placeholder="Stock"
                        value={form.stock}
                        onChange={(e) => setForm({ ...form, stock: e.target.value })}
                    />
                    <button type="submit" className="add-btn">
                        {editingId ? "Update" : "Add"}
                    </button>
                </form>
            </div>

            <div className="table-section">
                <table>
                    <thead>
                        <tr style={{textAlign: "center"}}>
                            <th>#</th>
                            <th>Product</th>
                            <th>Category</th>
                            <th>Price</th>
                            <th>Stock</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.length === 0 ? (
                            <tr>
                                <td colSpan="6" style={{ textAlign: "center" }}>
                                    No products added yet
                                </td>
                            </tr>
                        ) : (
                            products.map((p, index) => (
                                <tr key={p.id}>
                                    <td>{index + 1}</td>
                                    <td>{p.name}</td>
                                    <td>{p.category}</td>
                                    <td>₹{p.price}</td>
                                    <td>{p.stock}</td>
                                    <td>
                                        <button className="edit-btn btn-sm " onClick={() => handleEdit(p)}>
                                            Edit
                                        </button>
                                        <button
                                            className="delete-btn btn-sm"
                                            onClick={() => handleDelete(p.id)}
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            <div className="logout-container">
                <button className="logout-btn" onClick={handleLogout}>
                    Logout
                </button>
            </div>
        </div>
    );
};

export default Dashboard;
