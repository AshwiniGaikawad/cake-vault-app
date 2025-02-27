import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getCake, updateCake } from '../services/CakeService';
import { Cake } from '../models/Cake';

const EditCake: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [cake, setCake] = useState<Cake | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (id) {
            getCake(parseInt(id))
                .then(setCake)
                .catch(() => setError("Failed to load cake details"));
        }
    }, [id]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        if (cake) {
            setCake({ ...cake, [e.target.name]: e.target.value });
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (cake) {
            try {
                await updateCake(cake.id,cake);
                navigate('/'); // Redirect to Cake List after update
            } catch (err) {
                setError("An error occurred while updating the cake.");
            }
        }
    };

    if (!cake) {
        return <div>Loading...</div>;
    }

    return (
        <div className="container mt-4">
            <h1>Edit Cake</h1>
            {error && <div className="alert alert-danger">{error}</div>}
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label className="form-label">Name</label>
                    <input type="text" name="name" className="form-control" value={cake.name} onChange={handleChange} required />
                </div>

                <div className="mb-3">
                    <label className="form-label">Comment</label>
                    <textarea name="comment" className="form-control" value={cake.comment} onChange={handleChange} required />
                </div>

                <div className="mb-3">
                    <label className="form-label">Image URL</label>
                    <input type="text" name="imageUrl" className="form-control" value={cake.imageUrl} onChange={handleChange} required />
                </div>

                <div className="mb-3">
                    <label className="form-label">Yum Factor (1-5)</label>
                    <input type="number" name="yumFactor" className="form-control" value={cake.yumFactor} onChange={handleChange} min="1" max="5" required />
                </div>

                <button type="submit" className="btn btn-success">Update Cake</button>
                <button type="button" className="btn btn-secondary ms-2" onClick={() => navigate('/')}>Cancel</button>
            </form>
        </div>
    );
};

export default EditCake;
