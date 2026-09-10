import DashboardPreviewCard from "./dashboard-preview-card";

const BrandPanel = () => {
  return (
    <div className="relative hidden overflow-hidden bg-primary md:flex md:flex-1 md:items-center md:justify-center md:p-10">
      <div className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full bg-white/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-28 -right-16 h-80 w-80 rounded-full bg-accent/20 blur-3xl" />

      <div className="pointer-events-none absolute -end-10 top-10 h-40 w-40 rounded-full border border-dashed border-white/20" />
      <div className="pointer-events-none absolute -start-16 bottom-16 h-24 w-24 rotate-12 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-md" />
      <div className="pointer-events-none absolute end-10 bottom-24 h-16 w-16 -rotate-6 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md" />

      <DashboardPreviewCard />
    </div>
  );
};

export default BrandPanel;
