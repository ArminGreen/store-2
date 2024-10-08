import { Input } from "../ui/input";
import { Label } from "../ui/label";

const name = "price";

type PriceInputProps = {
  defaultValue?: number;
};

function PriceInput({ defaultValue }: PriceInputProps) {
  return (
    <div className="mb-2">
      <Label htmlFor={name} className="capitalize">
        Price ($)
      </Label>
      <Input
        id={name}
        name={name}
        min={0}
        defaultValue={defaultValue || 100}
        type="number"
        required
      />
    </div>
  );
}
export default PriceInput;
