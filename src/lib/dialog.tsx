import { Fragment, useState } from "react";
import {
  DialogTriggerProps,
  Modal,
  ModalOverlay,
  Dialog as DialogContent,
  DialogTrigger,
} from "react-aria-components";
import {
  AnimatePresence,
  ValueAnimationTransition,
  animate,
  motion,
  useMotionTemplate,
  useMotionValue,
  useTransform,
} from "framer-motion";

import styles from "./dialog.module.css";
import { useResponsive } from "./hooks";

const MotionModal = motion(Modal);
const MotionModalOverlay = motion(ModalOverlay);

const staticTransition = {
  duration: 0.5,
  ease: [0.32, 0.72, 0, 1],
};
const inertiaTransition: ValueAnimationTransition<number> = {
  type: "inertia",
  bounceStiffness: 300,
  bounceDamping: 40,
  timeConstant: 300,
};
const largeViewPortOverlayProps = {
  initial: {
    backgroundColor: "oklch(0% 0 0 / 0%)",
    backdropFilter: "blur(0px)",
  },
  animate: {
    backgroundColor: "oklch(0% 0 0 / 40%)",
    backdropFilter: "blur(10px)",
  },
  exit: {
    backgroundColor: "oklch(0% 0 0 / 0%)",
    backdropFilter: "blur(0px)",
  },
};
const largeViewPortModalProps: Parameters<typeof MotionModal>[0] = {
  initial: { opacity: 0, translateY: "-100%" },
  animate: { opacity: 1, translateY: "0%" },
  exit: { opacity: 0, translateY: "-100%" },
  transition: { type: "tween", duration: 0.2 },
};

type Props = Omit<DialogTriggerProps, "children"> & {
  isDismissable?: boolean;
  isKeyboardDismissDisabled?: boolean;
  className?: boolean;
  target?:
    | React.ReactNode
    | ((opts: {
        open: () => void;
        isSmallViewPort?: boolean;
      }) => React.ReactNode);
  children:
    | React.ReactNode
    | ((opts: {
        close: () => void;
        isSmallViewPort?: boolean;
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
  const isSmallViewPort = !responsive.md;

  // Turn Dialog into Drawer on mobile viewport
  const h = window.innerHeight;
  const y = useMotionValue(h);

  const bgOpacity = useTransform(y, [0, h], [40, 0]);
  const bg = useMotionTemplate`oklch(0% 0 0 / ${bgOpacity}%)`;
  const backdropBlur = useTransform(y, [0, h], [10, 0]);
  const blur = useMotionTemplate`blur(${backdropBlur}px)`;

  const overlayProps: Parameters<typeof MotionModalOverlay>[0] = isSmallViewPort
    ? {
        style: {
          backgroundColor: bg as unknown as string,
          backdropFilter: blur as unknown as string,
        },
      }
    : largeViewPortOverlayProps;
  const modalProps: Parameters<typeof MotionModal>[0] = isSmallViewPort
    ? {
        initial: { y: h },
        animate: { y: 0 },
        exit: { y: h },
        transition: staticTransition,
        style: {
          y,
          top: 0,
        },
        drag: "y",
        dragElastic: 0.1,
        dragConstraints: { top: 0 },
        onDragEnd: (_, { offset, velocity }) => {
          if (offset.y > window.innerHeight * 0.75 || velocity.y > 10) {
            setOpen(false);
          } else {
            animate(y, 0, { ...inertiaTransition, min: 0, max: 0 });
          }
        },
      }
    : largeViewPortModalProps;

  return (
    <DialogTrigger isOpen={isOpen} onOpenChange={setOpen} {...props}>
      {typeof target === "function"
        ? target({ open: () => setOpen(true), isSmallViewPort })
        : target}
      <AnimatePresence>
        {isOpen && (
          <MotionModalOverlay
            isOpen
            onOpenChange={setOpen}
            className={[styles.overlay, className].join(" ")}
            isDismissable={isDismissable}
            isKeyboardDismissDisabled={isKeyboardDismissDisabled}
            data-hiki-overlay
            {...overlayProps}
          >
            <MotionModal
              className={[styles.modal, isSmallViewPort && styles.mobile].join(
                " "
              )}
              data-hiki-modal
              {...modalProps}
            >
              {isSmallViewPort && (
                <div className={styles.affordance} data-hiki-affordance />
              )}
              <DialogContent className={styles.dialog} data-hiki-content>
                {({ close }) => (
                  <Fragment>
                    {isDismissable && !isSmallViewPort && (
                      <button
                        className={styles.close}
                        onClick={close}
                        data-hiki-close
                      />
                    )}
                    {typeof children === "function"
                      ? children({ close, isSmallViewPort })
                      : children}
                  </Fragment>
                )}
              </DialogContent>
            </MotionModal>
          </MotionModalOverlay>
        )}
      </AnimatePresence>
    </DialogTrigger>
  );
};
