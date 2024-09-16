import styles from "./app.module.css";

import { useEffect, useState } from "react";
import type { Product } from "./@types/product";

import { Header } from "./components/header";
import { ItemCard } from "./components/item-card";

import db from "./db.json";
import { Modal } from "./components/ui/modal";
import { PlusCircle } from "./components/ui/plus-circle";
import { NewProductForm } from "./components/new-product-form";

const App = () => {
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [products, setProducts] = useState<Product[] | null>(db);
  const [query, setQuery] = useState<string>("");
  const [showModal, setShowModal] = useState<boolean>(true);

  const handleDeletion = (product: Product) => {
    const shouldDelete = window.confirm(
      `Tem certeza de que deseja excluir '${product.name}'? Esta ação não poderá ser desfeita.`
    );

    if (!shouldDelete) return;

    window.alert("Produto excluído com sucesso!");
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

  const handleFetchData = () => {
    setProducts((state) => state);

    console.log("Data returned from backend");
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
        <button className={styles.new} onClick={() => setShowModal(true)}>
          <PlusCircle size="1.5" />
          <span>Cadastrar Novo Produto</span>
        </button>
        {products ? (
          <ul className={styles["product-list"]}>
            {products.map((product) => (
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
            Nenhum produto encontrado. Por que você não tenta{" "}
            <span className={styles.link}>cadastrar algum</span>?
          </p>
        )}
      </main>
    </>
  );
};

export default App;
