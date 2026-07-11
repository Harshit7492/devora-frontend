"use client";

import { useState } from "react";
import { ArrowLeft, Mail, Plus, X } from "lucide-react";
import { useUIStore } from "@/store/ui.store";

const sampleNotifications = [
  {
    id: 1,
    title: "Inviting others to Basecamp",
    preview:
      "There are two primary ways to invite co-workers, colleagues, contractors, clients, or...",
    time: "1:43am",
    source: "A message from Basecamp",
    unread: true,
  },
  {
    id: 2,
    title: "Getting around with the Basecamp menu",
    preview:
      "On every page you\u2019ll find the Basecamp menu centered at the top of the screen. This is you...",
    time: "1:43am",
    source: "A message from Basecamp",
    unread: true,
  },
  {
    id: 3,
    title: "Help, support, and getting in touch",
    preview:
      "At many software companies, support is an afterthought. It\u2019s something they don\u2019t really...",
    time: "1:43am",
    source: "A message from Basecamp",
    unread: true,
  },
];

export function PingsPanel() {
  const isPingsOpen = useUIStore((s) => s.isPingsOpen);
  const setPingsOpen = useUIStore((s) => s.setPingsOpen);
  const [filter, setFilter] = useState("");
  const [showTooltip, setShowTooltip] = useState(true);

  if (!isPingsOpen) return null;

  const filtered = sampleNotifications.filter(
    (n) =>
      !filter ||
      n.title.toLowerCase().includes(filter.toLowerCase()) ||
      n.preview.toLowerCase().includes(filter.toLowerCase()),
  );

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200"
        onClick={() => setPingsOpen(false)}
      />

      {/* Panel */}
      <div className="fixed inset-x-4 top-6 bottom-20 z-50 mx-auto flex max-w-[620px] flex-col overflow-hidden rounded-2xl border border-[#2d3a43] bg-[#182329] shadow-[0_32px_80px_rgba(0,0,0,0.55)] animate-in fade-in slide-in-from-bottom-4 duration-300 sm:inset-x-auto sm:w-[620px]">
        {/* ─── Header ─── */}
        <div className="relative flex items-start gap-4 px-6 pt-6 pb-4">
          {/* Ping + button */}
          <div className="flex flex-col items-center gap-1">
            <span className="text-lg font-bold text-white">Pings</span>
            <button className="group relative flex h-12 w-12 items-center justify-center rounded-full border-2 border-dashed border-[#3a8a9e]/50 text-[#3a8a9e] transition-colors hover:border-[#3a8a9e] hover:text-white">
              <Plus className="h-5 w-5" />
            </button>
            <span className="text-xs font-medium text-[#3a8a9e]">Ping</span>
          </div>

          {/* Tooltip */}
          {showTooltip && (
            <div className="relative ml-2 mt-1 flex-1">
              {/* Arrow */}
              <div className="absolute -left-3 top-3 h-3 w-3 rotate-45 border-b border-l border-dashed border-[#8a7a5a] bg-[#2a2418]" />
              <div className="rounded-xl border border-dashed border-[#8a7a5a] bg-[#2a2418]/80 px-4 py-3 text-sm leading-relaxed text-[#d4c9a8]">
                Pings are direct messages — just click +, type someone&apos;s
                name, and send them a private message.
              </div>
            </div>
          )}
        </div>

        {/* ─── New for you ─── */}
        <div className="flex items-center justify-between px-6 pb-2">
          <span className="text-sm font-semibold text-[#4aba6a]">
            New for you
          </span>
          <button className="text-xs font-medium text-gray-400 transition-colors hover:text-white">
            Mark all read
          </button>
        </div>

        {/* ─── Notifications list ─── */}
        <div className="flex-1 overflow-y-auto px-4">
          {filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-gray-500">
              <Mail className="mb-3 h-8 w-8 opacity-40" />
              <p className="text-sm">No notifications match your filter</p>
            </div>
          ) : (
            <div className="space-y-1">
              {filtered.map((notif) => (
                <button
                  key={notif.id}
                  className="group flex w-full items-start gap-3 rounded-xl px-3 py-3.5 text-left transition-colors hover:bg-[#1f2f38]"
                >
                  {/* Icon */}
                  <div className="relative mt-0.5 flex h-10 w-10 flex-shrink-0 items-center justify-center">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-[#3dbd5d] to-[#2d9e4a]">
                      <Mail className="h-4 w-4 text-white" />
                    </div>
                    {/* Checkmark badge */}
                    <div className="absolute -right-0.5 -bottom-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-[#3dbd5d] ring-2 ring-[#182329]">
                      <svg
                        className="h-2.5 w-2.5 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={3}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="min-w-0 flex-1">
                    <p className="text-[0.925rem] font-semibold leading-snug text-white">
                      {notif.title}
                    </p>
                    <p className="mt-0.5 line-clamp-2 text-sm leading-snug text-gray-400">
                      {notif.preview}
                    </p>
                    <p className="mt-1 text-xs text-gray-500">
                      {notif.time} · {notif.source}
                    </p>
                  </div>

                  {/* Unread dot */}
                  {notif.unread && (
                    <div className="mt-2 h-2.5 w-2.5 flex-shrink-0 rounded-full bg-red-500" />
                  )}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* ─── Filter ─── */}
        <div className="border-t border-[#2d3a43] px-4 py-3">
          <input
            type="text"
            placeholder="Filter..."
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="w-full rounded-lg bg-[#24333c] px-4 py-2.5 text-sm text-white placeholder:text-gray-500 focus:outline-none focus:ring-1 focus:ring-[#3a8a9e]/50"
          />
        </div>

        {/* ─── Footer ─── */}
        <div className="flex items-center justify-between border-t border-[#2d3a43] px-5 py-3">
          <button className="flex h-9 w-9 items-center justify-center rounded-full text-gray-400 transition-colors hover:bg-[#24333c] hover:text-white">
            <ArrowLeft className="h-5 w-5" />
          </button>
          <button
            onClick={() => setPingsOpen(false)}
            className="flex h-9 w-9 items-center justify-center rounded-full text-gray-400 transition-colors hover:bg-[#24333c] hover:text-white"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
      </div>
    </>
  );
}
