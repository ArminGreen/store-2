// import SectionTitle from "@/components/global/SectionTitle";
import FavoriteToggleButton from "@/components/products/FavoriteToggleButton";
import AddToCart from "@/components/single-product/AddToCart";
import ProductBreadcrumb from "@/components/single-product/BreadCrumbs";
import ProductRating from "@/components/single-product/ProductRating";
import { fetchSingleProduct } from "@/utils/actions";
import { formatCurrency } from "@/utils/format";
import Image from "next/image";

async function SingleProductPage({ params }: { params: { id: string } }) {
  const product = await fetchSingleProduct(params.id);
  const { name, price, company, description, image } = product;
  const dollarsAmount = formatCurrency(price);

  return (
    <section>
      <ProductBreadcrumb name={name} />
      <div className="mt-6 grid grid-cols-1 grid-rows-2 gap-y-8 lg:grid-cols-2  lg:gap-x-16 lg:grid-rows-1">
        <div className="relative w-full h-auto object-cover">
          <Image
            src={image}
            alt={name}
            priority
            fill
            sizes="(max-width:768px) 100vw,(max-width:1200px) 50vw,33vw"
            className="rounded w-full object-cover"
          />
        </div>
        <div>
          <div className="flex gap-x-8 items-center">
            <h1 className="capitalize text-3xl font-bold">{name}</h1>
            <FavoriteToggleButton productId={params.id} />
          </div>
          <ProductRating productId={params.id} />
          <h4 className="text-xl mt-2">{company}</h4>
          <p className="mt-3 text-md bg-muted inline-block p-2 rounded-md">
            {dollarsAmount}
          </p>
          <p className="mt-6 leading-8 text-muted-foreground">{description}</p>
          <AddToCart productId={params.id} />
        </div>
      </div>
    </section>
  );
}
export default SingleProductPage;
