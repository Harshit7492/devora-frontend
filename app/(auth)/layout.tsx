export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="grid min-h-screen bg-background lg:grid-cols-[1.1fr_0.9fr]">
      <section className="relative hidden overflow-hidden border-r border-border/60 bg-sidebar px-10 py-12 text-sidebar-foreground lg:flex lg:flex-col">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(240,138,36,0.34),transparent_24rem)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(15,118,110,0.28),transparent_26rem)]" />
        <div className="relative z-10 flex items-center gap-3 text-sm uppercase tracking-[0.28em] text-sidebar-muted">
          <span className="inline-flex size-3 rounded-full bg-accent" />
          Devora
        </div>
        <div className="relative z-10 mt-auto max-w-xl space-y-6">
          <div className="inline-flex rounded-full border border-sidebar-border px-4 py-2 text-xs uppercase tracking-[0.2em] text-sidebar-muted">
            Agentic Workspace OS
          </div>
          <h1 className="max-w-lg text-5xl font-semibold leading-[1.02] tracking-[-0.04em]">
            Build projects with tickets, timelines, files, and AI in one operating layer.
          </h1>
          <p className="max-w-md text-base leading-7 text-sidebar-muted">
            Devora keeps auth, workspace routing, realtime sync, and module isolation in place from day one.
          </p>
        </div>
      </section>
      <section className="flex items-center justify-center px-6 py-10 sm:px-10">{children}</section>
    </main>
  );
}
