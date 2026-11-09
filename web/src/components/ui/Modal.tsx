import { useEffect } from "react";
import type { ModalProps } from "../../types/service";

export default function Modal({ title, onClose, children }: ModalProps) {
    useEffect(() => {
            const onKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
        };
            window.addEventListener("keydown", onKeyDown);
            return () => window.removeEventListener("keydown", onKeyDown);
    }, [onClose]);

    return (
        <div
        className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/40 px-4 backdrop-blur-sm"
        onClick={onClose}
        >
            <div
                role="dialog"
                aria-modal="true"
                aria-label={title}
                onClick={(e) => e.stopPropagation()}
                className="w-full max-w-md rounded-2xl border border-white/60 bg-gradient-to-br from-white/95 to-white/80
                p-6 shadow-2xl shadow-blue-900/20 backdrop-blur-xl"
            >
                <h2 className="mb-4 text-xl font-bold tracking-tight text-slate-900">
                    {title}
                </h2>
                {children}
            </div>
        </div>
    );
}