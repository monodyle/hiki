import { Dialog } from "./dialog";
import CheckBadgeIcon from "./check";

import styles from "./demo.module.css";

export const Demo = () => {
  return (
    <Dialog
      target={({ open }) => (
        <button className={styles.button} onClick={open}>
          Open!
        </button>
      )}
      isDismissable
    >
      {({ isMobileViewPort, close }) => (
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
          <button className={styles.action} onClick={close}>
            Confirm
          </button>
        </div>
      )}
    </Dialog>
  );
};
