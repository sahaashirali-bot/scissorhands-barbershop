import Image from "next/image";

const PHOTOS = [
  { src: "/images/gallery/fb-5.jpg", alt: "Natural curl cut, finished" },
  { src: "/images/gallery/fb-design-cut.jpg", alt: "Custom design line work" },
  { src: "/images/gallery/fb-2.jpg", alt: "Clean skin fade, back view" },
  { src: "/images/gallery/fb-sidepart.jpg", alt: "Sharp side part fade" },
  { src: "/images/gallery/fb-beard-shave.jpg", alt: "Curly top fade with clean beard lineup" },
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
        <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3">
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
                sizes="(min-width: 640px) 33vw, 50vw"
                className="object-cover transition duration-500 group-hover:scale-105"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
