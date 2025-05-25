import { useState } from "react";
import { Eye, EyeOff, ArrowLeft, Mail, Lock, User } from "lucide-react";
import { useNavigate } from "react-router-dom";

const AuthPages = () => {
  const [activeTab, setActiveTab] = useState("login");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Form states
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
  const [emailValid, setEmailValid] = useState(true);
  const [passwordValid, setPasswordValid] = useState(true);
  const [confirmPasswordValid, setConfirmPasswordValid] = useState(true);
  const navigate = useNavigate();
  // Validation functions
  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isValid = re.test(email);
    setEmailValid(isValid);
    return isValid;
  };

  const validatePassword = (password: string) => {
    // Min 8 characters, at least 1 symbol
    const re = /^(?=.*[!@#$%^&*(),.?":{}|<>]).{8,}$/;
    const isValid = re.test(password);
    setPasswordValid(isValid);
    return isValid;
  };

  const validateConfirmPassword = (confirmPassword: string) => {
    const isValid = confirmPassword === password;
    setConfirmPasswordValid(isValid);
    return isValid;
  };

  // Handle form submissions
  const handleLogin = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    const isEmailValid = validateEmail(email);
    const isPasswordValid = validatePassword(password);

    if (isEmailValid && isPasswordValid) {
      // Process login
      console.log("Login successful:", { email, password });
    }
  };

  const handleSignup = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    const isEmailValid = validateEmail(email);
    const isPasswordValid = validatePassword(password);
    const isConfirmPasswordValid = validateConfirmPassword(confirmPassword);

    if (isEmailValid && isPasswordValid && isConfirmPasswordValid) {
      // Process signup
      console.log("Signup successful:", { name, email, password });
    }
  };

  const handleForgotPassword = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    const isEmailValid = validateEmail(email);

    if (isEmailValid) {
      // Process forgot password
      console.log("Password reset email sent to:", email);
      // Show success message
      alert(
        "If your email exists in our system, you will receive a reset link shortly."
      );
    }
  };

  // Switch between tabs
  const renderLoginForm = () => (
    <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
        Log In
      </h2>

      <form onSubmit={handleLogin}>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-medium mb-2"
            htmlFor="email"
          >
            Email
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Mail size={18} className="text-gray-400" />
            </div>
            <input
              id="email"
              type="email"
              className={`w-full pl-10 pr-3 py-2 border ${
                !emailValid ? "border-red-500" : "border-gray-300"
              } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onBlur={() => validateEmail(email)}
              required
            />
          </div>
          {!emailValid && (
            <p className="mt-1 text-xs text-red-500">
              Please enter a valid email address
            </p>
          )}
        </div>

        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <label
              className="block text-gray-700 text-sm font-medium"
              htmlFor="password"
            >
              Password
            </label>
            <button
              type="button"
              className="text-sm text-blue-600 hover:text-blue-800"
              onClick={() => setActiveTab("forgot")}
            >
              Forgot password?
            </button>
          </div>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Lock size={18} className="text-gray-400" />
            </div>
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              className={`w-full pl-10 pr-10 py-2 border ${
                !passwordValid ? "border-red-500" : "border-gray-300"
              } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onBlur={() => validatePassword(password)}
              required
            />
            <button
              type="button"
              className="absolute inset-y-0 right-0 pr-3 flex items-center"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <EyeOff size={18} className="text-gray-400" />
              ) : (
                <Eye size={18} className="text-gray-400" />
              )}
            </button>
          </div>
          {!passwordValid && (
            <p className="mt-1 text-xs text-red-500">
              Password must be at least 8 characters with 1 symbol
            </p>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
          onClick={() => navigate("/dashboard")}
        >
          Log In
        </button>
      </form>

      <div className="mt-6 text-center">
        <p className="text-sm text-gray-600">
          Don't have an account?{" "}
          <button
            className="text-blue-600 hover:text-blue-800 font-medium"
            onClick={() => setActiveTab("signup")}
          >
            Sign up
          </button>
        </p>
      </div>
    </div>
  );

  const renderSignupForm = () => (
    <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
        Create an Account
      </h2>

      <form onSubmit={handleSignup}>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-medium mb-2"
            htmlFor="name"
          >
            Full Name
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <User size={18} className="text-gray-400" />
            </div>
            <input
              id="name"
              type="text"
              className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="John Doe"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
        </div>

        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-medium mb-2"
            htmlFor="signup-email"
          >
            Email
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Mail size={18} className="text-gray-400" />
            </div>
            <input
              id="signup-email"
              type="email"
              className={`w-full pl-10 pr-3 py-2 border ${
                !emailValid ? "border-red-500" : "border-gray-300"
              } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onBlur={() => validateEmail(email)}
              required
            />
          </div>
          {!emailValid && (
            <p className="mt-1 text-xs text-red-500">
              Please enter a valid email address
            </p>
          )}
        </div>

        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-medium mb-2"
            htmlFor="signup-password"
          >
            Password
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Lock size={18} className="text-gray-400" />
            </div>
            <input
              id="signup-password"
              type={showPassword ? "text" : "password"}
              className={`w-full pl-10 pr-10 py-2 border ${
                !passwordValid ? "border-red-500" : "border-gray-300"
              } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onBlur={() => validatePassword(password)}
              required
            />
            <button
              type="button"
              className="absolute inset-y-0 right-0 pr-3 flex items-center"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <EyeOff size={18} className="text-gray-400" />
              ) : (
                <Eye size={18} className="text-gray-400" />
              )}
            </button>
          </div>
          {!passwordValid && (
            <p className="mt-1 text-xs text-red-500">
              Password must be at least 8 characters with 1 symbol
            </p>
          )}
        </div>

        <div className="mb-6">
          <label
            className="block text-gray-700 text-sm font-medium mb-2"
            htmlFor="confirm-password"
          >
            Confirm Password
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Lock size={18} className="text-gray-400" />
            </div>
            <input
              id="confirm-password"
              type={showConfirmPassword ? "text" : "password"}
              className={`w-full pl-10 pr-10 py-2 border ${
                !confirmPasswordValid ? "border-red-500" : "border-gray-300"
              } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
              placeholder="••••••••"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              onBlur={() => validateConfirmPassword(confirmPassword)}
              required
            />
            <button
              type="button"
              className="absolute inset-y-0 right-0 pr-3 flex items-center"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? (
                <EyeOff size={18} className="text-gray-400" />
              ) : (
                <Eye size={18} className="text-gray-400" />
              )}
            </button>
          </div>
          {!confirmPasswordValid && (
            <p className="mt-1 text-xs text-red-500">Passwords do not match</p>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
        >
          Create Account
        </button>
      </form>

      <div className="mt-6 text-center">
        <p className="text-sm text-gray-600">
          Already have an account?{" "}
          <button
            className="text-blue-600 hover:text-blue-800 font-medium"
            onClick={() => setActiveTab("login")}
          >
            Log in
          </button>
        </p>
      </div>
    </div>
  );

  const renderForgotPasswordForm = () => (
    <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md">
      <div className="flex items-center mb-6">
        <button
          className="mr-2 text-gray-600 hover:text-gray-800"
          onClick={() => setActiveTab("login")}
        >
          <ArrowLeft size={20} />
        </button>
        <h2 className="text-2xl font-bold text-gray-800">Reset Password</h2>
      </div>

      <p className="text-gray-600 mb-6">
        Enter your email address and we'll send you a link to reset your
        password.
      </p>

      <form onSubmit={handleForgotPassword}>
        <div className="mb-6">
          <label
            className="block text-gray-700 text-sm font-medium mb-2"
            htmlFor="forgot-email"
          >
            Email
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Mail size={18} className="text-gray-400" />
            </div>
            <input
              id="forgot-email"
              type="email"
              className={`w-full pl-10 pr-3 py-2 border ${
                !emailValid ? "border-red-500" : "border-gray-300"
              } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onBlur={() => validateEmail(email)}
              required
            />
          </div>
          {!emailValid && (
            <p className="mt-1 text-xs text-red-500">
              Please enter a valid email address
            </p>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
        >
          Send Reset Link
        </button>
      </form>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center p-4">
      <div className="w-full max-w-md mb-8">
        <div className="font-bold text-2xl text-blue-600  h-10 mx-auto mb-6">
          Venrollment
        </div>
        {activeTab === "login" && renderLoginForm()}
        {activeTab === "signup" && renderSignupForm()}
        {activeTab === "forgot" && renderForgotPasswordForm()}
      </div>
    </div>
  );
};

export default AuthPages;
