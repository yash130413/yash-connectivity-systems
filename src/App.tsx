import { Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { Header } from './components/site/Header';
import { Breadcrumbs } from './components/site/Breadcrumbs';
import { Footer } from './components/site/Footer';
import { FloatingActions } from './components/site/FloatingActions';
import HomePage from './pages/Home';
import AboutPage from './pages/About';
import ProductsPage from './pages/Products';
import ProductDetailPage from './pages/ProductDetail';
import IndustriesPage from './pages/Industries';
import ClientsPage from './pages/Clients';
import BlogPage from './pages/Blog';
import BlogDetailPage from './pages/BlogDetail';
import ContactPage from './pages/Contact';
import FAQPage from './pages/FAQ';
import NotFoundPage from './pages/NotFound';
import AdminLoginPage from './pages/admin/Login';
import AdminDashboard from './pages/admin/Dashboard';
import AdminLeads from './pages/admin/Leads';
import AdminProducts from './pages/admin/Products';
import AdminAnalytics from './pages/admin/Analytics';
import AdminLayout from './components/admin/AdminLayout';
import { ProtectedRoute } from './components/admin/ProtectedRoute';

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [pathname]);

  return null;
}

function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <Breadcrumbs />
      <main className="flex-1">{children}</main>
      <Footer />
      <FloatingActions />
    </div>
  );
}

export default function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        {/* Admin routes */}
        <Route path="/admin/login" element={<AdminLoginPage />} />
        <Route path="/admin" element={<ProtectedRoute><AdminLayout /></ProtectedRoute>}>
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="leads" element={<AdminLeads />} />
          <Route path="products" element={<AdminProducts />} />
          <Route path="analytics" element={<AdminAnalytics />} />
        </Route>

        {/* Public routes */}
        <Route path="/*" element={
          <PublicLayout>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/products" element={<ProductsPage />} />
              <Route path="/products/:slug" element={<ProductDetailPage />} />
              <Route path="/industries" element={<IndustriesPage />} />
              <Route path="/clients" element={<ClientsPage />} />
              <Route path="/blog" element={<BlogPage />} />
              <Route path="/blog/:slug" element={<BlogDetailPage />} />
              <Route path="/faq" element={<FAQPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </PublicLayout>
        } />
      </Routes>
    </>
  );
}
