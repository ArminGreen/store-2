import { fetchFavoriteId } from "@/utils/actions";
import { auth } from "@clerk/nextjs/server";
import { CardSigninButton } from "../form/Buttons";
import FavoriteToggleForm from "./FavoriteToggleForm";

async function FavoriteToggleButton({ productId }: { productId: string }) {
  const { userId } = auth();
  if (!userId) {
    return <CardSigninButton />;
  }
  const favoriteId = (await fetchFavoriteId({ productId })) as string;
  return <FavoriteToggleForm favoriteId={favoriteId} productId={productId} />;
}
export default FavoriteToggleButton;
