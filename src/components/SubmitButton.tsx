"use client";

import { useFormStatus } from "react-dom";
import { Button } from "./ui/button";
import { ReloadIcon } from "@radix-ui/react-icons";

export default function SubmitButton({ text }: { text: string }) {
  const { pending } = useFormStatus();

  return (
    <Button disabled={pending} className="w-full" type="submit">
      {pending ? (
        <>
          <ReloadIcon className="mr-2 size-4 animate-spin" />
          Please wait...
        </>
      ) : (
        text
      )}
    </Button>
  );
}
