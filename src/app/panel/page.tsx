import Header from "@/components/Header/Header";
import Main from "@/components/Main/Main";
import styles from "./page.module.css";

export default function Panel() {
  return (
    <div className={styles.body}>
      <header>
        <Header />
      </header>
      <main>
        <Main />
      </main>
    </div>
  );
}
