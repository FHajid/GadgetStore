import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Topadmin from '../Component/Top-admin';
import { Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import './css/addproduct.css';

export default function AdminAddProduct() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        Name: '',
        Description: '',
        Price: '',
        quantity: '',
        Image: null,
        GLTFFile: null,  // New state for GLTF file
        Categories_Id: ''
    });
    const [categories, setCategories] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    // Fetch categories from backend on component mount
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get('http://localhost:8082/api/categories');
                if (response.data) {
                    setCategories(response.data);
                }
            } catch (error) {
                console.error('Error fetching categories:', error);
                setErrorMessage('Error fetching categories. Please try again.');
            }
        };
        fetchCategories();
    }, []);

    // Handle form field changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // Handle file change for image upload
    const handleFileChange = (e) => {
        setFormData({ ...formData, Image: e.target.files[0] }); // Set the file object
    };

    // Handle GLTF file change
    const handleGLTFFileChange = (e) => {
        setFormData({ ...formData, GLTFFile: e.target.files[0] }); // Set GLTF file object
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const productData = new FormData();
            productData.append('Name', formData.Name);
            productData.append('Description', formData.Description);
            productData.append('Price', formData.Price);
            productData.append('quantity', formData.quantity);
            productData.append('Image', formData.Image); // Append image file object
            productData.append('GLTFFile', formData.GLTFFile); // Append GLTF file object
            productData.append('Categories_Id', formData.Categories_Id);

            const response = await axios.post('http://localhost:8082/api/products', productData, {
                withCredentials: true,
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            if (response.data.status === 'Success') {
                setSuccessMessage('Product added successfully!');
                setErrorMessage('');
                setFormData({
                    Name: '',
                    Description: '',
                    Price: '',
                    quantity: '',
                    Image: null,
                    GLTFFile: null,  // Reset GLTF file input
                    Categories_Id: ''
                });
            } else {
                setErrorMessage('Failed to add the product.');
                setSuccessMessage('');
            }
        } catch (error) {
            setErrorMessage('An error occurred while adding the product.');
            setSuccessMessage('');
            console.error('Error adding product:', error);
        }
    };

    return (
        <div>
            <Topadmin />
            <div className="main-addproduct-admin">
                <div className="restof">
                    <h2>Add New Product</h2>
                    {errorMessage && <p className="error-message">{errorMessage}</p>}
                    {successMessage && <p className="success-message">{successMessage}</p>}

                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="formProductName">
                            <Form.Label>Product Name</Form.Label>
                            <Form.Control
                                type="text"
                                name="Name"
                                value={formData.Name}
                                onChange={handleInputChange}
                                required
                            />
                        </Form.Group>

                        <Form.Group controlId="formProductDescription" className="mt-3">
                            <Form.Label>Description</Form.Label>
                            <Form.Control
                                as="textarea"
                                name="Description"
                                rows={3}
                                value={formData.Description}
                                onChange={handleInputChange}
                                required
                            />
                        </Form.Group>

                        <Form.Group controlId="formProductPrice" className="mt-3">
                            <Form.Label>Price</Form.Label>
                            <Form.Control
                                type="number"
                                name="Price"
                                value={formData.Price}
                                onChange={handleInputChange}
                                required
                            />
                        </Form.Group>

                        <Form.Group controlId="formProductQuantity" className="mt-3">
                            <Form.Label>Quantity</Form.Label>
                            <Form.Control
                                type="number"
                                name="quantity"
                                value={formData.quantity}
                                onChange={handleInputChange}
                                required
                            />
                        </Form.Group>

                        <Form.Group controlId="formProductImage" className="mt-3">
                            <Form.Label>Upload Image</Form.Label>
                            <Form.Control
                                type="file"
                                name="Image"
                                accept="image/*"
                                onChange={handleFileChange}
                                required
                            />
                        </Form.Group>

                        {/* New GLTF File Upload Field */}
                        <Form.Group controlId="formProductGLTF" className="mt-3">
                            <Form.Label>Upload GLTF Scene</Form.Label>
                            <Form.Control
                                type="file"
                                name="GLTFFile"
                                accept=".gltf,.glb"
                                onChange={handleGLTFFileChange}
                                required
                            />
                        </Form.Group>

                        <Form.Group controlId="formProductCategory" className="mt-3">
                            <Form.Label>Category</Form.Label>
                            <Form.Control
                                as="select"
                                name="Categories_Id"
                                value={formData.Categories_Id}
                                onChange={handleInputChange}
                                required
                            >
                                <option value="">Select Category</option>
                                {categories.map((category) => (
                                    <option key={category.Categories_Id} value={category.Categories_Id}>
                                        {category.Name}
                                    </option>
                                ))}
                            </Form.Control>
                        </Form.Group>

                        <Button variant="primary" type="submit" className="add-product1">
                            Add Product
                        </Button>
                        <Button
                            variant="secondary"
                            onClick={() => navigate('/admin-Product')}
                            className="back-to"
                        >
                            Back to Products
                        </Button>
                    </Form>
                </div>
            </div>
        </div>
    );
}
