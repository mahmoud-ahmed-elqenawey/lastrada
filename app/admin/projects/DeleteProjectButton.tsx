"use client";

import { useRef } from "react";
import { Trash2 } from "lucide-react";
import { deleteProject } from "@/app/admin/actions";

export function DeleteProjectButton({ projectId, projectTitle }: { projectId: string; projectTitle: string }) {
  const formRef = useRef<HTMLFormElement>(null);

  return (
    <form ref={formRef} action={deleteProject}>
      <input type="hidden" name="project_id" value={projectId} />
      <button
        type="button"
        className="cinema-button cinema-button-danger admin-compact-button"
        onClick={() => {
          const confirmed = window.confirm(`حذف "${projectTitle}"؟ لا يمكن التراجع عن هذه العملية.`);

          if (confirmed) {
            formRef.current?.requestSubmit();
          }
        }}
      >
        <Trash2 aria-hidden="true" />
        حذف
      </button>
    </form>
  );
}
