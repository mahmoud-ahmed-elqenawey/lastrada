"use client";

import { useMemo, useState } from "react";
import { UploadCloud } from "lucide-react";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";

type MediaUploadFieldProps = {
  label: string;
  name: string;
  defaultValue?: string;
  kind?: "input" | "textarea";
  accept?: string;
  multiple?: boolean;
  help?: string;
  dir?: "rtl" | "ltr";
  required?: boolean;
  uploadFolder?: string;
};

const bucketName = process.env.NEXT_PUBLIC_SUPABASE_MEDIA_BUCKET || "project-media";
const imageMimeTypes = new Set(["image/jpeg", "image/png", "image/webp", "image/gif", "image/svg+xml"]);

function getSafeSegment(value: string) {
  return value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function getSafeFileName(fileName: string) {
  const extension = fileName.includes(".") ? `.${fileName.split(".").pop()}` : "";
  const baseName = fileName.replace(/\.[^.]+$/, "");
  return `${getSafeSegment(baseName) || "media"}${extension.toLowerCase()}`;
}

function getCurrentProjectSlug() {
  const slugInput = document.querySelector<HTMLInputElement>('input[name="slug"]');
  return getSafeSegment(slugInput?.value ?? "") || "unassigned";
}

export function MediaUploadField({
  label,
  name,
  defaultValue = "",
  kind = "input",
  accept = "image/*,video/*",
  multiple = false,
  help,
  dir,
  required = false,
  uploadFolder,
}: MediaUploadFieldProps) {
  const supabase = useMemo(() => createSupabaseBrowserClient(), []);
  const [value, setValue] = useState(defaultValue);
  const [status, setStatus] = useState("");
  const [error, setError] = useState("");

  async function uploadFiles(files: FileList | null) {
    if (!files?.length) return;

    setError("");
    setStatus(`جاري رفع ${files.length} ${files.length > 1 ? "ملفات" : "ملف"}...`);

    try {
      const uploadedUrls: string[] = [];
      const projectSlug = uploadFolder ? getSafeSegment(uploadFolder) : getCurrentProjectSlug();

      for (const file of Array.from(files)) {
        if (!imageMimeTypes.has(file.type) && !file.type.startsWith("video/")) {
          throw new Error("مسموح برفع الصور والفيديوهات فقط.");
        }

        const folder = file.type.startsWith("video/") ? "videos" : "images";
        const filePath = `projects/${projectSlug}/${folder}/${Date.now()}-${crypto.randomUUID()}-${getSafeFileName(file.name)}`;
        const { error: uploadError } = await supabase.storage.from(bucketName).upload(filePath, file, {
          cacheControl: "31536000",
          contentType: file.type,
          upsert: false,
        });

        if (uploadError) {
          throw uploadError;
        }

        const { data } = supabase.storage.from(bucketName).getPublicUrl(filePath);
        uploadedUrls.push(data.publicUrl);
      }

      setValue((currentValue) => {
        if (kind === "textarea" || multiple) {
          return [currentValue, ...uploadedUrls].filter(Boolean).join("\n");
        }

        return uploadedUrls[0] ?? currentValue;
      });
      setStatus("تم الرفع.");
    } catch (uploadError) {
      const message = uploadError instanceof Error ? uploadError.message : "";
      setError(message.toLowerCase().includes("bucket not found") ? "مساحة رفع الملفات غير مفعلة. تواصل مع المطور لمراجعة إعدادات الرفع." : message || "فشل الرفع.");
      setStatus("");
    }
  }

  return (
    <div className="grid gap-2 text-sm font-bold text-white/74">
      <span>
        {label} {required ? <span className="text-red-300">*</span> : null}
      </span>
      {kind === "textarea" ? (
        <textarea
          name={name}
          rows={5}
          dir={dir}
          required={required}
          value={value}
          onChange={(event) => setValue(event.target.value)}
          className="admin-input resize-y py-3"
        />
      ) : (
        <input
          name={name}
          type="url"
          dir={dir}
          required={required}
          value={value}
          onChange={(event) => setValue(event.target.value)}
          className="admin-input"
        />
      )}
      <span className="flex flex-wrap items-center gap-3">
        <label className="relative inline-flex cursor-pointer">
          <input
            type="file"
            accept={accept}
            multiple={multiple}
            className="absolute inset-0 z-10 cursor-pointer opacity-0"
            onChange={(event) => uploadFiles(event.target.files)}
          />
          <span className="cinema-button cinema-button-muted min-h-10 px-4 text-xs">
            <UploadCloud aria-hidden="true" />
            رفع ملف
          </span>
        </label>
        {status ? <span className="text-xs font-bold text-emerald-200">{status}</span> : null}
        {error ? <span className="text-xs font-bold text-red-200">{error}</span> : null}
      </span>
      {help ? <span className="text-xs font-normal leading-5 text-white/38">{help}</span> : null}
    </div>
  );
}
