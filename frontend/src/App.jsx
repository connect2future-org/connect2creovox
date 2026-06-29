import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import Home from './pages/Home';
import Services from './pages/Services';
import About from './pages/About';
import Contact from './pages/Contact';
import Pricing from './pages/Pricing';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import AdminDashboard from './components/dashboard/AdminDashboard';
import UserDashboard from './components/dashboard/UserDashboard';
import ServiceDetail from './pages/ServiceDetail';
import Insights from "./pages/Insights";
import ScrollToTopButton from "./components/common/ScrollToTopButton";
import ScrollToTop from "./components/common/ScrollToTop";
import BookService from "./pages/BookService";
import ProtectedRoute from "./components/routes/ProtectedRoute";
import AdminRoute from "./components/routes/AdminRoute";
import AnimatedMascots from "./components/common/AnimatedMascots";
import MascotSpeech from "./components/common/MascotSpeech";
import AnimatedBackground from "./components/common/AnimatedBackground";
import NotFound from "./pages/NotFound";







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
              <Route path="/" element={<Home />} />
              <Route path="/services" element={<Services />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/pricing" element={<Pricing />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/user-dashboard" element={<ProtectedRoute> <UserDashboard /></ProtectedRoute>
                }
              />
              <Route path="*" element={<NotFound/>}/>
                <Route
                  path="/admin-dashboard"
                  element={
                    <AdminRoute>
                      <AdminDashboard />
                    </AdminRoute>
                  }
                />
              <Route path="/services/:id" element={<ServiceDetail />} />
              
              <Route path="/insights" element={<Insights />} />
              <Route
                path="/book-service/:id"
                element={
                  <ProtectedRoute>
                    <BookService />
                  </ProtectedRoute>
                }
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
                background: '#363636',
                color: '#fff',
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