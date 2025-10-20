"use client";

import { useState, useRef } from "react";
import { ImagePlus } from "lucide-react";
import { Progress } from "@/components/ui/Progress";
// import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/Dialog";
import type { PhotoUploadState } from "@/types/staff";

interface PhotoUploadProps {
  currentPhoto?: string;
  onPhotoChange: (photo: string) => void;
}

export function PhotoUpload({ currentPhoto, onPhotoChange }: PhotoUploadProps) {
  const [uploadState, setUploadState] = useState<PhotoUploadState>({
    status: "idle",
    progress: 0,
  });
  const [isOpen, setIsOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const simulateUpload = async (file: File) => {
    setUploadState({ status: "uploading", progress: 0 });

    // Simulate upload progress
    for (let i = 0; i <= 100; i += 10) {
      await new Promise((resolve) => setTimeout(resolve, 200));
      setUploadState((prev) => ({ ...prev, progress: i }));
    }

    // Create preview URL
    const preview = URL.createObjectURL(file);
    setUploadState({ status: "success", progress: 100, photo: preview });
    onPhotoChange(preview);

    // Show success state briefly before closing
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsOpen(false);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      simulateUpload(file);
    }
  };

  return (
    <>
      <div
        className="relative cursor-pointer group"
        onClick={() => setIsOpen(true)}
      >
        {currentPhoto ? (
          <div className="h-24 w-24 rounded-full overflow-hidden">
            <img
              src={currentPhoto || "/placeholder.svg"}
              alt="Profile"
              className="h-full w-full object-cover"
            />
          </div>
        ) : (
          <div className="h-24 w-24 rounded-full border-2 border-dashed border-orange flex items-center justify-center">
            <ImagePlus className="h-8 w-8 text-orange" />
          </div>
        )}
        <div className="absolute inset-0 bg-black/50 rounded-full opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
          <span className="text-white text-sm">Change Photo</span>
        </div>
      </div>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Photo</DialogTitle>
          </DialogHeader>

          {uploadState.status === "uploading" ? (
            <div className="py-8">
              <Progress value={uploadState.progress} className="mb-4" />
              <p className="text-center text-sm text-gray-500">
                Uploading photo...
              </p>
            </div>
          ) : uploadState.status === "success" ? (
            <div className="py-8 flex flex-col items-center">
              <div className="h-16 w-16 rounded-full bg-green-500 flex items-center justify-center mb-4">
                <svg
                  className="h-8 w-8 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <p className="text-lg font-semibold">
                Photo uploaded successfully!
              </p>
            </div>
          ) : (
            <div className="py-8">
              <div
                className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer hover:border-orange transition-colors"
                onClick={() => fileInputRef.current?.click()}
              >
                <ImagePlus className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                <p className="text-sm text-gray-500">
                  Click to upload a photo or drag and drop
                </p>
              </div>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleFileChange}
              />
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
