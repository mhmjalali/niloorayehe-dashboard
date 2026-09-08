import LanguageSwitch from "./language-switch";

const Header = () => {
  return (
    <header className="flex items-center justify-between px-6 py-5 sm:px-10 bg-black/90 border-b-2 border-accent/20">
      <div className="flex items-center gap-2">
        <span className="text-sm font-bold uppercase tracking-[0.15em] text-muted sm:text-base">
          NILOO RAYEHE
        </span>
        <span className="text-muted">|</span>
        <span className="text-sm text-success sm:text-base">نیلو رایحه</span>
      </div>

      <LanguageSwitch />
    </header>
  );
};

export default Header;
