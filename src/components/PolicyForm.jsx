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
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (policyToEdit) {
      setFormData({
        ...policyToEdit,
        premium: policyToEdit.premium.toString(),
      });
    } else {
      // Reset form when not editing
      setFormData({
        policy_number: "",
        insured_name: "",
        start_date: "",
        end_date: "",
        type: "Health",
        premium: "",
        description: "",
      });
    }
  }, [policyToEdit]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      // Clean and validate data
      const cleanedData = {
        ...formData,
        policy_number: String(formData.policy_number).trim(),
        premium: parseFloat(formData.premium),
        start_date: formData.start_date || new Date().toISOString().split('T')[0], // Default to today if empty
        end_date: formData.end_date || new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toISOString().split('T')[0] // Default to 1 year from now
      };

      // Basic validation
      if (!cleanedData.policy_number || !cleanedData.insured_name || isNaN(cleanedData.premium)) {
        throw new Error("Please fill in all required fields");
      }

      if (policyToEdit) {
        await updatePolicy(policyToEdit.id, cleanedData);
      } else {
        await createPolicy(cleanedData);
      }
      
      onSuccess();
    } catch (error) {
      console.error("Error submitting policy:", error);
      setError(error.response?.data?.message || error.message || "Failed to submit policy");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-6 rounded-xl shadow-xl mb-10">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">
        {policyToEdit ? "Edit Policy" : "Add New Policy"}
      </h2>

      {error && (
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Policy Number *</label>
            <input
              type="text"
              name="policy_number"
              value={formData.policy_number}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Insured Name *</label>
            <input
              type="text"
              name="insured_name"
              value={formData.insured_name}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
            <input
              type="date"
              name="start_date"
              value={formData.start_date}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
            <input
              type="date"
              name="end_date"
              value={formData.end_date}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Policy Type</label>
          <select
            name="type"
            value={formData.type}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="Health">Health</option>
            <option value="Life">Life</option>
            <option value="Auto">Auto</option>
            <option value="Home">Home</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Premium Amount ($) *</label>
          <input
            type="number"
            name="premium"
            value={formData.premium}
            onChange={handleChange}
            step="0.01"
            min="0"
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="3"
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={isSubmitting}
            className={`px-4 py-2 rounded-md text-white ${isSubmitting ? 'bg-blue-400' : 'bg-blue-600 hover:bg-blue-700'} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`}
          >
            {isSubmitting ? (
              <span className="flex items-center">
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                {policyToEdit ? "Updating..." : "Adding..."}
              </span>
            ) : (
              policyToEdit ? "Update Policy" : "Add Policy"
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default PolicyForm;