import React, { useState } from "react";
import {
  Search,
  Plus,
  MoreVertical,
  Grid,
  List,
  ArrowUp,
  ArrowDown,
  Video,
  Clock,
  Calendar,
  Edit3,
  Trash2,
  Copy,
  ChevronDown,
  User,
  Bell,
  LogOut,
  Settings,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import Header from "./Header";

const Dashboard = () => {
  // State for view toggle (grid vs list)
  const [viewMode, setViewMode] = useState("grid");

  // State for sort direction
  const [sortDirection, setSortDirection] = useState("desc");

  // State for sort field
  const [sortField, setSortField] = useState("modified");

  // State for search term
  const [searchTerm, setSearchTerm] = useState("");

  // State for profile dropdown
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);

  // State for project menu
  const [activeProjectMenu, setActiveProjectMenu] = useState(null);

  const navigate = useNavigate();

  // Mock project data
  const [projects, setProjects] = useState([
    {
      id: 1,
      name: "Retirement Benefits Introduction",
      thumbnail: "/src/pages/images/venroll1.jpeg",
      created: "2025-04-15T10:30:00",
      modified: "2025-04-25T14:22:00",
    },
    {
      id: 2,
      name: "Health Insurance Explainer",
      thumbnail: "/src/pages/images/venroll2.jpeg",
      created: "2025-04-10T08:15:00",
      modified: "2025-04-22T11:45:00",
    },
    {
      id: 3,
      name: "401k Options Overview",
      thumbnail: "/src/pages/images/venroll3.jpeg",
      created: "2025-04-05T15:45:00",
      modified: "2025-04-20T09:30:00",
    },
    {
      id: 4,
      name: "Employee Benefits Onboarding",
      thumbnail: "/src/pages/images/venroll4.jpeg",
      created: "2025-04-02T11:20:00",
      modified: "2025-04-18T16:15:00",
    },
    {
      id: 5,
      name: "Healthcare Enrollment Process",
      thumbnail: "/src/pages/images/venroll5.jpeg",
      created: "2025-03-28T14:10:00",
      modified: "2025-04-17T10:05:00",
    },
    {
      id: 6,
      name: "Pension Plan Details",
      thumbnail: "/src/pages/images/venroll6.jpeg",
      created: "2025-03-22T09:40:00",
      modified: "2025-04-15T13:50:00",
    },
  ]);

  // Function to create a new project
  const handleCreateProject = () => {
    const newProject = {
      id: projects.length + 1,
      name: "New Project",
      thumbnail: "/api/placeholder/300/169",
      created: new Date().toISOString(),
      modified: new Date().toISOString(),
    };

    setProjects([newProject, ...projects]);
  };

  // Function to delete a project
  const handleDeleteProject = (id: number) => {
    setProjects(projects.filter((project) => project.id !== id));
    setActiveProjectMenu(null);
  };

  // Function to duplicate a project
  const handleDuplicateProject = (id: number) => {
    const projectToDuplicate = projects.find((project) => project.id === id);
    const newProject = {
      ...projectToDuplicate,
      id: projects.length + 1,
      name: `${projectToDuplicate.name} (Copy)`,
      created: new Date().toISOString(),
      modified: new Date().toISOString(),
    };

    setProjects([newProject, ...projects]);
    setActiveProjectMenu(null);
  };

  // Function to format date
  const formatDate = (dateString: string | number | Date) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  // Function to toggle sort direction
  const toggleSortDirection = () => {
    setSortDirection(sortDirection === "asc" ? "desc" : "asc");
  };

  // Function to set sort field
  const handleSetSortField = (field: React.SetStateAction<string>) => {
    if (sortField === field) {
      toggleSortDirection();
    } else {
      setSortField(field);
      setSortDirection("desc");
    }
  };

  // Filter projects based on search term
  const filteredProjects = projects.filter((project) =>
    project.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Sort projects based on sort field and direction
  const sortedProjects = [...filteredProjects].sort((a, b) => {
    if (sortDirection === "asc") {
      return a[sortField] > b[sortField] ? 1 : -1;
    } else {
      return a[sortField] < b[sortField] ? 1 : -1;
    }
  });

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <Header />

      {/* Main Content */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-semibold text-gray-900">My Projects</h1>
          <button
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md flex items-center transition-colors"
            onClick={() => navigate("/videoeditor")}
          >
            <Plus size={20} className="mr-2" />
            Create New Project
          </button>
        </div>

        {/* Filters and Search */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 space-y-4 sm:space-y-0">
          <div className="relative w-full sm:w-64">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search size={18} className="text-gray-400" />
            </div>
            <input
              type="text"
              className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Search projects..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <button
                className={`p-2 rounded-md ${
                  sortField === "name" ? "bg-gray-200" : "hover:bg-gray-100"
                }`}
                onClick={() => handleSetSortField("name")}
                title="Sort by name"
              >
                Name
                {sortField === "name" &&
                  (sortDirection === "asc" ? (
                    <ArrowUp size={16} className="inline ml-1" />
                  ) : (
                    <ArrowDown size={16} className="inline ml-1" />
                  ))}
              </button>

              <button
                className={`p-2 rounded-md ${
                  sortField === "modified" ? "bg-gray-200" : "hover:bg-gray-100"
                }`}
                onClick={() => handleSetSortField("modified")}
                title="Sort by last modified"
              >
                Modified
                {sortField === "modified" &&
                  (sortDirection === "asc" ? (
                    <ArrowUp size={16} className="inline ml-1" />
                  ) : (
                    <ArrowDown size={16} className="inline ml-1" />
                  ))}
              </button>

              <button
                className={`p-2 rounded-md ${
                  sortField === "created" ? "bg-gray-200" : "hover:bg-gray-100"
                }`}
                onClick={() => handleSetSortField("created")}
                title="Sort by creation date"
              >
                Created
                {sortField === "created" &&
                  (sortDirection === "asc" ? (
                    <ArrowUp size={16} className="inline ml-1" />
                  ) : (
                    <ArrowDown size={16} className="inline ml-1" />
                  ))}
              </button>
            </div>

            <div className="border-l border-gray-300 h-6"></div>

            <div className="flex items-center bg-gray-100 rounded-md">
              <button
                className={`p-2 rounded-l-md ${
                  viewMode === "grid" ? "bg-white shadow-sm" : ""
                }`}
                onClick={() => setViewMode("grid")}
                title="Grid view"
              >
                <Grid size={20} className="text-gray-600" />
              </button>
              <button
                className={`p-2 rounded-r-md ${
                  viewMode === "list" ? "bg-white shadow-sm" : ""
                }`}
                onClick={() => setViewMode("list")}
                title="List view"
              >
                <List size={20} className="text-gray-600" />
              </button>
            </div>
          </div>
        </div>

        {/* Project Grid */}
        {viewMode === "grid" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {sortedProjects.map((project) => (
              <div
                key={project.id}
                className="bg-white rounded-lg shadow overflow-hidden"
              >
                <div className="relative">
                  <img
                    src={project.thumbnail}
                    alt={project.name}
                    onClick={() => navigate("/videoplayer")}
                    className="w-full h-40 object-cover"
                  />
                  <div className="absolute top-2 right-2">
                    <button
                      className="p-1 bg-white rounded-full shadow-md hover:bg-gray-100"
                      onClick={() =>
                        setActiveProjectMenu(
                          activeProjectMenu === project.id ? null : project.id
                        )
                      }
                    >
                      <MoreVertical size={18} className="text-gray-600" />
                    </button>

                    {activeProjectMenu === project.id && (
                      <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10">
                        <a
                          href={`/videoeditor`}
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                          <div className="flex items-center">
                            <Edit3 size={16} className="mr-2" />
                            Edit Project
                          </div>
                        </a>
                        <button
                          className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          onClick={() => handleDuplicateProject(project.id)}
                        >
                          <div className="flex items-center">
                            <Copy size={16} className="mr-2" />
                            Duplicate
                          </div>
                        </button>
                        <button
                          className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                          onClick={() => handleDeleteProject(project.id)}
                        >
                          <div className="flex items-center">
                            <Trash2 size={16} className="mr-2" />
                            Delete
                          </div>
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                <div className="p-4">
                  <h3 className="text-lg font-medium text-gray-900 mb-1 truncate">
                    {project.name}
                  </h3>
                  <div className="flex items-center text-sm text-gray-500">
                    <Clock size={14} className="mr-1" />
                    <span>Modified {formatDate(project.modified)}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Project List */}
        {viewMode === "list" && (
          <div className="bg-white shadow overflow-hidden sm:rounded-md">
            <ul className="divide-y divide-gray-200">
              {sortedProjects.map((project) => (
                <li key={project.id}>
                  <div className="px-4 py-4 sm:px-6 flex items-center justify-between hover:bg-gray-50">
                    <div className="flex items-center min-w-0">
                      <div className="flex-shrink-0 h-12 w-20 bg-gray-200 rounded overflow-hidden mr-4">
                        <img
                          src={project.thumbnail}
                          alt=""
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div className="min-w-0 flex-1">
                        <a
                          href={`/editor/${project.id}`}
                          className="text-sm font-medium text-blue-600 hover:text-blue-800 truncate"
                        >
                          {project.name}
                        </a>
                        <div className="mt-1 flex items-center text-xs text-gray-500">
                          <div className="flex items-center mr-3">
                            <Calendar size={14} className="mr-1" />
                            Created {formatDate(project.created)}
                          </div>
                          <div className="flex items-center">
                            <Clock size={14} className="mr-1" />
                            Modified {formatDate(project.modified)}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="ml-4 flex-shrink-0 flex items-center">
                      <a
                        href={`/editor/${project.id}`}
                        className="mr-3 text-blue-600 hover:text-blue-800"
                        title="Edit Project"
                      >
                        <Edit3 size={18} />
                      </a>

                      <div className="relative">
                        <button
                          className="text-gray-500 hover:text-gray-700"
                          onClick={() =>
                            setActiveProjectMenu(
                              activeProjectMenu === project.id
                                ? null
                                : project.id
                            )
                          }
                        >
                          <MoreVertical size={18} />
                        </button>

                        {activeProjectMenu === project.id && (
                          <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10">
                            <button
                              className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                              onClick={() => handleDuplicateProject(project.id)}
                            >
                              <div className="flex items-center">
                                <Copy size={16} className="mr-2" />
                                Duplicate
                              </div>
                            </button>
                            <button
                              className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                              onClick={() => handleDeleteProject(project.id)}
                            >
                              <div className="flex items-center">
                                <Trash2 size={16} className="mr-2" />
                                Delete
                              </div>
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Empty State */}
        {sortedProjects.length === 0 && (
          <div className="mt-12 text-center">
            <Video size={64} className="mx-auto text-gray-400" />
            <h3 className="mt-2 text-lg font-medium text-gray-900">
              No projects found
            </h3>
            <p className="mt-1 text-gray-500">
              {searchTerm
                ? `No results matching "${searchTerm}"`
                : "Get started by creating a new project"}
            </p>
            {searchTerm && (
              <button
                className="mt-4 text-blue-600 hover:text-blue-800"
                onClick={() => setSearchTerm("")}
              >
                Clear search
              </button>
            )}
            {!searchTerm && (
              <button
                className="mt-4 inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                onClick={handleCreateProject}
              >
                <Plus size={16} className="mr-2" />
                Create new project
              </button>
            )}
          </div>
        )}
      </main>
    </div>
  );
};

export default Dashboard;
