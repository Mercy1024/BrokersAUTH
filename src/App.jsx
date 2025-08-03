// import { useState } from "react";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// import "./index.css";
// const AuthSystem = () => {
//   const [isLogin, setIsLogin] = useState(true);
//   const [selectedRole, setSelectedRole] = useState("");
//   const [formData, setFormData] = useState({
//     username: "",
//     password: "",
//     confirmPassword: "",
//     firstName: "",
//     lastName: "",
//     phone: "",
//     companyName: "",
//     licenseNumber: "",
//     address: "",
//     dateOfBirth: "",
//     policyNumber: "",
//   });

//   const userRoles = [
//     { id: "admin", label: "Admin User", icon: "👤" },
//     { id: "insurance", label: "Insurance Company", icon: "🏢" },
//     { id: "client", label: "Insured Client", icon: "👨‍💼" },
//     { id: "broker", label: "Broker", icon: "🤝" },
//   ];

//   const handleInputChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const handleSubmit = async (e) => {
//   e.preventDefault();

//   if (!selectedRole) {
//     toast.error("Please select your role.");
//     return;
//   }

//   if (!formData.username || !formData.password) {
//     toast.error("Username and password are required.");
//     return;
//   }

//   const roleLoginEndpoints = {
//     admin: "http://gibsbrokersapi.newgibsonline.com/api/Users/login",
//     insurance:
//       "http://gibsbrokersapi.newgibsonline.com/api/InsCompanies/login",
//     client:
//       "http://gibsbrokersapi.newgibsonline.com/api/InsuredClients/login",
//     broker: "http://gibsbrokersapi.newgibsonline.com/api/Brokers/login",
//   };

//   const loginUrl = roleLoginEndpoints[selectedRole];

//   if (!loginUrl) {
//     toast.error("Invalid role selected.");
//     return;
//   }

//   try {
//     const res = await fetch(loginUrl, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         Accept: "*/*",
//       },
//       body: JSON.stringify({
//         username: formData.username,
//         password: formData.password,
//       }),
//     });

//     const contentType = res.headers.get("content-type") || "";

//     if (!res.ok) {
//       const errorText = contentType.includes("application/json")
//         ? (await res.json()).message
//         : await res.text(); // fallback for plain text like "Invalid credentials"
//       throw new Error(errorText || "Login failed.");
//     }

//     const data = await res.json();

//     toast.success("Login successful!");
//     console.log("Logged in:", data);

//     // Optional: save auth token
//     // localStorage.setItem("token", data.token);

//     resetForm();
//   } catch (err) {
//     console.error("Login error:", err.message);
//     toast.error(`Login error: ${err.message}`);
//   }
// };

//   const resetForm = () => {
//     setFormData({
//       username: "",
//       password: "",
//       confirmPassword: "",
//       firstName: "",
//       lastName: "",
//       phone: "",
//       companyName: "",
//       licenseNumber: "",
//       address: "",
//       dateOfBirth: "",
//       policyNumber: "",
//     });
//   };

//   const switchMode = () => {
//     setIsLogin(!isLogin);
//     resetForm();
//   };

//   const renderRoleSpecificFields = () => {
//     if (isLogin) return null;

//     switch (selectedRole) {
//       case "admin":
//         return (
//           <>
//             <div className="form-group">
//               <label>First Name</label>
//               <input
//                 type="text"
//                 name="firstName"
//                 value={formData.firstName}
//                 onChange={handleInputChange}
//                 required
//               />
//             </div>
//             <div className="form-group">
//               <label>Last Name</label>
//               <input
//                 type="text"
//                 name="lastName"
//                 value={formData.lastName}
//                 onChange={handleInputChange}
//                 required
//               />
//             </div>
//             <div className="form-group">
//               <label>Phone Number</label>
//               <input
//                 type="tel"
//                 name="phone"
//                 value={formData.phone}
//                 onChange={handleInputChange}
//                 required
//               />
//             </div>
//           </>
//         );
//       case "insurance":
//         return (
//           <>
//             <div className="form-group">
//               <label>Company Name</label>
//               <input
//                 type="text"
//                 name="companyName"
//                 value={formData.companyName}
//                 onChange={handleInputChange}
//                 required
//               />
//             </div>
//             <div className="form-group">
//               <label>License Number</label>
//               <input
//                 type="text"
//                 name="licenseNumber"
//                 value={formData.licenseNumber}
//                 onChange={handleInputChange}
//                 required
//               />
//             </div>
//             <div className="form-group">
//               <label>Business Address</label>
//               <input
//                 type="text"
//                 name="address"
//                 value={formData.address}
//                 onChange={handleInputChange}
//                 required
//               />
//             </div>
//             <div className="form-group">
//               <label>Phone Number</label>
//               <input
//                 type="tel"
//                 name="phone"
//                 value={formData.phone}
//                 onChange={handleInputChange}
//                 required
//               />
//             </div>
//           </>
//         );
//       case "client":
//         return (
//           <>
//             <div className="form-group">
//               <label>First Name</label>
//               <input
//                 type="text"
//                 name="firstName"
//                 value={formData.firstName}
//                 onChange={handleInputChange}
//                 required
//               />
//             </div>
//             <div className="form-group">
//               <label>Last Name</label>
//               <input
//                 type="text"
//                 name="lastName"
//                 value={formData.lastName}
//                 onChange={handleInputChange}
//                 required
//               />
//             </div>
//             <div className="form-group">
//               <label>Date of Birth</label>
//               <input
//                 type="date"
//                 name="dateOfBirth"
//                 value={formData.dateOfBirth}
//                 onChange={handleInputChange}
//                 required
//               />
//             </div>
//             <div className="form-group">
//               <label>Phone Number</label>
//               <input
//                 type="tel"
//                 name="phone"
//                 value={formData.phone}
//                 onChange={handleInputChange}
//                 required
//               />
//             </div>
//             <div className="form-group">
//               <label>Policy Number (if existing)</label>
//               <input
//                 type="text"
//                 name="policyNumber"
//                 value={formData.policyNumber}
//                 onChange={handleInputChange}
//                 placeholder="Optional"
//               />
//             </div>
//           </>
//         );
//       case "broker":
//         return (
//           <>
//             <div className="form-group">
//               <label>First Name</label>
//               <input
//                 type="text"
//                 name="firstName"
//                 value={formData.firstName}
//                 onChange={handleInputChange}
//                 required
//               />
//             </div>
//             <div className="form-group">
//               <label>Last Name</label>
//               <input
//                 type="text"
//                 name="lastName"
//                 value={formData.lastName}
//                 onChange={handleInputChange}
//                 required
//               />
//             </div>
//             <div className="form-group">
//               <label>Broker License Number</label>
//               <input
//                 type="text"
//                 name="licenseNumber"
//                 value={formData.licenseNumber}
//                 onChange={handleInputChange}
//                 required
//               />
//             </div>
//             <div className="form-group">
//               <label>Phone Number</label>
//               <input
//                 type="tel"
//                 name="phone"
//                 value={formData.phone}
//                 onChange={handleInputChange}
//                 required
//               />
//             </div>
//             <div className="form-group">
//               <label>Company/Agency Name</label>
//               <input
//                 type="text"
//                 name="companyName"
//                 value={formData.companyName}
//                 onChange={handleInputChange}
//                 required
//               />
//             </div>
//           </>
//         );
//       default:
//         return null;
//     }
//   };

//   return (
//     <div className="auth-container">
//       <ToastContainer position="top-center" />

//       <div className="auth-card">
//         <div className="auth-header">
//           <h1>{isLogin ? "Welcome Back" : "Create Account"}</h1>
//           <p>Insurance Management System</p>
//         </div>

//         <div className="auth-body">
//           <form onSubmit={handleSubmit}>
//             <div className="role-selection">
//               <h3>Select Your Role</h3>
//               <div className="role-grid">
//                 {userRoles.map((role) => (
//                   <div
//                     key={role.id}
//                     className={`role-option ${
//                       selectedRole === role.id ? "selected" : ""
//                     }`}
//                     onClick={() => setSelectedRole(role.id)}
//                   >
//                     <div className="role-icon">{role.icon}</div>
//                     <div className="role-label">{role.label}</div>
//                   </div>
//                 ))}
//               </div>
//             </div>

//             {selectedRole && (
//               <>
//                 <div className="form-group">
//                   <label>Username</label>
//                   <input
//                     type="username"
//                     name="username"
//                     value={formData.username}
//                     onChange={handleInputChange}
//                     required
//                     placeholder="Enter your username"
//                   />
//                 </div>

//                 <div className="form-group">
//                   <label>Password</label>
//                   <input
//                     type="password"
//                     name="password"
//                     value={formData.password}
//                     onChange={handleInputChange}
//                     required
//                     placeholder="Enter your password"
//                   />
//                 </div>

//                 {!isLogin && (
//                   <div className="form-group">
//                     <label>Confirm Password</label>
//                     <input
//                       type="password"
//                       name="confirmPassword"
//                       value={formData.confirmPassword}
//                       onChange={handleInputChange}
//                       required
//                       placeholder="Confirm your password"
//                     />
//                   </div>
//                 )}

//                 {renderRoleSpecificFields()}

//                 <button
//                   type="submit"
//                   className="auth-button"
//                   disabled={!selectedRole}
//                 >
//                   {isLogin ? "Sign In" : "Create Account"}
//                 </button>
//               </>
//             )}
//           </form>

//           <div className="auth-switch">
//             <p>
//               {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
//               <button type="button" onClick={switchMode}>
//                 {isLogin ? "Sign Up" : "Sign In"}
//               </button>
//             </p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AuthSystem;

import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./index.css";
const AuthSystem = () => {
  const [currentPage, setCurrentPage] = useState("landing"); // "landing", "login"
  const [selectedRole, setSelectedRole] = useState("");
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const userRoles = [
    {
      id: "insurance",
      label: "Insurance Company",
      icon: "🏢",
      description: "Comprehensive insurance management platform for companies",
      gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      features: [
        "Policy Management",
        "Claims Processing",
        "Analytics Dashboard",
        "Customer Portal",
      ],
    },
    {
      id: "client",
      label: "Insured Client",
      icon: "👨‍💼",
      description:
        "Easy access to your policies, claims, and insurance information",
      gradient: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
      features: [
        "View Policies",
        "File Claims",
        "Payment History",
        "Document Upload",
      ],
    },
    {
      id: "broker",
      label: "Insurance Broker",
      icon: "🤝",
      description:
        "Connect clients with the right coverage and manage your portfolio",
      gradient: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
      features: [
        "Client Management",
        "Quote Comparison",
        "Commission Tracking",
        "Lead Generation",
      ],
    },
  ];

  const handleRoleSelect = (roleId) => {
    setSelectedRole(roleId);
    setCurrentPage("login");
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!formData.username || !formData.password) {
      toast.error("Please fill in all fields");
      return;
    }

    const roleLoginEndpoints = {
      insurance:
        "http://gibsbrokersapi.newgibsonline.com/api/InsCompanies/login",
      client:
        "http://gibsbrokersapi.newgibsonline.com/api/InsuredClients/login",
      broker: "http://gibsbrokersapi.newgibsonline.com/api/Brokers/login",
    };

    const loginUrl = roleLoginEndpoints[selectedRole];

    try {
       setLoading(true);
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

      if (!res.ok) {
        throw new Error("Invalid credentials");
      }

      const data = await res.json();
      console.log(data);
      toast.success(`Login successful ${data}`);

      // Reset form
      setFormData({ username: "", password: "" });
    } catch (err) {
      toast.error(`Login error: ${err.message}`);
      setLoading(false);
    }
  };

  const goBackToLanding = () => {
    setCurrentPage("landing");
    setSelectedRole("");
    setFormData({ username: "", password: "" });
  };

  const selectedRoleData = userRoles.find((role) => role.id === selectedRole);

  return (
    <div>
      <div className="container">
        {currentPage === "landing" ? (
          <div className="landing-container">
            {/* Background Effects */}
            <div className="bg-gradient"></div>
            <div className="bg-pattern"></div>
            <div className="floating-shapes">
              <div className="shape shape-1"></div>
              <div className="shape shape-2"></div>
              <div className="shape shape-3"></div>
            </div>

            {/* Hero Section */}
            <div className="hero-section">
              <div className="hero-badge">
                🚀 Next-Generation Insurance Management
              </div>

              <div className="landing-header">
                <h1>
                  Modern Insurance <br />
                  <span className="highlight">Management System</span>
                </h1>
                <p>
                  Streamline your insurance operations with our comprehensive
                  platform. Whether you're an insurance company, broker, or
                  client, we've got the tools you need.
                </p>
              </div>

              {/* Features Preview */}
              <div className="features-preview">
                <div className="feature-item">
                  <span className="feature-icon">⚡</span>
                  <div className="feature-title">Lightning Fast</div>
                  <div className="feature-desc">
                    Instant access to all your insurance data
                  </div>
                </div>
                <div className="feature-item">
                  <span className="feature-icon">🔒</span>
                  <div className="feature-title">Secure & Safe</div>
                  <div className="feature-desc">
                    Bank-level security for your sensitive data
                  </div>
                </div>
                <div className="feature-item">
                  <span className="feature-icon">📱</span>
                  <div className="feature-title">Mobile Ready</div>
                  <div className="feature-desc">
                    Access anywhere, anytime, any device
                  </div>
                </div>
                <div className="feature-item">
                  <span className="feature-icon">🤖</span>
                  <div className="feature-title">AI Powered</div>
                  <div className="feature-desc">
                    Smart automation for better efficiency
                  </div>
                </div>
              </div>
            </div>

            {/* CTA Section */}
            <div className="cta-section">
              <h2 className="cta-title">Choose Your Role to Get Started</h2>
              <p className="cta-subtitle">
                Select your role below to access your personalized dashboard and
                experience tailored features
              </p>
            </div>

            <div className="roles-grid">
              {userRoles.map((role) => (
                <div
                  key={role.id}
                  className="role-card"
                  style={{ "--gradient": role.gradient }}
                  onClick={() => handleRoleSelect(role.id)}
                >
                  <span className="role-icon">{role.icon}</span>
                  <h3 className="role-title">{role.label}</h3>
                  <p className="role-description">{role.description}</p>

                  <ul className="role-features">
                    {role.features.map((feature, index) => (
                      <li key={index}>{feature}</li>
                    ))}
                  </ul>

                  <button className="role-button">Get Started</button>
                </div>
              ))}
            </div>

            <div className="footer-info">
              <p>
                © 2025 Insurance Management System. Secure, reliable, and
                trusted by thousands of users worldwide.
              </p>
            </div>
          </div>
        ) : (
          <div className={`login-page role-${selectedRole}`}>
            <button className="back-button" onClick={goBackToLanding}>
              ←
            </button>
            <ToastContainer position="top-right" />

            <a href="#" className="login-brand">
              <span className="brand-icon">{selectedRoleData?.icon}</span>
              <span className="brand-text">Insurance Portal</span>
            </a>

            <div className="login-container">
              <div className="login-content">
                <div className="login-header">
                  <h1 className="login-title">Sign in to your account</h1>
                </div>

                <div className="login-form">
                  <div className="form-group">
                    <label htmlFor="username">Your username</label>
                    <input
                      type="text"
                      id="username"
                      name="username"
                      value={formData.username}
                      onChange={handleInputChange}
                      placeholder="Enter your username"
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input
                      type="password"
                      id="password"
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      placeholder="••••••••"
                      required
                    />
                  </div>

                  <div className="form-extras">
                    <div className="remember-me">
                      <input id="remember" type="checkbox" />
                      <label htmlFor="remember">Remember me</label>
                    </div>
                    <a href="#" className="forgot-password">
                      Forgot password?
                    </a>
                  </div>

                  <button
                    type="button"
                    className="login-button"
                    onClick={handleLogin}
                    disabled={loading}
                  >
                    {loading ? (
                      <span className="spinner"></span>
                    ) : (
                      "Sign in"
                    )}
                  </button>

                  <p className="login-footer">
                    Need help with your account? <a href="#">Contact support</a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AuthSystem;
