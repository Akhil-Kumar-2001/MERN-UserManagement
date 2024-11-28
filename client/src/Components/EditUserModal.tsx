import React, { useState } from "react";

interface EditUserModalProps {
  username: string;
  email: string;
  id: string;
  onClose: () => void;
  onUserUpdated: (updatedUser: any) => void;
}

const EditUserModal: React.FC<EditUserModalProps> = ({
  username,
  email,
  id,
  onClose,
  onUserUpdated,
}) => {
  const [newUsername, setNewUsername] = useState(username);
  const [newEmail, setNewEmail] = useState(email);
  const [error, setError] = useState<string | null>(null);

  const handleUpdateUser = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:3321/api/admin/edit-user/${id}`, {
        method: "PUT",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: newUsername,
          email: newEmail,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to update user");
      }

      onUserUpdated(data); // Update user in parent state
      onClose();
    } catch (error) {
      console.error("Error updating user:", error);
      setError(error instanceof Error ? error.message : "An unknown error occurred");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-slate-800 p-6 rounded-lg w-96">
        <h2 className="text-2xl font-bold mb-4 text-gray-200">Edit User</h2>

        {error && (
          <div className="bg-red-600 text-white p-3 rounded mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleUpdateUser}>
          <div className="mb-4">
            <label className="block text-gray-300 mb-2">Username</label>
            <input
              type="text"
              value={newUsername}
              onChange={(e) => setNewUsername(e.target.value)}
              className="w-full p-2 rounded bg-gray-700 text-gray-200"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-300 mb-2">Email</label>
            <input
              type="email"
              value={newEmail}
              onChange={(e) => setNewEmail(e.target.value)}
              className="w-full p-2 rounded bg-gray-700 text-gray-200"
              required
            />
          </div>

          <div className="flex justify-between">
            <button
              type="submit"
              className="bg-teal-500 px-4 py-2 rounded hover:bg-teal-600 transition duration-300"
            >
              Update User
            </button>
            <button
              type="button"
              onClick={onClose}
              className="bg-red-500 px-4 py-2 rounded hover:bg-red-600 transition duration-300"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditUserModal;
