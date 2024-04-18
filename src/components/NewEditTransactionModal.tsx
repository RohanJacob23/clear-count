"use client";

import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useRouter } from "next/navigation";

export default function NewEditTransactionModal({
  transactionId,
}: {
  transactionId: string;
}) {
  const router = useRouter();
  return (
    <Dialog defaultOpen={true}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit transaction</DialogTitle>
          <DialogDescription>Using interscepting routes</DialogDescription>
        </DialogHeader>
        <div>My Post: {transactionId}</div>
      </DialogContent>
    </Dialog>
  );
}
