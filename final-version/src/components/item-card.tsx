import styles from "./item-card.module.css";

import type { Product } from "../@types/product";
import type { HTMLAttributes } from "react";

interface ItemCardProps extends HTMLAttributes<HTMLLIElement> {
  product: Product;
  handleDeletion: (product: Product) => void;
  handleEdition: (product: Product) => void;
}

import { Trash } from "./ui/trash";

import imagePlaceholder from "../assets/placeholder.png";

const locale = navigator.language;

export function ItemCard({
  product,
  handleDeletion,
  handleEdition,
}: ItemCardProps) {
  return (
    <li className={styles.item}>
      <div className={styles["delete-button"]}>
        <button onClick={() => handleDeletion(product)}>
          <Trash size="2rem" />
        </button>
      </div>
      <div className={styles["item-image"]}>
        <img
          src={imagePlaceholder}
          alt={product.name}
          onClick={() => handleEdition(product)}
        />
      </div>
      <h3 onClick={() => handleEdition(product)}>{product.name}</h3>
      <p>
        R${" "}
        {product.price.toLocaleString(locale, {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })}
      </p>
      {product.description && <span>{product.description}</span>}
    </li>
  );
}
