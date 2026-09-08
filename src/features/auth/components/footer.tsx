const footerLinks = [
  "درباره ما",
  "پشتیبانی",
  "محتوای فروشگاه",
  "آکادمی",
  "نقشه محور",
];

const Footer = () => {
  return (
    <footer className="flex flex-col items-center gap-3 border-t-2 border-accent/20 bg-black/90 px-6 py-4 sm:flex-row sm:justify-between sm:py-5 sm:px-10">
      <nav className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-xs text-muted sm:gap-x-6">
        {footerLinks.map((label) => (
          <span
            key={label}
            className="cursor-pointer transition-colors hover:text-accent"
          >
            {label}
          </span>
        ))}
      </nav>

      <div dir="ltr" className="flex items-center gap-3 text-xs text-success">
        <span>NILOO RAYEHE © {new Date().getFullYear()}</span>
        <span className="h-px w-6 bg-success" />
      </div>
    </footer>
  );
};

export default Footer;
