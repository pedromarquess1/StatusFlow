import { useState } from "react";
import { getErrorMessage } from "../../services/api";
import Modal from "./Modal";
import type { ConfirmDialogProps } from "../../types/service";

export default function ConfirmDialog({
    title,
    message,
    confirmLabel,
    onConfirm,
    onClose,
}: ConfirmDialogProps) {
    const [busy, setBusy] = useState(false);
    const [error, setError] = useState<string | null>(null);

    async function handleConfirm() {
            setBusy(true);
            setError(null);
        try {
            await onConfirm();
        } catch (err) {
            setError(getErrorMessage(err));
            setBusy(false);
        }
    }

    return (
        <Modal title={title} onClose={onClose}>
            <p className="text-sm text-slate-600">{message}</p>

            {error && <p className="mt-3 text-sm text-rose-600">{error}</p>}

            <div className="mt-6 flex justify-end gap-3">
                <button
                type="button"
                onClick={onClose}
                disabled={busy}
                className="rounded-lg px-4 py-2 text-sm font-medium text-slate-600 transition hover:bg-white/70"
                >
                    Cancelar
                </button>
                <button
                type="button"
                onClick={handleConfirm}
                disabled={busy}
                className="rounded-lg bg-rose-600 px-4 py-2 text-sm font-medium text-white transition
                hover:bg-rose-700 disabled:opacity-60"
                >
                    {busy ? "Excluindo..." : confirmLabel}
                </button>
            </div>
        </Modal>
    );
}