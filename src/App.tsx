import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CakeList from './components/CakeList'; // Import the CakeList component
import CakeForm from './components/CakeForm'; // Import the CakeForm component for adding/editing cakes
import CakeDetails from './components/CakeDetails';
import EditCake from './components/EditCake';

const App: React.FC = () => {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Define routes for CakeList and CakeForm */}
          <Route path="/" element={<CakeList />} /> {/* CakeList is shown on "/" route */}
          <Route path="/add-cake" element={<CakeForm />} /> {/* Show CakeForm to add a new cake */}
          <Route path="/edit/:id" element={<CakeForm />} />
          <Route path="/cake/:id" element={<CakeDetails />} />
          <Route path="/cakes/edit/:id" element={<EditCake />} />
          </Routes>
      </div>
    </Router>
  );
};

export default App;
