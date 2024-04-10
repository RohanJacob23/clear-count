"use client";

import React, { useEffect, useRef, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { useRouter, useSearchParams } from "next/navigation";
import { Category, Transaction } from "@/types/type";
import { getCategoryFromServer, getUserTransaction } from "@/actions/dbActions";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import {
  CalendarIcon,
  CaretSortIcon,
  CheckIcon,
  PlusCircledIcon,
} from "@radix-ui/react-icons";
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
import { motion, AnimatePresence } from "framer-motion";
import { StaggeredFadeLoader } from "./StaggeredFade";

export default function EditTransactionModal({ userId }: { userId: string }) {
  const formRef = useRef<HTMLFormElement>(null);
  const [state, formAction] = useFormState(editTransactionFormAction, null);

  const [openEditModal, setOpenEditModal] = useState(false);
  const [loadingData, setLoadingData] = useState(false);
  const [openDate, setOpenDate] = useState(false);
  const [openCategory, setOpenCategory] = useState(false);

  const [categories, setCategories] = useState<Category[]>([]);
  const [userTransactionData, setUserTransactionData] = useState<Transaction>();

  const [selectedCategoryId, setSelectedCategoryId] = useState("");

  const searchParams = useSearchParams();
  const router = useRouter();

  const transactionId = searchParams.get("id");

  const [renderToast, setRenderToast] = useState<string | number>();

  useEffect(() => {
    console.log(state);
    if (state?.success) {
      setRenderToast((prev) => toast.success(state.success, { id: prev }));
    }
  }, [state]);

  useEffect(() => {
    if (transactionId) {
      setOpenEditModal(true);
      const fetchData = async () => {
        setLoadingData(true);
        const categoryRes = await getCategoryFromServer(userId);
        setCategories(categoryRes);

        const [userTransaction] = await getUserTransaction(
          userId,
          transactionId
        );
        setSelectedCategoryId(userTransaction.category_id ?? "");
        setUserTransactionData(userTransaction);

        setLoadingData(false);
      };
      fetchData();
    }
  }, [transactionId, userId]);

  return (
    <Dialog
      open={openEditModal}
      onOpenChange={() => {
        setOpenEditModal(false);
        router.replace("/dashboard");
      }}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Transaction</DialogTitle>
        </DialogHeader>

        <AnimatePresence mode="wait">
          {!loadingData && userTransactionData ? (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <form
                ref={formRef}
                action={async (formData) => {
                  setRenderToast(toast.loading("Adding Transaction..."));
                  try {
                    await formAction(formData);
                  } catch (error) {
                    console.log(error);
                  } finally {
                    formRef.current?.reset();
                    setUserTransactionData(undefined);
                    setOpenEditModal(false);
                    router.replace("/dashboard");
                  }
                }}
                className="flex flex-col space-y-4"
              >
                <input
                  type="hidden"
                  name="transactionId"
                  value={transactionId!}
                />
                <input
                  type="hidden"
                  name="transactionDate"
                  value={
                    userTransactionData.date ? userTransactionData.date : ""
                  }
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
                    defaultValue={userTransactionData.description ?? ""}
                    required
                    autoComplete="off"
                  />
                </div>

                <div className="flex flex-col md:flex-row gap-4 items-center md:gap-2">
                  {/* date input */}
                  <Popover
                    modal={true}
                    open={openDate}
                    onOpenChange={setOpenDate}
                  >
                    <div className="grid w-full items-center gap-1.5">
                      <Label>Date</Label>
                      <PopoverTrigger asChild>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "pl-3 text-left font-normal",
                            !userTransactionData?.date &&
                              "text-muted-foreground"
                          )}
                        >
                          {userTransactionData?.date ? (
                            format(userTransactionData.date, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </PopoverTrigger>
                    </div>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={
                          userTransactionData.date
                            ? new Date(userTransactionData.date)
                            : new Date()
                        }
                        onSelect={(date) => {
                          setUserTransactionData((prev) =>
                            prev
                              ? { ...prev, date: date!.toLocaleDateString() }
                              : prev
                          );
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
                    defaultValue={userTransactionData.type ?? "expense"}
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
                    defaultValue={userTransactionData.amount ?? ""}
                    required
                    autoComplete="off"
                  />
                </div>
                <SubmitButton text="Add" />
              </form>
            </motion.div>
          ) : (
            <motion.div
              key="loading"
              className="p-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <StaggeredFadeLoader className="bg-primary" />
            </motion.div>
          )}
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  );
}
