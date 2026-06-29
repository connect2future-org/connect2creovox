import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import { AuthProvider } from "./context/AuthContext";

import Navbar from "./components/common/Navbar";
import Footer from "./components/common/Footer";

import Home from "./pages/Home";
import Services from "./pages/Services";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Pricing from "./pages/Pricing";
import Insights from "./pages/Insights";
import ServiceDetail from "./pages/ServiceDetail";
import BookService from "./pages/BookService";
import NotFound from "./pages/NotFound";

import Login from "./components/auth/Login";
import Register from "./components/auth/Register";

import UserDashboard from "./components/dashboard/UserDashboard";
import AdminDashboard from "./components/dashboard/AdminDashboard";

import ProtectedRoute from "./components/routes/ProtectedRoute";
import AdminRoute from "./components/routes/AdminRoute";

import AnimatedBackground from "./components/common/AnimatedBackground";
import AnimatedMascots from "./components/common/AnimatedMascots";
import MascotSpeech from "./components/common/MascotSpeech";
import ScrollToTop from "./components/common/ScrollToTop";
import ScrollToTopButton from "./components/common/ScrollToTopButton";

function App() {

  return (

    <AuthProvider>

      <Router>

        <div className="relative min-h-screen flex flex-col overflow-hidden">

          <ScrollToTop />

          <AnimatedBackground />

          <Navbar />

          <main className="relative z-10 flex-grow">

            <Routes>

              {/* Public Routes */}

              <Route path="/" element={<Home />} />

              <Route path="/services" element={<Services />} />

              <Route path="/services/:id" element={<ServiceDetail />} />

              <Route path="/about" element={<About />} />

              <Route path="/contact" element={<Contact />} />

              <Route path="/pricing" element={<Pricing />} />

              <Route path="/insights" element={<Insights />} />

              <Route path="/login" element={<Login />} />

              <Route path="/register" element={<Register />} />

              {/* Protected User */}

              <Route

                path="/user-dashboard"

                element={

                  <ProtectedRoute>

                    <UserDashboard />

                  </ProtectedRoute>

                }

              />

              <Route

                path="/book-service/:id"

                element={

                  <ProtectedRoute>

                    <BookService />

                  </ProtectedRoute>

                }

              />

              {/* Protected Admin */}

              <Route

                path="/admin-dashboard"

                element={

                  <AdminRoute>

                    <AdminDashboard />

                  </AdminRoute>

                }

              />

              {/* 404 */}

              <Route

                path="*"

                element={<NotFound />}

              />

            </Routes>

          </main>

          <MascotSpeech />

          <AnimatedMascots />

          <Footer />

          <Toaster

            position="top-right"

            toastOptions={{

              duration: 3000,

              style: {

                background: "#363636",

                color: "#fff",

              },

            }}

          />

        </div>

        <ScrollToTopButton />

      </Router>

    </AuthProvider>

  );

}

export default App;