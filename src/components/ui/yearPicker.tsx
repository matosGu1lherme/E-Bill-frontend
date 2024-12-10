"use client"

import { useState } from "react";
import { ChevronLeft, ChevronRight, ChevronUp } from "lucide-react";
import { useLanguage } from "@/context/language/LanguageContext";
import { formatDateLong } from "@/utils/dates";

interface YearPickerProps {
    baseDate: Date
    setDate: (date: Date) => void
    setShowYearPicker: (value: boolean) => void
    setShowMonthPicker: (value: boolean) => void
}

const YearPicker = ({baseDate, setDate, setShowYearPicker, setShowMonthPicker }: YearPickerProps) => {
  const lang = useLanguage();
  const numberYears = 21;
  const [baseYear, setBaseYear] = useState(baseDate.getFullYear())

  const handleYearClick = (year: number) => {
    const updateDate = new Date(baseDate);
    updateDate.setFullYear(year);
    setDate(updateDate);
  }

  return (<div className="flex flex-col gap-2">
    <div className="flex justify-between items-center">
      <ChevronLeft className="mx-1 cursor-pointer" onClick={() => {
        setBaseYear(baseYear - numberYears);
      }} />
      <div className="flex justify-between items-center gap-2">
        {formatDateLong(baseDate, lang.locale)}
        <ChevronUp strokeWidth={3} size={15} />
      </div>
      <ChevronRight className="mx-1 cursor-pointer" onClick={() => {
        setBaseYear(baseYear + numberYears);
      }} />
    </div>
    <div className="grid grid-rows-7 grid-cols-3">
      {Array.from({ length: numberYears }).map((_, index) => {
        const year = baseYear + index;
        return (
          <div
            className="h-[40px] flex justify-center items-center cursor-pointer"
            key={index}
            onClick={() => {
              handleYearClick(year);
              setShowYearPicker(false);
              setShowMonthPicker(true);
            }}
          >
            {year}
          </div>
        )
      })}
    </div>
  </div>);
}

export { YearPicker }
