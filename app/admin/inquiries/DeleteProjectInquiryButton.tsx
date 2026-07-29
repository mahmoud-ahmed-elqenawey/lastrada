"use client";

import { Trash2 } from "lucide-react";
import { deleteProjectInquiry } from "@/app/admin/actions";

export function DeleteProjectInquiryButton({ inquiryId, inquiryTitle }: { inquiryId: string; inquiryTitle: string }) {
  return (
    <form
      action={deleteProjectInquiry}
      onSubmit={(event) => {
        if (!window.confirm(`حذف طلب "${inquiryTitle}"؟ لا يمكن التراجع عن هذه العملية.`)) {
          event.preventDefault();
        }
      }}
    >
      <input type="hidden" name="inquiry_id" value={inquiryId} />
      <button type="submit" className="cinema-button cinema-button-danger admin-compact-button">
        <Trash2 aria-hidden="true" />
        حذف
      </button>
    </form>
  );
}
