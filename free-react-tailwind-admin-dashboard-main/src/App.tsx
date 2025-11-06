import { BrowserRouter as Router, Routes, Route } from "react-router";
import SignIn from "./pages/AuthPages/SignIn";
import SignUp from "./pages/AuthPages/SignUp";
import NotFound from "./pages/OtherPage/NotFound";
import UserProfiles from "./pages/UserProfiles";
import Videos from "./pages/UiElements/Videos";
import Images from "./pages/UiElements/Images";
import Alerts from "./pages/UiElements/Alerts";
import Badges from "./pages/UiElements/Badges";
import Avatars from "./pages/UiElements/Avatars";
import Buttons from "./pages/UiElements/Buttons";
import LineChart from "./pages/Charts/LineChart";
import BarChart from "./pages/Charts/BarChart";
import Calendar from "./pages/Calendar";
import BasicTables from "./pages/Tables/BasicTables";
import FormElements from "./pages/Forms/FormElements";
import Blank from "./pages/Blank";
import New from "./pages/New";
import Department from "./pages/Department/Department";
import Supplier from "./pages/Supplier/Supplier";
import AssetManagement from "./pages/AssetManage/AssetManage";
import MyAssets from "./pages/MyAssets";
import DepartmentAssets from "./pages/DepartmentAssets";
import AppLayout from "./layout/AppLayout";
import ProtectedRoute from "./components/auth/ProtectionGuard";
import { ScrollToTop } from "./components/common/ScrollToTop";
import Home from "./pages/Dashboard/Home";
import Category from "./pages/Category/Category";
import Depreciation from "./pages/Depreciation";
import AssetReport from "./pages/AssetReport";
import OverviewDashboard from "./pages/Dashboards/OverviewDashboard";
import OperationsDashboard from "./pages/Dashboards/OperationsDashboard";
import ReportSettings from "./pages/ReportSettings";
import UserManagement from "./pages/UserManagement";
import RolesPermissions from "./pages/RolesPermissions";

export default function App() {
  return (
    <>
      <Router>
        <ScrollToTop />
        <Routes>
          {/* Dashboard Layout */}
          <Route element={<AppLayout />}>
            <Route index path="/" element={<Home />} />

            {/* Protected Admin Pages */}
            <Route
              path="/new"
              element={
                <ProtectedRoute roles={["admin"]}>
                  <New />
                </ProtectedRoute>
              }
            />
            <Route
              path="/departments"
              element={
                <ProtectedRoute roles={["admin"]}>
                  <Department />
                </ProtectedRoute>
              }
            />
            <Route
              path="/suppliers"
              element={
                <ProtectedRoute roles={["admin"]}>
                  <Supplier />
                </ProtectedRoute>
              }
            />
            <Route
              path="/assets"
              element={
                <ProtectedRoute roles={["admin"]}>
                  <AssetManagement />
                </ProtectedRoute>
              }
            />
            <Route
              path="/department-assets"
              element={
                <ProtectedRoute roles={["admin"]}>
                  <DepartmentAssets />
                </ProtectedRoute>
              }
            />
            <Route path="/my-assets" element={<MyAssets />} />

            {/* Asset Manager */}
            <Route path="/depreciation" element={<Depreciation />} />
            <Route path="/asset-report" element={<AssetReport />} />
            <Route
              path="/dashboard-operations"
              element={<OperationsDashboard />}
            />

            {/* Viewer */}
            <Route path="/dashboard-overview" element={<OverviewDashboard />} />
            <Route path="/report-settings" element={<ReportSettings />} />

            {/* Admin */}
            <Route path="/users" element={<UserManagement />} />
            <Route path="/roles" element={<RolesPermissions />} />

            {/* Others Page */}
            <Route path="/profile" element={<UserProfiles />} />
            <Route path="/calendar" element={<Calendar />} />
            <Route path="/blank" element={<Blank />} />
            <Route path="/category" element={<Category />} />

            {/* Forms */}
            <Route path="/form-elements" element={<FormElements />} />

            {/* Tables */}
            <Route path="/basic-tables" element={<BasicTables />} />

            {/* Ui Elements */}
            <Route path="/alerts" element={<Alerts />} />
            <Route path="/avatars" element={<Avatars />} />
            <Route path="/badge" element={<Badges />} />
            <Route path="/buttons" element={<Buttons />} />
            <Route path="/images" element={<Images />} />
            <Route path="/videos" element={<Videos />} />

            {/* Charts */}
            <Route path="/line-chart" element={<LineChart />} />
            <Route path="/bar-chart" element={<BarChart />} />
          </Route>

          {/* Auth Layout */}
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </>
  );
}
