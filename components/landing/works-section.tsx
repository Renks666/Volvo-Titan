import { ArrowRight } from "lucide-react";
import { existsSync } from "node:fs";
import path from "node:path";

import { SectionHeading } from "./section-heading";
import { WorksGallery } from "./works-gallery";

type WorkItem = {
  src: string;
  title: string;
  model: string;
};

const WORKS: WorkItem[] = [
  { src: "/works/work-1.jpg", title: "Диагностика двигателя", model: "Volvo XC90" },
  { src: "/works/work-2.jpg", title: "Техническое обслуживание", model: "Volvo XC60" },
  { src: "/works/work-3.jpg", title: "Ремонт двигателя", model: "Volvo S60" },
  { src: "/works/work-4.jpg", title: "Ремонт двигателя", model: "Volvo V60" },
];

function fileExists(publicSrc: string) {
  return existsSync(path.join(process.cwd(), "public", publicSrc));
}

export function WorksSection() {
  const works = WORKS.map((w) => ({ ...w, exists: fileExists(w.src) }));

  return (
    <section id="works" className="px-0 py-[var(--landing-section-space)] md:py-24">
      <div className="section-shell">
        <SectionHeading
          eyebrow="Портфолио"
          title="Наши работы"
          description="Реальные кейсы — что привезли, что сделали"
        />

        <WorksGallery works={works} />

        <div className="mt-7 flex justify-center sm:mt-10">
          <a
            href="#lead"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-[var(--highlight)] px-7 py-3.5 text-sm font-semibold text-[#050913] transition hover:bg-[var(--highlight)]/90"
          >
            Записаться на диагностику
            <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </div>
    </section>
  );
}
