"use client";

import React, { useEffect, useRef, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Category, Transaction } from "@/types/type";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import { CalendarIcon, CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";
import { Calendar } from "./ui/calendar";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "./ui/command";
import { ScrollArea } from "./ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import SubmitButton from "./SubmitButton";
import { format } from "date-fns";
import { editTransactionFormAction } from "@/actions/addTransactionsAction";
import { useFormState } from "react-dom";
import { toast } from "sonner";
import { useRouter, useSearchParams } from "next/navigation";
import { useMediaQuery } from "@/lib/hook/useMediaQuery";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";

export default function EditTransactionModal({
  transactionId,
  userTransaction,
  categories,
}: {
  transactionId: string;
  userTransaction: Transaction;
  categories: Category[];
}) {
  const [state, formAction] = useFormState(editTransactionFormAction, null);

  const [open, setOpen] = useState(true);
  const [openDate, setOpenDate] = useState(false);
  const [openCategory, setOpenCategory] = useState(false);

  const [selectedCategoryId, setSelectedCategoryId] = useState(
    userTransaction.category_id ?? ""
  );
  const [date, setDate] = useState(
    userTransaction.date ? new Date(userTransaction.date) : new Date()
  );

  const renderToast = useRef<string | number>();
  const router = useRouter();

  const isDesktop = useMediaQuery("(min-width: 768px)");

  useEffect(() => {
    if (state?.success) {
      toast.success(state.success, { id: renderToast.current });
      router.back();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state]);

  if (isDesktop) {
    return (
      <Dialog
        defaultOpen={true}
        open={open}
        onOpenChange={(op) => {
          if (!op) {
            setOpen(op);
            router.back();
          }
        }}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit transaction</DialogTitle>
          </DialogHeader>
          <form
            action={async (formData) => {
              renderToast.current = toast.loading("Loading...");
              try {
                await formAction(formData);
              } catch (error) {
                console.log(error);
              }
            }}
            className="flex flex-col space-y-4"
          >
            <input type="hidden" name="transactionId" value={transactionId!} />
            <input
              type="hidden"
              name="transactionDate"
              value={date.toLocaleDateString()}
            />
            <input
              type="hidden"
              name="category"
              id="category"
              value={selectedCategoryId}
            />

            {/* description input */}
            <div className="grid items-center gap-1.5">
              <Label htmlFor="description">Description</Label>
              <Input
                type="text"
                name="description"
                defaultValue={userTransaction.description ?? ""}
                required
                autoComplete="off"
              />
            </div>

            <div className="flex flex-col md:flex-row gap-4 items-center md:gap-2">
              {/* date input */}
              <Popover modal={true} open={openDate} onOpenChange={setOpenDate}>
                <div className="grid w-full items-center gap-1.5">
                  <Label>Date</Label>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "pl-3 text-left font-normal",
                        !date && "text-muted-foreground"
                      )}
                    >
                      {date ? format(date, "PPP") : <span>Pick a date</span>}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </PopoverTrigger>
                </div>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={(d) => {
                      if (d) setDate(d);
                      setOpenDate(false);
                    }}
                    disabled={(date) => date < new Date("1900-01-01")}
                  />
                </PopoverContent>
              </Popover>

              {/* category input */}
              <Popover
                modal={true}
                open={openCategory}
                onOpenChange={setOpenCategory}
              >
                <div className="grid w-full items-center gap-1.5">
                  <Label>Category</Label>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      role="combobox"
                      className={cn(
                        "justify-between",
                        !selectedCategoryId && "text-muted-foreground"
                      )}
                    >
                      {selectedCategoryId
                        ? categories.find(
                            (category) => category.id === selectedCategoryId
                          )?.name
                        : "Select category"}
                      <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </PopoverTrigger>
                </div>
                <PopoverContent className="w-full sm:max-w-56 p-0">
                  <Command>
                    <CommandInput
                      placeholder="Search category..."
                      className="h-9"
                    />
                    <CommandEmpty>No category found.</CommandEmpty>
                    <CommandGroup heading="Categories">
                      <ScrollArea className="h-28">
                        {categories.map((category) => (
                          <CommandItem
                            value={category.id}
                            key={category.id}
                            onSelect={() => {
                              setSelectedCategoryId(category.id);
                              setOpenCategory(false);
                            }}
                          >
                            {category.name![0].toUpperCase() +
                              category.name!.slice(1)}
                            <CheckIcon
                              className={cn(
                                "ml-auto h-4 w-4",
                                category.id === selectedCategoryId
                                  ? "opacity-100"
                                  : "opacity-0"
                              )}
                            />
                          </CommandItem>
                        ))}
                      </ScrollArea>
                    </CommandGroup>
                  </Command>
                </PopoverContent>
              </Popover>

              {/* dialog content */}
            </div>

            {/* income and expense */}
            <div className="grid items-center gap-1.5">
              <Label htmlFor="type">Type</Label>

              <Select
                name="type"
                defaultValue={userTransaction.type ?? "expense"}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="expense">Expense</SelectItem>
                  <SelectItem value="income">Income</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* amount input */}
            <div className="grid items-center gap-1.5">
              <Label htmlFor="amount">Amount</Label>
              <Input
                type="text"
                name="amount"
                defaultValue={userTransaction.amount ?? ""}
                required
                autoComplete="off"
              />
            </div>
            <SubmitButton text="Add" />
          </form>
        </DialogContent>
      </Dialog>
    );
  } else {
    return (
      <Drawer
        shouldScaleBackground
        setBackgroundColorOnScale
        open={open}
        onOpenChange={(op) => {
          if (!op) {
            setOpen(op);
            router.back();
          }
        }}
      >
        <DrawerContent className="max-h-[75%]">
          <DrawerHeader>
            <DrawerTitle>Add Transaction</DrawerTitle>
          </DrawerHeader>

          <form
            action={async (formData) => {
              renderToast.current = toast.loading("Loading...");
              try {
                await formAction(formData);
              } catch (error) {
                console.log(error);
              }
            }}
            className="flex flex-col space-y-4 px-4 py-0 max-w-sm w-full mx-auto h-full overflow-y-scroll"
          >
            <input type="hidden" name="transactionId" value={transactionId!} />
            <input
              type="hidden"
              name="transactionDate"
              value={date.toLocaleDateString()}
            />
            <input
              type="hidden"
              name="category"
              id="category"
              value={selectedCategoryId}
            />

            {/* description input */}
            <div className="grid items-center gap-1.5">
              <Label htmlFor="description">Description</Label>
              <Input
                type="text"
                name="description"
                defaultValue={userTransaction.description ?? ""}
                required
                autoComplete="off"
              />
            </div>

            <div className="flex flex-col md:flex-row gap-4 items-center md:gap-2">
              {/* date input */}
              <Popover modal={true} open={openDate} onOpenChange={setOpenDate}>
                <div className="grid w-full items-center gap-1.5">
                  <Label>Date</Label>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "pl-3 text-left font-normal",
                        !date && "text-muted-foreground"
                      )}
                    >
                      {date ? format(date, "PPP") : <span>Pick a date</span>}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </PopoverTrigger>
                </div>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={(d) => {
                      if (d) setDate(d);
                      setOpenDate(false);
                    }}
                    disabled={(date) => date < new Date("1900-01-01")}
                  />
                </PopoverContent>
              </Popover>

              {/* category input */}
              <Popover
                modal={true}
                open={openCategory}
                onOpenChange={setOpenCategory}
              >
                <div className="grid w-full items-center gap-1.5">
                  <Label>Category</Label>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      role="combobox"
                      className={cn(
                        "justify-between",
                        !selectedCategoryId && "text-muted-foreground"
                      )}
                    >
                      {selectedCategoryId
                        ? categories.find(
                            (category) => category.id === selectedCategoryId
                          )?.name
                        : "Select category"}
                      <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </PopoverTrigger>
                </div>
                <PopoverContent className="w-full sm:max-w-56 p-0">
                  <Command>
                    <CommandInput
                      placeholder="Search category..."
                      className="h-9"
                    />
                    <CommandEmpty>No category found.</CommandEmpty>
                    <CommandGroup heading="Categories">
                      <ScrollArea className="h-28">
                        {categories.map((category) => (
                          <CommandItem
                            value={category.id}
                            key={category.id}
                            onSelect={() => {
                              setSelectedCategoryId(category.id);
                              setOpenCategory(false);
                            }}
                          >
                            {category.name![0].toUpperCase() +
                              category.name!.slice(1)}
                            <CheckIcon
                              className={cn(
                                "ml-auto h-4 w-4",
                                category.id === selectedCategoryId
                                  ? "opacity-100"
                                  : "opacity-0"
                              )}
                            />
                          </CommandItem>
                        ))}
                      </ScrollArea>
                    </CommandGroup>
                  </Command>
                </PopoverContent>
              </Popover>

              {/* dialog content */}
            </div>

            {/* income and expense */}
            <div className="grid items-center gap-1.5">
              <Label htmlFor="type">Type</Label>

              <Select
                name="type"
                defaultValue={userTransaction.type ?? "expense"}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="expense">Expense</SelectItem>
                  <SelectItem value="income">Income</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* amount input */}
            <div className="grid items-center gap-1.5">
              <Label htmlFor="amount">Amount</Label>
              <Input
                type="text"
                name="amount"
                defaultValue={userTransaction.amount ?? ""}
                required
                autoComplete="off"
              />
            </div>

            <DrawerFooter className="px-0">
              <SubmitButton text="Add" />
              <DrawerClose asChild>
                <Button variant="outline">Cancel</Button>
              </DrawerClose>
            </DrawerFooter>
          </form>
        </DrawerContent>
      </Drawer>
    );
  }
}
