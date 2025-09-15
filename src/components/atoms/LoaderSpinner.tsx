import { Loader2 } from "lucide-react";

function LoadingSpinner() {
  return (
    <div className="flex justify-center items-center p-4 gap-4">
        Searching Data...
      <Loader2 className="h-6 w-6 animate-spin text-blue-500" />
    </div>
  );
}

export default LoadingSpinner;
