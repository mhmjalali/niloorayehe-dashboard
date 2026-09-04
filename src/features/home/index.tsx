import Image from "next/image";
import Footer from "./components/footer";
import Header from "./components/header";
import Hero from "./components/hero";

const Home = () => {
  return (
    <div className="relative min-h-screen overflow-x-hidden bg-background">
      <div className="fixed inset-0 ltr:-scale-x-100">
        <Image
          src="/images/home-background.png"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-[linear-gradient(to_left,color-mix(in_srgb,var(--color-background)_95%,transparent)_0%,color-mix(in_srgb,var(--color-background)_88%,transparent)_36%,color-mix(in_srgb,var(--color-background)_44%,transparent)_64%,color-mix(in_srgb,var(--color-background)_60%,transparent)_100%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,color-mix(in_srgb,var(--color-background)_70%,transparent)_0%,color-mix(in_srgb,var(--color-background)_10%,transparent)_38%,color-mix(in_srgb,var(--color-background)_82%,transparent)_100%)]" />
      </div>

      <div className="relative z-10 flex min-h-screen flex-col">
        <Header />
        <Hero />
        <Footer />
      </div>
    </div>
  );
};

export default Home;
