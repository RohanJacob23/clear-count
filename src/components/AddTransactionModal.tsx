import React, { useState } from "react";
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
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
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
import { addTransaction } from "@/actions/dbActions";
import { toast } from "sonner";

const formSchema = z.object({
  description: z.string().min(1, "Description is required"),
  transactionDate: z.date({
    required_error: "A date of birth is required.",
  }),
  category: z.string({
    required_error: "Please select an category to display.",
  }),
  type: z.union([z.literal("expense"), z.literal("income")]),
  amount: z.coerce
    .number({
      required_error: "Please enter the amount",
      invalid_type_error: "Please enter a number",
    })
    .int()
    .positive()
    .min(1, "Please enter the amount"),
});

export default function AddTransactionModal({
  userId,
  categories,
}: {
  userId: string;
  categories: Category[];
}) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      description: "",
      transactionDate: new Date(),
      type: "expense",
    },
  });

  const [open, setOpen] = useState(false);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.

    await addTransaction({
      amount: values.amount,
      category_id: values.category,
      user_id: userId,
      description: values.description,
      date: values.transactionDate,
      type: values.type,
    }).finally(() => toast.success("Transaction Added!!"));
    form.reset();
  }

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
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            {/* description input */}
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Input placeholder="shadcn" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex flex-col md:flex-row gap-4 items-center md:gap-2">
              {/* date input */}
              <FormField
                control={form.control}
                name="transactionDate"
                render={({ field }) => (
                  <FormItem className="flex flex-col flex-1 self-stretch">
                    <FormLabel>Transaction Date</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value ? (
                              format(field.value, "PPP")
                            ) : (
                              <span>Pick a date</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date) => date < new Date("1900-01-01")}
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* category input */}
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem className="flex flex-col flex-1 self-stretch">
                    <FormLabel>Category</FormLabel>
                    <Dialog>
                      <Popover modal={true} open={open} onOpenChange={setOpen}>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant="outline"
                              role="combobox"
                              className={cn(
                                "justify-between",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              {field.value
                                ? categories.find(
                                    (category) => category.id === field.value
                                  )?.name
                                : "Select category"}
                              <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
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
                                      form.setValue("category", category.id);
                                      setOpen(false);
                                    }}
                                  >
                                    {category.name![0].toUpperCase() +
                                      category.name!.slice(1)}
                                    <CheckIcon
                                      className={cn(
                                        "ml-auto h-4 w-4",
                                        category.id === field.value
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

                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* type input */}
            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Type</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="expense">Expense</SelectItem>
                      <SelectItem value="income">Income</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* amount input */}
            <FormField
              control={form.control}
              name="amount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Amount</FormLabel>
                  <FormControl>
                    <Input placeholder="enter amount" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button className="w-full" type="submit">
              Add
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
