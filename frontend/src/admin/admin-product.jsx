import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './css/product.css';
import Topadmin from '../Component/Top-admin';
import Sidebar from '../Component/sidebar';
import { Table, Form, Button, InputGroup, FormControl, Modal } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { useNavigate } from 'react-router-dom';

export default function AdminProduct() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedProducts, setSelectedProducts] = useState([]);
    const [editProduct, setEditProduct] = useState(null);
    const [showEditModal, setShowEditModal] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get('http://localhost:8082/api/products', { withCredentials: true });
                setProducts(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching products:', error);
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const filteredProducts = products.filter(product =>
        product.Name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleSelect = (productId) => {
        if (selectedProducts.includes(productId)) {
            setSelectedProducts(selectedProducts.filter(id => id !== productId));
        } else {
            setSelectedProducts([...selectedProducts, productId]);
        }
    };

    const removeProducts = async () => {
        try {
            console.log("Products to be removed:", selectedProducts); // Log selected products

            await Promise.all(
                selectedProducts.map(async (productId) => {
                    console.log(`Deleting product with ID: ${productId}`); // Log each delete request
                    await axios.delete(`http://localhost:8082/api/products/${productId}`, { withCredentials: true });
                })
            );
            alert("Selected products have been removed!");
            setProducts(products.filter(product => !selectedProducts.includes(product.Product_id)));
            setSelectedProducts([]);
        } catch (error) {
            console.error('Error removing products:', error.response ? error.response.data : error.message);
            alert("Failed to remove products.");
        }
    };

    const handleEditProduct = () => {
        if (selectedProducts.length > 0) {
            const productToEdit = products.find(product => product.Product_id === selectedProducts[0]);
            setEditProduct(productToEdit);
            setShowEditModal(true);
        }
    };

    const handleUpdateProduct = async (e) => {
        e.preventDefault();
        if (editProduct) {
            try {
                await axios.put(`http://localhost:8082/api/products/${editProduct.Product_id}`, editProduct, { withCredentials: true });
                alert("Product updated successfully!");
                setProducts(products.map(product => product.Product_id === editProduct.Product_id ? editProduct : product));
                setShowEditModal(false);
                setSelectedProducts([]);
            } catch (error) {
                console.error('Error updating product:', error);
                alert("Failed to update product.");
            }
        }
    };

    const handleCloseEditModal = () => {
        setShowEditModal(false);
        setEditProduct(null);
    };

    return (
        <div>
            <Topadmin />
            <div className="main-admin-product">
                <Sidebar />
                <div className="restof">
                    <div className="d-flex justify-content-between align-items-center mb-3">
                        <h2>Products</h2>
                        <Button variant="primary" onClick={() => navigate('/admin-Addproduct')} className="add-product">
                            <i className="bi bi-plus fs-5"></i> Product
                        </Button>
                    </div>

                    <div className="d-flex justify-content-between mb-3">
                        <InputGroup className="w-50">
                            <FormControl
                                placeholder="Search by Product Name"
                                aria-label="Search"
                                value={searchQuery}
                                onChange={handleSearchChange}
                            />
                        </InputGroup>

                        <div className='edit-remove'>
                            <Button
                                onClick={handleEditProduct}
                                disabled={selectedProducts.length === 0}
                                className="edit-product"
                            >
                                <i className="bi bi-pencil"></i> Edit
                            </Button>
                            <Button
                                className='product-remove'
                                onClick={removeProducts}
                                disabled={selectedProducts.length === 0}
                            >
                                <i className="bi bi-trash"></i> Remove
                            </Button>
                        </div>
                    </div>

                    {loading ? (
                        <p>Loading products...</p>
                    ) : (
                        <div className="table-responsive">
                            <Table striped bordered hover>
                                <thead className="table-dark">
                                    <tr>
                                        <th>
                                            <Form.Check
                                                type="checkbox"
                                                id="select-all"
                                                onChange={(e) =>
                                                    setSelectedProducts(
                                                        e.target.checked ? products.map(p => p.Product_id) : []
                                                    )
                                                }
                                                checked={selectedProducts.length === products.length}
                                            />
                                        </th>
                                        <th>Product Name</th>
                                        <th>Price</th>
                                        <th>Quantity</th>
                                        <th>Image</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredProducts.map(product => (
                                        <tr key={product.Product_id}>
                                            <td>
                                                <Form.Check
                                                    type="checkbox"
                                                    checked={selectedProducts.includes(product.Product_id)}
                                                    onChange={() => handleSelect(product.Product_id)}
                                                />
                                            </td>
                                            <td>{product.Name}</td>
                                            <td>Rp {product.Price}</td>
                                            <td>{product.quantity}</td>
                                            <td>
                                                <img
                                                    src={product.Image_url}
                                                    alt={product.Name}
                                                    style={{ width: '50px', height: '50px' }}
                                                />
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        </div>
                    )}

                    <Modal show={showEditModal} onHide={handleCloseEditModal}>
                        <Modal.Header closeButton>
                            <Modal.Title>Edit Product</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            {editProduct && (
                                <Form onSubmit={handleUpdateProduct}>
                                    <Form.Group controlId="formProductName">
                                        <Form.Label>Product Name</Form.Label>
                                        <Form.Control
                                            type="text"
                                            value={editProduct?.Name || ''}
                                            onChange={(e) => setEditProduct({ ...editProduct, Name: e.target.value })}
                                            required
                                        />
                                    </Form.Group>

                                    <Form.Group controlId="formProductPrice" className="mt-3">
                                        <Form.Label>Price</Form.Label>
                                        <Form.Control
                                            type="number"
                                            value={editProduct.Price}
                                            onChange={(e) => setEditProduct({ ...editProduct, Price: parseFloat(e.target.value) })}
                                            required
                                        />
                                    </Form.Group>

                                    <Form.Group controlId="formProductQuantity" className="mt-3">
                                        <Form.Label>Quantity</Form.Label>
                                        <Form.Control
                                            type="number"
                                            value={editProduct?.quantity || ''}
                                            onChange={(e) => setEditProduct({ ...editProduct, quantity: parseInt(e.target.value) })}
                                            required
                                        />
                                    </Form.Group>

                                    <Button variant="primary" type="submit" className="mt-3">Update Product</Button>
                                </Form>
                            )}
                        </Modal.Body>
                    </Modal>
                </div>
            </div>
        </div>
    );
}
