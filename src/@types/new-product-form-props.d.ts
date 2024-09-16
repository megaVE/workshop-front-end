import type { Product } from "./product";

export interface NewProductFormProps {
  editingProduct?: Product | null;
  handleClosePopup: () => void;
}
