import { useId } from "react";
import type { ReactElement } from "react";
import { MountainSnow, Rainbow } from "lucide-react";

export interface FeatureBentoProps {
  /** Visually hidden section heading; names the landmark for assistive tech. */
  heading?: string;
  hero?: {
    badge: string;
    titleLines: readonly string[];
    description: string;
  };
  peaks?: { value: string; label: string };
  feature?: { title: string; description: string };
  cta?: { badge: string; titleLines: readonly string[]; href: string };
  community?: { value: string; label: string };
  satisfaction?: { value: string; label: string };
}

const DEFAULTS = {
  heading: "Features",
  hero: {
    badge: "Live Adventures",
    titleLines: ["Explore Beyond", "Boundaries"],
    description:
      "Discover curated trails that challenge your limits and reconnect you with nature's raw beauty.",
  },
  peaks: { value: "2,847", label: "Peaks Conquered" },
  feature: {
    title: "Instant Routes",
    description:
      "AI-powered trail recommendations based on your skill level and preferences.",
  },
  cta: { badge: "Join Now", titleLines: ["Get Your", "Explorer Pass"], href: "#" },
  community: { value: "18.2k+", label: "Active Community" },
  satisfaction: { value: "94%", label: "Satisfaction Rate" },
} satisfies Required<FeatureBentoProps>;

const Lines = ({ lines }: { lines: readonly string[] }): ReactElement => (
  <>
    {lines.map((line, i) => (
      <span key={line}>
        {i > 0 && <br />}
        {line}
      </span>
    ))}
  </>
);

export const FeatureBento = ({
  heading = DEFAULTS.heading,
  hero = DEFAULTS.hero,
  peaks = DEFAULTS.peaks,
  feature = DEFAULTS.feature,
  cta = DEFAULTS.cta,
  community = DEFAULTS.community,
  satisfaction = DEFAULTS.satisfaction,
}: FeatureBentoProps): ReactElement => {
  const headingId = useId();

  return (
    <section
      aria-labelledby={headingId}
      className="bg-background min-h-screen py-10 font-manrope"
    >
      <h2 id={headingId} className="sr-only">
        {heading}
      </h2>
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 auto-rows-[280px]">
          {/* Hero Card - Large */}
          <div className="md:col-span-2 md:row-span-2 bg-linear-to-br from-blue-100 via-blue-600 to-blue-500 rounded-3xl p-10 text-white flex flex-col justify-end relative overflow-hidden group">
            <div className="absolute inset-0 bg-[url('https://cdn.21st.dev/assets/mirror/63/633a5f888495309f7752ee698cee304063cc16f4311ffa059d903266dc101e40.jpg')] bg-cover bg-center opacity-30 group-hover:scale-105 transition-transform duration-700" />
            <div className="absolute top-0 left-0 w-full h-full bg-linear-to-t from-black/60 to-transparent" />

            <div className="relative z-10 space-y-3">
              <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-1.5 text-sm font-medium">
                <span
                  aria-hidden="true"
                  className="size-2 bg-green-400 rounded-full motion-safe:animate-pulse"
                />
                {hero.badge}
              </div>
              <h3 className="text-5xl font-bold tracking-tight">
                <Lines lines={hero.titleLines} />
              </h3>
              <p className="max-w-md text-white/90 text-lg">{hero.description}</p>
            </div>
          </div>

          {/* Stats Card 1 */}
          <div className="bg-linear-to-br from-blue-300 to-blue-700 rounded-3xl p-8 flex flex-col justify-between relative overflow-hidden group transition-all">
            <div className="absolute -right-8 -top-8 size-32 bg-white/20 rounded-full blur-2xl transition-transform duration-500" />
            <div className="relative z-10">
              <div
                aria-hidden="true"
                className="size-14 text-white rounded-2xl bg-blue-600 backdrop-blur-sm flex items-center justify-center text-2xl mb-4"
              >
                <MountainSnow className="w-6 h-6" />
              </div>
              <dl className="flex flex-col-reverse">
                <dt className="text-neutral-100 font-medium">{peaks.label}</dt>
                <dd className="text-4xl font-black text-white mb-2">{peaks.value}</dd>
              </dl>
            </div>
          </div>

          {/* Feature Card */}
          <div className="bg-card rounded-3xl p-8 flex flex-col justify-between border border-border transition-all group">
            <div
              aria-hidden="true"
              className="size-12 rounded-lg bg-linear-to-br from-blue-500 to-cyan-400 flex items-center justify-center text-white text-xl font-bold transition-transform"
            >
              <Rainbow className="w-6 h-6" />
            </div>
            <div className="space-y-2">
              <h3 className="text-2xl font-bold text-card-foreground">
                {feature.title}
              </h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          </div>

          {/* CTA Card */}
          <a
            href={cta.href}
            className="bg-linear-to-br from-neutral-950 to-neutral-800 rounded-3xl p-8 text-white flex flex-col justify-between transition-all cursor-pointer group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            <div className="flex justify-between items-start">
              <span className="text-xs font-bold uppercase tracking-wider bg-white/20 backdrop-blur-sm px-3 py-1.5 rounded-full">
                {cta.badge}
              </span>
              <div
                aria-hidden="true"
                className="size-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-xl group-hover:bg-white/30 group-hover:rotate-45 transition-all"
              >
                ↗
              </div>
            </div>
            <h3 className="text-2xl font-bold leading-tight">
              <Lines lines={cta.titleLines} />
            </h3>
          </a>

          {/* Stats Card 2 */}
          <div className="bg-gray-950 rounded-3xl p-8 text-white flex flex-col justify-center gap-3 relative overflow-hidden group">
            <div className="absolute inset-0 bg-linear-to-br from-purple-600/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <span
              aria-hidden="true"
              className="absolute top-5 right-5 flex size-3"
            >
              <span className="absolute inline-flex h-full w-full motion-safe:animate-ping rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex size-3 rounded-full bg-blue-500"></span>
            </span>
            <dl className="relative z-10 flex flex-col-reverse">
              <dt className="text-sm uppercase tracking-widest text-neutral-400 font-semibold mt-2">
                {community.label}
              </dt>
              <dd className="text-5xl font-black bg-linear-to-r from-blue-200 to-blue-600 bg-clip-text text-transparent">
                {community.value}
              </dd>
            </dl>
          </div>

          {/* Stats Card 3 */}
          <div className="bg-linear-to-br from-blue-500 to-blue-600 rounded-3xl p-8 text-white flex flex-col justify-center gap-3 relative overflow-hidden group hover:shadow-2xl transition-all">
            <div className="absolute -bottom-10 -right-10 size-40 bg-white/10 rounded-full blur-3xl" />
            <dl className="relative z-10 flex flex-col-reverse">
              <dt className="text-sm uppercase tracking-widest text-white font-semibold mt-2">
                {satisfaction.label}
              </dt>
              <dd className="text-5xl font-black">{satisfaction.value}</dd>
            </dl>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeatureBento;
