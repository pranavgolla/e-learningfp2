import React, { useState, useEffect } from "react";
import Header from "./Header";

const Users = () => {
  const [name, setName] = useState("");
  const [className, setClassName] = useState("");
  const [rollNo, setRollNo] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [users, setUsers] = useState([]);
  const [updateUserId, setUpdateUserId] = useState(null); // For tracking user to update

  // Fetch users on component mount
  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await fetch("http://localhost:4001/admin/get-users");
      if (!response.ok) {
        throw new Error("Failed to fetch users");
      }
      const data = await response.json();
      setUsers(data); // Set the fetched users
    } catch (error) {
      console.error("Error fetching users:", error);
      setError("Failed to fetch users.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateEmail(email)) {
      setError("Invalid email format.");
      return;
    }
    
    try {
      const newUser = { name, class: className, rollNo, email, password };
     
      const response = await fetch(
        `http://localhost:4001/admin/${
          updateUserId ? `update-user/${updateUserId}` : "add-user"
        }`,
        {
          method: updateUserId ? "PUT" : "POST", // PUT for update and POST for add
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newUser),
        }
      );
      

      if (!response.ok) {
        const errorMessage = await response.text(); // Get the error message from the server response
        throw new Error(updateUserId ? `Failed to update user: ${errorMessage}` : `Failed to add user: ${errorMessage}`);
      }

      // Clear the form after successful addition or update
      resetForm();
      await fetchUsers(); // Re-fetch users to include the newly added or updated user
    } catch (error) {
      console.error("Error during adding/updating user:", error);
      setError("An unexpected error occurred. Please try again later.");
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:4001/admin/delete-user/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete user");
      }

      await fetchUsers(); // Re-fetch users after deletion
    } catch (error) {
      console.error("Error during deleting user:", error);
      setError("Failed to delete user.");
    }
  };

  const handleUpdate = (user) => {
    setName(user.name);
    setClassName(user.class);
    setRollNo(user.rollNo);
    setEmail(user.email);
    setPassword(user.password);
    setUpdateUserId(user._id); // Set the ID of the user to update
  };

  const resetForm = () => {
    setName("");
    setClassName("");
    setRollNo("");
    setEmail("");
    setPassword("");
    setError(null);
    setUpdateUserId(null); // Reset update user ID
  };

  const validateEmail = (email) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  };

  // Styling
  const containerStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "20px",
    backgroundColor: "#F9F9F9",
    minHeight: "100vh",
  };

  const buttonStyle = {
    margin: "5px",
    padding: "10px 15px",
    backgroundColor: "#4CAF50",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    transition: "background-color 0.3s ease",
  };

  const deleteButtonStyle = {
    ...buttonStyle,
    backgroundColor: "#f44336", // Red for delete
  };

  const inputStyle = {
    width: "100%",
    padding: "12px 15px",
    border: "1px solid #ccc",
    borderRadius: "4px",
    marginBottom: "10px",
    fontSize: "16px",
    transition: "border-color 0.3s ease",
  };

  const inputFocusStyle = {
    ...inputStyle,
    borderColor: "#4CAF50", // Change border color on focus
  };

  return (
    <div style={containerStyle}>
      <Header />
      <div className="login-container" style={{ display: "flex",flexDirection:"row", justifyContent:"space-around", width: "100%" }}>

          <div>
            <h2 className="login-heading">{updateUserId ? "Update Student" : "Add Student"}</h2>
            <form onSubmit={handleSubmit} className="login-form">
              <div className="form-group">
                <label htmlFor="name" className="form-label">Name:</label>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  style={inputStyle}
                  onFocus={(e) => (e.target.style.borderColor = inputFocusStyle.borderColor)}
                  onBlur={(e) => (e.target.style.borderColor = "#ccc")} // Reset on blur
                  aria-label="Name"
                />
              </div>
              <div className="form-group">
                <label htmlFor="class" className="form-label">Class:</label>
                <input
                  type="text"
                  id="class"
                  value={className}
                  onChange={(e) => setClassName(e.target.value)}
                  required
                  style={inputStyle}
                  onFocus={(e) => (e.target.style.borderColor = inputFocusStyle.borderColor)}
                  onBlur={(e) => (e.target.style.borderColor = "#ccc")}
                  aria-label="Class"
                />
              </div>
              <div className="form-group">
                <label htmlFor="rollNo" className="form-label">Roll No:</label>
                <input
                  type="text"
                  id="rollNo"
                  value={rollNo}
                  onChange={(e) => setRollNo(e.target.value)}
                  required
                  style={inputStyle}
                  onFocus={(e) => (e.target.style.borderColor = inputFocusStyle.borderColor)}
                  onBlur={(e) => (e.target.style.borderColor = "#ccc")}
                  aria-label="Roll No"
                />
              </div>
              <div className="form-group">
                <label htmlFor="email" className="form-label">Email:</label>
                <input
                  type="text"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  style={inputStyle}
                  onFocus={(e) => (e.target.style.borderColor = inputFocusStyle.borderColor)}
                  onBlur={(e) => (e.target.style.borderColor = "#ccc")}
                  aria-label="Email Address"
                />
              </div>
              <div className="form-group">
                <label htmlFor="password" className="form-label">Password:</label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  style={inputStyle}
                  onFocus={(e) => (e.target.style.borderColor = inputFocusStyle.borderColor)}
                  onBlur={(e) => (e.target.style.borderColor = "#ccc")}
                  aria-label="Password"
                />
              </div>
              {error && <div className="error-message" style={{ color: 'red' }}>{error}</div>}
              <div className="button-group">
                <button type="submit" style={buttonStyle}>
                  {updateUserId ? "Update Student" : "Add Student"}
                </button>
              </div>
            </form>
          </div>

          {/* Display Users List */}
          <div>
            <h3>Student List</h3>
            <ul>
              {users.map((user) => (
                <li key={user._id} style={{ marginBottom: "10px" }}>
                  Name: {user.name}, Class: {user.class}, Roll No: {user.rollNo}, Email: {user.email}
                  <div style={{ display: "inline-block", marginLeft: "10px" }}>
                    <button
                      style={buttonStyle}
                      onClick={() => handleUpdate(user)}
                      aria-label={`Update ${user.name}`}
                    >
                      Update
                    </button>
                    <button
                      style={deleteButtonStyle}
                      onClick={() => handleDelete(user._id)}
                      aria-label={`Delete ${user.name}`}
                    >
                      Delete
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>

        
      </div>
    </div>
  );
};

export default Users;
