import Image from "next/image";

const Bento = () => {
  return (
    <div className="hidden flex-1 gap-4 md:flex">
      <div className="relative w-20 shrink-0 overflow-hidden rounded-2xl border border-muted/20">
        <Image
          src="/images/tall-bark-card.jpg"
          alt=""
          fill
          quality={90}
          sizes="80px"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/40" />
      </div>

      <div className="flex flex-1 flex-col gap-4">
        <div className="relative flex-1 overflow-hidden rounded-2xl border border-muted/20">
          <Image
            src="/images/leaf-card.jpg"
            alt=""
            fill
            quality={90}
            sizes="(min-width: 768px) 20vw, 0px"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/40" />
        </div>
        <div className="relative flex-1 overflow-hidden rounded-2xl border border-muted/20">
          <Image
            src="/images/amber-card.jpg"
            alt=""
            fill
            quality={90}
            sizes="(min-width: 768px) 20vw, 0px"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/40" />
        </div>
      </div>

      <div className="relative flex-1 overflow-hidden rounded-2xl border border-muted/20">
        <Image
          src="/images/spray-card.jpg"
          alt=""
          fill
          priority
          quality={90}
          sizes="(min-width: 768px) 25vw, 0px"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/40" />
      </div>
    </div>
  );
};

export default Bento;
