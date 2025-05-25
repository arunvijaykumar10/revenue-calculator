import {
  Bell,
  Check,
  CreditCard,
  Lock,
  LogOut,
  Save,
  Shield,
  User,
} from "lucide-react";
import { SetStateAction, use, useState } from "react";
import { useNavigate } from "react-router-dom";

const SettingsPage = () => {
  const [activeTab, setActiveTab] = useState("profile");
  const [name, setName] = useState("John Doe");
  const [email, setEmail] = useState("john.doe@example.com");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [notifications, setNotifications] = useState(true);
  const [passwordChanged, setPasswordChanged] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const navigate = useNavigate();

  // Plans data - would come from API in real app
  const plans = [
    {
      id: "free",
      name: "Free",
      price: "$0",
      features: ["Basic editing", "720p exports", "5 projects"],
    },
    {
      id: "pro",
      name: "Pro",
      price: "$29/month",
      features: [
        "Advanced editing",
        "1080p exports",
        "Unlimited projects",
        "Brand kit",
        "Priority support",
      ],
    },
    {
      id: "team",
      name: "Team",
      price: "$99/month",
      features: [
        "Everything in Pro",
        "Team collaboration",
        "Admin controls",
        "API access",
      ],
    },
  ];
  const [currentPlan, setCurrentPlan] = useState("free");

  // Card information
  const [cardInfo, setCardInfo] = useState({
    number: "",
    expiry: "",
    cvc: "",
  });

  const handleSaveSettings = () => {
    // In a real app, this would send data to the server
    console.log("Saving settings...");
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  const handleUpdatePassword = () => {
    if (password && password === confirmPassword) {
      // In a real app, this would update the password
      setPasswordChanged(true);
      setPassword("");
      setConfirmPassword("");
      setTimeout(() => setPasswordChanged(false), 3000);
    }
  };

  const handleChangePlan = (planId: SetStateAction<string>) => {
    setCurrentPlan(planId);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="mx-auto px-4 py-6 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
          <button
            className="px-4 py-2 bg-blue-600 text-white rounded-md flex items-center gap-2"
            onClick={() => navigate("/dashboard")}
          >
            <Save size={18} />
            Save Changes
          </button>
        </div>
      </header>

      {/* Success message */}
      {saveSuccess && (
        <div className="fixed top-4 inset-x-0 flex justify-center">
          <div className="bg-green-500 text-white px-6 py-3 rounded-md shadow-lg flex items-center gap-2">
            <Check size={18} />
            Your settings have been saved successfully!
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="flex-1 px-4 py-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row gap-6">
            {/* Sidebar */}
            <div className="md:w-64 bg-white rounded-lg shadow overflow-hidden">
              <nav className="flex flex-col">
                <button
                  className={`flex items-center gap-3 px-4 py-3 text-left text-sm ${
                    activeTab === "profile"
                      ? "bg-blue-50 text-blue-600 font-medium"
                      : "text-gray-700 hover:bg-gray-50"
                  }`}
                  onClick={() => setActiveTab("profile")}
                >
                  <User size={18} />
                  Profile Information
                </button>
                <button
                  className={`flex items-center gap-3 px-4 py-3 text-left text-sm ${
                    activeTab === "password"
                      ? "bg-blue-50 text-blue-600 font-medium"
                      : "text-gray-700 hover:bg-gray-50"
                  }`}
                  onClick={() => setActiveTab("password")}
                >
                  <Lock size={18} />
                  Password
                </button>
                <button
                  className={`flex items-center gap-3 px-4 py-3 text-left text-sm ${
                    activeTab === "notifications"
                      ? "bg-blue-50 text-blue-600 font-medium"
                      : "text-gray-700 hover:bg-gray-50"
                  }`}
                  onClick={() => setActiveTab("notifications")}
                >
                  <Bell size={18} />
                  Notifications
                </button>
                {/* <button
                  className={`flex items-center gap-3 px-4 py-3 text-left text-sm ${
                    activeTab === "billing"
                      ? "bg-blue-50 text-blue-600 font-medium"
                      : "text-gray-700 hover:bg-gray-50"
                  }`}
                  onClick={() => setActiveTab("billing")}
                >
                  <CreditCard size={18} />
                  Billing & Plans
                </button> */}
                <button
                  className={`flex items-center gap-3 px-4 py-3 text-left text-sm ${
                    activeTab === "security"
                      ? "bg-blue-50 text-blue-600 font-medium"
                      : "text-gray-700 hover:bg-gray-50"
                  }`}
                  onClick={() => setActiveTab("security")}
                >
                  <Shield size={18} />
                  Security
                </button>
              </nav>
              <div className="border-t mt-2">
                <button className="flex items-center gap-3 px-4 py-3 text-left text-sm text-red-600 w-full hover:bg-red-50">
                  <LogOut size={18} />
                  Logout
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 bg-white rounded-lg shadow p-6">
              {/* Profile Tab */}
              {activeTab === "profile" && (
                <div>
                  <h2 className="text-lg font-medium mb-6">
                    Profile Information
                  </h2>

                  <div className="mb-6">
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      className="w-full p-2 border border-gray-300 rounded-md"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>

                  <div className="mb-6">
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      className="w-full p-2 border border-gray-300 rounded-md"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    <p className="mt-1 text-xs text-gray-500">
                      This email will be used for notifications and account
                      recovery.
                    </p>
                  </div>

                  <div className="mb-6">
                    <label
                      htmlFor="avatar"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Profile Picture
                    </label>
                    <div className="flex items-center gap-4">
                      <div className="h-16 w-16 rounded-full bg-blue-100 flex items-center justify-center text-blue-500 font-bold text-xl">
                        {name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </div>
                      <button className="px-3 py-1.5 border border-gray-300 text-sm rounded-md">
                        Upload New
                      </button>
                      <button className="px-3 py-1.5 border border-gray-300 text-sm rounded-md text-red-600">
                        Remove
                      </button>
                    </div>
                  </div>

                  <div className="mb-6">
                    <label
                      htmlFor="language"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Display Language
                    </label>
                    <select
                      id="language"
                      className="w-full p-2 border border-gray-300 rounded-md"
                    >
                      <option value="en">English</option>
                      <option value="es">Spanish</option>
                      <option value="fr">French</option>
                      <option value="de">German</option>
                    </select>
                  </div>

                  <div className="mb-6">
                    <label
                      htmlFor="timezone"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Timezone
                    </label>
                    <select
                      id="timezone"
                      className="w-full p-2 border border-gray-300 rounded-md"
                    >
                      <option value="utc">UTC (Greenwich Mean Time)</option>
                      <option value="est">Eastern Standard Time (UTC-5)</option>
                      <option value="pst">Pacific Standard Time (UTC-8)</option>
                      <option value="cet">Central European Time (UTC+1)</option>
                    </select>
                  </div>
                </div>
              )}

              {/* Password Tab */}
              {activeTab === "password" && (
                <div>
                  <h2 className="text-lg font-medium mb-6">Update Password</h2>

                  {passwordChanged && (
                    <div className="p-3 bg-green-50 border border-green-200 rounded-md text-green-700 mb-6 flex items-center gap-2">
                      <Check size={18} />
                      Your password has been successfully updated.
                    </div>
                  )}

                  <div className="mb-6">
                    <label
                      htmlFor="current-password"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Current Password
                    </label>
                    <input
                      type="password"
                      id="current-password"
                      className="w-full p-2 border border-gray-300 rounded-md"
                      placeholder="••••••••"
                    />
                  </div>

                  <div className="mb-6">
                    <label
                      htmlFor="new-password"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      New Password
                    </label>
                    <input
                      type="password"
                      id="new-password"
                      className="w-full p-2 border border-gray-300 rounded-md"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                    />
                    <p className="mt-1 text-xs text-gray-500">
                      Password must be at least 8 characters and include 1
                      symbol.
                    </p>
                  </div>

                  <div className="mb-6">
                    <label
                      htmlFor="confirm-password"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Confirm New Password
                    </label>
                    <input
                      type="password"
                      id="confirm-password"
                      className="w-full p-2 border border-gray-300 rounded-md"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="••••••••"
                    />
                    {password &&
                      confirmPassword &&
                      password !== confirmPassword && (
                        <p className="mt-1 text-xs text-red-500">
                          Passwords do not match.
                        </p>
                      )}
                  </div>

                  <button
                    className="px-4 py-2 bg-blue-600 text-white rounded-md"
                    onClick={handleUpdatePassword}
                    disabled={
                      !password ||
                      !confirmPassword ||
                      password !== confirmPassword
                    }
                  >
                    Update Password
                  </button>

                  <div className="mt-8 border-t pt-6">
                    <h3 className="text-sm font-medium text-gray-700 mb-3">
                      Forgot your password?
                    </h3>
                    <button className="text-blue-600 text-sm">
                      Send password reset email
                    </button>
                  </div>
                </div>
              )}

              {/* Notifications Tab */}
              {activeTab === "notifications" && (
                <div>
                  <h2 className="text-lg font-medium mb-6">
                    Notification Preferences
                  </h2>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
                      <div>
                        <h3 className="font-medium">Email Notifications</h3>
                        <p className="text-sm text-gray-600">
                          Receive updates and alerts via email
                        </p>
                      </div>
                      <div className="relative inline-block w-12 h-6">
                        <input
                          type="checkbox"
                          className="opacity-0 w-0 h-0"
                          checked={notifications}
                          onChange={() => setNotifications(!notifications)}
                          id="notifications-toggle"
                        />
                        <label
                          htmlFor="notifications-toggle"
                          className={`absolute cursor-pointer top-0 left-0 right-0 bottom-0 rounded-full transition-colors ${
                            notifications ? "bg-blue-500" : "bg-gray-300"
                          }`}
                        >
                          <span
                            className={`absolute bg-white w-5 h-5 rounded-full transition-transform top-0.5 ${
                              notifications
                                ? "transform translate-x-6"
                                : "left-0.5"
                            }`}
                          ></span>
                        </label>
                      </div>
                    </div>

                    {notifications && (
                      <div className="pl-6 space-y-3">
                        <div className="flex items-center">
                          <input
                            type="checkbox"
                            id="notify-render"
                            className="mr-2"
                            defaultChecked
                          />
                          <label htmlFor="notify-render" className="text-sm">
                            Video render completion
                          </label>
                        </div>
                        <div className="flex items-center">
                          <input
                            type="checkbox"
                            id="notify-comment"
                            className="mr-2"
                            defaultChecked
                          />
                          <label htmlFor="notify-comment" className="text-sm">
                            Comments on your videos
                          </label>
                        </div>
                        <div className="flex items-center">
                          <input
                            type="checkbox"
                            id="notify-share"
                            className="mr-2"
                            defaultChecked
                          />
                          <label htmlFor="notify-share" className="text-sm">
                            When someone shares your video
                          </label>
                        </div>
                        <div className="flex items-center">
                          <input
                            type="checkbox"
                            id="notify-tips"
                            className="mr-2"
                          />
                          <label htmlFor="notify-tips" className="text-sm">
                            Tips and feature updates
                          </label>
                        </div>
                      </div>
                    )}

                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
                      <div>
                        <h3 className="font-medium">Browser Notifications</h3>
                        <p className="text-sm text-gray-600">
                          Get alerts in your browser
                        </p>
                      </div>
                      <div className="relative inline-block w-12 h-6">
                        <input
                          type="checkbox"
                          className="opacity-0 w-0 h-0"
                          id="browser-toggle"
                        />
                        <label
                          htmlFor="browser-toggle"
                          className="absolute cursor-pointer top-0 left-0 right-0 bottom-0 rounded-full bg-gray-300"
                        >
                          <span className="absolute bg-white w-5 h-5 rounded-full top-0.5 left-0.5"></span>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Billing Tab */}
              {activeTab === "billing" && (
                <div>
                  <h2 className="text-lg font-medium mb-6">Billing & Plans</h2>

                  <div className="mb-8">
                    <h3 className="text-sm font-medium text-gray-700 mb-3">
                      Current Plan
                    </h3>
                    <div className="border rounded-md overflow-hidden">
                      {plans.map((plan) => (
                        <div
                          key={plan.id}
                          className={`flex justify-between items-center p-4 ${
                            plan.id === currentPlan
                              ? "bg-blue-50 border-l-4 border-blue-500"
                              : "border-b"
                          }`}
                        >
                          <div>
                            <div className="flex items-center gap-2">
                              <h4 className="font-medium">{plan.name}</h4>
                              {plan.id === currentPlan && (
                                <span className="px-2 py-0.5 bg-blue-100 text-blue-800 text-xs rounded-full">
                                  Current
                                </span>
                              )}
                            </div>
                            <p className="text-sm text-gray-600">
                              {plan.price}
                            </p>
                          </div>
                          {plan.id !== currentPlan ? (
                            <button
                              className="px-3 py-1 border border-blue-500 text-blue-500 rounded-md text-sm"
                              onClick={() => handleChangePlan(plan.id)}
                            >
                              Upgrade
                            </button>
                          ) : (
                            <button className="px-3 py-1 border border-gray-300 text-gray-500 rounded-md text-sm">
                              Manage
                            </button>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  {(currentPlan === "pro" || currentPlan === "team") && (
                    <div className="mb-8">
                      <h3 className="text-sm font-medium text-gray-700 mb-3">
                        Payment Method
                      </h3>
                      <div className="border rounded-md p-4">
                        <div className="flex justify-between items-center mb-4">
                          <div className="flex items-center gap-3">
                            <div className="h-8 w-12 bg-gray-200 rounded"></div>
                            <span>•••• •••• •••• 4242</span>
                          </div>
                          <button className="text-sm text-blue-600">
                            Edit
                          </button>
                        </div>

                        <div>
                          <h4 className="text-sm font-medium mb-2">
                            Update Payment Method
                          </h4>
                          <div className="mb-3">
                            <label className="block text-xs text-gray-600 mb-1">
                              Card Number
                            </label>
                            <input
                              type="text"
                              className="w-full p-2 border border-gray-300 rounded-md"
                              placeholder="1234 5678 9012 3456"
                              value={cardInfo.number}
                              onChange={(e) =>
                                setCardInfo({
                                  ...cardInfo,
                                  number: e.target.value,
                                })
                              }
                            />
                          </div>
                          <div className="flex gap-3">
                            <div className="flex-1">
                              <label className="block text-xs text-gray-600 mb-1">
                                Expiry Date
                              </label>
                              <input
                                type="text"
                                className="w-full p-2 border border-gray-300 rounded-md"
                                placeholder="MM/YY"
                                value={cardInfo.expiry}
                                onChange={(e) =>
                                  setCardInfo({
                                    ...cardInfo,
                                    expiry: e.target.value,
                                  })
                                }
                              />
                            </div>
                            <div className="w-1/3">
                              <label className="block text-xs text-gray-600 mb-1">
                                CVC
                              </label>
                              <input
                                type="text"
                                className="w-full p-2 border border-gray-300 rounded-md"
                                placeholder="123"
                                value={cardInfo.cvc}
                                onChange={(e) =>
                                  setCardInfo({
                                    ...cardInfo,
                                    cvc: e.target.value,
                                  })
                                }
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  <div>
                    <h3 className="text-sm font-medium text-gray-700 mb-3">
                      Billing History
                    </h3>
                    <div className="border rounded-md overflow-hidden">
                      <div className="flex justify-between items-center p-4 border-b">
                        <div>
                          <p className="font-medium">April 2023</p>
                          <p className="text-sm text-gray-600">
                            Pro Plan - Monthly
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">$29.00</p>
                          <p className="text-xs text-green-600">Paid</p>
                        </div>
                      </div>
                      <div className="flex justify-between items-center p-4 border-b">
                        <div>
                          <p className="font-medium">March 2023</p>
                          <p className="text-sm text-gray-600">
                            Pro Plan - Monthly
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">$29.00</p>
                          <p className="text-xs text-green-600">Paid</p>
                        </div>
                      </div>
                      <div className="flex justify-between items-center p-4">
                        <div>
                          <p className="font-medium">February 2023</p>
                          <p className="text-sm text-gray-600">
                            Pro Plan - Monthly
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">$29.00</p>
                          <p className="text-xs text-green-600">Paid</p>
                        </div>
                      </div>
                    </div>
                    <div className="mt-2 text-right">
                      <button className="text-sm text-blue-600">
                        View all invoices
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Security Tab */}
              {activeTab === "security" && (
                <div>
                  <h2 className="text-lg font-medium mb-6">
                    Security Settings
                  </h2>

                  <div className="space-y-6">
                    <div>
                      <h3 className="text-sm font-medium text-gray-700 mb-3">
                        Two-Factor Authentication
                      </h3>
                      <div className="p-4 border rounded-md">
                        <div className="flex justify-between items-center">
                          <div>
                            <p className="font-medium">
                              Protect your account with 2FA
                            </p>
                            <p className="text-sm text-gray-600">
                              Add an extra layer of security to your account
                            </p>
                          </div>
                          <button className="px-3 py-1.5 bg-blue-600 text-white rounded-md text-sm">
                            Enable
                          </button>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-sm font-medium text-gray-700 mb-3">
                        Active Sessions
                      </h3>
                      <div className="border rounded-md overflow-hidden">
                        <div className="flex justify-between items-center p-4 border-b">
                          <div className="flex gap-3">
                            <div className="h-8 w-8 bg-gray-200 rounded-full flex items-center justify-center">
                              <svg
                                className="h-4 w-4 text-gray-500"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                                />
                              </svg>
                            </div>
                            <div>
                              <p className="font-medium">Chrome on MacOS</p>
                              <p className="text-xs text-gray-500">
                                New York, USA (Current)
                              </p>
                            </div>
                          </div>
                          <span className="px-2 py-0.5 bg-green-100 text-green-800 text-xs rounded-full">
                            Active Now
                          </span>
                        </div>
                        <div className="flex justify-between items-center p-4">
                          <div className="flex gap-3">
                            <div className="h-8 w-8 bg-gray-200 rounded-full flex items-center justify-center">
                              <svg
                                className="h-4 w-4 text-gray-500"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"
                                />
                              </svg>
                            </div>
                            <div>
                              <p className="font-medium">Safari on iPhone</p>
                              <p className="text-xs text-gray-500">
                                Last active: April 28, 2023
                              </p>
                            </div>
                          </div>
                          <button className="text-sm text-red-600">
                            Revoke
                          </button>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-sm font-medium text-gray-700 mb-3">
                        Login History
                      </h3>
                      <div className="border rounded-md overflow-hidden">
                        <div className="flex justify-between items-center p-4 border-b">
                          <div>
                            <p className="font-medium">Today at 10:32 AM</p>
                            <p className="text-xs text-gray-500">
                              Chrome on MacOS • New York, USA
                            </p>
                          </div>
                          <span className="px-2 py-0.5 bg-blue-100 text-blue-800 text-xs rounded-full">
                            Success
                          </span>
                        </div>
                        <div className="flex justify-between items-center p-4 border-b">
                          <div>
                            <p className="font-medium">
                              April 27, 2023 at 6:18 PM
                            </p>
                            <p className="text-xs text-gray-500">
                              Safari on iPhone • New York, USA
                            </p>
                          </div>
                          <span className="px-2 py-0.5 bg-blue-100 text-blue-800 text-xs rounded-full">
                            Success
                          </span>
                        </div>
                        <div className="flex justify-between items-center p-4">
                          <div>
                            <p className="font-medium">
                              April 26, 2023 at 3:44 PM
                            </p>
                            <p className="text-xs text-gray-500">
                              Chrome on MacOS • Chicago, USA
                            </p>
                          </div>
                          <span className="px-2 py-0.5 bg-blue-100 text-blue-800 text-xs rounded-full">
                            Success
                          </span>
                        </div>
                      </div>
                      <div className="mt-2 text-right">
                        <button className="text-sm text-blue-600">
                          View full history
                        </button>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-sm font-medium text-gray-700 mb-3">
                        Account Actions
                      </h3>
                      <div className="p-4 border rounded-md bg-red-50 border-red-200">
                        <p className="font-medium text-red-600 mb-2">
                          Danger Zone
                        </p>
                        <p className="text-sm text-gray-700 mb-4">
                          Permanently delete your account and all of your
                          content.
                        </p>
                        <button className="px-3 py-1.5 bg-white border border-red-500 text-red-600 rounded-md text-sm">
                          Delete Account
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default SettingsPage;
