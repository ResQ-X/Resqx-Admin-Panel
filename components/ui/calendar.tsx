import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { DayPicker } from "react-day-picker";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn("w-[387px] h-[345px] py-10 px-2", className)}
      classNames={{
        months: "flex flex-col h-full",
        month: "flex flex-col gap-3 flex-1",
        caption: "flex justify-center relative items-center mb-2",
        caption_label: "text-sm font-medium",
        nav: "space-x-1 flex items-center",
        nav_button: cn(
          buttonVariants({ variant: "outline" }),
          "h-6 w-6 bg-transparent p-0 opacity-50 hover:opacity-100 absolute"
        ),
        nav_button_previous: "left-2",
        nav_button_next: "right-2",
        table: "w-full flex flex-col gap-1 flex-1",
        head_row: "flex w-full",
        head_cell:
          "text-muted-foreground font-normal text-xs w-[55px] flex justify-center items-center",
        row: "flex w-full",
        cell: cn(
          "relative p-0 text-center text-sm w-[55px] h-[45px]",
          "[&:has([aria-selected])]:bg-orange",
          "[&:has([aria-selected].day-outside)]:bg-orange/50",
          props.mode === "range"
            ? "[&:has(>.day-range-end)]:rounded-r-md [&:has(>.day-range-start)]:rounded-l-md"
            : "[&:has([aria-selected])]:rounded-md"
        ),
        day: cn(
          buttonVariants({ variant: "ghost" }),
          "h-full w-full p-0 font-normal text-sm aria-selected:opacity-100 rounded-none"
        ),
        day_selected:
          "bg-orange text-primary-foreground hover:bg-orange hover:text-primary-foreground",
        day_today: "bg-orange text-accent-foreground",
        day_outside: "text-muted-foreground opacity-50",
        day_disabled: "text-muted-foreground opacity-50",
        day_range_middle: "aria-selected:bg-accent aria-selected:text-accent-foreground",
        day_hidden: "invisible",
        ...classNames,
      }}
      components={{
        IconLeft: ({ ...props }) => (
          <ChevronLeft className="h-4 w-4" {...props} />
        ),
        IconRight: ({ ...props }) => (
          <ChevronRight className="h-4 w-4" {...props} />
        ),
      }}
      {...props}
    />
  );
}

Calendar.displayName = "Calendar";

export { Calendar };