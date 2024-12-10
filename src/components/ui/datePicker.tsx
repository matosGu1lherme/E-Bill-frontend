"use client"

import * as React from "react"
import { format } from "date-fns"
import { ArrowRight, CalendarIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { DateRangeDropdown } from "./dataRangeDropdown"
import { YearPicker } from "./yearPicker"
import { MonthPicker } from "./monthPicker"
import { DateRange } from "../../types/DateRange"
import { useIntl } from "react-intl"


interface DatePickerProps {
  date: Date;
  setDate: (date: Date) => void;
  allowRangeSelection?: boolean;
  dateRange?: DateRange;
  setDateRange?: (dateRange: DateRange) => void; 
}

export function DatePicker({allowRangeSelection = false, date, setDate, setDateRange}: DatePickerProps) {
  const intl = useIntl();
  const [showCalendar, setShowCalendar] = React.useState(false);
  const [showYearPicker, setshowYearPicker] = React.useState(false);
  const [showMonthPicker, setShowMonthPicker] = React.useState(false);
  const [selectedRange, setSelectedRange] = React.useState<number | null>(null);

  const toggleCalendar = () => {
    setShowCalendar((prev) => !prev);
  }

  const toggleYearPicker = () => {
    setshowYearPicker((prev => !prev));
  }

  const formatDate = (date: Date | undefined) => {
    return new Intl.DateTimeFormat("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    }).format(date);
  };

  const rangedDate = React.useCallback((date: Date) => {
    const newDate = new Date(date);
    newDate.setDate(newDate.getDate() + (selectedRange ?? 0));
    return newDate;
  }, [selectedRange]);

  React.useEffect(() => {
    const newDate: DateRange = {
      startDate: date,
      endDate: rangedDate(date),
    };
    if (setDateRange) {
      setDateRange(newDate);
    }
  }, [selectedRange, date, setDateRange, rangedDate]);

  return (
    <div>
      <Button
        variant={"outline"}
        className={cn(
          "w-[280px] justify-start text-left font-normal",
          "text-muted-foreground"
        )}
        onClick={toggleCalendar}
      >
        <CalendarIcon />
        {format(date, "PPP")}
      </Button>

      <div
        className={cn(
          "fixed inset-0 bg-black/30 transition-opacity duration-300 max-w-[375px] left-1/2 -translate-x-1/2",
          showCalendar ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
        onClick={() => { setShowCalendar(false); }} 
      ></div>

      <div
        className={cn(
          `fixed bottom-0 left-1/2 -translate-x-1/2 max-w-[375px] w-full ${allowRangeSelection ? "h-5/6" : "h-3/4"} bg-elevation-50 p-3 transition-transform duration-300 ease-in-out rounded-t-2xl justify-center`,
          showCalendar ? "translate-y-0" : "translate-y-full"
        )}
      >
        <div className="grid grid-rows-8 h-full w-full">
          <div className={`grid ${allowRangeSelection ? "row-span-2 grid-rows-5" : "row-span-1 grid-rows-2"} w-full h-full`}>
            <div className={`${allowRangeSelection ? "row-span-4" : "row-span-1"} h-full w-full`}>
              <div className="flex flex-col gap-2">
                {allowRangeSelection ? 
                  (<>
                    <div className="text-xs text-text-200">
                      {intl.formatMessage({ id: "datePicker.selectDateRange", defaultMessage: "Select date range" })}
                    </div>
                  
                    <DateRangeDropdown onRangeChange={setSelectedRange}/>

                    <div className="grid grid-cols-9 text-sm">
                      <div className="col-span-4">
                        <div className="py-3 px-4 w-full bg-[#f6f2e7] border border-gray-200 rounded-lg truncate">
                          {formatDate(date)}
                        </div>
                      </div>

                      <div className="col-auto flex justify-center items-center">
                        <ArrowRight className="text-text-200" strokeWidth={1} size={24} />
                      </div>

                      <div className="col-span-4">
                        <div className="py-3 px-4 w-full bg-[#f6f2e7] border border-gray-200 rounded-lg truncate">
                          {formatDate(rangedDate(date))}
                        </div>
                      </div>
                    </div>
                  </>) : (<>
                    <div className="text-xs text-text-200">
                      {intl.formatMessage({ id: "datePicker.selectDate", defaultMessage: "Selected date" })}
                    </div>
                    <div className="text-base">
                      {formatDate(date)}
                    </div>
                  </>)
                }
              </div>
            </div>
          </div>

          <div className={`${allowRangeSelection ? "row-span-6" : "row-span-7"} w-full h-full`}>
            {showYearPicker ? (
              <div className="h-full w-full pb-5">
                <YearPicker
                 baseDate={date}
                 setDate={setDate}
                 setShowYearPicker={setshowYearPicker}
                 setShowMonthPicker={setShowMonthPicker}
                />
              </div>
            ) : showMonthPicker ? (
              <div className="h-full w-full pb-5"> 
                <MonthPicker 
                  baseDate={date}
                  setDate={setDate}
                  setShowYearPicker={setshowYearPicker}
                  setShowMonthPicker={setShowMonthPicker}
                />
              </div>
            ) :
            (
              <div className="w-full h-full">
                <Calendar
                  mode="single"
                  selected={date}
                  onToggleYearPicker={toggleYearPicker}
                  onSelect={(selectDate) => {
                    if(selectDate) {
                      setDate(selectDate)
                    }
                  }}
                  initialFocus
                  className="w-full h-full"
                />
              </div>
            )}
          </div>
          
          <div className="flex gap-1 items-center">
            <Button
              className="w-full border-text-300"
              variant="outline"
              size="sm"
              onClick={() => {
                setDate(new Date());
                setshowYearPicker(false);
                setShowCalendar(false);
              }}
            >
              {intl.formatMessage({ id:"datePicker.button.canvel", defaultMessage: "Cancel"})}
            </Button>
            <Button
              className="w-full"
              size="sm"
              onClick={() => { setShowCalendar(false); }}
            >
              {intl.formatMessage({ id:"datePicker.button.confirm", defaultMessage: "Confirm"})}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}