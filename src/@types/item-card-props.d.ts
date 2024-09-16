import { HTMLAttributes } from "react";
import type { Product } from "./product";

export interface ItemCardProps extends HTMLAttributes<HTMLLIElement> {
  product: Product;
  onClick: () => void;
  handleDeletion: (product: Product) => void;
}
