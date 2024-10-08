"use client";
import { actionFunction } from "@/utils/types";
import FormContainer from "./FormContainer";
import Image from "next/image";
import { Button } from "../ui/button";
import { useState } from "react";
import ImageInput from "./ImageInput";
import { SubmitButton } from "./Buttons";

type UpdateImageProps = {
  name: string;
  image: string;
  text: string;
  action: actionFunction;
  children?: React.ReactNode;
};

function UpdateImageContainer({
  name,
  image,
  action,
  text,
  children,
}: UpdateImageProps) {
  const [isUploadForm, setIsUploadForm] = useState(false);
  return (
    <div className="mb-8">
      <Image
        src={image}
        alt={name}
        width={200}
        height={200}
        priority
        className="rounded-md object-cover"
      />
      <Button
        variant={isUploadForm ? "default" : "secondary"}
        size="sm"
        onClick={() => setIsUploadForm((prev) => !prev)}
        className="my-4"
      >
        {text}
      </Button>
      {isUploadForm && (
        <FormContainer action={action}>
          {children}
          <div className="flex gap-5 flex-col-2 items-center">
            <ImageInput />
            <SubmitButton size="sm" className="mt-4" />
          </div>
        </FormContainer>
      )}
    </div>
  );
}
export default UpdateImageContainer;
