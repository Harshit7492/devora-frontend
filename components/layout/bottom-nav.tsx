"use client";

import { useState } from "react";
import { RichTextEditor } from "@/components/ui/rich-text-editor";
import { Button } from "@/components/ui/button";

export function BottomNav() {
  const [isNotesOpen, setIsNotesOpen] = useState(false);
  const [noteContent, setNoteContent] = useState("");

  const personalLinks = [
    { label: "My Tasks", isActive: false },
    { label: "My Events", isActive: false },
    { label: "My Bookmarks", isActive: false },
    { label: "My Notes", isActive: isNotesOpen, onClick: () => setIsNotesOpen(!isNotesOpen) },
  ];

  return (
    <>
      {/* Floating Notes Popover */}
      {isNotesOpen && (
        <div className="fixed bottom-[60px] left-1/2 z-50 -translate-x-1/2 animate-in fade-in slide-in-from-bottom-2 md:left-auto md:right-1/3 md:translate-x-1/4">
          <div className="w-[450px] rounded-xl border border-[#2d3a43] bg-[#1a252c] p-3 shadow-2xl">
            <div className="mb-2 px-1 text-sm font-semibold text-white">Jot something down...</div>
            <div className="rounded-lg bg-[#24333c] text-white">
              <RichTextEditor 
                value={noteContent} 
                onChange={setNoteContent} 
              />
            </div>
            <div className="mt-2 flex justify-end">
              <Button 
                size="sm" 
                className="bg-[#3B82F6] text-white hover:bg-[#2563EB]"
                onClick={() => setIsNotesOpen(false)}
              >
                Save & Close
              </Button>
            </div>
          </div>
          
          {/* Popover Arrow pointing down to the button */}
          <div className="absolute -bottom-2 right-[42px] h-4 w-4 rotate-45 border-b border-r border-[#2d3a43] bg-[#1a252c]" />
        </div>
      )}

      {/* Global Bottom Navigation Bar */}
      <div className="fixed bottom-0 left-0 right-0 z-40 flex h-14 w-full items-center justify-between border-t border-[#2d3a43] bg-[#182329] px-4 shadow-lg sm:px-6 lg:px-8">
        
        {/* Left: Avatar placeholder (optional based on image) */}
        <div className="flex items-center">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#f08a24] text-xs font-bold text-white">
            H
          </div>
        </div>

        {/* Center: Personal Links */}
        <div className="flex flex-1 items-center justify-center space-x-1 md:space-x-4">
          {personalLinks.map((link) => (
            <button
              key={link.label}
              onClick={link.onClick}
              className={`rounded-lg px-4 py-1.5 text-sm font-medium transition-colors ${
                link.isActive 
                  ? "bg-white text-[#182329]" 
                  : "text-gray-300 hover:bg-[#202f37] hover:text-white"
              }`}
            >
              {link.label}
            </button>
          ))}
        </div>

        {/* Right: Global Actions */}
        <div className="flex items-center space-x-1 rounded-full bg-[#2a3c46] p-1">
          <button className="rounded-full px-3 py-1 text-sm font-medium text-gray-300 transition-colors hover:text-white">
            Pings +
          </button>
          <div className="h-4 w-px bg-[#415b69]"></div>
          <button className="flex items-center space-x-1.5 rounded-full px-3 py-1 text-sm font-medium text-white transition-colors hover:bg-[#344b56]">
            <span className="h-2 w-2 rounded-full bg-red-500"></span>
            <span>New for you</span>
          </button>
        </div>
        
      </div>
    </>
  );
}
