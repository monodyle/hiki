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
          a dialog that turn into
          <br />a drawer on small viewport
        </div>
        <Demo />
      </div>
      <footer className={styles.footer}>
        © monodyle 2023+
        <br />
        <a
          href="https://github.com/monodyle/hiki"
          target="_blank"
          rel="noreferrer noopener"
        >
          github
        </a>{" "}
        /{" "}
        <a
          href="https://ko-fi.com/monodyle"
          target="_blank"
          rel="noreferrer noopener"
        >
          buy me a coffee
        </a>
      </footer>
    </main>
  );
}

export default App;
