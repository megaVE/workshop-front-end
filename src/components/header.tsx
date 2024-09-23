import styles from "./header.module.css";
import type { HeaderProps } from "../@types/header-props";

import { MagnifyingGlass } from "./ui/magnifying-glass";
import { Cube } from "./ui/cube";

export function Header({ query, setQuery }: HeaderProps) {
  return (
    <header className={styles.header}>
      <h1>
        <Cube size="2" />
        <span>UNIstore</span>
      </h1>
      <form className={styles.query} onSubmit={(e) => e.preventDefault()}>
        <input
          type="text"
          placeholder="Pesquise por algo..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button type="submit">
          <MagnifyingGlass size="1.5rem" />
        </button>
      </form>
    </header>
  );
}
