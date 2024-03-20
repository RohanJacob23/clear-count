import React, { useEffect, useRef, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  PlusCircledIcon,
  CalendarIcon,
  CheckIcon,
  CaretSortIcon,
} from "@radix-ui/react-icons";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ScrollArea } from "./ui/scroll-area";
import AddCardModalContent from "./AddCardModalContent";
import { Category } from "@/types/type";
import { toast } from "sonner";
import { useFormState } from "react-dom";
import { addTransactionFormAction } from "@/actions/addTransactionsAction";
import SubmitButton from "./SubmitButton";
import { Label } from "./ui/label";
import { cn } from "@/lib/utils";

export default function AddTransactionModal({
  userId,
  categories,
}: {
  userId: string;
  categories: Category[];
}) {
  const formRef = useRef<HTMLFormElement>(null);
  const [openCategory, setOpenCategory] = useState(false);
  const [openDate, setOpenDate] = useState(false);
  const [date, setDate] = React.useState<Date>();
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>();
  const [state, formAction] = useFormState(addTransactionFormAction, null);
  const [renderToast, setRenderToast] = useState<string | number>();

  useEffect(() => {
    if (state?.success) {
      setRenderToast((prev) => toast.success(state.success, { id: prev }));
    }
  }, [state]);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          className="border border-primary hover:border-border border-dashed bg-background shadow-sm hover:bg-accent hover:text-accent-foreground text-foreground"
          variant="expandIcon"
          iconPlacement="right"
          Icon={PlusCircledIcon}
        >
          Add Transaction
        </Button>
      </DialogTrigger>
      <DialogContent className="content-start max-sm:h-full">
        <DialogHeader>
          <DialogTitle>Add Transaction</DialogTitle>
        </DialogHeader>
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
              setDate(undefined);
              setSelectedCategoryId(undefined);
            }
          }}
          className="flex flex-col space-y-4"
        >
          <input type="hidden" name="userId" value={userId} />
          <input
            type="hidden"
            name="transactionDate"
            value={date?.toLocaleDateString()}
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
            <Input type="text" name="description" required autoComplete="off" />
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
                  onSelect={(date) => {
                    setDate(date);
                    setOpenDate(false);
                  }}
                  disabled={(date) => date < new Date("1900-01-01")}
                />
              </PopoverContent>
            </Popover>

            {/* category input */}
            <Dialog>
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
                    <CommandGroup heading="Command">
                      <CommandItem>
                        <DialogTrigger className="flex items-center gap-2 w-full">
                          <PlusCircledIcon className="size-4" />
                          Add Category
                        </DialogTrigger>
                      </CommandItem>
                    </CommandGroup>
                  </Command>
                </PopoverContent>
              </Popover>

              {/* dialog content */}
              <AddCardModalContent userId={userId} />
            </Dialog>
          </div>

          {/* income and expense */}
          <div className="grid items-center gap-1.5">
            <Label htmlFor="type">Type</Label>

            <Select name="type" defaultValue="expense">
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
            <Input type="text" name="amount" required autoComplete="off" />
          </div>
          <SubmitButton text="Add" />
        </form>
      </DialogContent>
    </Dialog>
  );
}
