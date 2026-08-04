import { AuthProvider, RouterProvider, Route } from "./context/AuthContext";
import { Navbar } from "./components/Navbar";

// Import all pages
import { HomePage } from "./pages/HomePage";
import { LoginPage, RegisterPage, ForgotPasswordPage } from "./pages/AuthPages";
import { PropertiesPage, PropertyDetailPage } from "./pages/PropertiesPages";
import { DashboardPage, HostDashboardPage, AdminDashboardPage } from "./pages/DashboardPages";
import { BookingDetailPage } from "./pages/BookingPages";
import { ProfilePage, BecomeHostPage, PropertyFormPage } from "./pages/SettingsPages";

export default function App() {
  return (
    <AuthProvider>
      <RouterProvider>
        <div className="min-h-screen bg-[#F7F3EE] font-sans">
          <Navbar />
          
          {/* Public Routes */}
          <Route path="/" component={HomePage} />
          <Route path="/login" component={LoginPage} />
          <Route path="/register" component={RegisterPage} />
          <Route path="/forgot-password" component={ForgotPasswordPage} />
          <Route path="/become-host" component={BecomeHostPage} />
          <Route path="/properties" component={PropertiesPage} />
          <Route path="/properties/:id" component={PropertyDetailPage} />
          
          {/* Protected Routes - Customer */}
          <Route path="/dashboard" component={DashboardPage} protect />
          <Route path="/bookings/:id" component={BookingDetailPage} protect />
          <Route path="/profile" component={ProfilePage} protect />
          
          {/* Protected Routes - Host Only */}
          <Route path="/host/dashboard" component={HostDashboardPage} protect hostOnly />
          <Route path="/host/properties/new" component={PropertyFormPage} protect hostOnly />
          <Route path="/host/properties/:id/edit" component={PropertyFormPage} protect hostOnly />
          
          {/* Protected Routes - Admin Only */}
          <Route path="/admin/dashboard" component={AdminDashboardPage} protect adminOnly />
        </div>
      </RouterProvider>
    </AuthProvider>
  );
}