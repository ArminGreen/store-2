"use server";
import db from "@/utils/db";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { imageSchema, productSchema, validateWithZodSchema } from "./schemas";
import { deleteImage, uploadImage } from "./supabase";
import { revalidatePath } from "next/cache";

//////////////////////////////////////////////////////

const renderError = (error: unknown): { message: string } => {
  console.log(error);

  return {
    message: error instanceof Error ? error.message : "An Error Occurred",
  };
};

//////////////////////////////////////////////////////

const getAuthUser = async () => {
  const user = await currentUser();
  if (!user) {
    throw new Error("You must be logged in to access this route");
  }
  return user;
};

//////////////////////////////////////////////////////

const getAdminUser = async () => {
  const user = await getAuthUser();
  if (user.id !== process.env.ADMIN_USER_ID) {
    redirect("/");
  }
  return user;
};

//////////////////////////////////////////////////////

export const fetchFeaturedProducts = async () => {
  const featuredProducts = await db.product.findMany({
    where: {
      featured: true,
    },
  });

  return featuredProducts;
};

//////////////////////////////////////////////////////

export const fetchAllProducts = async ({ search = "" }: { search: string }) => {
  const allProducts = await db.product.findMany({
    where: {
      OR: [
        { name: { contains: search, mode: "insensitive" } },
        { company: { contains: search, mode: "insensitive" } },
      ],
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return allProducts;
};

//////////////////////////////////////////////////////

export const fetchSingleProduct = async (productId: string) => {
  const singleProduct = await db.product.findUnique({
    where: {
      id: productId,
    },
  });
  if (!singleProduct) {
    redirect("/products");
  }
  return singleProduct;
};

//////////////////////////////////////////////////////

export const createProductAction = async (
  prevState: unknown,
  formData: FormData
): Promise<{ message: string }> => {
  const user = await getAuthUser();
  try {
    const rawData = Object.fromEntries(formData);
    const file = formData.get("image") as File;
    const validatedData = validateWithZodSchema(productSchema, rawData);
    const validatedImageFile = validateWithZodSchema(imageSchema, {
      image: file,
    });
    const imagePath = await uploadImage(validatedImageFile.image);

    await db.product.create({
      data: {
        ...validatedData,
        image: imagePath,
        clerkId: user.id,
      },
    });
  } catch (error) {
    return renderError(error);
  }
  // return { message: "Product Created" };
  redirect("/admin/products");
};

//////////////////////////////////////////////////////

export const fetchAdminProducts = async () => {
  await getAdminUser();
  const allProducts = await db.product.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  return allProducts;
};

//////////////////////////////////////////////////////

export const deleteProductAction = async (prevState: { productId: string }) => {
  const { productId } = prevState;
  await getAdminUser();
  try {
    const product = await db.product.delete({
      where: {
        id: productId,
      },
    });
    await deleteImage(product.image);
    revalidatePath("/admin/products");
    return { message: "product removed" };
  } catch (error) {
    return renderError(error);
  }
};

//////////////////////////////////////////////////////

export const fetchAdminProductDetails = async (productId: string) => {
  await getAdminUser();

  try {
    const product = await db.product.findUnique({
      where: {
        id: productId,
      },
    });

    if (!product) {
      redirect("/admin/products");
    } else {
      return product;
    }
  } catch (error) {
    return renderError(error);
  }
};

//////////////////////////////////////////////////////

export const updateProductAction = async (
  prevState: unknown,
  formData: FormData
) => {
  await getAdminUser();
  try {
    const productId = formData.get("id") as string;
    const rawData = Object.fromEntries(formData);
    const validatedData = validateWithZodSchema(productSchema, rawData);
    await db.product.update({
      data: {
        ...validatedData,
      },
      where: {
        id: productId,
      },
    });
    revalidatePath(`/admin/products/${productId}/edit`);
    return { message: "Product Updated successfully" };
  } catch (error) {
    return renderError(error);
  }
};

//////////////////////////////////////////////////////

export const updateProductImageAction = async (
  prevState: unknown,
  formData: FormData
) => {
  await getAdminUser();
  try {
    const image = formData.get("image") as File;
    const oldImageUrl = formData.get("url") as string;
    const productId = formData.get("id") as string;
    const validatedImage = validateWithZodSchema(imageSchema, { image });
    const newImageUrl = await uploadImage(validatedImage.image);
    await deleteImage(oldImageUrl);
    await db.product.update({
      where: {
        id: productId,
      },

      data: {
        image: newImageUrl,
      },
    });
    revalidatePath(`/admin/products/${productId}/edit`);

    return { message: "Product image updated successfully" };
  } catch (error) {
    return renderError(error);
  }
};

//////////////////////////////////////////////////////

export const fetchFavoriteId = async ({ productId }: { productId: string }) => {
  try {
    const user = await getAuthUser();
    const favorite = await db.favorites.findFirst({
      where: {
        productId,
        clerkId: user.id,
      },
      select: {
        id: true,
      },
    });
    return favorite?.id || null;
  } catch (error) {
    return renderError(error);
  }
};

//////////////////////////////////////////////////////

export const toggleFavoriteAction = async (prevState: {
  productId: string;
  favoriteId: string | null;
  pathname: string;
}) => {
  const user = await getAuthUser();
  const { pathname, productId, favoriteId } = prevState;

  try {
    if (favoriteId) {
      await db.favorites.delete({
        where: {
          id: favoriteId,
        },
      });
    } else {
      await db.favorites.create({
        data: {
          clerkId: user.id,
          productId,
        },
      });
    }
    revalidatePath(pathname);
    return {
      message: favoriteId ? "Removed From Favorites" : "Added To Favorites",
    };
  } catch (error) {
    return renderError(error);
  }
};

//////////////////////////////////////////////////////

export const fetchUserFavorites = async () => {
  const user = await getAuthUser();

  const favorites = await db.favorites.findMany({
    where: {
      clerkId: user.id,
    },
    include: {
      product: true,
    },
  });
  return favorites;
};

//////////////////////////////////////////////////////
