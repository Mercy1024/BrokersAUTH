import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "./index.css";
const AuthSystem = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [selectedRole, setSelectedRole] = useState("");
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    confirmPassword: "",
    firstName: "",
    lastName: "",
    phone: "",
    companyName: "",
    licenseNumber: "",
    address: "",
    dateOfBirth: "",
    policyNumber: "",
  });

  const userRoles = [
    { id: "admin", label: "Admin User", icon: "👤" },
    { id: "insurance", label: "Insurance Company", icon: "🏢" },
    { id: "client", label: "Insured Client", icon: "👨‍💼" },
    { id: "broker", label: "Broker", icon: "🤝" },
  ];

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  if (!selectedRole) {
    toast.error("Please select your role.");
    return;
  }

  if (!formData.username || !formData.password) {
    toast.error("Username and password are required.");
    return;
  }

  const roleLoginEndpoints = {
    admin: "http://gibsbrokersapi.newgibsonline.com/api/Users/login",
    insurance:
      "http://gibsbrokersapi.newgibsonline.com/api/InsCompanies/login",
    client:
      "http://gibsbrokersapi.newgibsonline.com/api/InsuredClients/login",
    broker: "http://gibsbrokersapi.newgibsonline.com/api/Brokers/login",
  };

  const loginUrl = roleLoginEndpoints[selectedRole];

  if (!loginUrl) {
    toast.error("Invalid role selected.");
    return;
  }

  try {
    const res = await fetch(loginUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "*/*",
      },
      body: JSON.stringify({
        username: formData.username,
        password: formData.password,
      }),
    });

    const contentType = res.headers.get("content-type") || "";

    if (!res.ok) {
      const errorText = contentType.includes("application/json")
        ? (await res.json()).message
        : await res.text(); // fallback for plain text like "Invalid credentials"
      throw new Error(errorText || "Login failed.");
    }

    const data = await res.json();

    toast.success("Login successful!");
    console.log("Logged in:", data);

    // Optional: save auth token
    // localStorage.setItem("token", data.token);

    resetForm();
  } catch (err) {
    console.error("Login error:", err.message);
    toast.error(`Login error: ${err.message}`);
  }
};

  const resetForm = () => {
    setFormData({
      username: "",
      password: "",
      confirmPassword: "",
      firstName: "",
      lastName: "",
      phone: "",
      companyName: "",
      licenseNumber: "",
      address: "",
      dateOfBirth: "",
      policyNumber: "",
    });
  };

  const switchMode = () => {
    setIsLogin(!isLogin);
    resetForm();
  };

  const renderRoleSpecificFields = () => {
    if (isLogin) return null;

    switch (selectedRole) {
      case "admin":
        return (
          <>
            <div className="form-group">
              <label>First Name</label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Last Name</label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Phone Number</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                required
              />
            </div>
          </>
        );
      case "insurance":
        return (
          <>
            <div className="form-group">
              <label>Company Name</label>
              <input
                type="text"
                name="companyName"
                value={formData.companyName}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label>License Number</label>
              <input
                type="text"
                name="licenseNumber"
                value={formData.licenseNumber}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Business Address</label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Phone Number</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                required
              />
            </div>
          </>
        );
      case "client":
        return (
          <>
            <div className="form-group">
              <label>First Name</label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Last Name</label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Date of Birth</label>
              <input
                type="date"
                name="dateOfBirth"
                value={formData.dateOfBirth}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Phone Number</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Policy Number (if existing)</label>
              <input
                type="text"
                name="policyNumber"
                value={formData.policyNumber}
                onChange={handleInputChange}
                placeholder="Optional"
              />
            </div>
          </>
        );
      case "broker":
        return (
          <>
            <div className="form-group">
              <label>First Name</label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Last Name</label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Broker License Number</label>
              <input
                type="text"
                name="licenseNumber"
                value={formData.licenseNumber}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Phone Number</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Company/Agency Name</label>
              <input
                type="text"
                name="companyName"
                value={formData.companyName}
                onChange={handleInputChange}
                required
              />
            </div>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div className="auth-container">
      <ToastContainer position="top-center" />

      <div className="auth-card">
        <div className="auth-header">
          <h1>{isLogin ? "Welcome Back" : "Create Account"}</h1>
          <p>Insurance Management System</p>
        </div>

        <div className="auth-body">
          <form onSubmit={handleSubmit}>
            <div className="role-selection">
              <h3>Select Your Role</h3>
              <div className="role-grid">
                {userRoles.map((role) => (
                  <div
                    key={role.id}
                    className={`role-option ${
                      selectedRole === role.id ? "selected" : ""
                    }`}
                    onClick={() => setSelectedRole(role.id)}
                  >
                    <div className="role-icon">{role.icon}</div>
                    <div className="role-label">{role.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {selectedRole && (
              <>
                <div className="form-group">
                  <label>Username</label>
                  <input
                    type="username"
                    name="username"
                    value={formData.username}
                    onChange={handleInputChange}
                    required
                    placeholder="Enter your username"
                  />
                </div>

                <div className="form-group">
                  <label>Password</label>
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    required
                    placeholder="Enter your password"
                  />
                </div>

                {!isLogin && (
                  <div className="form-group">
                    <label>Confirm Password</label>
                    <input
                      type="password"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      required
                      placeholder="Confirm your password"
                    />
                  </div>
                )}

                {renderRoleSpecificFields()}

                <button
                  type="submit"
                  className="auth-button"
                  disabled={!selectedRole}
                >
                  {isLogin ? "Sign In" : "Create Account"}
                </button>
              </>
            )}
          </form>

          <div className="auth-switch">
            <p>
              {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
              <button type="button" onClick={switchMode}>
                {isLogin ? "Sign Up" : "Sign In"}
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthSystem;