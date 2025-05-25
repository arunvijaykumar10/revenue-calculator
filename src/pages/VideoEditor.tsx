import {
  CheckSquare,
  ChevronDown,
  ChevronUp,
  Clock,
  Download,
  Film,
  Image,
  Layers,
  Maximize,
  Minimize,
  Music,
  PlayCircle,
  Plus,
  Save,
  Settings,
  Trash,
  Type,
} from "lucide-react";
import { useState } from "react";
import AssetManager from "./AssetManager";
import { useNavigate } from "react-router-dom";
import Header from "./Header";

const VideoEditorWorkspace = () => {
  const [activeComponent, setActiveComponent] = useState("text");
  const [showTimeline, setShowTimeline] = useState(true);
  const [showAssetManager, setShowAssetManager] = useState(false); // State to toggle Asset Manager
  const navigate = useNavigate();

  return (
    <div className="flex flex-col">
      <Header />
      <div className="flex h-screen bg-gray-100">
        {showAssetManager && (
          <div className="w-1.5/4 bg-white border-r border-gray-300">
            <AssetManager />
          </div>
        )}

        {/* Main Video Editor */}
        <div
          className={`flex flex-col ${
            showAssetManager ? "w-3/4" : "w-full"
          } transition-all duration-300`}
        >
          {/* Top Bar */}
          <div className="bg-white p-4 border-b border-gray-300 flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <h1 className="text-xl font-semibold">My Awesome Video</h1>
              <span className="text-gray-500 text-sm">Autosaving...</span>
            </div>
            <div className="flex items-center space-x-4">
              <button
                className="bg-blue-100 text-blue-600 px-4 py-2 rounded-md flex items-center"
                onClick={() => navigate("/videoplayer")}
              >
                <PlayCircle size={18} className="mr-2" />
                Preview
              </button>
              <button
                className="bg-blue-600 text-white px-4 py-2 rounded-md flex items-center"
                onClick={() => navigate("/dashboard")}
              >
                <Save size={18} className="mr-2" />
                Save
              </button>
              <button
                className="bg-green-600 text-white px-4 py-2 rounded-md flex items-center"
                onClick={() => navigate("/exportmodal")} // Navigate to Export Modal
              >
                <Download size={18} className="mr-2" />
                Export
              </button>
            </div>
          </div>

          <div className="flex flex-1 overflow-hidden">
            {/* Component Library (Left Sidebar) */}
            <div className="w-64 bg-white border-r border-gray-300 flex flex-col">
              <div className="p-4 border-b border-gray-200">
                <h2 className="font-semibold text-gray-700">Components</h2>
              </div>
              <div className="overflow-y-auto flex-1">
                <div
                  className={`p-3 ${
                    activeComponent === "text"
                      ? "bg-blue-50"
                      : "hover:bg-gray-50"
                  } cursor-pointer flex items-center`}
                  onClick={() => setActiveComponent("text")}
                >
                  <Type size={18} className="mr-3 text-gray-600" />
                  <span>Text Block</span>
                </div>
                <div
                  className={`p-3 ${
                    activeComponent === "image"
                      ? "bg-blue-50"
                      : "hover:bg-gray-50"
                  } cursor-pointer flex items-center`}
                  onClick={() => setActiveComponent("image")}
                >
                  <Image size={18} className="mr-3 text-gray-600" />
                  <span>Image Block</span>
                </div>
                <div
                  className={`p-3 ${
                    activeComponent === "animation"
                      ? "bg-blue-50"
                      : "hover:bg-gray-50"
                  } cursor-pointer flex items-center`}
                  onClick={() => setActiveComponent("animation")}
                >
                  <Layers size={18} className="mr-3 text-gray-600" />
                  <span>Lottie/Animation</span>
                </div>
                <div
                  className={`p-3 ${
                    activeComponent === "video"
                      ? "bg-blue-50"
                      : "hover:bg-gray-50"
                  } cursor-pointer flex items-center`}
                  onClick={() => setActiveComponent("video")}
                >
                  <Film size={18} className="mr-3 text-gray-600" />
                  <span>Video Block</span>
                </div>
                <div
                  className={`p-3 ${
                    activeComponent === "audio"
                      ? "bg-blue-50"
                      : "hover:bg-gray-50"
                  } cursor-pointer flex items-center`}
                  onClick={() => setActiveComponent("audio")}
                >
                  <Music size={18} className="mr-3 text-gray-600" />
                  <span>Audio Track</span>
                </div>
              </div>
              <div className="p-4 border-t border-gray-200">
                <button
                  className="w-full bg-blue-600 text-white p-2 rounded-md flex items-center justify-center"
                  onClick={() => setShowAssetManager(!showAssetManager)} // Toggle Asset Manager
                >
                  <Plus size={18} className="mr-2" />
                  Asset Manager
                </button>
              </div>
            </div>

            {/* Canvas Area (Center) */}
            <div className="flex-1 flex flex-col">
              <div className="bg-white p-3 border-b border-gray-300 flex justify-between">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center">
                    <label className="mr-2 text-sm text-gray-600">
                      Canvas:
                    </label>
                    <select className="border border-gray-300 rounded-md p-1 text-sm">
                      <option>16:9</option>
                      <option>9:16</option>
                      <option>1:1</option>
                    </select>
                  </div>
                  <div className="flex items-center">
                    <label className="mr-2 text-sm text-gray-600">
                      Background:
                    </label>
                    <div className="w-6 h-6 bg-white border border-gray-300 rounded-md cursor-pointer"></div>
                  </div>
                  <div className="flex items-center">
                    <label className="mr-2 text-sm text-gray-600">
                      Snap to Grid:
                    </label>
                    <CheckSquare
                      size={18}
                      className="text-blue-600 cursor-pointer"
                    />
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <button className="p-1 text-gray-600 hover:bg-gray-100 rounded">
                    <Maximize size={18} />
                  </button>
                  <button className="p-1 text-gray-600 hover:bg-gray-100 rounded">
                    <Minimize size={18} />
                  </button>
                </div>
              </div>

              <div className="flex-1 bg-gray-800 flex items-center justify-center overflow-auto">
                <div className="bg-white w-3/5 h-2/3 shadow-lg rounded-md flex items-center justify-center">
                  <div className="text-center p-8 border-2 border-dashed border-gray-300 rounded-lg">
                    <div className="inline-flex items-center text-gray-500">
                      <Plus size={24} className="mr-2" />
                      <span>Drag components from the left panel</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Properties Panel (Right Sidebar) */}
            <div className="w-72 bg-white border-l border-gray-300 flex flex-col">
              <div className="p-4 border-b border-gray-200 flex justify-between items-center">
                <h2 className="font-semibold text-gray-700">Properties</h2>
                <Settings size={18} className="text-gray-600" />
              </div>

              {activeComponent === "text" && (
                <div className="p-4 overflow-y-auto flex-1">
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Text Content
                    </label>
                    <textarea
                      className="w-full border border-gray-300 rounded-md p-2 text-sm"
                      rows={3}
                    >
                      Enter your text here
                    </textarea>
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Font
                    </label>
                    <select className="w-full border border-gray-300 rounded-md p-2 text-sm">
                      <option>Arial</option>
                      <option>Helvetica</option>
                      <option>Roboto</option>
                    </select>
                  </div>
                  <div className="mb-4 grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Size
                      </label>
                      <input
                        type="number"
                        className="w-full border border-gray-300 rounded-md p-2 text-sm"
                        defaultValue="16"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Color
                      </label>
                      <input
                        type="color"
                        className="w-full h-9 border border-gray-300 rounded-md p-1"
                        defaultValue="#000000"
                      />
                    </div>
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Animation
                    </label>
                    <select className="w-full border border-gray-300 rounded-md p-2 text-sm">
                      <option>None</option>
                      <option>Fade In</option>
                      <option>Slide In</option>
                    </select>
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Duration (seconds)
                    </label>
                    <input
                      type="number"
                      className="w-full border border-gray-300 rounded-md p-2 text-sm"
                      defaultValue="2"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Timeline */}
          {showTimeline && (
            <div className="h-64 bg-white border-t border-gray-300 flex flex-col">
              <div className="p-2 flex justify-between items-center border-b border-gray-200 bg-gray-50">
                <div className="flex items-center">
                  <h3 className="font-medium text-gray-700">Timeline</h3>
                  <div className="ml-4 flex space-x-2">
                    <button className="p-1 text-gray-600 hover:bg-gray-200 rounded">
                      <PlayCircle size={18} />
                    </button>
                    <button className="p-1 text-gray-600 hover:bg-gray-200 rounded">
                      <Clock size={18} />
                    </button>
                  </div>
                </div>
                <div className="flex items-center">
                  <span className="text-sm text-gray-600 mr-2">Zoom:</span>
                  <button className="p-1 text-gray-600 hover:bg-gray-200 rounded">
                    -
                  </button>
                  <span className="text-sm mx-1">100%</span>
                  <button className="p-1 text-gray-600 hover:bg-gray-200 rounded">
                    +
                  </button>
                  <button
                    className="ml-4 p-1 text-gray-600 hover:bg-gray-200 rounded"
                    onClick={() => setShowTimeline(false)}
                  >
                    <ChevronDown size={18} />
                  </button>
                </div>
              </div>

              <div className="flex-1 flex">
                <div className="w-48 border-r border-gray-200 bg-gray-50">
                  <div className="p-2 border-b border-gray-200 font-medium text-sm text-gray-700">
                    Layers
                  </div>
                  <div className="overflow-y-auto h-full">
                    <div className="p-2 border-b border-gray-100 hover:bg-blue-50 flex items-center justify-between">
                      <div className="flex items-center">
                        <Type size={14} className="mr-2 text-gray-500" />
                        <span className="text-sm">Title Text</span>
                      </div>
                      <button className="text-gray-400 hover:text-red-500">
                        <Trash size={14} />
                      </button>
                    </div>
                    <div className="p-2 border-b border-gray-100 bg-blue-50 flex items-center justify-between">
                      <div className="flex items-center">
                        <Image size={14} className="mr-2 text-gray-500" />
                        <span className="text-sm">Logo Image</span>
                      </div>
                      <button className="text-gray-400 hover:text-red-500">
                        <Trash size={14} />
                      </button>
                    </div>
                    <div className="p-2 border-b border-gray-100 hover:bg-blue-50 flex items-center justify-between">
                      <div className="flex items-center">
                        <Film size={14} className="mr-2 text-gray-500" />
                        <span className="text-sm">Intro Animation</span>
                      </div>
                      <button className="text-gray-400 hover:text-red-500">
                        <Trash size={14} />
                      </button>
                    </div>
                    <div className="p-2 border-b border-gray-100 hover:bg-blue-50 flex items-center justify-between">
                      <div className="flex items-center">
                        <Music size={14} className="mr-2 text-gray-500" />
                        <span className="text-sm">Background Music</span>
                      </div>
                      <button className="text-gray-400 hover:text-red-500">
                        <Trash size={14} />
                      </button>
                    </div>
                  </div>
                </div>

                <div className="flex-1 overflow-x-auto">
                  <div className="h-8 bg-gray-100 border-b border-gray-200 flex items-center">
                    <div className="flex">
                      {[...Array(10)].map((_, i) => (
                        <div
                          key={i}
                          className="text-xs text-gray-500 w-16 flex-shrink-0 border-r border-gray-300 p-1"
                        >
                          {i}s
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="relative">
                    <div
                      className="absolute top-0 left-0 bottom-0 w-px bg-red-500 z-10"
                      style={{ left: "32px" }}
                    ></div>

                    <div className="h-10 border-b border-gray-200 relative">
                      <div
                        className="absolute top-1 left-0 h-8 bg-blue-100 border border-blue-300 rounded-sm"
                        style={{ width: "96px", left: "16px" }}
                      >
                        <div className="h-full flex items-center justify-center text-xs text-blue-700">
                          Title
                        </div>
                      </div>
                    </div>

                    <div className="h-10 border-b border-gray-200 relative">
                      <div
                        className="absolute top-1 left-0 h-8 bg-green-100 border border-green-300 rounded-sm"
                        style={{ width: "64px", left: "32px" }}
                      >
                        <div className="h-full flex items-center justify-center text-xs text-green-700">
                          Logo
                        </div>
                      </div>
                    </div>

                    <div className="h-10 border-b border-gray-200 relative">
                      <div
                        className="absolute top-1 left-0 h-8 bg-purple-100 border border-purple-300 rounded-sm"
                        style={{ width: "128px", left: "0" }}
                      >
                        <div className="h-full flex items-center justify-center text-xs text-purple-700">
                          Intro
                        </div>
                      </div>
                    </div>

                    <div className="h-10 border-b border-gray-200 relative">
                      <div
                        className="absolute top-1 left-0 h-8 bg-yellow-100 border border-yellow-300 rounded-sm"
                        style={{ width: "320px", left: "0" }}
                      >
                        <div className="h-full flex items-center justify-center text-xs text-yellow-700">
                          Music
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {!showTimeline && (
            <div
              className="h-8 bg-white border-t border-gray-300 flex justify-center items-center cursor-pointer hover:bg-gray-50"
              onClick={() => setShowTimeline(true)}
            >
              <ChevronUp size={18} className="text-gray-500" />
              <span className="text-sm text-gray-500 ml-1">Show Timeline</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default VideoEditorWorkspace;
