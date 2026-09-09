import Image from "next/image";

const BrandPanel = () => {
  return (
    <div className="relative hidden overflow-hidden md:block md:flex-1">
      <Image
        src="/images/spray-card.jpg"
        alt=""
        fill
        priority
        sizes="(min-width: 768px) 40vw, 0px"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-primary/95 via-primary/20 to-transparent" />
    </div>
  );
};

export default BrandPanel;
