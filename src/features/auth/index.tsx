import BackgroundDecor from "./components/background-decor";
import BrandPanel from "./components/brand-panel";
import LoginForm from "./components/login-form";

const Auth = () => {
  return (
    <div className="relative flex min-h-dvh items-center justify-center overflow-hidden bg-background p-6">
      <BackgroundDecor />
      <div className="relative z-10 flex w-full max-w-[1400px] flex-col overflow-hidden rounded-2xl border border-border bg-background shadow-lg md:min-h-[640px] md:flex-row">
        <LoginForm />
        <BrandPanel />
      </div>
    </div>
  );
};

export default Auth;
