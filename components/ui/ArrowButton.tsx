"use client";

interface ArrowButtonProps {
  direction: "left" | "right";
  onClick: () => void;
  label?: string;
}

export default function ArrowButton({ direction, onClick, label }: ArrowButtonProps) {
  return (
    <button
      onClick={onClick}
      aria-label={label ?? (direction === "left" ? "Précédent" : "Suivant")}
      className="flex h-9 w-9 items-center justify-center text-white/70 transition-all duration-300 hover:text-white"
    >
      <svg
        width="14"
        height="14"
        viewBox="0 0 20 20"
        fill="none"
        className={direction === "left" ? "rotate-180" : ""}
      >
        <path
          d="M7 4l6 6-6 6"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
}
