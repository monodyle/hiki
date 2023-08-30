import styles from "./app.module.css";
import { Demo } from "./lib/demo";

function App() {
  return (
    <main>
      <div className={styles.container}>
        <h1 className={styles.heading}>
          <span className={styles.romaji}>/hiki/</span>
          <span className={styles.japanese}>引き</span>
        </h1>
        <div className={styles.desc}>
          a dialog that turn into drawer on small viewport
        </div>
        <Demo />
      </div>
    </main>
  );
}

export default App;
