import type { ReactNode } from "react";

type HeaderProps = {
    children?: ReactNode;
};

export default function Header({ children }: HeaderProps) {
    return (
        <div className="sticky top-3 z-50 px-4">
            <header className="mt-5 mx-auto flex h-16 max-w-6xl items-center justify-between rounded-2xl 
            px-6 bg-gradient-to-br from-white/80 to-white/50 backdrop-blur-xl backdrop-saturate-150
            border border-white/60 shadow-lg shadow-blue-900/10"
            >
                <h1 className="select-none text-2xl font-bold leading-none tracking-tight"
                aria-label="StatusFlow"
                >
                    <span className="text-black">Status</span>
                    <span className="text-blue-900">Flow</span>
                </h1>

                {children && <div>{children}</div>}
            </header>
        </div>
    );
}