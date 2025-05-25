import React, { useState } from "react";
import {
  X,
  Download,
  Film,
  Music,
  Upload,
  Subtitles,
  Globe,
  ArrowRight,
  Check,
  AlertCircle,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const ExportModal = () => {
  const [exportQuality, setExportQuality] = useState("720p");
  const [outputFormat, setOutputFormat] = useState("MP4");
  const [includeSubtitles, setIncludeSubtitles] = useState(false);
  const [multiLanguageAudio, setMultiLanguageAudio] = useState("");
  const [backgroundMusic, setBackgroundMusic] = useState("");
  const [renderProgress, setRenderProgress] = useState(0);
  const [renderStatus, setRenderStatus] = useState("idle"); // idle, rendering, completed, error
  const navigate = useNavigate();

  // Languages
  const languages = [
    { code: "en", name: "English" },
    { code: "es", name: "Spanish" },
    { code: "fr", name: "French" },
    { code: "de", name: "German" },
    { code: "zh", name: "Chinese" },
  ];

  // Background music options
  const musicOptions = [
    { id: "none", name: "None" },
    { id: "upbeat", name: "Upbeat Corporate" },
    { id: "ambient", name: "Ambient Gentle" },
    { id: "tech", name: "Technology Focus" },
    { id: "upload", name: "Upload Custom..." },
  ];

  const handleStartRender = () => {
    setRenderStatus("rendering");

    // Simulate progress
    const interval = setInterval(() => {
      setRenderProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setRenderStatus("completed");
          return 100;
        }
        return prev + 10;
      });
    }, 800);
  };

  const handleDownload = () => {
    // In a real app, this would trigger the file download
    console.log("Downloading video...");
  };

  const handleClose = () => {
    console.log("Closing modal...");
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-auto">
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-xl font-bold">Export Video</h2>
          <button
            className="text-gray-500 hover:text-gray-700"
            onClick={() => navigate("/videoeditor")}
          >
            <X size={24} />
          </button>
        </div>

        {/* Body */}
        <div className="p-6">
          {renderStatus === "idle" && (
            <>
              {/* Export Quality */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Export Quality
                </label>
                <div className="flex gap-4 items-center">
                  <Film size={20} className="text-gray-500" />
                  <select
                    className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 rounded-md"
                    value={exportQuality}
                    onChange={(e) => setExportQuality(e.target.value)}
                  >
                    <option value="480p">480p (SD)</option>
                    <option value="720p">720p (HD)</option>
                    <option value="1080p">1080p (Full HD)</option>
                  </select>
                </div>
                <p className="mt-1 text-xs text-gray-500">
                  {exportQuality === "1080p"
                    ? "Best quality, larger file size"
                    : exportQuality === "720p"
                    ? "Recommended for most uses"
                    : "Smaller file size, reduced quality"}
                </p>
              </div>

              {/* Output Format */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Output Format
                </label>
                <div className="flex gap-2">
                  <button
                    className={`flex-1 p-3 border rounded-md flex items-center justify-center gap-2 ${
                      outputFormat === "MP4"
                        ? "bg-blue-50 border-blue-500 text-blue-700"
                        : "border-gray-300"
                    }`}
                    onClick={() => setOutputFormat("MP4")}
                  >
                    <span className="font-medium">MP4</span>
                    {outputFormat === "MP4" && (
                      <Check size={16} className="text-blue-500" />
                    )}
                  </button>
                  <button
                    className={`flex-1 p-3 border rounded-md flex items-center justify-center gap-2 ${
                      outputFormat === "WebM"
                        ? "bg-blue-50 border-blue-500 text-blue-700"
                        : "border-gray-300"
                    }`}
                    onClick={() => setOutputFormat("WebM")}
                  >
                    <span className="font-medium">WebM</span>
                    {outputFormat === "WebM" && (
                      <Check size={16} className="text-blue-500" />
                    )}
                  </button>
                </div>
                <p className="mt-1 text-xs text-gray-500">
                  {outputFormat === "MP4"
                    ? "Better compatibility across devices"
                    : "Better quality at smaller sizes, modern web standard"}
                </p>
              </div>

              {/* Subtitles */}
              <div className="mb-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Subtitles size={20} className="text-gray-500" />
                    <label className="text-sm font-medium text-gray-700">
                      Include Subtitles
                    </label>
                  </div>
                  <div className="relative inline-block w-12 h-6">
                    <input
                      type="checkbox"
                      className="opacity-0 w-0 h-0"
                      checked={includeSubtitles}
                      onChange={() => setIncludeSubtitles(!includeSubtitles)}
                      id="subtitle-toggle"
                    />
                    <label
                      htmlFor="subtitle-toggle"
                      className={`absolute cursor-pointer top-0 left-0 right-0 bottom-0 rounded-full transition-colors ${
                        includeSubtitles ? "bg-blue-500" : "bg-gray-300"
                      }`}
                    >
                      <span
                        className={`absolute bg-white w-5 h-5 rounded-full transition-transform top-0.5 ${
                          includeSubtitles
                            ? "transform translate-x-6"
                            : "left-0.5"
                        }`}
                      ></span>
                    </label>
                  </div>
                </div>
                {includeSubtitles && (
                  <div className="mt-3 pl-7">
                    <p className="text-sm text-gray-600 mb-2">
                      Subtitle language
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {languages.map((lang) => (
                        <label
                          key={lang.code}
                          className="inline-flex items-center px-3 py-1 border rounded-full text-sm cursor-pointer"
                        >
                          <input type="checkbox" className="mr-1.5" />
                          {lang.name}
                        </label>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Multi-language Audio */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                  <Globe size={20} className="text-gray-500" />
                  Multi-language Audio
                </label>
                <select
                  className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 rounded-md"
                  value={multiLanguageAudio}
                  onChange={(e) => setMultiLanguageAudio(e.target.value)}
                >
                  <option value="">Default language only</option>
                  {languages.map((lang) => (
                    <option key={lang.code} value={lang.code}>
                      {lang.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Background Music */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                  <Music size={20} className="text-gray-500" />
                  Background Music
                </label>
                <select
                  className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 rounded-md"
                  value={backgroundMusic}
                  onChange={(e) => setBackgroundMusic(e.target.value)}
                >
                  {musicOptions.map((option) => (
                    <option key={option.id} value={option.id}>
                      {option.name}
                    </option>
                  ))}
                </select>

                {backgroundMusic === "upload" && (
                  <div className="mt-3 border border-dashed border-gray-300 rounded-md p-4 flex items-center justify-center">
                    <button className="flex items-center text-blue-600 gap-1 text-sm">
                      <Upload size={16} />
                      Upload audio file
                    </button>
                  </div>
                )}

                {backgroundMusic &&
                  backgroundMusic !== "none" &&
                  backgroundMusic !== "upload" && (
                    <div className="mt-3">
                      <label className="block text-sm text-gray-600 mb-1">
                        Volume
                      </label>
                      <input
                        type="range"
                        className="w-full"
                        min={0}
                        max={100}
                        defaultValue={50}
                      />
                    </div>
                  )}
              </div>

              {/* Estimated Size */}
              <div className="mb-6 p-3 bg-gray-50 rounded-md">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">
                    Estimated file size:
                  </span>
                  <span className="font-medium">
                    {exportQuality === "1080p"
                      ? "24-45 MB"
                      : exportQuality === "720p"
                      ? "12-25 MB"
                      : "5-10 MB"}
                  </span>
                </div>
                <div className="flex justify-between items-center mt-1">
                  <span className="text-sm text-gray-600">
                    Estimated export time:
                  </span>
                  <span className="font-medium">
                    {exportQuality === "1080p"
                      ? "2-4 minutes"
                      : exportQuality === "720p"
                      ? "1-2 minutes"
                      : "30-60 seconds"}
                  </span>
                </div>
              </div>
            </>
          )}

          {/* Rendering Progress */}
          {renderStatus === "rendering" && (
            <div className="py-8">
              <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center h-20 w-20 rounded-full bg-blue-100 mb-4">
                  <Film size={32} className="text-blue-600" />
                </div>
                <h3 className="text-lg font-medium">Rendering Your Video</h3>
                <p className="text-gray-500 text-sm mt-1">
                  This may take a few minutes
                </p>
              </div>

              <div className="mb-4">
                <div className="flex justify-between text-sm mb-1">
                  <span>Progress</span>
                  <span>{renderProgress}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${renderProgress}%` }}
                  ></div>
                </div>
              </div>

              <div className="text-center text-sm text-gray-500">
                <p>Processing video assets...</p>
                <p className="mt-1">
                  You can close this window and return later. We'll save your
                  export.
                </p>
              </div>
            </div>
          )}

          {/* Completed */}
          {renderStatus === "completed" && (
            <div className="py-8">
              <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center h-20 w-20 rounded-full bg-green-100 mb-4">
                  <Check size={32} className="text-green-600" />
                </div>
                <h3 className="text-lg font-medium">Your Video is Ready!</h3>
                <p className="text-gray-500 text-sm mt-1">
                  Successfully exported as {outputFormat}
                </p>
              </div>

              <div className="p-4 border rounded-md bg-gray-50 flex justify-between items-center mb-6">
                <div>
                  <p className="font-medium">
                    ProjectName.{outputFormat.toLowerCase()}
                  </p>
                  <p className="text-sm text-gray-500">
                    {exportQuality} •{" "}
                    {outputFormat === "MP4" ? "24.5 MB" : "18.2 MB"}
                  </p>
                </div>
                <button
                  className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-md"
                  onClick={handleDownload}
                >
                  <Download size={16} />
                  Download
                </button>
              </div>

              <div className="text-center">
                <button className="text-blue-600 hover:underline">
                  Share video directly
                </button>
              </div>
            </div>
          )}

          {/* Error */}
          {renderStatus === "error" && (
            <div className="py-8">
              <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center h-20 w-20 rounded-full bg-red-100 mb-4">
                  <AlertCircle size={32} className="text-red-600" />
                </div>
                <h3 className="text-lg font-medium">Export Failed</h3>
                <p className="text-gray-500 text-sm mt-1">
                  There was an error processing your video
                </p>
              </div>

              <div className="p-4 border border-red-200 rounded-md bg-red-50 mb-6">
                <p className="text-red-700 text-sm">
                  Error: Unable to process video assets. Please check your
                  project for corrupted media files and try again.
                </p>
              </div>

              <div className="text-center">
                <button className="text-blue-600 hover:underline">
                  View error details
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="border-t p-4 flex justify-end">
          {renderStatus === "idle" && (
            <>
              <button
                className="mr-4 px-4 py-2 border border-gray-300 rounded-md text-gray-700"
                onClick={handleClose}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-blue-600 text-white rounded-md flex items-center gap-2"
                onClick={handleStartRender}
              >
                Export Video
                <ArrowRight size={16} />
              </button>
            </>
          )}

          {renderStatus === "rendering" && (
            <button
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700"
              onClick={() => navigate("/videoeditor")}
            >
              Close
            </button>
          )}

          {renderStatus === "completed" && (
            <button
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700"
              onClick={() => navigate("/dashboard")}
            >
              Done
            </button>
          )}

          {renderStatus === "error" && (
            <>
              <button
                className="mr-4 px-4 py-2 border border-gray-300 rounded-md text-gray-700"
                onClick={() => navigate("/videoeditor")}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-blue-600 text-white rounded-md"
                onClick={() => setRenderStatus("idle")}
              >
                Try Again
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ExportModal;
