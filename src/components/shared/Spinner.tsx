import { Loader2 } from "lucide-react";
const Spinner = () => (
  <div className="flex justify-center items-center py-10">
    <Loader2 className="animate-spin w-12 h-12 text-muted-foreground" />
  </div>
);

export default Spinner;
