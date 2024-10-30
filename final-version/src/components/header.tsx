import styles from "./header.module.css";

import { MagnifyingGlass } from "./ui/magnifying-glass";
import { Cube } from "./ui/cube";

export function Header() {
  return (
    <header className={styles.header}>
      <h1>
        <Cube size="2rem" />
        <span>UNIstore</span>
      </h1>
      <form className={styles.query}>
        <input
          type="text"
          name="query"
          id="query"
          placeholder="Pesquise por algo..."
        />
        <button type="submit">
          <MagnifyingGlass size="1.5rem" />
        </button>
      </form>
    </header>
  );
}
