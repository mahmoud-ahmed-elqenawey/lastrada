"use client";

import { useRef } from "react";
import { Trash2 } from "lucide-react";
import { deleteFeaturedBrand } from "@/app/admin/actions";

export function DeleteFeaturedBrandButton({ brandId, brandName }: { brandId: string; brandName: string }) {
  const formRef = useRef<HTMLFormElement>(null);

  return (
    <form ref={formRef} action={deleteFeaturedBrand}>
      <input type="hidden" name="brand_id" value={brandId} />
      <button
        type="button"
        className="cinema-button cinema-button-danger admin-compact-button"
        onClick={() => {
          const confirmed = window.confirm(`حذف "${brandName}"؟ لا يمكن التراجع عن هذه العملية.`);

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
