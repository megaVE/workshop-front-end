import styles from "./new-product-form.module.css";

import { type ChangeEvent, FormEvent, useState } from "react";
import { Product } from "../@types/product";
import type { NewProductFormProps } from "../@types/new-product-form-props";

export function NewProductForm({
  editingProduct,
  handleClosePopup,
}: NewProductFormProps) {
  const [newProduct, setNewProduct] = useState<Product>({
    id: undefined,
    name: "",
    description: "",
    price: 0,
    ...editingProduct,
  });

  const handleChangeProduct = (e: ChangeEvent<HTMLInputElement>) => {
    setNewProduct((state) => ({ ...state, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (editingProduct) {
      // Update
      window.alert("Produto editado com sucesso!");
    } else {
      // Create
      window.alert("Produto criado com sucesso!");
    }

    handleClosePopup();
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <h1>
        {editingProduct
          ? "Editar Informações do Produto"
          : "Adicionar um Novo Produto"}
      </h1>
      <div className={styles.fields}>
        <div>
          <label htmlFor="name">Nome do Produto:</label>
          <input
            type="text"
            name="name"
            id="name"
            value={newProduct.name}
            onChange={handleChangeProduct}
            required
          />
        </div>
        <div>
          <label htmlFor="description">Descrição do Produto (Opcional):</label>
          <input
            type="text"
            name="description"
            id="description"
            value={newProduct.description}
            onChange={handleChangeProduct}
          />
        </div>
        <div>
          <label htmlFor="price">Preço do Produto:</label>
          <input
            type="number"
            name="price"
            id="price"
            value={newProduct.price}
            onChange={handleChangeProduct}
            required
          />
        </div>
        <button type="submit" className={styles.submit}>
          {editingProduct ? "Salvar Produto" : "Adicionar Produto"}
        </button>
      </div>
    </form>
  );
}
