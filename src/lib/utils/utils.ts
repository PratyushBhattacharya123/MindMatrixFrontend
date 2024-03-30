import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const discountPercentage = (costPrice: number, sellingPrice: number) => {
  const discountPercent = (
    ((costPrice - sellingPrice) / costPrice) *
    100
  ).toFixed(0);
  return discountPercent;
};
