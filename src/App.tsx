import styles from "./app.module.css";

import { useEffect, useState } from "react";
import type { Product } from "./@types/product";

import { Header } from "./components/header";
import { ItemCard } from "./components/item-card";

import { Modal } from "./components/ui/modal";
import { PlusCircle } from "./components/ui/plus-circle";
import { NewProductForm } from "./components/new-product-form";

export function App() {
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [products, setProducts] = useState<Product[] | null | undefined>(null);
  const [query, setQuery] = useState<string>("");
  const [showModal, setShowModal] = useState<boolean>(false);

  const filteredProducts = products?.filter((product) =>
    product.name.includes(query)
  );

  const handleDeletion = async (product: Product) => {
    const shouldDelete = window.confirm(
      `Tem certeza de que deseja excluir '${product.name}'? Esta ação não poderá ser desfeita.`
    );

    if (!shouldDelete) return;

    try {
      const response = await fetch(
        `http://localhost:3000/products/${product.id}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) throw new Error("Bad response from server request.");

      handleFetchData();
      window.alert("Produto excluído com sucesso!");
    } catch (error) {
      console.error(error);
    }
  };

  const handleEdition = (product: Product) => {
    setEditingProduct(product);
    setShowModal(true);
  };

  const handleClosePopup = () => {
    setShowModal(false);
    setEditingProduct(null);
    handleFetchData();
  };

  const handleFetchData = async () => {
    try {
      const response = await fetch("http://localhost:3000/products");
      const data = await response.json();

      setProducts(data);
    } catch (error) {
      console.error(error);

      setProducts(undefined);
    }
  };

  useEffect(() => {
    handleFetchData();
  }, []);

  return (
    <>
      {showModal && (
        <Modal handleClosePopup={handleClosePopup}>
          <NewProductForm
            handleClosePopup={handleClosePopup}
            editingProduct={editingProduct}
          />
        </Modal>
      )}
      <Header query={query} setQuery={setQuery} />
      <main className={styles.main}>
        <button
          className={styles.new}
          onClick={() => setShowModal(true)}
          disabled={products === undefined}
        >
          <PlusCircle size="1.5rem" />
          <span>Cadastrar Novo Produto</span>
        </button>
        {products === null && <p>Carregando produtos...</p>}
        {products === undefined && (
          <p>
            Erro ao carregar produtos. Por favor, tente novamente mais tarde.
          </p>
        )}
        {products && (
          <>
            {filteredProducts && filteredProducts.length > 0 ? (
              <ul className={styles["product-list"]}>
                {filteredProducts.map((product) => (
                  <ItemCard
                    key={product.id}
                    product={product}
                    handleDeletion={handleDeletion}
                    onClick={() => handleEdition(product)}
                  />
                ))}
              </ul>
            ) : (
              <p>
                Nenhum produto encontrado.{" "}
                {!query && (
                  <>
                    Por que você não tenta{" "}
                    <span className={styles.link}>cadastrar algum</span>?
                  </>
                )}
              </p>
            )}
          </>
        )}
      </main>
    </>
  );
}
