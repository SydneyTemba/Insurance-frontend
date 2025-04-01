import React, { useState, useEffect } from "react";
import PolicyList from "./components/PolicyList";
import PolicyForm from "./components/PolicyForm";
import { getPolicies, createPolicy, updatePolicy, deletePolicy } from "./api";

function App() {
  const [policies, setPolicies] = useState([]);
  const [policyToEdit, setPolicyToEdit] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch policies when component mounts
  useEffect(() => {
    fetchPolicies();
  }, []);

  const fetchPolicies = async () => {
    try {
      setLoading(true);
      const response = await getPolicies();
      setPolicies(response.data);
      setError(null);
    } catch (err) {
      setError("Failed to fetch policies. Please try again.");
      console.error("Error fetching policies:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleSuccess = () => {
    fetchPolicies(); // Refresh the list after successful submission
    setPolicyToEdit(null); // Reset edit form
  };

  const handleDelete = async (id) => {
    try {
      await deletePolicy(id);
      fetchPolicies(); // Refresh the list after deletion
    } catch (err) {
      setError("Failed to delete policy. Please try again.");
      console.error("Error deleting policy:", err);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">Insurance Policy Management</h1>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      <PolicyForm 
        policyToEdit={policyToEdit} 
        onSuccess={handleSuccess} 
      />

      {loading ? (
        <div className="text-center py-8">Loading policies...</div>
      ) : (
        <PolicyList 
          policies={policies} 
          onEdit={setPolicyToEdit} 
          onDelete={handleDelete} 
        />
      )}
    </div>
  );
}

export default App;