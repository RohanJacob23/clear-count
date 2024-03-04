import { ReloadIcon } from "@radix-ui/react-icons";
import React from "react";

export default function loading() {
  return (
    <section className="flex items-center justify-center min-h-screen">
      <ReloadIcon className="text-primary animate-spin size-8" />
    </section>
  );
}
