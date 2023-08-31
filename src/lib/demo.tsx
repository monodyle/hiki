import { Dialog } from "./dialog";

import styles from "./demo.module.css";
import {
  Button,
  Input,
  Item,
  Label,
  ListBox,
  Popover,
  Select,
  SelectValue,
  TextField,
} from "react-aria-components";

const now = new Date();
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
      {({ isSmallViewPort, close }) => (
        <div
          className={[
            styles.content,
            !isSmallViewPort && styles.contentDesktop,
          ].join(" ")}
        >
          <h2 className={styles.heading}>Create an invite</h2>
          <TextField className={styles.field}>
            <Label>Title</Label>
            <Input placeholder="Event title" />
          </TextField>
          <div className={styles.group}>
            <TextField className={styles.field}>
              <Label>Date</Label>
              <Input
                placeholder="Date"
                type="date"
                defaultValue={now.toISOString().split("T")[0]}
              />
            </TextField>
            <TextField className={styles.field}>
              <Label>Time</Label>
              <Input
                placeholder="Time"
                type="time"
                defaultValue={now.toTimeString().split(" ")[0]}
              />
            </TextField>
            <Select className={styles.field} selectedKey="1h 30m">
              <Label>Duration</Label>
              <Button className={styles.select}>
                <SelectValue />
                <span aria-hidden="true" className={styles.chevron}>
                  ⌄
                </span>
              </Button>
              <Popover className={styles.popover}>
                <ListBox className={styles.listBox}>
                  <Item className={styles.item} id="30m">
                    30m
                  </Item>
                  <Item className={styles.item} id="1h">
                    1h
                  </Item>
                  <Item className={styles.item} id="1h 30m">
                    1h 30m
                  </Item>
                  <Item className={styles.item} id="2h">
                    2h
                  </Item>
                  <Item className={styles.item} id="2h 30m">
                    2h 30m
                  </Item>
                  <Item className={styles.item} id="3h">
                    3h
                  </Item>
                </ListBox>
              </Popover>
            </Select>
          </div>
          <button className={styles.action} onClick={close}>
            Confirm
          </button>
        </div>
      )}
    </Dialog>
  );
};
