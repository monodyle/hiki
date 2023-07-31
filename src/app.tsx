import { Dialog } from "./lib/dialog";
import styles from "./app.module.css";
import CheckBadgeIcon from "./lib/check";

function App() {
  return (
    <main>
      <div className={styles.container}>
        <Dialog
          target={({ open }) => <button onClick={open}>hello</button>}
          isDismissable
        >
          {/* Dialog content */}
          {({ isMobileViewPort }) => (
            <div
              className={[
                styles.content,
                !isMobileViewPort && styles.contentDesktop,
              ].join(" ")}
            >
              <h2 className={styles.heading}>Confirmation</h2>
              <div className={styles.check}>
                <CheckBadgeIcon className={styles.icon} />
              </div>
              <div className={styles.info}>
                <div className={styles.sent}>You sent $500.00</div>
                <div className={styles.value}>0.12516 ETH</div>
                <div className={styles.receiver}>0x6484...1eac</div>
              </div>
              <button className={styles.action}>Show details</button>
            </div>
          )}
        </Dialog>
      </div>
    </main>
  );
}

export default App;
