import { fetchFeaturedProducts } from "@/utils/actions";
import SectionTitle from "../global/SectionTitle";
import EmptyList from "../global/EmptyList";
import ProductsGrid from "../products/ProductsGrid";

async function FeaturedProducts() {
  const products = await fetchFeaturedProducts();

  if (products.length === 0) return <EmptyList />;
  return (
    <div>
      <SectionTitle text="Featured Products" />
      <ProductsGrid products={products} />
    </div>
  );
}
export default FeaturedProducts;
