import Bento from "./bento";
import LoginForm from "./login-form";

const Main = () => {
  return (
    <main className="flex flex-1 items-center justify-center px-6 py-6 sm:px-10 bg-black/40">
      <div className="flex h-full w-full flex-col gap-4 md:flex-row">
        <LoginForm />
        <Bento />
      </div>
    </main>
  );
};

export default Main;
