import { SetStateAction, useState } from "react";
import {
  Shield,
  Users,
  UserPlus,
  Search,
  Eye,
  Edit,
  Trash,
  CheckSquare,
  Square,
  ChevronDown,
  ChevronUp,
  Lock,
  Info,
  AlertTriangle,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const RBACManagement = () => {
  const [activeTab, setActiveTab] = useState("users");
  const [expandedRole, setExpandedRole] = useState("plan_advisor");
  const [showAddUserModal, setShowAddUserModal] = useState(false);
  const [showPermissionDetails, setShowPermissionDetails] = useState(false);
  const [selectedPermission, setSelectedPermission] = useState(null);
  const navigate = useNavigate();

  const roles = [
    {
      id: "plan_advisor",
      name: "Plan Advisor",
      description: "Manages retirement plans and client relationships",
      userCount: 15,
      permissionCount: 24,
      color: "blue",
    },
    {
      id: "broker",
      name: "Broker",
      description: "Sells and manages benefit plans for clients",
      userCount: 32,
      permissionCount: 18,
      color: "green",
    },
  ];

  const permissionCategories = [
    {
      name: "Content Management",
      permissions: [
        {
          id: "create_videos",
          name: "Create Videos",
          planAdvisor: true,
          broker: true,
        },
        {
          id: "edit_videos",
          name: "Edit Videos",
          planAdvisor: true,
          broker: true,
        },
        {
          id: "delete_videos",
          name: "Delete Videos",
          planAdvisor: true,
          broker: false,
        },
        {
          id: "manage_assets",
          name: "Manage Assets",
          planAdvisor: true,
          broker: true,
        },
      ],
    },
    {
      name: "Client Management",
      permissions: [
        {
          id: "view_clients",
          name: "View Clients",
          planAdvisor: true,
          broker: true,
        },
        {
          id: "add_clients",
          name: "Add Clients",
          planAdvisor: true,
          broker: true,
        },
        {
          id: "delete_clients",
          name: "Delete Clients",
          planAdvisor: true,
          broker: false,
        },
        {
          id: "view_client_analytics",
          name: "View Client Analytics",
          planAdvisor: true,
          broker: true,
        },
      ],
    },
    {
      name: "Brand Management",
      permissions: [
        {
          id: "edit_brand_kit",
          name: "Edit Brand Kit",
          planAdvisor: true,
          broker: false,
        },
        {
          id: "view_brand_kit",
          name: "View Brand Kit",
          planAdvisor: true,
          broker: true,
        },
      ],
    },
    {
      name: "User Management",
      permissions: [
        {
          id: "invite_users",
          name: "Invite Users",
          planAdvisor: true,
          broker: false,
        },
        {
          id: "manage_users",
          name: "Manage Users",
          planAdvisor: true,
          broker: false,
        },
        { id: "view_team", name: "View Team", planAdvisor: true, broker: true },
      ],
    },
    {
      name: "Settings",
      permissions: [
        {
          id: "manage_account",
          name: "Manage Account",
          planAdvisor: true,
          broker: false,
        },
        {
          id: "change_billing",
          name: "Change Billing",
          planAdvisor: true,
          broker: false,
        },
        {
          id: "view_analytics",
          name: "View Analytics",
          planAdvisor: true,
          broker: true,
        },
      ],
    },
  ];

  const users = [
    {
      id: 1,
      name: "John Smith",
      email: "john@example.com",
      role: "plan_advisor",
      lastActive: "2025-04-27",
    },
    {
      id: 2,
      name: "Emily Jones",
      email: "emily@example.com",
      role: "plan_advisor",
      lastActive: "2025-04-26",
    },
    {
      id: 3,
      name: "Michael Brown",
      email: "michael@example.com",
      role: "broker",
      lastActive: "2025-04-28",
    },
    {
      id: 4,
      name: "Sarah Wilson",
      email: "sarah@example.com",
      role: "broker",
      lastActive: "2025-04-28",
    },
    {
      id: 5,
      name: "David Taylor",
      email: "david@example.com",
      role: "broker",
      lastActive: "2025-04-25",
    },
    {
      id: 6,
      name: "Jennifer Davis",
      email: "jennifer@example.com",
      role: "plan_advisor",
      lastActive: "2025-04-27",
    },
  ];

  const toggleRole = (roleId: SetStateAction<string>) => {
    if (expandedRole === roleId) {
      setExpandedRole(null);
    } else {
      setExpandedRole(roleId);
    }
  };

  const handlePermissionClick = (permission: SetStateAction<null>) => {
    setSelectedPermission(permission);
    setShowPermissionDetails(true);
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex justify-between items-center">
          <h1 className="text-xl font-semibold text-gray-800">
            Role & Permissions Management
          </h1>
          <div className="flex space-x-3">
            <button className="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-md flex items-center hover:bg-gray-50">
              <Lock size={18} className="mr-2" />
              Audit Log
            </button>
            <button
              className="bg-blue-600 text-white px-4 py-2 rounded-md flex items-center"
              onClick={() => setShowAddUserModal(true)}
            >
              <UserPlus size={18} className="mr-2" />
              Add User
            </button>
            <button
              className="bg-blue-600 text-white px-4 py-2 rounded-md flex items-center"
              onClick={() => navigate("/dashboard")}
            >
              <CheckSquare size={18} className="mr-2" />
              Done
            </button>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white border-b border-gray-200 px-6">
        <div className="flex space-x-1">
          <button
            className={`px-4 py-3 font-medium text-sm flex items-center ${
              activeTab === "users"
                ? "text-blue-600 border-b-2 border-blue-500"
                : "text-gray-500 hover:text-gray-700"
            }`}
            onClick={() => setActiveTab("users")}
          >
            <Users size={18} className="mr-2" />
            Users & Assignments
          </button>
          <button
            className={`px-4 py-3 font-medium text-sm flex items-center ${
              activeTab === "roles"
                ? "text-blue-600 border-b-2 border-blue-500"
                : "text-gray-500 hover:text-gray-700"
            }`}
            onClick={() => setActiveTab("roles")}
          >
            <Shield size={18} className="mr-2" />
            Roles & Permissions
          </button>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 p-6 overflow-auto">
        {/* Roles & Permissions Tab */}
        {activeTab === "roles" && (
          <div>
            <div className="mb-6">
              <p className="text-gray-600">
                Manage access control by configuring permissions for each role
                in your organization.
              </p>
            </div>

            {/* Role Cards */}
            <div className="space-y-4">
              {roles.map((role) => (
                <div
                  key={role.id}
                  className="bg-white rounded-lg border border-gray-200 overflow-hidden"
                >
                  {/* Role header */}
                  <div
                    className={`px-6 py-4 flex items-center justify-between cursor-pointer ${
                      expandedRole === role.id ? `bg-${role.color}-50` : ""
                    }`}
                    onClick={() => toggleRole(role.id)}
                  >
                    <div className="flex items-center">
                      <div
                        className={`w-10 h-10 rounded-full bg-${role.color}-100 flex items-center justify-center mr-4`}
                      >
                        <Shield
                          size={20}
                          className={`text-${role.color}-600`}
                        />
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-900">
                          {role.name}
                        </h3>
                        <p className="text-sm text-gray-500">
                          {role.description}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-8">
                      <div className="text-center">
                        <p className="text-sm text-gray-500">Users</p>
                        <p className="font-semibold text-gray-900">
                          {role.userCount}
                        </p>
                      </div>
                      <div className="text-center">
                        <p className="text-sm text-gray-500">Permissions</p>
                        <p className="font-semibold text-gray-900">
                          {role.permissionCount}
                        </p>
                      </div>
                      <div>
                        {expandedRole === role.id ? (
                          <ChevronUp size={20} className="text-gray-500" />
                        ) : (
                          <ChevronDown size={20} className="text-gray-500" />
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Expanded permissions */}
                  {expandedRole === role.id && (
                    <div className="border-t border-gray-200 px-6 py-4">
                      {permissionCategories.map((category, idx) => (
                        <div
                          key={category.name}
                          className={idx > 0 ? "mt-6" : ""}
                        >
                          <h4 className="font-medium text-gray-900 mb-3">
                            {category.name}
                          </h4>
                          <div className="space-y-2">
                            {category.permissions.map((permission) => (
                              <div
                                key={permission.id}
                                className="flex items-center justify-between p-3 rounded-md hover:bg-gray-50 cursor-pointer"
                                onClick={() =>
                                  handlePermissionClick(permission)
                                }
                              >
                                <div className="flex items-center">
                                  {role.id === "plan_advisor" &&
                                  permission.planAdvisor ? (
                                    <CheckSquare
                                      size={18}
                                      className="text-blue-600 mr-3"
                                    />
                                  ) : role.id === "broker" &&
                                    permission.broker ? (
                                    <CheckSquare
                                      size={18}
                                      className="text-green-600 mr-3"
                                    />
                                  ) : (
                                    <Square
                                      size={18}
                                      className="text-gray-400 mr-3"
                                    />
                                  )}
                                  <span className="text-gray-700">
                                    {permission.name}
                                  </span>
                                </div>
                                <div className="flex items-center text-gray-500">
                                  <Info size={16} />
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}

                      <div className="mt-6 flex justify-end">
                        <button
                          className="bg-blue-600 text-white px-4 py-2 rounded-md"
                          onClick={() => navigate("/dashboard")}
                        >
                          Save Changes
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Users & Assignments Tab */}
        {activeTab === "users" && (
          <div>
            <div className="mb-6 flex items-center justify-between">
              <p className="text-gray-600">
                Manage users and assign roles to control their access level in
                the system.
              </p>
              <div className="w-64 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search size={18} className="text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search users..."
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>

            {/* Users Table */}
            <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      User
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Role
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Last Active
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {users.map((user) => (
                    <tr key={user.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 font-medium">
                            {user.name.charAt(0)}
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">
                              {user.name}
                            </div>
                            <div className="text-sm text-gray-500">
                              {user.email}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            user.role === "plan_advisor"
                              ? "bg-blue-100 text-blue-800"
                              : "bg-green-100 text-green-800"
                          }`}
                        >
                          {user.role === "plan_advisor"
                            ? "Plan Advisor"
                            : "Broker"}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {user.lastActive}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex justify-end space-x-3">
                          <button className="text-gray-500 hover:text-gray-700">
                            <Eye size={18} />
                          </button>
                          <button className="text-blue-600 hover:text-blue-800">
                            <Edit size={18} />
                          </button>
                          <button className="text-red-600 hover:text-red-800">
                            <Trash size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* Add User Modal */}
      {showAddUserModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
            <div className="p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Add New User
              </h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    className="w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter full name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    className="w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter email address"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Role
                  </label>
                  <select className="w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                    <option>Select a role</option>
                    <option value="plan_advisor">Plan Advisor</option>
                    <option value="broker">Broker</option>
                  </select>
                </div>

                <div className="rounded-md bg-yellow-50 p-4">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <AlertTriangle className="h-5 w-5 text-yellow-400" />
                    </div>
                    <div className="ml-3">
                      <p className="text-sm text-yellow-700">
                        An invitation email will be sent to this user. They will
                        need to create a password to activate their account.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="px-6 py-4 bg-gray-50 flex justify-end space-x-3 rounded-b-lg">
              <button
                className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                onClick={() => setShowAddUserModal(false)}
              >
                Cancel
              </button>
              <button className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                Send Invitation
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Permission Details Modal */}
      {showPermissionDetails && selectedPermission && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
            <div className="p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-2">
                {selectedPermission.name}
              </h2>
              <p className="text-gray-600 mb-4">
                This permission controls access to specific features within the
                system.
              </p>

              <div className="space-y-4">
                <div className="bg-gray-50 rounded-md p-4">
                  <h3 className="text-sm font-medium text-gray-700 mb-2">
                    Role Access
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                          <Shield size={16} className="text-blue-600" />
                        </div>
                        <span className="text-gray-800">Plan Advisor</span>
                      </div>
                      <div>
                        {selectedPermission.planAdvisor ? (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                            Allowed
                          </span>
                        ) : (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                            Not Allowed
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center mr-3">
                          <Shield size={16} className="text-green-600" />
                        </div>
                        <span className="text-gray-800">Broker</span>
                      </div>
                      <div>
                        {selectedPermission.broker ? (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                            Allowed
                          </span>
                        ) : (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                            Not Allowed
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-gray-700 mb-2">
                    Permission Description
                  </h3>
                  <p className="text-sm text-gray-600">
                    {selectedPermission.id === "create_videos" &&
                      "Allows users to create new videos in the system using the video editor."}
                    {selectedPermission.id === "edit_videos" &&
                      "Allows users to modify existing videos that have been created."}
                    {selectedPermission.id === "delete_videos" &&
                      "Allows users to permanently remove videos from the system."}
                    {selectedPermission.id === "manage_assets" &&
                      "Allows users to upload, edit, and manage media assets in the asset library."}
                    {selectedPermission.id === "view_clients" &&
                      "Allows users to see the list of clients and their basic information."}
                    {selectedPermission.id === "add_clients" &&
                      "Allows users to add new clients to the system."}
                    {selectedPermission.id === "delete_clients" &&
                      "Allows users to remove clients from the system permanently."}
                    {selectedPermission.id === "edit_brand_kit" &&
                      "Allows users to modify brand assets, colors, and styles."}
                  </p>
                </div>

                <div className="bg-blue-50 p-4 rounded-md">
                  <h3 className="text-sm font-medium text-blue-800 mb-1">
                    Related Permissions
                  </h3>
                  <ul className="text-sm text-blue-700 list-disc pl-5 space-y-1">
                    {selectedPermission.id === "create_videos" && (
                      <>
                        <li>Edit Videos</li>
                        <li>Manage Assets</li>
                      </>
                    )}
                    {selectedPermission.id === "edit_videos" && (
                      <>
                        <li>Create Videos</li>
                        <li>Manage Assets</li>
                      </>
                    )}
                    {selectedPermission.id === "manage_assets" && (
                      <>
                        <li>Create Videos</li>
                        <li>Edit Videos</li>
                      </>
                    )}
                  </ul>
                </div>
              </div>
            </div>

            <div className="px-6 py-4 bg-gray-50 flex justify-end space-x-3 rounded-b-lg">
              <button
                className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                onClick={() => setShowPermissionDetails(false)}
              >
                Close
              </button>
              <button className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                Edit Permission
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RBACManagement;
