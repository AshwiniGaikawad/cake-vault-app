import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getCakes } from '../services/CakeService';
import { Cake } from '../models/Cake';
import '../css/CakeDetails.css'; // Import CSS for styling

const CakeDetails: React.FC = () => {
    const { id } = useParams<{ id: string }>(); // Get the cake ID from the URL
    const [cake, setCake] = useState<Cake | null>(null); // State to hold the cake details
    const navigate = useNavigate(); // Hook to programmatically navigate

    useEffect(() => {
        if (id) {
            getCakes().then((cakes) => {
                const foundCake = cakes.find(cake => cake.id === parseInt(id)); // Find the cake by ID
                if (foundCake) {
                    setCake(foundCake); // Set the cake details in the state
                } else {
                    navigate('/'); // If the cake is not found, navigate back to the home page
                }
            });
        }
    }, [id, navigate]); // Re-fetch when ID changes

    if (!cake) {
        return <div>Loading...</div>; // Show loading message while the data is being fetched
    }

    return (
        <div className="container mt-4">
        <h1>{cake.name} Details</h1>
        <div className="cake-details-container">
            {/* Left Side: Image */}
            <div className="cake-image-container">
                <img className="cake-image" src={cake.imageUrl} alt={cake.name} />
            </div>

            {/* Right Side: Cake Details */}
            <div className="cake-info">
                <h2 className="cake-title">{cake.name}</h2>
                <p>{cake.comment}</p>
                <p><strong>Yum Factor:</strong> {cake.yumFactor}</p>

                <button className="btn btn-warning me-2" onClick={() => navigate(`/cakes/edit/${cake.id}`)}>
                        Edit Cake
                    </button>
                    <button className="btn btn-primary" onClick={() => navigate('/')}>
                        Back to Cake List
                    </button>
            </div>
        </div>
    </div>
);
};

export default CakeDetails;
