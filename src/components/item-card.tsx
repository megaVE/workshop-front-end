import styles from "./item-card.module.css";
import type { ItemCardProps } from "../@types/item-card-props";

import { Trash } from "./ui/trash";

import imagePlaceholder from "../assets/placeholder.png";

const locale = navigator.language;

export function ItemCard({
  product,
  handleDeletion,
  onClick,
  ...props
}: ItemCardProps) {
  return (
    <li className={styles.item} {...props}>
      <div className={styles["delete-button"]}>
        <button onClick={() => handleDeletion(product)}>
          <Trash size="2" />
        </button>
      </div>
      <div className={styles["item-image"]}>
        <img src={imagePlaceholder} alt="Imagem do produto" onClick={onClick} />
      </div>
      <h3 onClick={onClick}>{product.name}</h3>
      <p>R$ {Number(product.price.toFixed(2)).toLocaleString(locale)}</p>
      {product.description && <span>{product.description}</span>}
    </li>
  );
}
