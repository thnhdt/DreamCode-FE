import PageMeta from "../../components/common/PageMeta";
import AuthLayout from "./AuthPageLayout";
import SignInForm from "../../components/auth/SignInForm";

export default function SignIn() {
  return (
    <>
      <PageMeta
        title="Dream Code - Sign In"
        description="Quản lý tài sản"
      />
      <AuthLayout>
        <SignInForm />
      </AuthLayout>
    </>
  );
}
