import React, { useState } from "react";
import {
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { DialogClose } from "@radix-ui/react-dialog";
import { toast } from "sonner";
import { addCategory } from "@/actions/dbActions";

export default function AddCardModalContent({ userId }: { userId: string }) {
  const [name, setName] = useState("");
  const handleAdd = async () => {
    await addCategory(name, userId).finally(() =>
      toast.success("Category Added!!")
    );
  };
  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Add Category</DialogTitle>
      </DialogHeader>
      <div className="grid w-full items-center gap-4">
        <Label htmlFor="name">Category Name</Label>
        <Input
          value={name}
          onChange={(e) => setName(e.target.value)}
          type="text"
          required
          id="name"
          placeholder="name..."
        />
      </div>
      <DialogFooter>
        <DialogClose asChild>
          <Button onClick={handleAdd}>Add</Button>
        </DialogClose>
      </DialogFooter>
    </DialogContent>
  );
}
