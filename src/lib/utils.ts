import { ClassValue, clsx } from "../../node_modules/clsx";
import { twMerge } from "../../node_modules/tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
  }
  