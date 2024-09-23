import styles from "./new-product-form.module.css";

import { type ChangeEvent, FormEvent, useState } from "react";
import { Product } from "../@types/product";
import type { NewProductFormProps } from "../@types/new-product-form-props";

export function NewProductForm({
  editingProduct,
  handleClosePopup,
}: NewProductFormProps) {
  const [newProduct, setNewProduct] = useState<Product>({
    name: "",
    description: "",
    price: 0,
    ...editingProduct,
  });

  const handleChangeProduct = (e: ChangeEvent<HTMLInputElement>) => {
    setNewProduct((state) => ({ ...state, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `http://localhost:3000/products${
          newProduct.id ? `/${newProduct.id}` : ""
        }`,
        {
          method: editingProduct ? "PUT" : "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ...newProduct,
            price: Number(newProduct.price),
          }),
        }
      );

      if (!response.ok) throw new Error("Bad response from server request.");

      handleClosePopup();
      if (editingProduct) {
        window.alert("Produto editado com sucesso!");
      } else {
        window.alert("Produto criado com sucesso!");
      }
    } catch (error) {
      console.error(error);

      window.alert(
        "Houver um erro no sistema. Por favor, tente novamente mais tarde."
      );
    }
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
            placeholder="Nome"
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
            placeholder="Descrição"
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
            placeholder="Preço"
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
