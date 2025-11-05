import { Navigate } from "react-router";

export default function ProtectedRoute({ children, roles }: { children: React.ReactNode, roles?: string[] }) {
  const token = localStorage.getItem("token");
  const userStr = localStorage.getItem("user");
  
  // Parse user if exists
  let user = null;
  try {
    user = userStr ? JSON.parse(userStr) : null;
  } catch {
    // Invalid user data, clear it
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    return <Navigate to="/signin" replace />;
  }

  // ❌ Chưa đăng nhập
  if (!token || !user) {
    return <Navigate to="/signin" replace />;
  }

  // ✅ Check role-based access if roles are specified
  if (roles && roles.length > 0 && !roles.includes(user?.role)) {
    // Redirect unauthorized users to home
    return <Navigate to="/" replace />;
  }

  // ✅ Hợp lệ
  return children;
}
