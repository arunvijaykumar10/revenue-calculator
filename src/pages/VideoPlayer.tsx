import {
  Check,
  ChevronRight,
  Globe,
  Maximize,
  Pause,
  Play,
  Settings,
  SkipBack,
  SkipForward,
  Volume2,
  VolumeX,
  X,
} from "lucide-react";
import { SetStateAction, useState } from "react";
import { useNavigate } from "react-router-dom";

const VideoPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(100);
  const [volume, setVolume] = useState(80);
  const [showVolumeSlider, setShowVolumeSlider] = useState(false);
  const [showLanguageMenu, setShowLanguageMenu] = useState(false);
  const [showSettingsMenu, setShowSettingsMenu] = useState(false);
  const [showQualityOptions, setShowQualityOptions] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState("English");
  const [subtitlesEnabled, setSubtitlesEnabled] = useState(true);
  const [currentQuality, setCurrentQuality] = useState("1080p");
  const [playbackSpeed, setPlaybackSpeed] = useState(1.0);
  const [showChapters, setShowChapters] = useState(false);
  const navigate = useNavigate();
  const languages = [
    { id: "en", name: "English", flag: "🇺🇸" },
    { id: "es", name: "Spanish", flag: "🇪🇸" },
    { id: "fr", name: "French", flag: "🇫🇷" },
    { id: "de", name: "German", flag: "🇩🇪" },
    { id: "ja", name: "Japanese", flag: "🇯🇵" },
  ];

  const qualityOptions = ["480p", "720p", "1080p"];
  const speedOptions = [0.5, 0.75, 1.0, 1.25, 1.5, 2.0];

  const chapters = [
    { id: 1, title: "Introduction", time: 0, duration: 15 },
    { id: 2, title: "Key Features", time: 15, duration: 25 },
    { id: 3, title: "Benefits", time: 40, duration: 20 },
    { id: 4, title: "How to Enroll", time: 60, duration: 30 },
    { id: 5, title: "Contact Information", time: 90, duration: 10 },
  ];

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleTimeUpdate = (e: {
    target: { value: SetStateAction<number> };
  }) => {
    setCurrentTime(e.target.value);
  };

  const handleVolumeChange = (e: {
    target: { value: string | SetStateAction<number> };
  }) => {
    setVolume(e.target.value);
    if (parseInt(e.target.value) === 0) {
      setIsMuted(true);
    } else {
      setIsMuted(false);
    }
  };

  const handleMuteToggle = () => {
    setIsMuted(!isMuted);
  };

  const handleLanguageChange = (language: SetStateAction<string>) => {
    setCurrentLanguage(language);
    setShowLanguageMenu(false);
  };

  const handleQualityChange = (quality: SetStateAction<string>) => {
    setCurrentQuality(quality);
    setShowQualityOptions(false);
  };

  const handleSpeedChange = (speed: SetStateAction<number>) => {
    setPlaybackSpeed(speed);
    setShowSettingsMenu(false);
  };

  const progressPercentage = (currentTime / duration) * 100;

  return (
    <div className="flex flex-col h-screen bg-gray-900">
      {/* Main content - would be the actual player */}
      <div
        className="relative flex-1 bg-black flex items-center justify-center overflow-hidden"
        onMouseEnter={() => setShowControls(true)}
        onMouseLeave={() => setShowControls(false)}
      >
        {/* Video placeholder */}
        <img
          src="/src/pages/images/venroll3.jpeg"
          alt="Video player"
          className="w-full h-full object-contain"
        />

        {/* Video current language indicator */}
        <div className="absolute top-4 left-4 bg-black bg-opacity-70 text-white p-2 rounded-full hover:bg-opacity-90 flex items-center">
          <Globe size={14} className="mr-2" />
          <span className="text-sm">{currentLanguage}</span>
        </div>
        <button
          className="absolute top-4 right-4 bg-white bg-opacity-70 text-white px-3 py-1 rounded-full flex items-center z-10"
          onClick={() => navigate("/videoeditor")}
        >
          <X size={16} className="text-black" />
          <span className="text-sm ml-2 text-black">Close</span>
        </button>

        {/* Chapter title when changing chapters */}
        <div className="absolute top-1/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-black bg-opacity-80 text-white px-6 py-4 rounded-lg text-center">
          <h3 className="text-lg font-semibold">Chapter 2: Key Features</h3>
          <p className="text-sm text-gray-300 mt-1">25:00 mins</p>
        </div>

        {/* Language change notification */}
        <div className="absolute top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-blue-600 bg-opacity-90 text-white px-6 py-4 rounded-lg text-center">
          <h3 className="text-lg font-semibold">Audio switched to Spanish</h3>
          <p className="text-sm text-gray-100 mt-1">Subtitles enabled</p>
        </div>

        {/* Controls overlay - visible on hover or tap */}
        {showControls && (
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent flex flex-col justify-end p-4">
            {/* Progress bar */}
            <div className="w-full mb-4 relative">
              <div className="relative h-1 bg-gray-600 rounded overflow-hidden">
                {/* Chapter markers */}
                {chapters.map((chapter) => (
                  <div
                    key={chapter.id}
                    className="absolute h-3 w-1 bg-white top-1/2 transform -translate-y-1/2"
                    style={{ left: `${(chapter.time / duration) * 100}%` }}
                    title={chapter.title}
                  ></div>
                ))}
                <div
                  className="absolute h-full bg-blue-600"
                  style={{ width: `${progressPercentage}%` }}
                ></div>
                <input
                  type="range"
                  min="0"
                  max={duration}
                  value={currentTime}
                  onChange={handleTimeUpdate}
                  className="absolute w-full h-6 opacity-0 cursor-pointer top-1/2 transform -translate-y-1/2"
                />
              </div>
              <div className="flex justify-between text-gray-300 text-xs mt-1">
                <span>{formatTime(currentTime)}</span>
                <span>{formatTime(duration)}</span>
              </div>
            </div>

            {/* Control buttons */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <button
                  className="text-white hover:text-blue-400 transition-colors"
                  onClick={handlePlayPause}
                >
                  {isPlaying ? <Pause size={28} /> : <Play size={28} />}
                </button>

                <button className="text-white hover:text-blue-400 transition-colors">
                  <SkipBack size={20} />
                </button>

                <button className="text-white hover:text-blue-400 transition-colors">
                  <SkipForward size={20} />
                </button>

                <div className="relative">
                  <button
                    className="text-white hover:text-blue-400 transition-colors"
                    onClick={handleMuteToggle}
                    onMouseEnter={() => setShowVolumeSlider(true)}
                  >
                    {isMuted || volume === 0 ? (
                      <VolumeX size={20} />
                    ) : (
                      <Volume2 size={20} />
                    )}
                  </button>

                  {showVolumeSlider && (
                    <div
                      className="absolute bottom-full left-0 mb-2 bg-gray-900 bg-opacity-90 p-2 rounded-md"
                      onMouseEnter={() => setShowVolumeSlider(true)}
                      onMouseLeave={() => setShowVolumeSlider(false)}
                    >
                      <input
                        type="range"
                        min="0"
                        max="100"
                        value={volume}
                        onChange={handleVolumeChange}
                        className="w-24 cursor-pointer"
                      />
                    </div>
                  )}
                </div>

                <div className="text-white text-sm">
                  {formatTime(currentTime)} / {formatTime(duration)}
                </div>
              </div>

              <div className="flex items-center space-x-4">
                {/* Language selector */}
                <div className="relative">
                  <button
                    className="text-white hover:text-blue-400 transition-colors flex items-center"
                    onClick={() => {
                      setShowLanguageMenu(!showLanguageMenu);
                      setShowSettingsMenu(false);
                      setShowChapters(false);
                    }}
                  >
                    <Globe size={20} />
                  </button>

                  {showLanguageMenu && (
                    <div className="absolute bottom-full right-0 mb-2 bg-gray-900 bg-opacity-90 rounded-md py-2 w-48">
                      <div className="px-3 py-2 border-b border-gray-700">
                        <h3 className="text-white text-sm font-medium">
                          Audio Language
                        </h3>
                      </div>
                      {languages.map((language) => (
                        <button
                          key={language.id}
                          className="w-full px-3 py-2 text-left text-white hover:bg-gray-800 flex items-center justify-between"
                          onClick={() => handleLanguageChange(language.name)}
                        >
                          <span className="flex items-center">
                            <span className="mr-2">{language.flag}</span>
                            <span>{language.name}</span>
                          </span>
                          {currentLanguage === language.name && (
                            <Check size={16} className="text-blue-400" />
                          )}
                        </button>
                      ))}
                      <div className="px-3 py-2 border-t border-b border-gray-700 mt-1">
                        <h3 className="text-white text-sm font-medium">
                          Subtitles
                        </h3>
                      </div>
                      <div className="px-3 py-2 flex items-center justify-between">
                        <span className="text-white text-sm">
                          Enable Subtitles
                        </span>
                        <button
                          className={`w-10 h-5 rounded-full ${
                            subtitlesEnabled ? "bg-blue-600" : "bg-gray-600"
                          } relative`}
                          onClick={() => setSubtitlesEnabled(!subtitlesEnabled)}
                        >
                          <span
                            className={`absolute w-4 h-4 rounded-full bg-white top-0.5 transition-transform ${
                              subtitlesEnabled ? "right-0.5" : "left-0.5"
                            }`}
                          ></span>
                        </button>
                      </div>
                      {subtitlesEnabled &&
                        languages.map((language) => (
                          <button
                            key={`sub-${language.id}`}
                            className="w-full px-3 py-2 text-left text-white hover:bg-gray-800 flex items-center justify-between"
                          >
                            <span className="flex items-center">
                              <span className="mr-2">{language.flag}</span>
                              <span>{language.name}</span>
                            </span>
                            <Check
                              size={16}
                              className="text-blue-400 opacity-0"
                            />
                          </button>
                        ))}
                    </div>
                  )}
                </div>

                {/* Chapters button */}
                <div className="relative">
                  <button
                    className="text-white hover:text-blue-400 transition-colors"
                    onClick={() => {
                      setShowChapters(!showChapters);
                      setShowLanguageMenu(false);
                      setShowSettingsMenu(false);
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <rect x="2" y="6" width="20" height="12" rx="2" />
                      <line x1="2" y1="12" x2="22" y2="12" />
                    </svg>
                  </button>

                  {showChapters && (
                    <div className="absolute bottom-full right-0 mb-2 bg-gray-900 bg-opacity-90 rounded-md py-2 w-64">
                      <div className="px-3 py-2 border-b border-gray-700">
                        <h3 className="text-white text-sm font-medium">
                          Chapters
                        </h3>
                      </div>
                      {chapters.map((chapter) => (
                        <button
                          key={chapter.id}
                          className={`w-full px-3 py-2 text-left hover:bg-gray-800 flex items-center justify-between ${
                            currentTime >= chapter.time &&
                            currentTime < chapter.time + chapter.duration
                              ? "bg-blue-900 bg-opacity-40 text-blue-400"
                              : "text-white"
                          }`}
                        >
                          <span>{chapter.title}</span>
                          <span className="text-sm text-gray-400">
                            {formatTime(chapter.time)}
                          </span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Settings menu */}
                <div className="relative">
                  <button
                    className="text-white hover:text-blue-400 transition-colors"
                    onClick={() => {
                      setShowSettingsMenu(!showSettingsMenu);
                      setShowLanguageMenu(false);
                      setShowChapters(false);
                      setShowQualityOptions(false);
                    }}
                  >
                    <Settings size={20} />
                  </button>

                  {showSettingsMenu && (
                    <div className="absolute bottom-full right-0 mb-2 bg-gray-900 bg-opacity-90 rounded-md w-56">
                      {!showQualityOptions && (
                        <>
                          <div className="px-3 py-2 border-b border-gray-700">
                            <h3 className="text-white text-sm font-medium">
                              Settings
                            </h3>
                          </div>
                          <button
                            className="w-full px-3 py-2 text-left text-white hover:bg-gray-800 flex items-center justify-between"
                            onClick={() => setShowQualityOptions(true)}
                          >
                            <span>Quality</span>
                            <div className="flex items-center">
                              <span className="text-gray-400 text-sm mr-2">
                                {currentQuality}
                              </span>
                              <ChevronRight size={16} />
                            </div>
                          </button>
                          <div className="w-full px-3 py-2 text-left text-white hover:bg-gray-800">
                            <div className="flex items-center justify-between mb-2">
                              <span>Playback Speed</span>
                              <span className="text-gray-400 text-sm">
                                {playbackSpeed}x
                              </span>
                            </div>
                            <div className="flex justify-between mt-2">
                              {speedOptions.map((speed) => (
                                <button
                                  key={speed}
                                  className={`w-8 h-8 rounded-full flex items-center justify-center ${
                                    playbackSpeed === speed
                                      ? "bg-blue-600 text-white"
                                      : "bg-gray-800 text-gray-400 hover:bg-gray-700"
                                  }`}
                                  onClick={() => handleSpeedChange(speed)}
                                >
                                  <span className="text-xs">{speed}x</span>
                                </button>
                              ))}
                            </div>
                          </div>
                        </>
                      )}

                      {showQualityOptions && (
                        <>
                          <div className="px-3 py-2 border-b border-gray-700 flex items-center">
                            <button
                              className="mr-2 text-white"
                              onClick={() => setShowQualityOptions(false)}
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              >
                                <path d="M15 18l-6-6 6-6" />
                              </svg>
                            </button>
                            <h3 className="text-white text-sm font-medium">
                              Quality
                            </h3>
                          </div>
                          {qualityOptions.map((quality) => (
                            <button
                              key={quality}
                              className="w-full px-3 py-2 text-left text-white hover:bg-gray-800 flex items-center justify-between"
                              onClick={() => handleQualityChange(quality)}
                            >
                              <span>{quality}</span>
                              {currentQuality === quality && (
                                <Check size={16} className="text-blue-400" />
                              )}
                            </button>
                          ))}
                          <button className="w-full px-3 py-2 text-left text-white hover:bg-gray-800 flex items-center justify-between border-t border-gray-700">
                            <span>Auto</span>
                          </button>
                        </>
                      )}
                    </div>
                  )}
                </div>

                <button className="text-white hover:text-blue-400 transition-colors">
                  <Maximize size={20} />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Related videos section */}
      <div className="bg-gray-800 p-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-white text-lg font-semibold">More Videos</h2>
          <button className="text-blue-400 text-sm hover:underline">
            View All
          </button>
        </div>

        <div className="grid grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((item) => (
            <div
              key={item}
              className="bg-gray-700 rounded-lg overflow-hidden cursor-pointer hover:ring-2 hover:ring-blue-500 transition-all"
            >
              <div className="relative">
                <img
                  src={`/src/pages/images/venroll7.jpeg`}
                  alt={`Related video ${item}`}
                  className="w-full h-32 object-cover"
                />
                <div className="absolute bottom-2 right-2 bg-black bg-opacity-70 text-white text-xs px-1 rounded">
                  3:45
                </div>
              </div>
              <div className="p-2">
                <h3 className="text-white font-medium text-sm">
                  Retirement Benefits Explained {item}
                </h3>
                <p className="text-gray-400 text-xs mt-1">Updated April 2025</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;
