import { ChevronRight, Video, Palette, Globe, Clock, Shield } from "lucide-react";
import { Link } from "react-router-dom";

const LandingPage = () => {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <header className="border-b border-gray-200 py-4">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="font-bold text-2xl text-blue-600">Venrollment</div>
          <nav className="hidden md:flex space-x-6">
            <Link to="/#features" className="text-gray-600 hover:text-blue-600">
              Features
            </Link>
            <Link
              to="/#how-it-works"
              className="text-gray-600 hover:text-blue-600"
            >
              How It Works
            </Link>
            <Link to="/#pricing" className="text-gray-600 hover:text-blue-600">
              Pricing
            </Link>
          </nav>
          <div className="flex space-x-4">
            <Link
              to="/auth"
              className="px-4 py-2 text-gray-600 hover:text-blue-600"
            >
              Log In
            </Link>
            <Link
              to="/auth"
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Sign Up
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-r from-blue-50 to-indigo-50">
        <div className="container mx-auto px-4 grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Create Engaging Retirement & Health Benefit Videos
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Our video editor simplifies benefits education with customizable,
              multi-language video content for plan advisors and brokers.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center justify-center"
                onClick={() => {
                  window.location.href = "/auth";
                }}
              >
                Get Started <ChevronRight className="ml-2 h-4 w-4" />
              </button>
              <button className="px-6 py-3 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 flex items-center justify-center">
                Watch Demo <Video className="ml-2 h-4 w-4" />
              </button>
            </div>
          </div>
          <div className="bg-white p-1 rounded-lg shadow-lg">
            <div className="bg-gray-200 rounded aspect-video flex items-center justify-center">
              <Video className="h-16 w-16 text-gray-500" />
              <span className="ml-2 text-gray-500">Demo Video</span>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Key Features</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="p-6 border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
              <div className="bg-blue-100 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                <Palette className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">
                Customizable Branding
              </h3>
              <p className="text-gray-600">
                Apply your brand colors, fonts, and logos in under 30 minutes
              </p>
            </div>
            <div className="p-6 border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
              <div className="bg-blue-100 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                <Globe className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">
                Multi-Language Support
              </h3>
              <p className="text-gray-600">
                Create videos with synchronized subtitles in multiple languages
              </p>
            </div>
            <div className="p-6 border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
              <div className="bg-blue-100 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                <Clock className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">
                Timeline Management
              </h3>
              <p className="text-gray-600">
                Easily organize and arrange video elements on an intuitive
                timeline
              </p>
            </div>
            <div className="p-6 border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
              <div className="bg-blue-100 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                <Shield className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">
                Reliable Performance
              </h3>
              <p className="text-gray-600">
                99.9% uptime with fast rendering across all devices
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
          <div className="max-w-3xl mx-auto">
            <div className="flex flex-col md:flex-row items-center mb-12">
              <div className="bg-blue-600 text-white rounded-full w-12 h-12 flex items-center justify-center shrink-0 md:mr-6 mb-4 md:mb-0">
                1
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md flex-1">
                <h3 className="text-xl font-semibold mb-2">
                  Create Your Project
                </h3>
                <p className="text-gray-600">
                  Start with a template or build from scratch with our intuitive
                  editor
                </p>
              </div>
            </div>
            <div className="flex flex-col md:flex-row items-center mb-12">
              <div className="bg-blue-600 text-white rounded-full w-12 h-12 flex items-center justify-center shrink-0 md:mr-6 mb-4 md:mb-0">
                2
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md flex-1">
                <h3 className="text-xl font-semibold mb-2">
                  Customize Content
                </h3>
                <p className="text-gray-600">
                  Add your branding, text, images, and animations to match your
                  needs
                </p>
              </div>
            </div>
            <div className="flex flex-col md:flex-row items-center mb-12">
              <div className="bg-blue-600 text-white rounded-full w-12 h-12 flex items-center justify-center shrink-0 md:mr-6 mb-4 md:mb-0">
                3
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md flex-1">
                <h3 className="text-xl font-semibold mb-2">Add Languages</h3>
                <p className="text-gray-600">
                  Include multiple language options with synchronized subtitles
                </p>
              </div>
            </div>
            <div className="flex flex-col md:flex-row items-center">
              <div className="bg-blue-600 text-white rounded-full w-12 h-12 flex items-center justify-center shrink-0 md:mr-6 mb-4 md:mb-0">
                4
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md flex-1">
                <h3 className="text-xl font-semibold mb-2">Export & Share</h3>
                <p className="text-gray-600">
                  Export high-quality videos to share with clients and
                  participants
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">
            Ready to Create Engaging Videos?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join hundreds of retirement plan advisors using Venrollment to
            simplify benefits education.
          </p>
          <button className="px-8 py-3 bg-white text-blue-600 rounded-md hover:bg-gray-100 font-medium">
            Sign Up Now
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">Venrollment</h3>
              <p className="text-gray-400">
                Simplifying benefits education through engaging video content
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Product</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">
                    Features
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">
                    Pricing
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">
                    Tutorials
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Company</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">
                    Contact
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">
                    Careers
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Support</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">
                    Help Center
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">
                    Documentation
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">
                    Status
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400">
              © 2025 Venrollment. All rights reserved.
            </p>
            <div className="flex space-x-4 mt-4 md:mt-0">
              <a href="#" className="text-gray-400 hover:text-white">
                Terms
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                Privacy
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                Cookies
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
