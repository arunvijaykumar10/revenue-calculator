import {
  Check,
  CheckCircle,
  ChevronDown,
  ChevronRight,
  Download,
  Edit,
  FileText,
  Globe,
  Info,
  Loader,
  Mic,
  Music,
  Pause,
  Play,
  RefreshCw,
  Save,
} from "lucide-react";
import { SetStateAction, useState } from "react";
import { useNavigate } from "react-router-dom";

const AudioTranslationTool = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [audioUploaded, setAudioUploaded] = useState(false);
  const [isTranscribing, setIsTranscribing] = useState(false);
  const [transcriptionComplete, setTranscriptionComplete] = useState(false);
  const [isTranslating, setIsTranslating] = useState(false);
  const [translationComplete, setTranslationComplete] = useState(false);
  const [isGeneratingVoices, setIsGeneratingVoices] = useState(false);
  const [voiceGenerationComplete, setVoiceGenerationComplete] = useState(false);
  const [showTranscriptEditor, setShowTranscriptEditor] = useState(false);
  const [showAdvancedSettings, setShowAdvancedSettings] = useState(false);
  const [selectedLanguages, setSelectedLanguages] = useState(["es", "fr"]);
  const [currentPlayingAudio, setCurrentPlayingAudio] = useState<string | null>(null);
  const navigate = useNavigate();

  const languages = [
    {
      code: "en",
      name: "English",
      flag: "🇺🇸",
      native: "English",
      voiceOptions: ["Male (Mark)", "Female (Emily)", "Male (John)"],
    },
    {
      code: "es",
      name: "Spanish",
      flag: "🇪🇸",
      native: "Español",
      voiceOptions: ["Male (Carlos)", "Female (Sofia)", "Female (Elena)"],
    },
    {
      code: "fr",
      name: "French",
      flag: "🇫🇷",
      native: "Français",
      voiceOptions: ["Male (Jean)", "Female (Marie)", "Male (Pierre)"],
    },
    {
      code: "de",
      name: "German",
      flag: "🇩🇪",
      native: "Deutsch",
      voiceOptions: ["Male (Hans)", "Female (Anna)", "Female (Laura)"],
    },
    {
      code: "it",
      name: "Italian",
      flag: "🇮🇹",
      native: "Italiano",
      voiceOptions: ["Male (Marco)", "Female (Giulia)"],
    },
    {
      code: "ja",
      name: "Japanese",
      flag: "🇯🇵",
      native: "日本語",
      voiceOptions: ["Male (Takeshi)", "Female (Yuki)"],
    },
    {
      code: "zh",
      name: "Chinese",
      flag: "🇨🇳",
      native: "中文",
      voiceOptions: ["Male (Li)", "Female (Wei)"],
    },
    {
      code: "ru",
      name: "Russian",
      flag: "🇷🇺",
      native: "Русский",
      voiceOptions: ["Male (Ivan)", "Female (Olga)"],
    },
    {
      code: "pt",
      name: "Portuguese",
      flag: "🇵🇹",
      native: "Português",
      voiceOptions: ["Male (João)", "Female (Maria)"],
    },
    {
      code: "ar",
      name: "Arabic",
      flag: "🇸🇦",
      native: "العربية",
      voiceOptions: ["Male (Ahmed)", "Female (Fatima)"],
    },
    {
      code: "hi",
      name: "Hindi",
      flag: "🇮🇳",
      native: "हिन्दी",
      voiceOptions: ["Male (Raj)", "Female (Priya)"],
    },
  ];

  const toggleLanguage = (code: string) => {
    if (selectedLanguages.includes(code)) {
      setSelectedLanguages(selectedLanguages.filter((lang) => lang !== code));
    } else {
      setSelectedLanguages([...selectedLanguages, code]);
    }
  };

  const handleUploadClick = () => {
    setAudioUploaded(true);
  };

  const handleTranscribeClick = () => {
    setIsTranscribing(true);
    // Simulate transcription process
    setTimeout(() => {
      setIsTranscribing(false);
      setTranscriptionComplete(true);
    }, 1500);
  };

  const handleTranslateClick = () => {
    setIsTranslating(true);
    // Simulate translation process
    setTimeout(() => {
      setIsTranslating(false);
      setTranslationComplete(true);
    }, 2000);
  };

  const handleGenerateVoicesClick = () => {
    setIsGeneratingVoices(true);
    // Simulate voice generation process
    setTimeout(() => {
      setIsGeneratingVoices(false);
      setVoiceGenerationComplete(true);
    }, 3000);
  };

  const handlePlayAudio = (language: string | null) => {
    if (currentPlayingAudio === language) {
      setCurrentPlayingAudio(null);
    } else {
      setCurrentPlayingAudio(language);
    }
  };

  const handleNextStep = () => {
    setCurrentStep(currentStep + 1);
  };

  const handlePreviousStep = () => {
    setCurrentStep(currentStep - 1);
  };

  const getLanguageByCode = (code: string) => {
    return languages.find((lang) => lang.code === code);
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex justify-between items-center">
          <h1 className="text-xl font-semibold text-gray-800">
            Audio Translation & Voice Generation
          </h1>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Steps sidebar */}
        <div className="w-64 bg-white border-r border-gray-200 py-6 flex flex-col">
          <div className="px-6 pb-4 border-b border-gray-200">
            <h2 className="text-sm font-medium text-gray-500 uppercase tracking-wider">
              Process Steps
            </h2>
          </div>

          <div className="flex-1 px-6 py-4 overflow-auto">
            <ol className="space-y-6">
              <li className="relative flex items-start">
                <div
                  className={`flex-shrink-0 h-6 w-6 rounded-full flex items-center justify-center ${
                    currentStep === 1
                      ? "bg-blue-600 text-white"
                      : audioUploaded
                      ? "bg-green-100 text-green-600"
                      : "bg-gray-200 text-gray-500"
                  }`}
                >
                  {audioUploaded ? (
                    <CheckCircle size={16} />
                  ) : (
                    <span className="text-xs font-medium">1</span>
                  )}
                </div>
                <div className="ml-3">
                  <h3
                    className={`text-sm font-medium ${
                      currentStep === 1
                        ? "text-blue-600"
                        : audioUploaded
                        ? "text-green-600"
                        : "text-gray-700"
                    }`}
                  >
                    Upload Audio
                  </h3>
                  <p className="mt-1 text-xs text-gray-500">
                    Upload original audio file
                  </p>
                </div>
              </li>

              <li className="relative flex items-start">
                <div
                  className={`flex-shrink-0 h-6 w-6 rounded-full flex items-center justify-center ${
                    currentStep === 2
                      ? "bg-blue-600 text-white"
                      : transcriptionComplete
                      ? "bg-green-100 text-green-600"
                      : "bg-gray-200 text-gray-500"
                  }`}
                >
                  {transcriptionComplete ? (
                    <CheckCircle size={16} />
                  ) : (
                    <span className="text-xs font-medium">2</span>
                  )}
                </div>
                <div className="ml-3">
                  <h3
                    className={`text-sm font-medium ${
                      currentStep === 2
                        ? "text-blue-600"
                        : transcriptionComplete
                        ? "text-green-600"
                        : "text-gray-700"
                    }`}
                  >
                    Transcribe Audio
                  </h3>
                  <p className="mt-1 text-xs text-gray-500">
                    Extract text from audio
                  </p>
                </div>
              </li>

              <li className="relative flex items-start">
                <div
                  className={`flex-shrink-0 h-6 w-6 rounded-full flex items-center justify-center ${
                    currentStep === 3
                      ? "bg-blue-600 text-white"
                      : translationComplete
                      ? "bg-green-100 text-green-600"
                      : "bg-gray-200 text-gray-500"
                  }`}
                >
                  {translationComplete ? (
                    <CheckCircle size={16} />
                  ) : (
                    <span className="text-xs font-medium">3</span>
                  )}
                </div>
                <div className="ml-3">
                  <h3
                    className={`text-sm font-medium ${
                      currentStep === 3
                        ? "text-blue-600"
                        : translationComplete
                        ? "text-green-600"
                        : "text-gray-700"
                    }`}
                  >
                    Translate Text
                  </h3>
                  <p className="mt-1 text-xs text-gray-500">
                    Translate to target languages
                  </p>
                </div>
              </li>

              <li className="relative flex items-start">
                <div
                  className={`flex-shrink-0 h-6 w-6 rounded-full flex items-center justify-center ${
                    currentStep === 4
                      ? "bg-blue-600 text-white"
                      : voiceGenerationComplete
                      ? "bg-green-100 text-green-600"
                      : "bg-gray-200 text-gray-500"
                  }`}
                >
                  {voiceGenerationComplete ? (
                    <CheckCircle size={16} />
                  ) : (
                    <span className="text-xs font-medium">4</span>
                  )}
                </div>
                <div className="ml-3">
                  <h3
                    className={`text-sm font-medium ${
                      currentStep === 4
                        ? "text-blue-600"
                        : voiceGenerationComplete
                        ? "text-green-600"
                        : "text-gray-700"
                    }`}
                  >
                    Generate Voices
                  </h3>
                  <p className="mt-1 text-xs text-gray-500">
                    Create natural voice recordings
                  </p>
                </div>
              </li>
            </ol>
          </div>

          <div className="px-6 pt-4 border-t border-gray-200">
            <div className="rounded-md bg-blue-50 p-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <Info size={16} className="text-blue-400" />
                </div>
                <div className="ml-3">
                  <p className="text-xs text-blue-700">
                    Once complete, audio files will be saved to your Asset
                    Manager automatically.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main panel */}
        <div className="flex-1 flex flex-col overflow-auto">
          <div className="p-6">
            {/* Step 1: Upload Audio */}
            {currentStep === 1 && (
              <div>
                <div className="mb-4">
                  <h2 className="text-lg font-medium text-gray-900">
                    Step 1: Upload Audio
                  </h2>
                  <p className="mt-1 text-sm text-gray-500">
                    Upload the original audio file that you want to transcribe
                    and translate.
                  </p>
                </div>

                {!audioUploaded ? (
                  <div className="mt-6">
                    <div className="max-w-xl mx-auto">
                      <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                        <div className="space-y-1 text-center">
                          <Music className="mx-auto h-12 w-12 text-gray-400" />
                          <div className="flex text-sm text-gray-600">
                            <label
                              htmlFor="file-upload"
                              className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500"
                            >
                              <span>Upload an audio file</span>
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
                            MP3, WAV, M4A files up to 200MB
                          </p>
                        </div>
                      </div>

                      <div className="mt-6">
                        <div className="font-medium text-gray-900 mb-2">
                          Or record audio directly
                        </div>
                        <button className="flex items-center justify-center w-full py-3 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
                          <Mic size={18} className="mr-2 text-gray-500" />
                          Start Recording
                        </button>
                      </div>

                      <div className="mt-6">
                        <div className="font-medium text-gray-900 mb-2">
                          Or select from Asset Manager
                        </div>
                        <button className="flex items-center justify-center w-full py-3 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
                          <Music size={18} className="mr-2 text-gray-500" />
                          Browse Audio Assets
                        </button>
                      </div>

                      <div className="mt-8 flex justify-end">
                        <button
                          className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
                          onClick={handleUploadClick}
                        >
                          Continue with Sample Audio
                        </button>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="mt-6 max-w-xl mx-auto">
                    <div className="bg-white shadow rounded-lg p-4 border border-gray-200">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-12 w-12 bg-blue-100 rounded-md flex items-center justify-center">
                          <Music size={24} className="text-blue-600" />
                        </div>
                        <div className="ml-4 flex-1">
                          <h3 className="text-sm font-medium text-gray-900">
                            welcome_message.mp3
                          </h3>
                          <p className="text-xs text-gray-500">
                            2.4 MB · 1:35 · Uploaded just now
                          </p>
                          <div className="mt-1 flex items-center">
                            <button className="inline-flex items-center text-xs text-blue-600 hover:text-blue-500">
                              <Play size={14} className="mr-1" />
                              Play
                            </button>
                            <span className="mx-2 text-gray-300">|</span>
                            <button className="inline-flex items-center text-xs text-gray-600 hover:text-gray-500">
                              Replace
                            </button>
                          </div>
                        </div>
                        <div>
                          <CheckCircle size={20} className="text-green-500" />
                        </div>
                      </div>
                    </div>

                    <div className="mt-6">
                      <div className="font-medium text-gray-900 mb-2">
                        Select target languages for translation
                      </div>
                      <p className="text-sm text-gray-500 mb-4">
                        Choose one or more languages to translate your audio
                        into. You can select multiple languages.
                      </p>

                      <div className="grid grid-cols-2 gap-3">
                        {languages.map((language) => (
                          <div
                            key={language.code}
                            className={`flex items-center p-3 border rounded-md cursor-pointer ${
                              selectedLanguages.includes(language.code)
                                ? "border-blue-500 bg-blue-50"
                                : "border-gray-300 hover:bg-gray-50"
                            }`}
                            onClick={() => toggleLanguage(language.code)}
                          >
                            <div
                              className={`flex-shrink-0 h-5 w-5 rounded border ${
                                selectedLanguages.includes(language.code)
                                  ? "border-blue-500 bg-blue-500"
                                  : "border-gray-300"
                              } flex items-center justify-center`}
                            >
                              {selectedLanguages.includes(language.code) && (
                                <Check size={12} className="text-white" />
                              )}
                            </div>
                            <span className="ml-2 text-sm">
                              {language.flag} {language.name}
                            </span>
                            <span className="ml-1 text-xs text-gray-500">
                              ({language.native})
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="mt-8 flex justify-end">
                      <button
                        className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
                        onClick={handleNextStep}
                      >
                        Continue to Transcription
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Step 2: Transcribe Audio */}
            {currentStep === 2 && (
              <div>
                <div className="mb-4">
                  <h2 className="text-lg font-medium text-gray-900">
                    Step 2: Transcribe Audio
                  </h2>
                  <p className="mt-1 text-sm text-gray-500">
                    Our AI will extract text from your audio file. You can
                    review and edit the transcript if needed.
                  </p>
                </div>

                <div className="mt-6 max-w-3xl mx-auto">
                  <div className="bg-white shadow rounded-lg p-4 border border-gray-200">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10 bg-blue-100 rounded-md flex items-center justify-center">
                          <FileText size={20} className="text-blue-600" />
                        </div>
                        <div className="ml-3">
                          <h3 className="text-sm font-medium text-gray-900">
                            Original Audio: welcome_message.mp3
                          </h3>
                          <p className="text-xs text-gray-500">
                            English (Detected) · 1:35
                          </p>
                        </div>
                      </div>

                      {!isTranscribing && !transcriptionComplete && (
                        <button
                          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
                          onClick={handleTranscribeClick}
                        >
                          Start Transcription
                        </button>
                      )}

                      {isTranscribing && (
                        <div className="inline-flex items-center px-4 py-2 text-sm font-medium text-blue-700">
                          <RefreshCw size={16} className="mr-2 animate-spin" />
                          Transcribing...
                        </div>
                      )}

                      {transcriptionComplete && !showTranscriptEditor && (
                        <button
                          className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                          onClick={() => setShowTranscriptEditor(true)}
                        >
                          <Edit size={16} className="mr-2" />
                          Edit Transcript
                        </button>
                      )}

                      {transcriptionComplete && showTranscriptEditor && (
                        <button
                          className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                          onClick={() => setShowTranscriptEditor(false)}
                        >
                          <Save size={16} className="mr-2" />
                          Save Edits
                        </button>
                      )}
                    </div>

                    {isTranscribing && (
                      <div className="p-8 flex flex-col items-center justify-center">
                        <Loader
                          size={36}
                          className="text-blue-500 animate-spin mb-4"
                        />
                        <p className="text-sm text-gray-600">
                          Transcribing audio... This may take a minute.
                        </p>
                      </div>
                    )}

                    {transcriptionComplete && !showTranscriptEditor && (
                      <div className="p-4 bg-gray-50 rounded-md">
                        <p className="text-sm text-gray-800 leading-relaxed">
                          Welcome to our retirement benefits program. We're
                          excited to guide you through the process of planning
                          for your future financial security. Our comprehensive
                          program is designed to help you maximize your
                          retirement savings and provide peace of mind for your
                          future.
                        </p>
                        <p className="text-sm text-gray-800 leading-relaxed mt-4">
                          In this video, we'll cover the key features of our
                          retirement plan, including contribution options,
                          investment choices, and the employer matching program.
                          We'll also discuss important deadlines and how to make
                          changes to your plan as your needs evolve.
                        </p>
                      </div>
                    )}

                    {transcriptionComplete && showTranscriptEditor && (
                      <div className="p-4 bg-gray-50 rounded-md">
                        <textarea
                          className="w-full h-32 p-3 border border-gray-300 rounded-md text-sm"
                          defaultValue="Welcome to our retirement benefits program. We're excited to guide you through the process of planning for your future financial security. Our comprehensive program is designed to help you maximize your retirement savings and provide peace of mind for your future.

In this video, we'll cover the key features of our retirement plan, including contribution options, investment choices, and the employer matching program. We'll also discuss important deadlines and how to make changes to your plan as your needs evolve."
                        />
                        <div className="mt-2 text-xs text-gray-500 flex items-center">
                          <Info size={12} className="mr-1" />
                          Editing the transcript will affect all translations
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="mt-8 flex justify-between">
                    <button
                      className="inline-flex justify-center py-2 px-4 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                      onClick={handlePreviousStep}
                    >
                      Back
                    </button>
                    <button
                      className={`inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white ${
                        transcriptionComplete
                          ? "bg-blue-600 hover:bg-blue-700"
                          : "bg-gray-400 cursor-not-allowed"
                      }`}
                      onClick={handleNextStep}
                      disabled={!transcriptionComplete}
                    >
                      Continue to Translation
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Translate Text */}
            {currentStep === 3 && (
              <div>
                <div className="mb-4">
                  <h2 className="text-lg font-medium text-gray-900">
                    Step 3: Translate Text
                  </h2>
                  <p className="mt-1 text-sm text-gray-500">
                    Translate the transcript into your selected target
                    languages.
                  </p>
                </div>

                <div className="mt-6 max-w-4xl mx-auto">
                  <div className="bg-white shadow rounded-lg p-4 border border-gray-200 mb-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10 bg-blue-100 rounded-md flex items-center justify-center">
                          <FileText size={20} className="text-blue-600" />
                        </div>
                        <div className="ml-3">
                          <h3 className="text-sm font-medium text-gray-900">
                            Original Transcript (English)
                          </h3>
                          <div className="flex items-center text-xs text-gray-500">
                            <CheckCircle
                              size={12}
                              className="text-green-500 mr-1"
                            />
                            Transcription complete
                          </div>
                        </div>
                      </div>

                      {!isTranslating && !translationComplete && (
                        <button
                          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
                          onClick={handleTranslateClick}
                        >
                          Translate to {selectedLanguages.length} languages
                        </button>
                      )}

                      {isTranslating && (
                        <div className="inline-flex items-center px-4 py-2 text-sm font-medium text-blue-700">
                          <RefreshCw size={16} className="mr-2 animate-spin" />
                          Translating...
                        </div>
                      )}

                      {translationComplete && (
                        <div className="inline-flex items-center px-4 py-2 text-sm font-medium text-green-700 bg-green-50 rounded-md">
                          <CheckCircle size={16} className="mr-2" />
                          Translation Complete
                        </div>
                      )}
                    </div>

                    <div className="p-3 bg-gray-50 rounded-md">
                      <p className="text-sm text-gray-800 leading-relaxed mb-2">
                        Welcome to our retirement benefits program. We're
                        excited to guide you through the process of planning for
                        your future financial security. Our comprehensive
                        program is designed to help you maximize your retirement
                        savings and provide peace of mind for your future.
                      </p>
                      <p className="text-sm text-gray-800 leading-relaxed">
                        In this video, we'll cover the key features of our
                        retirement plan, including contribution options,
                        investment choices, and the employer matching program.
                        We'll also discuss important deadlines and how to make
                        changes to your plan as your needs evolve.
                      </p>
                    </div>
                  </div>

                  {isTranslating && (
                    <div className="bg-white shadow rounded-lg p-8 border border-gray-200 mb-6 flex flex-col items-center justify-center">
                      <Loader
                        size={36}
                        className="text-blue-500 animate-spin mb-4"
                      />
                      <p className="text-sm text-gray-600">
                        Translating to {selectedLanguages.length} languages...
                      </p>
                      <p className="text-xs text-gray-500 mt-2">
                        This may take a few moments
                      </p>
                    </div>
                  )}

                  {translationComplete && (
                    <div className="space-y-6">
                      {selectedLanguages.map((langCode) => {
                        const language = getLanguageByCode(langCode);
                        return (
                          <div
                            key={langCode}
                            className="bg-white shadow rounded-lg p-4 border border-gray-200"
                          >
                            <div className="flex items-center justify-between mb-4">
                              <div className="flex items-center">
                                <div className="flex-shrink-0 h-10 w-10 bg-green-100 rounded-md flex items-center justify-center">
                                  <Globe size={20} className="text-green-600" />
                                </div>
                                <div className="ml-3">
                                  <h3 className="text-sm font-medium text-gray-900">
                                    {language?.flag} {language?.name} (
                                    {language?.native})
                                  </h3>
                                  <div className="flex items-center text-xs text-gray-500">
                                    <CheckCircle
                                      size={12}
                                      className="text-green-500 mr-1"
                                    />
                                    Translation complete
                                  </div>
                                </div>
                              </div>

                              <button
                                className="inline-flex items-center px-3 py-1 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                                onClick={() => setShowTranscriptEditor(true)}
                              >
                                <Edit size={14} className="mr-1" />
                                Edit
                              </button>
                            </div>

                            <div className="p-3 bg-gray-50 rounded-md">
                              {langCode === "es" && (
                                <>
                                  <p className="text-sm text-gray-800 leading-relaxed mb-2">
                                    Bienvenido a nuestro programa de beneficios
                                    de jubilación. Estamos emocionados de
                                    guiarlo a través del proceso de
                                    planificación para su futura seguridad
                                    financiera. Nuestro programa integral está
                                    diseñado para ayudarlo a maximizar sus
                                    ahorros para la jubilación y brindarle
                                    tranquilidad para su futuro.
                                  </p>
                                  <p className="text-sm text-gray-800 leading-relaxed">
                                    En este video, cubriremos las
                                    características clave de nuestro plan de
                                    jubilación, incluidas las opciones de
                                    contribución, las opciones de inversión y el
                                    programa de contribución del empleador.
                                    También discutiremos fechas límite
                                    importantes y cómo realizar cambios en su
                                    plan a medida que evolucionen sus
                                    necesidades.
                                  </p>
                                </>
                              )}

                              {langCode === "fr" && (
                                <>
                                  <p className="text-sm text-gray-800 leading-relaxed mb-2">
                                    Bienvenue dans notre programme d'avantages
                                    de retraite. Nous sommes ravis de vous
                                    guider tout au long du processus de
                                    planification de votre future sécurité
                                    financière. Notre programme complet est
                                    conçu pour vous aider à maximiser votre
                                    épargne-retraite et à vous assurer la
                                    tranquillité d'esprit pour votre avenir.
                                  </p>
                                  <p className="text-sm text-gray-800 leading-relaxed">
                                    Dans cette vidéo, nous couvrirons les
                                    caractéristiques principales de notre plan
                                    de retraite, y compris les options de
                                    cotisation, les choix d'investissement et le
                                    programme d'abondement de l'employeur. Nous
                                    discuterons également des délais importants
                                    et de la façon de modifier votre plan à
                                    mesure que vos besoins évoluent.
                                  </p>
                                </>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}

                  <div className="mt-8 flex justify-between">
                    <button
                      className="inline-flex justify-center py-2 px-4 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                      onClick={handlePreviousStep}
                    >
                      Back
                    </button>
                    <button
                      className={`inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white ${
                        translationComplete
                          ? "bg-blue-600 hover:bg-blue-700"
                          : "bg-gray-400 cursor-not-allowed"
                      }`}
                      onClick={handleNextStep}
                      disabled={!translationComplete}
                    >
                      Continue to Voice Generation
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Step 4: Generate Voices */}
            {currentStep === 4 && (
              <div>
                <div className="mb-4">
                  <h2 className="text-lg font-medium text-gray-900">
                    Step 4: Generate Voices
                  </h2>
                  <p className="mt-1 text-sm text-gray-500">
                    Create natural-sounding voiceovers using AI voice technology
                    in your selected languages.
                  </p>
                </div>

                <div className="mt-6 max-w-4xl mx-auto">
                  <div className="bg-white shadow rounded-lg p-4 border border-gray-200 mb-6">
                    <div className="mb-4 border-b border-gray-200 pb-4">
                      <div className="flex items-center justify-between">
                        <h3 className="text-base font-medium text-gray-900">
                          Voice Settings
                        </h3>
                        <button
                          className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900"
                          onClick={() =>
                            setShowAdvancedSettings(!showAdvancedSettings)
                          }
                        >
                          {showAdvancedSettings ? "Hide" : "Show"} Advanced
                          Settings
                          {showAdvancedSettings ? (
                            <ChevronDown size={16} className="ml-1" />
                          ) : (
                            <ChevronRight size={16} className="ml-1" />
                          )}
                        </button>
                      </div>

                      {showAdvancedSettings && (
                        <div className="mt-4 space-y-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Speaking Rate
                            </label>
                            <div className="flex items-center">
                              <span className="text-xs text-gray-500 mr-2">
                                Slow
                              </span>
                              <input
                                type="range"
                                min="0.5"
                                max="2"
                                step="0.1"
                                defaultValue="1"
                                className="w-full"
                              />
                              <span className="text-xs text-gray-500 ml-2">
                                Fast
                              </span>
                            </div>
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Pitch
                            </label>
                            <div className="flex items-center">
                              <span className="text-xs text-gray-500 mr-2">
                                Low
                              </span>
                              <input
                                type="range"
                                min="-10"
                                max="10"
                                step="1"
                                defaultValue="0"
                                className="w-full"
                              />
                              <span className="text-xs text-gray-500 ml-2">
                                High
                              </span>
                            </div>
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Audio Quality
                            </label>
                            <select className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md">
                              <option>Standard (24kHz)</option>
                              <option>High (48kHz)</option>
                            </select>
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Background Noise Reduction
                            </label>
                            <div className="flex items-center">
                              <input
                                type="checkbox"
                                defaultChecked
                                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                              />
                              <span className="ml-2 text-sm text-gray-700">
                                Apply noise reduction to output audio
                              </span>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="mb-4">
                      <h3 className="text-sm font-medium text-gray-700 mb-3">
                        Select voice options for each language
                      </h3>

                      {!isGeneratingVoices && !voiceGenerationComplete && (
                        <div className="space-y-4">
                          {selectedLanguages.map((langCode) => {
                            const language = getLanguageByCode(langCode);
                            return (
                              <div
                                key={langCode}
                                className="flex items-center justify-between p-3 bg-gray-50 rounded-md"
                              >
                                <div className="flex items-center">
                                  <span className="text-lg mr-2">
                                    {language?.flag}
                                  </span>
                                  <span className="font-medium text-gray-900">
                                    {language?.name}
                                  </span>
                                </div>
                                <select className="block w-48 pl-3 pr-10 py-2 text-sm border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 rounded-md">
                                  {language?.voiceOptions.map((voice, index) => (
                                    <option key={index} value={voice}>
                                      {voice}
                                    </option>
                                  ))}
                                </select>
                              </div>
                            );
                          })}
                        </div>
                      )}

                      {isGeneratingVoices && (
                        <div className="p-8 flex flex-col items-center justify-center">
                          <Loader
                            size={36}
                            className="text-blue-500 animate-spin mb-4"
                          />
                          <p className="text-sm text-gray-600">
                            Generating voices for {selectedLanguages.length}{" "}
                            languages...
                          </p>
                          <p className="text-xs text-gray-500 mt-2">
                            This may take a few minutes
                          </p>
                          <div className="w-full mt-4 bg-gray-200 rounded-full h-2.5">
                            <div className="bg-blue-600 h-2.5 rounded-full w-3/4"></div>
                          </div>
                          <p className="text-xs text-gray-500 mt-2">
                            Processing Spanish voice (2 of 2)
                          </p>
                        </div>
                      )}
                    </div>

                    {!isGeneratingVoices && !voiceGenerationComplete && (
                      <div className="flex justify-center">
                        <button
                          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
                          onClick={handleGenerateVoicesClick}
                        >
                          Generate Voices
                        </button>
                      </div>
                    )}
                  </div>

                  {voiceGenerationComplete && (
                    <div className="bg-white shadow rounded-lg border border-gray-200 overflow-hidden mb-6">
                      <div className="p-4 bg-green-50 border-b border-gray-200">
                        <div className="flex items-center">
                          <CheckCircle
                            size={20}
                            className="text-green-500 mr-2"
                          />
                          <h3 className="text-base font-medium text-green-800">
                            Voice Generation Complete
                          </h3>
                        </div>
                        <p className="mt-1 text-sm text-green-700">
                          All voices have been successfully generated. You can
                          preview them below or add them to your Asset Manager.
                        </p>
                      </div>

                      <div className="divide-y divide-gray-200">
                        <div className="p-4">
                          <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center">
                              <div className="text-lg mr-2">🇺🇸</div>
                              <h3 className="font-medium text-gray-900">
                                English (Original)
                              </h3>
                            </div>
                            <div className="flex space-x-2">
                              <button
                                className="inline-flex items-center px-3 py-1 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                                onClick={() => handlePlayAudio("en")}
                              >
                                {currentPlayingAudio === "en" ? (
                                  <Pause size={16} className="mr-1" />
                                ) : (
                                  <Play size={16} className="mr-1" />
                                )}
                                {currentPlayingAudio === "en"
                                  ? "Pause"
                                  : "Play"}
                              </button>
                              <button className="inline-flex items-center px-3 py-1 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                                <Download size={16} className="mr-1" />
                                Download
                              </button>
                            </div>
                          </div>

                          <div className="bg-gray-100 rounded-md p-3">
                            <div className="relative w-full h-12">
                              {/* Audio waveform visualization would go here */}
                              <div className="absolute inset-0 flex items-center justify-center">
                                {currentPlayingAudio === "en" && (
                                  <div className="flex space-x-1">
                                    <div className="w-1 h-4 bg-blue-500 animate-pulse"></div>
                                    <div className="w-1 h-6 bg-blue-500 animate-pulse delay-75"></div>
                                    <div className="w-1 h-8 bg-blue-500 animate-pulse delay-150"></div>
                                    <div className="w-1 h-6 bg-blue-500 animate-pulse delay-75"></div>
                                    <div className="w-1 h-4 bg-blue-500 animate-pulse"></div>
                                  </div>
                                )}
                              </div>
                            </div>
                            <div className="flex justify-between mt-1 text-xs text-gray-500">
                              <span>0:00</span>
                              <span>1:35</span>
                            </div>
                          </div>
                        </div>

                        {selectedLanguages.map((langCode) => {
                          const language = getLanguageByCode(langCode);
                          return (
                            <div key={langCode} className="p-4">
                              <div className="flex items-center justify-between mb-3">
                                <div className="flex items-center">
                                  <div className="text-lg mr-2">
                                    {language?.flag}
                                  </div>
                                  <div>
                                    <h3 className="font-medium text-gray-900">
                                      {language?.name}
                                    </h3>
                                    <p className="text-xs text-gray-500">
                                      {langCode === "es"
                                        ? "Female (Sofia)"
                                        : "Male (Jean)"}
                                    </p>
                                  </div>
                                </div>
                                <div className="flex space-x-2">
                                  <button
                                    className="inline-flex items-center px-3 py-1 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                                    onClick={() => handlePlayAudio(langCode)}
                                  >
                                    {currentPlayingAudio === langCode ? (
                                      <Pause size={16} className="mr-1" />
                                    ) : (
                                      <Play size={16} className="mr-1" />
                                    )}
                                    {currentPlayingAudio === langCode
                                      ? "Pause"
                                      : "Play"}
                                  </button>
                                  <button className="inline-flex items-center px-3 py-1 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                                    <Download size={16} className="mr-1" />
                                    Download
                                  </button>
                                </div>
                              </div>

                              <div className="bg-gray-100 rounded-md p-3">
                                <div className="relative w-full h-12">
                                  {/* Audio waveform visualization would go here */}
                                  <div className="absolute inset-0 flex items-center justify-center">
                                    {currentPlayingAudio === langCode && (
                                      <div className="flex space-x-1">
                                        <div className="w-1 h-4 bg-blue-500 animate-pulse"></div>
                                        <div className="w-1 h-6 bg-blue-500 animate-pulse delay-75"></div>
                                        <div className="w-1 h-8 bg-blue-500 animate-pulse delay-150"></div>
                                        <div className="w-1 h-6 bg-blue-500 animate-pulse delay-75"></div>
                                        <div className="w-1 h-4 bg-blue-500 animate-pulse"></div>
                                      </div>
                                    )}
                                  </div>
                                </div>
                                <div className="flex justify-between mt-1 text-xs text-gray-500">
                                  <span>0:00</span>
                                  <span>
                                    {langCode === "es" ? "1:42" : "1:38"}
                                  </span>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>

                      <div className="p-4 border-t border-gray-200 bg-gray-50">
                        <div className="flex justify-between items-center">
                          <div>
                            <h4 className="text-sm font-medium text-gray-900">
                              Add to Asset Manager
                            </h4>
                            <p className="text-xs text-gray-500 mt-1">
                              All generated audio files will be saved to your
                              asset library
                            </p>
                          </div>
                          {/* <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700">
                            Save All Assets
                          </button> */}
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="mt-8 flex justify-between">
                    <button
                      className="inline-flex justify-center py-2 px-4 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                      onClick={handlePreviousStep}
                    >
                      Back
                    </button>
                    {voiceGenerationComplete && (
                      <button
                        className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700"
                        onClick={() => navigate("/videoeditor")}
                      >
                        Save all
                      </button>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AudioTranslationTool;
