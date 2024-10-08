import { Button } from "../ui/button";

function AddToCart({ productId }: { productId: string }) {
  // console.log(productId);

  return (
    <Button size="lg" className="capitalize mt-8">
      Add To Cart
    </Button>
  );
}
export default AddToCart;
