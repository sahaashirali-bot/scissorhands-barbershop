import Image from "next/image";

export function LogoMark({ className }: { className?: string }) {
  return (
    <Image
      src="/images/logo.png"
      alt="Scissorhands Barbershop"
      width={200}
      height={133}
      className={`${className ?? ""} object-contain`}
      priority
    />
  );
}

export function LogoWordmark({ className }: { className?: string }) {
  return (
    <div className={className}>
      <span className="font-display text-2xl tracking-wide text-bone leading-none block">
        SCISSORHANDS
      </span>
      <span className="text-[0.6rem] tracking-[0.35em] text-gold uppercase block">
        Barbershop
      </span>
    </div>
  );
}
