"use client";

import { useState } from "react";
import {
  Bookmark,
  Calendar,
  CheckSquare,
  StickyNote,
} from "lucide-react";
import { RichTextEditor } from "@/components/ui/rich-text-editor";
import { Button } from "@/components/ui/button";
import { useUIStore } from "@/store/ui.store";

/* ────────────────────────────────────────────── */
/*  Tab content panels                            */
/* ────────────────────────────────────────────── */

function MyTasksContent() {
  return (
    <div className="flex flex-col items-center justify-center py-10 text-center">
      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-[#24333c] text-gray-400">
        <CheckSquare className="h-6 w-6" />
      </div>
      <p className="text-[0.95rem] text-gray-400">
        You don&apos;t have any assignments due soon.
      </p>
      <button className="mt-4 rounded-full border border-[#3a4f5c] bg-[#24333c] px-5 py-2 text-sm font-medium text-gray-200 transition-colors hover:bg-[#2d3f4a] hover:text-white">
        See all upcoming tasks and cards
      </button>
    </div>
  );
}

function MyEventsContent() {
  return (
    <div className="flex flex-col items-center justify-center py-10 text-center">
      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-[#24333c] text-gray-400">
        <Calendar className="h-6 w-6" />
      </div>
      <p className="text-[0.95rem] text-gray-400">
        No events in the next 7 days
      </p>
      <button className="mt-4 rounded-full border border-[#3a4f5c] bg-[#24333c] px-5 py-2 text-sm font-medium text-gray-200 transition-colors hover:bg-[#2d3f4a] hover:text-white">
        See all future events
      </button>
    </div>
  );
}

function MyBookmarksContent() {
  return (
    <div className="flex flex-col items-center justify-center py-10 text-center">
      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-[#24333c] text-gray-400">
        <Bookmark className="h-6 w-6" />
      </div>
      <p className="text-[0.95rem] text-gray-400">
        You haven&apos;t bookmarked anything yet
      </p>
    </div>
  );
}

function MyNotesContent({ onClose }: { onClose: () => void }) {
  const [noteContent, setNoteContent] = useState("");

  return (
    <div>
      <div className="mb-2 px-1 text-sm font-semibold text-white">
        Jot something down...
      </div>
      <div className="rounded-lg bg-[#24333c] text-white">
        <RichTextEditor value={noteContent} onChange={setNoteContent} />
      </div>
      <div className="mt-2 flex justify-end">
        <Button
          size="sm"
          className="bg-[#3B82F6] text-white hover:bg-[#2563EB]"
          onClick={onClose}
        >
          Save &amp; Close
        </Button>
      </div>
    </div>
  );
}

/* ────────────────────────────────────────────── */
/*  Main component                                */
/* ────────────────────────────────────────────── */

const tabs = [
  { key: "tasks" as const, label: "My Tasks" },
  { key: "events" as const, label: "My Events" },
  { key: "bookmarks" as const, label: "My Bookmarks" },
  { key: "notes" as const, label: "My Notes" },
];

export function BottomNav() {
  const bottomNavTab = useUIStore((s) => s.bottomNavTab);
  const setBottomNavTab = useUIStore((s) => s.setBottomNavTab);
  const setPingsOpen = useUIStore((s) => s.setPingsOpen);

  const isOpen = bottomNavTab !== null;

  return (
    <>
      {/* ─── Floating content panel ─── */}
      {isOpen && (
        <div className="fixed bottom-[60px] left-1/2 z-50 w-[94vw] max-w-[580px] -translate-x-1/2 animate-in fade-in slide-in-from-bottom-2 duration-200">
          <div className="rounded-xl border border-[#2d3a43] bg-[#1a252c] p-4 shadow-[0_-12px_40px_rgba(0,0,0,0.3)]">
            {bottomNavTab === "tasks" && <MyTasksContent />}
            {bottomNavTab === "events" && <MyEventsContent />}
            {bottomNavTab === "bookmarks" && <MyBookmarksContent />}
            {bottomNavTab === "notes" && (
              <MyNotesContent onClose={() => setBottomNavTab(null)} />
            )}
          </div>
        </div>
      )}

      {/* ─── Bottom bar ─── */}
      <div className="fixed bottom-0 left-0 right-0 z-40 flex h-14 w-full items-center justify-between border-t border-[#2d3a43] bg-[#182329] px-4 shadow-lg sm:px-6 lg:px-8">
        {/* Left: Avatar */}
        <div className="flex items-center">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#f08a24] text-xs font-bold text-white">
            H
          </div>
        </div>

        {/* Center: Tab buttons */}
        <div className="flex flex-1 items-center justify-center space-x-1 md:space-x-4">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setBottomNavTab(tab.key)}
              className={`rounded-lg px-4 py-1.5 text-sm font-medium transition-colors ${
                bottomNavTab === tab.key
                  ? "bg-white text-[#182329]"
                  : "text-gray-300 hover:bg-[#202f37] hover:text-white"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Right: Pings + New for you */}
        <div className="flex items-center space-x-1 rounded-full bg-[#2a3c46] p-1">
          <button
            onClick={() => setPingsOpen(true)}
            className="rounded-full px-3 py-1 text-sm font-medium text-gray-300 transition-colors hover:text-white"
          >
            Pings +
          </button>
          <div className="h-4 w-px bg-[#415b69]" />
          <button
            onClick={() => setPingsOpen(true)}
            className="flex items-center space-x-1.5 rounded-full px-3 py-1 text-sm font-medium text-white transition-colors hover:bg-[#344b56]"
          >
            <span className="h-2 w-2 rounded-full bg-red-500" />
            <span>New for you</span>
          </button>
        </div>
      </div>
    </>
  );
}
