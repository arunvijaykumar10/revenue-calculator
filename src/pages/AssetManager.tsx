import {
  Download,
  Edit,
  FileText,
  Film,
  Filter,
  Grid,
  Image,
  List,
  Music,
  Plus,
  Search,
  Trash,
  Upload,
  X,
} from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const AssetManager = () => {
  const [viewMode, setViewMode] = useState("grid");
  const [selectedAsset, setSelectedAsset] = useState(null);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [filterOpen, setFilterOpen] = useState(false);
  const navigate = useNavigate();

  const assetTypes = [
    { id: "image", label: "Images", icon: <Image size={16} /> },
    { id: "video", label: "Videos", icon: <Film size={16} /> },
    { id: "audio", label: "Audio", icon: <Music size={16} /> },
    { id: "lottie", label: "Animations", icon: <FileText size={16} /> },
  ];

  const mockAssets = [
    {
      id: 1,
      type: "image",
      title: "Company Logo",
      tags: ["logo", "brand"],
      url: "/api/placeholder/150/150",
      dateAdded: "2025-04-15",
    },
    {
      id: 2,
      type: "image",
      title: "Team Photo",
      tags: ["team", "people"],
      url: "/api/placeholder/150/150",
      dateAdded: "2025-04-10",
    },
    {
      id: 3,
      type: "video",
      title: "Product Demo",
      tags: ["product", "demo"],
      url: "/api/placeholder/150/150",
      dateAdded: "2025-04-05",
    },
    {
      id: 4,
      type: "audio",
      title: "Background Music",
      tags: ["music", "background"],
      url: "/api/placeholder/150/150",
      dateAdded: "2025-04-01",
    },
    {
      id: 5,
      type: "lottie",
      title: "Loading Animation",
      tags: ["animation", "loading"],
      url: "/api/placeholder/150/150",
      dateAdded: "2025-03-28",
    },
    {
      id: 6,
      type: "image",
      title: "Product Image 1",
      tags: ["product", "gallery"],
      url: "/api/placeholder/150/150",
      dateAdded: "2025-03-25",
    },
    {
      id: 7,
      type: "image",
      title: "Product Image 2",
      tags: ["product", "gallery"],
      url: "/api/placeholder/150/150",
      dateAdded: "2025-03-25",
    },
    {
      id: 8,
      type: "video",
      title: "Testimonial Video",
      tags: ["testimonial", "client"],
      url: "/api/placeholder/150/150",
      dateAdded: "2025-03-20",
    },
  ];

  const getAssetIcon = (type: string) => {
    switch (type) {
      case "image":
        return <Image size={24} className="text-blue-500" />;
      case "video":
        return <Film size={24} className="text-purple-500" />;
      case "audio":
        return <Music size={24} className="text-green-500" />;
      case "lottie":
        return <FileText size={24} className="text-orange-500" />;
      default:
        return <FileText size={24} className="text-gray-500" />;
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex justify-between items-center">
          <h1 className="text-xl font-semibold text-gray-800">Asset Manager</h1>
          <div className="flex space-x-3">
            <button
              className="bg-blue-600 text-white px-4 py-2 rounded-md flex items-center"
              onClick={() => navigate("/audiotranslation")}
            >
              <Upload size={18} className="mr-2" />
              Translation Engine
            </button>
            <button
              className="bg-blue-600 text-white px-4 py-2 rounded-md flex items-center"
              onClick={() => setShowUploadModal(true)}
            >
              <Upload size={18} className="mr-2" />
              Upload New Asset
            </button>
          </div>
        </div>
      </div>

      {/* Search and Filter Bar */}
      <div className="bg-white border-b border-gray-200 px-6 py-3">
        <div className="flex items-center justify-between">
          <div className="flex-1 max-w-xl relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search size={18} className="text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search assets by name or tag..."
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div className="flex items-center ml-4 space-x-3">
            <div className="relative">
              <button
                className="flex items-center px-3 py-2 border border-gray-300 rounded-md bg-white text-gray-700 hover:bg-gray-50"
                onClick={() => setFilterOpen(!filterOpen)}
              >
                <Filter size={18} className="mr-2" />
                Filter
              </button>

              {filterOpen && (
                <div className="absolute right-0 mt-2 w-64 bg-white border border-gray-200 rounded-md shadow-lg z-10">
                  <div className="p-3 border-b border-gray-200">
                    <h3 className="font-medium text-gray-700">
                      Filter by Type
                    </h3>
                  </div>
                  <div className="p-3">
                    {assetTypes.map((type) => (
                      <div
                        key={type.id}
                        className="flex items-center mb-2 last:mb-0"
                      >
                        <input
                          type="checkbox"
                          id={`type-${type.id}`}
                          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                        />
                        <label
                          htmlFor={`type-${type.id}`}
                          className="ml-2 flex items-center text-gray-700"
                        >
                          {type.icon}
                          <span className="ml-2">{type.label}</span>
                        </label>
                      </div>
                    ))}
                  </div>
                  <div className="p-3 border-t border-gray-200 flex justify-end">
                    <button className="px-3 py-1 text-sm bg-blue-600 text-white rounded-md">
                      Apply Filters
                    </button>
                  </div>
                </div>
              )}
            </div>

            <div className="flex border border-gray-300 rounded-md">
              <button
                className={`px-3 py-2 ${
                  viewMode === "grid"
                    ? "bg-gray-100 text-gray-800"
                    : "bg-white text-gray-600"
                }`}
                onClick={() => setViewMode("grid")}
              >
                <Grid size={18} />
              </button>
              <button
                className={`px-3 py-2 ${
                  viewMode === "list"
                    ? "bg-gray-100 text-gray-800"
                    : "bg-white text-gray-600"
                }`}
                onClick={() => setViewMode("list")}
              >
                <List size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 p-6 overflow-auto">
        {viewMode === "grid" ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {mockAssets.map((asset) => (
              <div
                key={asset.id}
                className={`bg-white rounded-lg border ${
                  selectedAsset === asset.id
                    ? "border-blue-500 ring-2 ring-blue-200"
                    : "border-gray-200"
                } overflow-hidden shadow-sm hover:shadow-md transition-shadow cursor-pointer`}
                onClick={() => setSelectedAsset(asset.id)}
              >
                <div className="relative h-36 bg-gray-100 flex items-center justify-center">
                  {asset.type === "image" && (
                    <img
                      src={asset.url}
                      alt={asset.title}
                      className="h-full w-full object-cover"
                    />
                  )}
                  {asset.type !== "image" && (
                    <div className="flex flex-col items-center justify-center p-4">
                      {getAssetIcon(asset.type)}
                      <span className="mt-2 text-xs text-gray-500 capitalize">
                        {asset.type}
                      </span>
                    </div>
                  )}
                </div>
                <div className="p-3">
                  <h3 className="font-medium text-gray-800 truncate">
                    {asset.title}
                  </h3>
                  <div className="flex flex-wrap mt-2 gap-1">
                    {asset.tags.map((tag) => (
                      <span
                        key={tag}
                        className="inline-flex items-center text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Asset
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Type
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Tags
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Date Added
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {mockAssets.map((asset) => (
                  <tr
                    key={asset.id}
                    className={`hover:bg-gray-50 ${
                      selectedAsset === asset.id ? "bg-blue-50" : ""
                    }`}
                    onClick={() => setSelectedAsset(asset.id)}
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10 rounded bg-gray-100 flex items-center justify-center">
                          {asset.type === "image" ? (
                            <img
                              src={asset.url}
                              alt=""
                              className="h-10 w-10 rounded object-cover"
                            />
                          ) : (
                            getAssetIcon(asset.type)
                          )}
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">
                            {asset.title}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm text-gray-700 capitalize">
                        {asset.type}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex flex-wrap gap-1">
                        {asset.tags.map((tag) => (
                          <span
                            key={tag}
                            className="inline-flex items-center text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                      {asset.dateAdded}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        <button className="text-blue-600 hover:text-blue-800">
                          <Edit size={16} />
                        </button>
                        <button className="text-gray-600 hover:text-gray-800">
                          <Download size={16} />
                        </button>
                        <button className="text-red-600 hover:text-red-800">
                          <Trash size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Upload Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-lg">
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-800">
                Upload New Asset
              </h2>
              <button
                className="text-gray-500 hover:text-gray-600"
                onClick={() => setShowUploadModal(false)}
              >
                <X size={20} />
              </button>
            </div>

            <div className="p-6">
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  File Type
                </label>
                <div className="grid grid-cols-4 gap-2">
                  {assetTypes.map((type) => (
                    <div
                      key={type.id}
                      className="border border-gray-300 rounded-md p-3 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50"
                    >
                      {type.icon}
                      <span className="mt-1 text-xs text-gray-700">
                        {type.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Upload File
                </label>
                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                  <div className="space-y-1 text-center">
                    <Upload className="mx-auto h-12 w-12 text-gray-400" />
                    <div className="flex text-sm text-gray-600">
                      <label
                        htmlFor="file-upload"
                        className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500"
                      >
                        <span>Upload a file</span>
                        <input
                          id="file-upload"
                          name="file-upload"
                          type="file"
                          className="sr-only"
                        />
                      </label>
                      <p className="pl-1">or drag and drop</p>
                    </div>
                    <p className="text-xs text-gray-500">
                      JPG, PNG, MP4, MP3, Lottie JSON up to 200MB
                    </p>
                  </div>
                </div>
              </div>

              <div className="mb-6">
                <label
                  htmlFor="title"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Title
                </label>
                <input
                  type="text"
                  id="title"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter asset title (required)"
                />
              </div>

              <div className="mb-6">
                <label
                  htmlFor="tags"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Tags
                </label>
                <div className="flex flex-wrap items-center border border-gray-300 rounded-md shadow-sm py-2 px-3 focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500">
                  <div className="flex flex-wrap gap-2 mb-2">
                    <span className="inline-flex items-center text-sm bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                      logo
                      <button className="ml-1 text-blue-600 hover:text-blue-800">
                        <X size={14} />
                      </button>
                    </span>
                    <span className="inline-flex items-center text-sm bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                      brand
                      <button className="ml-1 text-blue-600 hover:text-blue-800">
                        <X size={14} />
                      </button>
                    </span>
                  </div>
                  <input
                    type="text"
                    id="tags"
                    className="flex-1 outline-none border-0 focus:ring-0 p-0 text-gray-800 placeholder-gray-400 text-sm"
                    placeholder="Add tags separated by comma"
                  />
                </div>
                <p className="mt-1 text-xs text-gray-500">
                  Tags help organize and find assets later
                </p>
              </div>
            </div>

            <div className="px-6 py-3 bg-gray-50 flex justify-end space-x-3 rounded-b-lg">
              <button
                className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                onClick={() => setShowUploadModal(false)}
              >
                Cancel
              </button>
              <button className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                Upload
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Asset Detail Sidebar (shows when an asset is selected) */}
      {selectedAsset && (
        <div className="fixed inset-y-0 right-0 w-80 bg-white border-l border-gray-200 overflow-auto z-20">
          <div className="p-4 border-b border-gray-200 flex justify-between items-center">
            <h2 className="font-semibold text-gray-800">Asset Details</h2>
            <button
              className="text-gray-500 hover:text-gray-700"
              onClick={() => setSelectedAsset(null)}
            >
              <X size={20} />
            </button>
          </div>

          {/* Asset Preview */}
          <div className="p-4 border-b border-gray-200">
            <div className="aspect-w-16 aspect-h-9 bg-gray-100 rounded-md flex items-center justify-center overflow-hidden">
              {/* This would be the selected asset preview */}
              <img
                src="/api/placeholder/300/200"
                alt="Selected asset preview"
                className="object-contain w-full h-full"
              />
            </div>
          </div>

          {/* Asset Information */}
          <div className="p-4 space-y-4">
            <div>
              <h3 className="text-sm font-medium text-gray-500">Title</h3>
              <p className="mt-1 text-sm text-gray-900">Company Logo</p>
            </div>

            <div>
              <h3 className="text-sm font-medium text-gray-500">Type</h3>
              <p className="mt-1 text-sm text-gray-900 capitalize">image</p>
            </div>

            <div>
              <h3 className="text-sm font-medium text-gray-500">Tags</h3>
              <div className="mt-1 flex flex-wrap gap-1">
                <span className="inline-flex items-center text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                  logo
                </span>
                <span className="inline-flex items-center text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                  brand
                </span>
                <button className="inline-flex items-center text-xs text-blue-600 hover:text-blue-800">
                  <Plus size={14} className="mr-1" />
                  Add tag
                </button>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-medium text-gray-500">Date Added</h3>
              <p className="mt-1 text-sm text-gray-900">April 15, 2025</p>
            </div>

            <div>
              <h3 className="text-sm font-medium text-gray-500">File Size</h3>
              <p className="mt-1 text-sm text-gray-900">1.2 MB</p>
            </div>

            <div>
              <h3 className="text-sm font-medium text-gray-500">Dimensions</h3>
              <p className="mt-1 text-sm text-gray-900">1200 x 800 px</p>
            </div>
          </div>

          {/* Actions */}
          <div className="p-4 border-t border-gray-200 space-y-2">
            <button className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700">
              <Download size={16} className="mr-2" />
              Download Asset
            </button>

            <button className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
              <Edit size={16} className="mr-2" />
              Edit Details
            </button>

            <button className="w-full flex items-center justify-center px-4 py-2 border border-red-300 rounded-md shadow-sm text-sm font-medium text-red-700 bg-white hover:bg-red-50">
              <Trash size={16} className="mr-2" />
              Delete Asset
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AssetManager;
