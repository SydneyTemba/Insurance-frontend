import React, { useState, useEffect } from "react";
import { createPolicy, updatePolicy } from "../api";

const PolicyForm = ({ policyToEdit, onSuccess }) => {
  const [formData, setFormData] = useState({
    policy_number: "",
    insured_name: "",
    start_date: "",
    end_date: "",
    type: "Health",
    premium: "",
    description: "",
  });

  const [error, setError] = useState(null);

  useEffect(() => {
    if (policyToEdit) {
      setFormData({
        ...policyToEdit,
        premium: policyToEdit.premium.toString(),
      });
    }
  }, [policyToEdit]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Ensure the policy_number is a string and remove extra spaces
    const cleanedData = {
      ...formData,
      policy_number: String(formData.policy_number).trim(),
      premium: parseFloat(formData.premium), // Ensure premium is a float
    };

    // Validate form data before sending
    if (!cleanedData.policy_number || !cleanedData.insured_name || !cleanedData.premium) {
      setError("Please fill in all required fields.");
      return;
    }

    try {
      if (policyToEdit) {
        await updatePolicy(policyToEdit.id, cleanedData);
      } else {
        await createPolicy(cleanedData);
      }
      onSuccess();
      setError(null); // Reset error message after success
    } catch (error) {
      console.error("Error submitting policy:", error.response?.data || error.message);
      setError("Failed to submit policy. Please try again.");
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-6 rounded-xl shadow-xl mt-10">
      <h2 className="text-3xl font-bold text-gray-900 mb-4">
        {policyToEdit ? "Edit Policy" : "Add New Policy"}
      </h2>

      {error && <p className="text-red-600 bg-red-100 p-2 rounded mb-4">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-800 font-semibold">Policy Number</label>
          <input
            type="text"
            name="policy_number"
            value={formData.policy_number}
            onChange={handleChange}
            className="w-full p-2 border border-gray-400 rounded-lg focus:ring focus:ring-blue-400 text-gray-900"
            required
          />
        </div>

        <div>
          <label className="block text-gray-800 font-semibold">Insured Name</label>
          <input
            type="text"
            name="insured_name"
            value={formData.insured_name}
            onChange={handleChange}
            className="w-full p-2 border border-gray-400 rounded-lg focus:ring focus:ring-blue-400 text-gray-900"
            required
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-800 font-semibold">Start Date</label>
            <input
              type="date"
              name="start_date"
              value={formData.start_date}
              onChange={handleChange}
              className="w-full p-2 border border-gray-400 rounded-lg focus:ring focus:ring-blue-400 text-gray-900"
              required
            />
          </div>

          <div>
            <label className="block text-gray-800 font-semibold">End Date</label>
            <input
              type="date"
              name="end_date"
              value={formData.end_date}
              onChange={handleChange}
              className="w-full p-2 border border-gray-400 rounded-lg focus:ring focus:ring-blue-400 text-gray-900"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-gray-800 font-semibold">Policy Type</label>
          <select
            name="type"
            value={formData.type}
            onChange={handleChange}
            className="w-full p-2 border border-gray-400 rounded-lg focus:ring focus:ring-blue-400 text-gray-900"
            required
          >
            <option value="Health">Health</option>
            <option value="Life">Life</option>
            <option value="Auto">Auto</option>
            <option value="Home">Home</option>
          </select>
        </div>

        <div>
          <label className="block text-gray-800 font-semibold">Premium Amount ($)</label>
          <input
            type="number"
            name="premium"
            value={formData.premium}
            onChange={handleChange}
            className="w-full p-2 border border-gray-400 rounded-lg focus:ring focus:ring-blue-400 text-gray-900"
            required
          />
        </div>

        <div>
          <label className="block text-gray-800 font-semibold">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full p-2 border border-gray-400 rounded-lg focus:ring focus:ring-blue-400 text-gray-900"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition-all font-semibold"
        >
          {policyToEdit ? "Update Policy" : "Add Policy"}
        </button>
      </form>
    </div>
  );
};

export default PolicyForm;
