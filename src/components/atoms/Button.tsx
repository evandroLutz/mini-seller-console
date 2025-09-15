import { JSX } from "react";

interface ButtonProps {
    title: string;
    active: boolean;
    onClick: () => void;
}

function Button({title, active, onClick}:  ButtonProps): JSX.Element {
    return (
       <button onClick={() => onClick()}
            disabled={!active}
            className={`w-auto px-5 py-2.5 font-medium rounded-xl shadow-lg transition-all duration-300
                ${active
                ? "bg-gradient-to-r from-blue-500 to-indigo-600 text-white hover:from-blue-600 hover:to-indigo-700"
                : "cursor-not-allowed!important bg-gray-400 text-gray-200 opacity-50"}
            `}
            >
            {title}
        </button>

    );
}

export default Button;