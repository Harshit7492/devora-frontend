import { ArrowLeft, ArrowRight } from "lucide-react";
import lineupSeed from "@/data/seeds/lineup.json";

type TimelinePageProps = {
  params: Promise<{
    instance: string;
    workspace: string;
    project: string;
  }>;
};

export default async function TimelinePage({ params }: TimelinePageProps) {
  await params;

  return (
    <section className="relative min-h-[calc(100vh-5.2rem)] overflow-hidden bg-[#091217] px-4 pb-8 pt-8 sm:px-6 lg:px-8">
      <div className="flex items-center justify-between">
        <button className="inline-flex items-center gap-2 rounded-full border border-white/14 bg-white/4 px-5 py-3 text-[1.05rem] text-white/92 transition-colors hover:bg-white/8">
          <ArrowLeft className="size-4" />
          Prev 6 weeks
        </button>
        <button className="inline-flex items-center gap-2 rounded-full border border-white/14 bg-white/4 px-5 py-3 text-[1.05rem] text-white/92 transition-colors hover:bg-white/8">
          Next 6 weeks
          <ArrowRight className="size-4" />
        </button>
      </div>

      <div className="relative mt-12 min-h-[44rem]">
        <div className="pointer-events-none absolute inset-0 grid grid-cols-13">
          {lineupSeed.weekLabels.map((label) => (
            <div key={label} className="relative border-l border-dotted border-white/14">
              <div className="pl-3 pt-1 text-[1.02rem] text-[#b7cedf]">{label}</div>
            </div>
          ))}
        </div>

        <div className="pointer-events-none absolute inset-y-0 left-1/2 w-[3px] -translate-x-1/2 bg-[#7ed295]" />
        <div className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 rounded-md bg-[#78cb88] px-5 py-4 text-[1.2rem] font-medium text-[#102018] shadow-[0_12px_30px_rgba(120,203,136,0.2)]">
          <span className="font-semibold">{lineupSeed.todayLabel.split(",")[0]},</span>
          {lineupSeed.todayLabel.replace(`${lineupSeed.todayLabel.split(",")[0]},`, "")}
        </div>

        <div className="absolute left-1/2 top-[22%] w-full max-w-[54rem] -translate-x-1/2 rounded-[1.5rem] border border-dashed border-[#77683a] px-10 py-10 text-[#d9d0c4]">
          <div className="flex gap-5">
            <div className="mt-1 flex flex-col gap-1 text-white/35">
              <div className="h-1.5 w-7 rounded-full bg-current" />
              <div className="h-1.5 w-5 rounded-full bg-current" />
              <div className="h-1.5 w-7 rounded-full bg-current" />
            </div>
            <div className="space-y-5">
              <h1 className="text-[2.1rem] font-semibold tracking-[-0.04em] text-[#d8d0c4]">{lineupSeed.emptyState.title}</h1>
              <p className="max-w-3xl text-[1.15rem] leading-9 text-[#c0b6a9]">{lineupSeed.emptyState.description}</p>
              <p className="text-[1.15rem] leading-9 text-[#c0b6a9]">
                <a href="#" className="text-[#63a8ff] underline underline-offset-4">
                  {lineupSeed.emptyState.linkLabel}
                </a>{" "}
                {lineupSeed.emptyState.suffix}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
