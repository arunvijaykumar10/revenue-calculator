import { Check, Plus, Save, Trash2, Upload } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "./Header";

const BrandKit = () => {
  const [selectedColors, setSelectedColors] = useState([
    "#4A6CF7",
    "#F7664A",
    "#F7C84A",
    "#49F76C",
    "#C84AF7",
  ]);
  const [selectedFont, setSelectedFont] = useState("Inter");
  const [logoUrl, setLogoUrl] = useState("");
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [currentColorIndex, setCurrentColorIndex] = useState(null);
  const [tempColor, setTempColor] = useState("#FFFFFF");
  const navigate = useNavigate();

  const fonts = ["Inter", "Roboto", "Poppins", "Montserrat", "Open Sans"];

  const handleAddColor = () => {
    if (selectedColors.length < 5) {
      setSelectedColors([...selectedColors, "#FFFFFF"]);
      setCurrentColorIndex(selectedColors.length);
      setShowColorPicker(true);
    }
  };

  const handleDeleteColor = (index) => {
    if (selectedColors.length > 1) {
      const newColors = selectedColors.filter((_, i) => i !== index);
      setSelectedColors(newColors);
    }
  };

  const handleEditColor = (index) => {
    setTempColor(selectedColors[index]);
    setCurrentColorIndex(index);
    setShowColorPicker(true);
  };

  const handleSaveColor = () => {
    if (currentColorIndex !== null) {
      const newColors = [...selectedColors];
      newColors[currentColorIndex] = tempColor;
      setSelectedColors(newColors);
      setShowColorPicker(false);
      setCurrentColorIndex(null);
    }
  };

  const handleFontChange = (e) => {
    setSelectedFont(e.target.value);
  };

  const handleLogoUpload = (e) => {
    // In a real app, this would handle file upload
    // For this wireframe, we'll just simulate it
    setLogoUrl("/api/placeholder/200/60");
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header />
      <header className="bg-white shadow">
        <div className="mx-auto px-4 py-6 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">Brand Kit</h1>
          <button
            className="px-4 py-2 bg-blue-600 text-white rounded-md flex items-center gap-2"
            onClick={() => navigate(-1)}
          >
            <Save size={18} />
            Save Brand Kit
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 px-4 py-6 max-w-4xl mx-auto w-full">
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <h2 className="text-lg font-medium mb-4">Brand Colors</h2>
          <p className="text-gray-600 mb-4">
            Select up to 5 colors for your brand palette.
          </p>

          <div className="flex flex-wrap gap-4 mb-6">
            {selectedColors.map((color, index) => (
              <div key={index} className="relative">
                <div
                  className="w-16 h-16 rounded-md cursor-pointer shadow-sm"
                  style={{ backgroundColor: color }}
                  onClick={() => handleEditColor(index)}
                ></div>
                <div className="absolute -top-2 -right-2 bg-white rounded-full shadow p-1">
                  <Trash2
                    size={16}
                    className="text-red-500 cursor-pointer"
                    onClick={() => handleDeleteColor(index)}
                  />
                </div>
              </div>
            ))}

            {selectedColors.length < 5 && (
              <div
                className="w-16 h-16 rounded-md border-2 border-dashed border-gray-300 flex items-center justify-center cursor-pointer"
                onClick={handleAddColor}
              >
                <Plus size={24} className="text-gray-400" />
              </div>
            )}
          </div>

          {showColorPicker && (
            <div className="bg-gray-100 p-4 rounded-md mb-6">
              <h3 className="text-sm font-medium mb-2">Edit Color</h3>
              <div className="flex items-center gap-4">
                <div
                  className="w-12 h-12 rounded-md shadow-sm"
                  style={{ backgroundColor: tempColor }}
                ></div>
                <input
                  type="text"
                  value={tempColor}
                  onChange={(e) => setTempColor(e.target.value)}
                  className="border-gray-300 rounded-md shadow-sm"
                />
                <div
                  className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center cursor-pointer"
                  onClick={handleSaveColor}
                >
                  <Check size={16} className="text-white" />
                </div>
              </div>
              <div className="mt-4 grid grid-cols-8 gap-2">
                {[
                  "#F44336",
                  "#E91E63",
                  "#9C27B0",
                  "#673AB7",
                  "#3F51B5",
                  "#2196F3",
                  "#03A9F4",
                  "#00BCD4",
                  "#009688",
                  "#4CAF50",
                  "#8BC34A",
                  "#CDDC39",
                  "#FFEB3B",
                  "#FFC107",
                  "#FF9800",
                  "#FF5722",
                ].map((color) => (
                  <div
                    key={color}
                    className="w-8 h-8 rounded-md cursor-pointer"
                    style={{ backgroundColor: color }}
                    onClick={() => setTempColor(color)}
                  ></div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <h2 className="text-lg font-medium mb-4">Fonts</h2>
          <p className="text-gray-600 mb-4">
            Select a primary font for your brand.
          </p>

          <select
            value={selectedFont}
            onChange={handleFontChange}
            className="w-full border-gray-300 rounded-md shadow-sm py-2 px-3"
          >
            {fonts.map((font) => (
              <option key={font} value={font}>
                {font}
              </option>
            ))}
          </select>

          <div className="mt-6">
            <h3 className="text-sm font-medium mb-2">Preview</h3>
            <div className="p-4 border border-gray-200 rounded-md">
              <p className="text-3xl mb-2" style={{ fontFamily: selectedFont }}>
                Headline Text
              </p>
              <p className="text-base" style={{ fontFamily: selectedFont }}>
                This is how your regular text will appear using the{" "}
                {selectedFont} font family. It should be clear and readable
                across different screen sizes.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-medium mb-4">Logo Upload</h2>
          <p className="text-gray-600 mb-4">
            Upload your company logo (PNG or SVG format recommended).
          </p>

          <div className="flex items-start gap-6">
            <div className="flex-1">
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                {logoUrl ? (
                  <div className="flex flex-col items-center">
                    <img
                      src={logoUrl}
                      alt="Company logo"
                      className="max-w-full h-auto mb-4"
                    />
                    <button
                      className="text-red-600 text-sm font-medium flex items-center gap-1"
                      onClick={() => setLogoUrl("")}
                    >
                      <Trash2 size={14} />
                      Remove Logo
                    </button>
                  </div>
                ) : (
                  <div className="flex flex-col items-center">
                    <Upload size={32} className="text-gray-400 mb-2" />
                    <p className="text-sm text-gray-500 mb-4">
                      Drag and drop your logo here, or click to browse
                    </p>
                    <button
                      className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md text-sm"
                      onClick={handleLogoUpload}
                    >
                      Browse Files
                    </button>
                  </div>
                )}
              </div>
              <p className="text-xs text-gray-500 mt-2">
                Supported formats: PNG, SVG. Max size: 2MB.
              </p>
            </div>

            <div className="w-64">
              <h3 className="text-sm font-medium mb-2">Logo Preview</h3>
              <div className="flex flex-col gap-4">
                <div className="p-4 bg-white border border-gray-200 rounded-md flex items-center justify-center h-16">
                  {logoUrl ? (
                    <img
                      src={logoUrl}
                      alt="Logo preview light"
                      className="max-h-full"
                    />
                  ) : (
                    <p className="text-gray-400 text-sm">Light background</p>
                  )}
                </div>
                <div className="p-4 bg-gray-800 border border-gray-700 rounded-md flex items-center justify-center h-16">
                  {logoUrl ? (
                    <img
                      src={logoUrl}
                      alt="Logo preview dark"
                      className="max-h-full"
                    />
                  ) : (
                    <p className="text-gray-400 text-sm">Dark background</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default BrandKit;
