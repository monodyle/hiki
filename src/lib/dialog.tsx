import { Fragment, useRef, useState } from "react";
import {
  DialogTrigger,
  DialogTriggerProps,
  Modal,
  ModalOverlay,
  Dialog as DialogContent,
} from "react-aria-components";
import { animate, motion, useMotionValue } from "framer-motion";

import styles from "./dialog.module.css";
import { useResponsive } from "./hooks";

const MotionModal = motion(Modal);
const MotionModalOverlay = motion(ModalOverlay);

type Props = Omit<DialogTriggerProps, "children"> & {
  isDismissable?: boolean;
  isKeyboardDismissDisabled?: boolean;
  className?: boolean;
  target?:
    | React.ReactNode
    | ((opts: {
        open: () => void;
        isMobileViewPort?: boolean;
      }) => React.ReactNode);
  children:
    | React.ReactNode
    | ((opts: {
        close: () => void;
        isMobileViewPort?: boolean;
      }) => React.ReactNode);
};
export const Dialog: React.FC<Props> = ({
  children,
  target,
  className,
  isDismissable,
  isKeyboardDismissDisabled,
  ...props
}) => {
  const [_isOpen, _setOpen] = useState(false);
  const isOpen = props?.isOpen || _isOpen;
  const setOpen = props?.onOpenChange || _setOpen;

  const responsive = useResponsive();
  const isMobileViewPort = !responsive.md;

  // Turn Dialog into Drawer on mobile viewport
  const modalRef = useRef<HTMLElement>(null);
  const h = modalRef.current?.clientHeight || 0;
  const y = useMotionValue(modalRef.current?.clientHeight);
  const modalProps: Parameters<typeof MotionModal>[0] = isMobileViewPort
    ? {
        drag: "y",
        dragConstraints: { top: 0 },
        initial: { y: h },
        animate: { y: 0 },
        exit: { y: h },
        style: {
          y,
          paddingBottom: window.screen.height,
          marginBottom: -1 * window.screen.height,
        },
        onDragEnd: (_, { offset, velocity }) => {
          if (offset.y > window.innerHeight * 0.75 || velocity.y > 10) {
            setOpen(false);
          } else {
            animate(y, 0, {
              type: "inertia",
              bounceStiffness: 300,
              bounceDamping: 40,
              timeConstant: 300,
              min: 0,
              max: 0,
            });
          }
        },
      }
    : {};

  return (
    <DialogTrigger isOpen={isOpen} onOpenChange={setOpen} {...props}>
      {typeof target === "function"
        ? target({ open: () => setOpen(true), isMobileViewPort })
        : target}
      <MotionModalOverlay
        className={[styles.overlay, className].join(' ')}
        isDismissable={isDismissable}
        isKeyboardDismissDisabled={isKeyboardDismissDisabled}
        data-hiki-overlay
      >
        <MotionModal
          className={[styles.modal, isMobileViewPort && styles.mobile].join(
            " "
          )}
          ref={modalRef}
          data-hiki-modal
          {...modalProps}
        >
          {isMobileViewPort && <div className={styles.affordance} data-hiki-affordance />}
          <DialogContent className={styles.dialog} data-hiki-content>
            {({ close }) => (
              <Fragment>
                {isDismissable && !isMobileViewPort && (
                  <button className={styles.close} onClick={close} data-hiki-close />
                )}
                {typeof children === "function"
                  ? children({ close, isMobileViewPort })
                  : children}
              </Fragment>
            )}
          </DialogContent>
        </MotionModal>
      </MotionModalOverlay>
    </DialogTrigger>
  );
};
