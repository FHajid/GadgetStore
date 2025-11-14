import React, { useState, useEffect } from "react";
import axios from "axios";
import './css/categories.css';
import Sidebar from "../Component/sidebar";
import Topadmin from "../Component/Top-admin";

function Admincategories() {
    const [categories, setCategories] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
    const [newCategory, setNewCategory] = useState({
        name: '',
        description: '',
        image: null
    });

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get('http://localhost:8082/api/categories/product-count', { withCredentials: true });
                setCategories(response.data);
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        };

        fetchCategories();
    }, []);

    const handleInputChange = (e) => {
        setNewCategory({ ...newCategory, [e.target.name]: e.target.value });
    };

    const handleImageChange = (e) => {
        setNewCategory({ ...newCategory, image: e.target.files[0] });
    };

    const handleAddCategory = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('name', newCategory.name);
        formData.append('description', newCategory.description);
        if (newCategory.image) {
            formData.append('image', newCategory.image);
        }

        try {
            const response = await axios.post('http://localhost:8082/api/categories', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            alert(response.data.message);
            setShowForm(false);
            setNewCategory({ name: '', description: '', image: null });
            const updatedCategories = await axios.get('http://localhost:8082/api/categories/product-count');
            setCategories(updatedCategories.data);
        } catch (error) {
            console.error('Error adding category:', error);
            alert('Failed to add category.');
        }
    };

    const handleEditCategory = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('name', newCategory.name);
        formData.append('description', newCategory.description);
        if (newCategory.image) {
            formData.append('image', newCategory.image);
        }

        try {
            const response = await axios.put(`http://localhost:8082/api/categories/${selectedCategory.categoryId}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            alert(response.data.message);
            setShowForm(false);
            setIsEditing(false);
            setSelectedCategory(null);
            const updatedCategories = await axios.get('http://localhost:8082/api/categories/product-count');
            setCategories(updatedCategories.data);
        } catch (error) {
            console.error('Error editing category:', error);
            alert('Failed to edit category.');
        }
    };

    const handleDeleteCategory = async (categoryId) => {
        try {
            await axios.delete(`http://localhost:8082/api/categories/${categoryId}`);
            alert("Category deleted successfully.");
            const updatedCategories = await axios.get('http://localhost:8082/api/categories/product-count');
            setCategories(updatedCategories.data);
        } catch (error) {
            console.error('Error deleting category:', error);
            alert('Failed to delete category.');
        }
        setShowDeleteConfirmation(false);
    };

    const openEditForm = (category) => {
        setSelectedCategory(category);
        setNewCategory({
            name: category.name,
            description: category.description,
            image: null
        });
        setIsEditing(true);
        setShowForm(true);
    };

    const openDeleteConfirmation = (category) => {
        setSelectedCategory(category);
        setShowDeleteConfirmation(true);
    };

    return (
        <>
            <Topadmin />
            <div className="admin-cata-main">
                <Sidebar />
                <div className="restof">
                    <div className="header">
                        <h2>Categories</h2>
                        <button className="addcata" style={{ float: 'right' }} onClick={() => setShowForm(true)}>Add Categories</button>
                    </div>

                    <div className="allcard">
                        {categories.map(category => (
                            <div 
                                className="card-cate" 
                                key={category.categoryId}
                                onMouseEnter={() => setSelectedCategory(category)}
                                onMouseLeave={() => setSelectedCategory(null)}
                            >
                                <img 
                                    src={category.imageUrl} 
                                    alt={category.name} 
                                    className="category-image" 
                                    style={{ width: '100px', height: '100px' }} 
                                />
                                <h3>{category.name}</h3>
                                <p>Products: {category.count}</p>

                                {/* Hover Options */}
                                {selectedCategory && selectedCategory.categoryId === category.categoryId && (
                                    <div className="hover-options">
                                        <button className="edit-btn" onClick={() => openEditForm(category)}>Edit</button>
                                        <button className="delete-btn" onClick={() => openDeleteConfirmation(category)}>Delete</button>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>

                    {/* Add or Edit Category Form Modal */}
                    {showForm && (
                        <div className="modal-overlay">
                            <div className="modal-content">
                                <span className="close" onClick={() => { setShowForm(false); setIsEditing(false); }}>&times;</span>
                                <h3>{isEditing ? "Edit Category" : "Add New Category"}</h3>
                                <form onSubmit={isEditing ? handleEditCategory : handleAddCategory}>
                                    <div className="form-group">
                                        <label>Category Name</label>
                                        <input 
                                            type="text" 
                                            name="name" 
                                            value={newCategory.name} 
                                            onChange={handleInputChange} 
                                            required 
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Description</label>
                                        <input 
                                            type="text" 
                                            name="description" 
                                            value={newCategory.description} 
                                            onChange={handleInputChange} 
                                            required 
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Upload Image</label>
                                        <input 
                                            type="file" 
                                            name="image" 
                                            accept="image/*" 
                                            onChange={handleImageChange} 
                                        />
                                    </div>
                                    <button type="submit">{isEditing ? "Save Changes" : "Add Category"}</button>
                                </form>
                            </div>
                        </div>
                    )}

                    {/* Delete Confirmation Modal */}
                    {showDeleteConfirmation && (
                        <div className="modal-overlay">
                            <div className="modal-content">
                                <h3>Are you sure you want to delete {selectedCategory?.name}?</h3>
                                <button className="confirm-delete" onClick={() => handleDeleteCategory(selectedCategory.categoryId)}>Yes, Delete</button>
                                <button className="cancel-delete" onClick={() => setShowDeleteConfirmation(false)}>Cancel</button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}

export default Admincategories;
