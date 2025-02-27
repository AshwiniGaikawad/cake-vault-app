import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { addCake } from '../services/CakeService';
import { CakeDTO } from '../models/CakeDTO';

const AddCake: React.FC = () => {
    const [name, setName] = useState('');
    const [comment, setComment] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [yumFactor, setYumFactor] = useState(1);
    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const [alertMessage, setAlertMessage] = useState<string | null>(null);
    const [alertType, setAlertType] = useState<'success' | 'danger' | null>(null); 

    const navigate = useNavigate();

    const validateForm = () => {
        const newErrors: { [key: string]: string } = {};
        if (!name.trim()) newErrors.name = "Cake name is required.";
        if (!comment.trim()) newErrors.comment = "Comment is required.";
        if (!imageUrl.trim()) newErrors.imageUrl = "Image URL is required.";
        if (yumFactor < 1 || yumFactor > 5) newErrors.yumFactor = "Yum Factor must be between 1 and 5.";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setErrors({});
        setAlertMessage(null); // Reset alert message

        if (!validateForm()) return;

        const newCake: CakeDTO = { name, comment, imageUrl, yumFactor };

        try {
            await addCake(newCake);
            setAlertMessage("Cake added successfully! 🎉");
            setAlertType("success");
            setTimeout(() => navigate('/'), 2000); // Redirect after 2 sec
        } catch (error: any) {
            if (error.response && error.response.data) {
                setErrors(error.response.data); // Display backend validation errors
                setAlertMessage(error.response.data);
            } else {
                setAlertMessage("An unexpected error occurred. Please try again.");
            }
            setAlertType("danger");
        }
    };

    return (
        <div className="container mt-4">
            <h1>Add New Cake</h1>

            {/* Bootstrap Alert */}
            {alertMessage && (
                <div className={`alert alert-${alertType} alert-dismissible fade show`} role="alert">
                    {alertMessage}
                    <button type="button" className="close" onClick={() => setAlertMessage(null)}>
                        <span>&times;</span>
                    </button>
                </div>
            )}

            <form onSubmit={handleSubmit} className="cake-form">
                <div className="form-group">
                    <label>Name:</label>
                    <input type="text" className={`form-control ${errors.name ? 'is-invalid' : ''}`} value={name} onChange={(e) => setName(e.target.value)} />
                    {errors.name && <div className="invalid-feedback">{errors.name}</div>}
                </div>

                <div className="form-group">
                    <label>Comment:</label>
                    <textarea className={`form-control ${errors.comment ? 'is-invalid' : ''}`} value={comment} onChange={(e) => setComment(e.target.value)} rows={3} />
                    {errors.comment && <div className="invalid-feedback">{errors.comment}</div>}
                </div>

                <div className="form-group">
                    <label>Image URL:</label>
                    <input type="text" className={`form-control ${errors.imageUrl ? 'is-invalid' : ''}`} value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} />
                    {errors.imageUrl && <div className="invalid-feedback">{errors.imageUrl}</div>}
                </div>

                <div className="form-group">
                    <label>Yum Factor (1-5):</label>
                    <input type="number" className={`form-control ${errors.yumFactor ? 'is-invalid' : ''}`} value={yumFactor} onChange={(e) => setYumFactor(parseInt(e.target.value))} min="1" max="5" />
                    {errors.yumFactor && <div className="invalid-feedback">{errors.yumFactor}</div>}
                </div>

                <button type="submit" className="btn btn-success mt-3">Add Cake</button>
            </form>
        </div>
    );
};

export default AddCake;
