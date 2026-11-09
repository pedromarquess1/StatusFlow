import type { ReactNode } from "react";

// Modelo dos serviços
export type MonitoredService = {
    id: number;
    name: string;
    url: string;
    status: boolean;
};

export type HeaderProps = {
    children?: ReactNode;
};

export type ServiceInput = { name: string; url: string };

export type ModalProps = {
    title: string;
    onClose: () => void;
    children: ReactNode;
};

export type ConfirmDialogProps = {
    title: string;
    message: string;
    confirmLabel: string;
    onConfirm: () => Promise<void>;
    onClose: () => void;
};

export type ServiceFormModalProps = {
    title: string;
    submitLabel: string;
    initialValues?: ServiceInput;
    onSubmit: (values: ServiceInput) => Promise<void>;
    onClose: () => void;
};

export type ServiceCardProps = {
    service: MonitoredService;
    onEdit: (service: MonitoredService) => void;
    onDelete: (service: MonitoredService) => void;
};