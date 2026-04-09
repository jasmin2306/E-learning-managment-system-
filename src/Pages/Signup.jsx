import { ArrowRight, Camera,Eye, EyeOff, Lock, Mail, Phone, User } from "lucide-react";
import { useEffect,useState } from "react";
import { toast } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import Layout from "../Layout/Layout";
import { createAccount } from "../Redux/Slices/AuthSlice";

export default function Signup() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [previewImage, setPreviewImage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [signupData, setSignupData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    avatar: "",
  });

  useEffect(() => {
    setIsVisible(true);
  }, []);

  function handleUserInput(e) {
    const { name, value } = e.target;
    setSignupData({
      ...signupData,
      [name]: value,
    });
  }

  function getImage(event) {
    event.preventDefault();
    const uploadedImage = event.target.files[0];

    if (uploadedImage) {
      setSignupData({
        ...signupData,
        avatar: uploadedImage,
      });
      const fileReader = new FileReader();
      fileReader.readAsDataURL(uploadedImage);
      fileReader.addEventListener("load", function () {
        setPreviewImage(this.result);
      });
    }
  }

  async function createNewAccount(event) {
    event.preventDefault();
    
    if (
      !signupData.email ||
      !signupData.password ||
      !signupData.fullName ||
      !signupData.phone
    ) {
      toast.error("Please fill all the details");
      return;
    }

    if (signupData.password !== signupData.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    if (signupData.fullName.length < 3) {
      toast.error("Name should be at least 3 characters");
      return;
    }

    // Check if full name contains numbers
    if (/\d/.test(signupData.fullName)) {
      toast.error("Full name should not contain numbers");
      return;
    }

    if (!signupData.email.match(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g)) {
      toast.error("Invalid email id");
      return;
    }

    // Check if phone contains only numbers
    if (!/^\d+$/.test(signupData.phone)) {
      toast.error("Phone number should contain only numbers");
      return;
    }

    if (signupData.phone.length < 10 || signupData.phone.length > 15) {
      toast.error("Phone number should be between 10 and 15 digits");
      return;
    }

    // For now, send JSON without avatar to test basic registration
    const userData = {
      fullName: signupData.fullName,
      email: signupData.email,
      password: signupData.password,
      phone: signupData.phone,
    };

    setIsLoading(true);
    try {
      const response = await dispatch(createAccount(userData));
      if (response?.payload?.success) {
        toast.success("Account created successfully! Welcome to LMS!");
        navigate("/");
        setSignupData({
          fullName: "",
          email: "",
          password: "",
          confirmPassword: "",
          phone: "",
          avatar: "",
        });
        setPreviewImage("");
      } else {
        toast.error(response?.payload?.message || "Signup failed. Please try again.");
      }
    } catch (error) {
      console.error('Signup error:', error);
      toast.error("An unexpected error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Layout>
      <div className="min-h-[calc(100vh-80px)] flex overflow-hidden bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 pt-4">
      {/* Animated Background Patterns */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-indigo-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute top-40 left-40 w-80 h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      {/* Left Side - Illustration */}
      <div className="hidden lg:flex lg:w-1/2 relative items-center justify-center p-12">
        <div className={`text-center space-y-8 transition-all duration-1000 transform ${
          isVisible ? 'translate-x-0 opacity-100' : '-translate-x-10 opacity-0'
        }`}>
          <div className="relative">
            <div className="w-32 h-32 mx-auto bg-gradient-to-br from-pink-400 to-purple-600 rounded-full flex items-center justify-center shadow-2xl">
              <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center">
                <div className="w-16 h-16 bg-gradient-to-br from-pink-500 to-purple-600 rounded-full flex items-center justify-center">
                  <User className="text-white h-8 w-8" />
                </div>
              </div>
            </div>
            <div className="absolute -top-2 -right-2 w-8 h-8 bg-yellow-400 rounded-full animate-pulse"></div>
            <div className="absolute -bottom-2 -left-2 w-6 h-6 bg-indigo-400 rounded-full animate-bounce"></div>
          </div>
          
          <div className="space-y-4">
            <h1 className="text-4xl lg:text-5xl font-bold text-white leading-tight">
              Start Your
              <span className="block bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-400 bg-clip-text text-transparent">
                Learning Journey
              </span>
            </h1>
            <p className="text-gray-300 text-lg max-w-md mx-auto leading-relaxed">
              Join our community of lifelong learners and unlock endless opportunities for growth and success.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-6 max-w-sm mx-auto">
            <div className="text-center p-4 bg-white/10 rounded-xl backdrop-blur-sm">
              <div className="text-2xl font-bold text-white">24/7</div>
              <div className="text-sm text-gray-300">Support</div>
            </div>
            <div className="text-center p-4 bg-white/10 rounded-xl backdrop-blur-sm">
              <div className="text-2xl font-bold text-white">100%</div>
              <div className="text-sm text-gray-300">Online</div>
            </div>
            <div className="text-center p-4 bg-white/10 rounded-xl backdrop-blur-sm">
              <div className="text-2xl font-bold text-white">Expert</div>
              <div className="text-sm text-gray-300">Instructors</div>
            </div>
            <div className="text-center p-4 bg-white/10 rounded-xl backdrop-blur-sm">
              <div className="text-2xl font-bold text-white">Lifetime</div>
              <div className="text-sm text-gray-300">Access</div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Sign Up Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 relative">
        <div className={`w-full max-w-md transition-all duration-1000 transform ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}>
          {/* Glassmorphism Card */}
          <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl shadow-2xl p-8 space-y-6 max-h-[90vh] overflow-y-auto">
            {/* Header */}
            <div className="text-center space-y-2">
              <h2 className="text-3xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                Create an Account
              </h2>
              <p className="text-gray-300 text-sm">
                Join thousands of learners worldwide
              </p>
            </div>

            {/* Sign Up Form */}
            <form onSubmit={createNewAccount} className="space-y-4">
              {/* Avatar Upload */}
              <div className="flex justify-center">
                <div className="relative">
                  <div className="w-20 h-20 rounded-full bg-white/10 border-2 border-dashed border-white/30 flex items-center justify-center overflow-hidden group cursor-pointer">
                    {previewImage ? (
                      <img src={previewImage} alt="Preview" className="w-full h-full object-cover" />
                    ) : (
                      <Camera className="text-gray-400 h-8 w-8 group-hover:text-white transition-colors" />
                    )}
                  </div>
                  <input
                    type="file"
                    onChange={getImage}
                    accept=".jpg,.jpeg,.png,image/*"
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                  <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-indigo-600 rounded-full flex items-center justify-center">
                    <Camera className="text-white h-3 w-3" />
                  </div>
                </div>
              </div>

              {/* Full Name Input */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300">Full Name</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <input
                    type="text"
                    name="fullName"
                    value={signupData.fullName}
                    onChange={handleUserInput}
                    placeholder="Enter your full name"
                    className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-400/20 transition-all duration-300"
                    required
                  />
                </div>
              </div>

              {/* Email Input */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <input
                    type="email"
                    name="email"
                    value={signupData.email}
                    onChange={handleUserInput}
                    placeholder="Enter your email"
                    className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-400/20 transition-all duration-300"
                    required
                  />
                </div>
              </div>

              {/* Phone Input */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300">Phone Number</label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <input
                    type="tel"
                    name="phone"
                    value={signupData.phone}
                    onChange={handleUserInput}
                    placeholder="Enter your phone number"
                    className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-400/20 transition-all duration-300"
                    required
                  />
                </div>
              </div>

              {/* Password Input */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300">Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={signupData.password}
                    onChange={handleUserInput}
                    placeholder="Create a password"
                    className="w-full pl-10 pr-12 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-400/20 transition-all duration-300"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
              </div>

              {/* Confirm Password Input */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300">Confirm Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    name="confirmPassword"
                    value={signupData.confirmPassword}
                    onChange={handleUserInput}
                    placeholder="Confirm your password"
                    className="w-full pl-10 pr-12 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-400/20 transition-all duration-300"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                  >
                    {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex items-center justify-center space-x-2 py-3 px-4 bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700 text-white font-semibold rounded-xl transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:shadow-pink-500/25 disabled:opacity-50 disabled:cursor-not-allowed group"
              >
                {isLoading ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                ) : (
                  <>
                    <span>Create Account</span>
                    <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>
            </form>

            {/* Login Link */}
            <div className="text-center pt-4 border-t border-white/10">
              <p className="text-gray-300 text-sm">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="text-pink-400 hover:text-pink-300 font-semibold transition-colors hover:underline"
                >
                  Login
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
      </div>
    </Layout>
  );
}