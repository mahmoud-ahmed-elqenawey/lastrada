"use client";

import { Trash2 } from "lucide-react";
import { deleteClientTestimonial } from "@/app/admin/actions";

type DeleteClientTestimonialButtonProps = {
  testimonialId: string;
  testimonialTitle: string;
};

export function DeleteClientTestimonialButton({ testimonialId, testimonialTitle }: DeleteClientTestimonialButtonProps) {
  return (
    <form
      action={deleteClientTestimonial}
      onSubmit={(event) => {
        if (!window.confirm(`هل تريد حذف رأي العميل: ${testimonialTitle}؟`)) {
          event.preventDefault();
        }
      }}
    >
      <input type="hidden" name="testimonial_id" value={testimonialId} />
      <button type="submit" className="cinema-button cinema-button-danger admin-compact-button">
        <Trash2 aria-hidden="true" />
        حذف
      </button>
    </form>
  );
}
