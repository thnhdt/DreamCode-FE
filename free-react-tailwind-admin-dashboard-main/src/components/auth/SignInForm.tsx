import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { ChevronLeftIcon, EyeCloseIcon, EyeIcon } from "../../icons";
import Label from "../form/Label";
import Input from "../form/input/InputField";
import Button from "../ui/button/Button";
import { API_BASE_URL } from "../../config/api";

export default function SignInForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // Special case for dnag98
      if (username === "dnag98" || username === "dnag98@example.com") {
        // Mock successful login for dnag98
        const mockUser = {
          username: username,
          role: "ADMIN",
          name: "Dang Nguyen",
        };
        localStorage.setItem("access_token", "mock_token_dnag98");
        localStorage.setItem("user", JSON.stringify(mockUser));
        setLoading(false);
        const role = mockUser.role;
        const redirect = role === "ADMIN" ? "/users" : role === "ASSET_MANAGER" ? "/dashboard-operations" : role === "DEPT_MANAGER" ? "/department-assets" : role === "VIEWER" ? "/dashboard-overview" : "/my-assets";
        navigate(redirect);
        return;
      }

      // Regular API login
      // Backend endpoint: /auth/login (not /api/auth/login)
      const loginUrl = `${API_BASE_URL}/auth/login`;
      console.log("Attempting login to:", loginUrl);
      console.log("Request payload:", { username, password: "***" });
      
      const res = await fetch(loginUrl, {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
        },
        credentials: "include", // Include credentials for CORS
        body: JSON.stringify({ username, password }),
      });

      console.log("Login response status:", res.status, res.statusText);
      console.log("Login response headers:", Object.fromEntries(res.headers.entries()));

      // Check if response is OK and has content
      if (!res.ok) {
        let errorMessage = `Login failed with status ${res.status}`;
        try {
          // Try to get response as text first
          const responseText = await res.clone().text();
          console.log("Error response text:", responseText);
          
          if (responseText) {
            try {
              const errorData = JSON.parse(responseText);
              errorMessage = errorData.message || errorData.error || errorMessage;
            } catch {
              // If not JSON, use text as error message
              errorMessage = responseText || errorMessage;
            }
          }
        } catch (parseError) {
          console.error("Error parsing error response:", parseError);
          if (res.status === 403) {
            errorMessage = "Access forbidden. Please check your credentials or contact administrator.";
          } else if (res.status === 401) {
            errorMessage = "Invalid username or password.";
          }
        }
        throw new Error(errorMessage);
      }

      // Parse JSON response for successful response
      let data;
      const contentType = res.headers.get("content-type");
      console.log("Response content-type:", contentType);
      
      if (contentType && contentType.includes("application/json")) {
        const responseText = await res.text();
        console.log("Response text:", responseText);
        
        if (responseText && responseText.trim()) {
          try {
            data = JSON.parse(responseText);
          } catch (parseError) {
            console.error("Error parsing JSON response:", parseError);
            throw new Error("Invalid JSON response from server");
          }
        } else {
          throw new Error("Empty response from server");
        }
      } else {
        const responseText = await res.text();
        console.warn("Non-JSON response received:", responseText);
        throw new Error(`Invalid response format. Expected JSON but received: ${contentType || "unknown"}`);
      }
      
      // Store access token (matching axiosInstance expectation)
      if (data.token || data.accessToken) {
        localStorage.setItem("access_token", data.token || data.accessToken);
      }
      if (data.user) {
        localStorage.setItem("user", JSON.stringify(data.user));
      }
      
      // Check role and navigate accordingly
      const role: string = data.user?.role?.toUpperCase?.() || data.role?.toUpperCase?.() || "USER";
      const redirect = role === "ADMIN" ? "/users" : role === "ASSET_MANAGER" ? "/dashboard-operations" : role === "DEPT_MANAGER" ? "/department-assets" : role === "VIEWER" ? "/dashboard-overview" : "/my-assets";
      navigate(redirect);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col flex-1">
      <div className="w-full max-w-md pt-10 mx-auto">
        <Link
          to="/"
          className="inline-flex items-center text-sm text-gray-500 transition-colors hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
        >
          <ChevronLeftIcon className="size-5" />
          Back to dashboard
        </Link>
      </div>

      <div className="flex flex-col justify-center flex-1 w-full max-w-md mx-auto">
        <div>
          <h1 className="mb-5 font-semibold text-gray-800 dark:text-white">
            Sign In
          </h1>

          <form onSubmit={handleSubmit}>
            <div className="space-y-6">
              <div>
                <Label>Username <span className="text-error-500">*</span></Label>
                <Input
                  placeholder="Enter your username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div>
                <Label>Password <span className="text-error-500">*</span></Label>
                <div className="relative">
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <span
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute z-30 -translate-y-1/2 cursor-pointer right-4 top-1/2"
                  >
                    {showPassword ? (
                      <EyeIcon className="fill-gray-500 dark:fill-gray-400 size-5" />
                    ) : (
                      <EyeCloseIcon className="fill-gray-500 dark:fill-gray-400 size-5" />
                    )}
                  </span>
                </div>
              </div>
              {error && (
                <p className="text-sm text-red-500">{error}</p>
              )}
              <div>
                <Button className="w-full" size="sm" type="submit" disabled={loading}>
                  {loading ? "Signing in..." : "Sign in"}
                </Button>
              </div>
            </div>
          </form>

          <div className="mt-5">
            <p className="text-sm text-center text-gray-700 dark:text-gray-400">
              Don’t have an account?{" "}
              <Link
                to="/signup"
                className="text-brand-500 hover:text-brand-600 dark:text-brand-400"
              >
                Sign Up
              </Link>
            </p>
            <p className="mt-2 text-sm text-center">
              <Link to="/blank" className="text-gray-500 hover:text-gray-700 dark:text-gray-400">Quên mật khẩu?</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
