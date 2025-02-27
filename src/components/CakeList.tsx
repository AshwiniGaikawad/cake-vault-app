import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { deleteCake, getCakes } from '../services/CakeService';
import { Cake } from '../models/Cake';
import '../css/CakeList.css'; // Import CSS for styling

const CakeList: React.FC = () => {
    const [cakes, setCakes] = useState<Cake[]>([]); // State to hold the list of cakes
    const navigate = useNavigate(); // Hook to programmatically navigate
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        getCakes().then(setCakes); // Fetch cakes data on component mount
    }, []);

    const handleDelete = async (id: number) => {
        try {
            await deleteCake(id); // Call delete service
            setCakes(cakes.filter((cake) => cake.id !== id)); // Remove cake from state
        } catch (error) {
            setError('Failed to delete the cake.');
        }
    };

    return (
        <div className="container mt-4">

            <div className="d-flex justify-content-between align-items-center mb-3">
                <h1>Cakes List</h1>
                <button className="btn btn-success" onClick={() => navigate('/add-cake')}>
                    + Add New Cake
                </button>
            </div>

            <div className="row">
                {cakes.map((cake) => (
                   <div key={cake.id} className="col-md-4 mb-4">
                   <div className="card">
                       <div className="card-img-container" onClick={() => navigate(`/cake/${cake.id}`)}>
                           <img className="card-img-top cake-image" src={cake.imageUrl} alt={cake.name} />
                       </div>
                       <div className="card-body d-flex justify-content-between align-items-center">
                           <h5 className="card-title" style={{ cursor: 'pointer' }} onClick={() => navigate(`/cake/${cake.id}`)}>
                               {cake.name}
                           </h5>
                           <button
                               className="btn btn-danger"
                               onClick={(e) => {
                                   e.stopPropagation();  // Prevents the click event from triggering the navigate function
                                   handleDelete(cake.id);
                               }}
                           >
                                                           Delete

                           </button>
                       </div>
                   </div>
               </div>
               
                ))}
            </div>
        </div>
    );
};

export default CakeList;
