import ProductsContainer from "@/components/products/ProductsContainer";

function ProductsPage({
  searchParams,
}: {
  searchParams: { layout?: string; search?: string };
}) {
  const search = searchParams.search || "";
  const layout = searchParams.layout || "grid";

  return <ProductsContainer layout={layout} search={search} />;
}
export default ProductsPage;
