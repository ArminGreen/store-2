import { SubmitButton } from "@/components/form/Buttons";
import CheckboxInput from "@/components/form/CheckBoxInput";
import FormContainer from "@/components/form/FormContainer";
import FormInput from "@/components/form/FormInput";
import PriceInput from "@/components/form/PriceInput";
import TextAreaInput from "@/components/form/TextAreaInput";
import UpdateImageContainer from "@/components/form/UpdateImageContainer";
import {
  fetchAdminProductDetails,
  updateProductAction,
  updateProductImageAction,
} from "@/utils/actions";
import { Product } from "@prisma/client";

async function EditProductPage({ params }: { params: { id: string } }) {
  const { id } = params;
  const product = (await fetchAdminProductDetails(id)) as Product;
  const { name, company, price, description, featured, image } = product;

  if (!product) {
    return <h1>Error</h1>;
  }

  return (
    <section>
      <h1 className="capitalize text-2xl font-semibold mb-8">update product</h1>
      <div className="border p-8 rounded-md">
        {/* Image Container */}
        <UpdateImageContainer
          action={updateProductImageAction}
          text="update image"
          image={image}
          name={name}
        >
          <input type="hidden" name="id" value={id} />
          <input type="hidden" name="url" value={image} />
        </UpdateImageContainer>
        <FormContainer action={updateProductAction}>
          <div className="grid gap-4 md:grid-cols-2 my-4">
            <input name="id" type="hidden" value={id} />
            <FormInput
              name="name"
              type="text"
              label="product name"
              defaultValue={name}
            />
            <FormInput
              name="company"
              type="text"
              label="company"
              defaultValue={company}
            />
            <PriceInput defaultValue={price} />
          </div>
          <TextAreaInput
            name="description"
            labelText="description"
            defaultValue={description}
          />
          <div className="mt-6">
            <CheckboxInput
              name="featured"
              label="featured"
              defaultChecked={featured}
            />
          </div>
          <SubmitButton text="update product" className="mt-8" />
        </FormContainer>
      </div>
    </section>
  );
}
export default EditProductPage;
