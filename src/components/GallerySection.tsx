import Image from "next/image";

const PHOTOS = [
  { src: "/images/gallery/cut-3.jpg", alt: "Sharp side part fade" },
  { src: "/images/gallery/cut-4.jpg", alt: "Clean taper with line-up" },
  { src: "/images/gallery/cut-1.jpg", alt: "Precision razor part detail" },
  { src: "/images/gallery/cut-2.jpg", alt: "Undercut with disconnected fade" },
];

export function GallerySection() {
  return (
    <section className="border-t border-ink-line">
      <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
        <h2 className="font-display text-4xl tracking-wide text-bone sm:text-5xl">
          RECENT WORK
        </h2>
        <p className="mt-3 max-w-lg text-bone-dim">
          A few cuts straight from the chair.
        </p>
        <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {PHOTOS.map((photo, i) => (
            <div
              key={photo.src}
              className={`group relative aspect-[3/4] overflow-hidden border border-ink-line ${
                i % 2 === 0 ? "cut-tr" : "cut-br"
              }`}
            >
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                sizes="(min-width: 640px) 25vw, 50vw"
                className="object-cover grayscale transition duration-500 group-hover:grayscale-0 group-hover:scale-105"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
