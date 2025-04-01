import React from "react";

const PolicyList = ({ policies = [], onEdit, onDelete }) => {
  if (!policies || policies.length === 0) {
    return <p className="text-center text-gray-600">No policies found.</p>;
  }

  return (
    <div className="max-w-4xl mx-auto mt-8">
      <h2 className="text-3xl font-bold text-gray-900 mb-4">Policies</h2>

      <div className="bg-white p-4 rounded-xl shadow-lg overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-blue-600 text-white">
              <th className="p-3 text-left">Policy #</th>
              <th className="p-3 text-left">Insured Name</th>
              <th className="p-3 text-left">Type</th>
              <th className="p-3 text-left">Premium ($)</th>
              <th className="p-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {policies.map((policy) => (
              <tr key={policy.id} className="border-b text-gray-900 hover:bg-gray-100">
                <td className="p-3">{policy.policy_number}</td>
                <td className="p-3">{policy.insured_name}</td>
                <td className="p-3">{policy.type}</td>
                <td className="p-3">{policy.premium}</td>
                <td className="p-3">
                  <button
                    onClick={() => onEdit(policy)}
                    className="bg-yellow-500 text-white px-3 py-1 rounded-md mr-2 hover:bg-yellow-600"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => onDelete(policy.id)}
                    className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PolicyList;
