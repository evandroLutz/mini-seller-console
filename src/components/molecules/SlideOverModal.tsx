import { JSX, ReactNode } from "react";
import { XIcon } from "lucide-react";

interface SliderOverProps {
  isOpen: boolean,
  callback: () => void,
  children: ReactNode,
}


function SlideOver({isOpen, callback, children}: SliderOverProps): JSX.Element {

  return (
    <div
      className={`fixed inset-0 flex justify-end transition ${
        isOpen ? "pointer-events-auto" : "pointer-events-none"
      }`}
    >
    <div
      className={`absolute inset-0 bg-black transition-opacity duration-300 ${
        isOpen ? "opacity-30" : "opacity-0"
      }`}
      onClick={() => callback()}
    />

    <div
      className={`flex flex-col gap-4 relative bg-slate-800 text-gray-100 shadow-2xl h-full p-6 transform transition-transform duration-300 
      w-full sm:max-w-md md:w-96 
      ${isOpen ? "translate-x-0" : "translate-x-full"}`}
    >
      <button
        className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
        onClick={() => callback()}
      >
        <XIcon className="h-4 w-4" />
      </button>
      {children}
      </div>
    </div>
  );
}

export default SlideOver;