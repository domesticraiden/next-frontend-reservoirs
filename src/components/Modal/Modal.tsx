interface ModalProps {
  isOpen: boolean;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function Modal({
  isOpen,
  message,
  onConfirm,
  onCancel,
}: ModalProps) {
  if (!isOpen) return null;

  return (
    <div>
      <div>
        <div>
          {/*<div></div>*/}
          <h4>Обратите внимание</h4>
        </div>
        <div>
          <p>{message}</p>
        </div>
        <div>
          <button onClick={onConfirm}>
            <span>Подтвердить</span>
          </button>
          <button onClick={onCancel}>
            <span>Отменить</span>
          </button>
        </div>
      </div>
    </div>
  );
}
