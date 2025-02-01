"use client";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export function MultiselectCombobox({
  options,
  value,
  onChange,
}: {
  options: {
    value: string;
    label: string;
  }[];
  value: string[];
  onChange: (value: string[]) => void;
}) {
  const [open, setOpen] = React.useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between overflow-hidden"
        >
          {value.length > 0
            ? options
                .filter((o) => value.includes(o.value))
                .map((o) => o.label)
                .join(", ")
            : "Select..."}
          <ChevronsUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0">
        <Command>
          <CommandInput placeholder="Search..." />
          <CommandList>
            <CommandEmpty>No options found.</CommandEmpty>
            <CommandGroup>
              {options.map((o) => (
                <CommandItem
                  key={o.value}
                  value={o.value}
                  onSelect={(currentValue) => {
                    if (value.includes(currentValue)) {
                      const newData = value.filter((v) => v !== currentValue);
                      onChange(newData);
                    } else {
                      onChange([...value, currentValue]);
                    }
                  }}
                >
                  {o.label}
                  <Check
                    className={cn(
                      "ml-auto",
                      value.includes(o.value) ? "opacity-100" : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
