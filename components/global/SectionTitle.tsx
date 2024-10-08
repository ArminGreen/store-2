import { Separator } from "../ui/separator";

function SectionTitle({ text }: { text: string }) {
  return (
    <div className="mt-8">
      <h2 className="text-3xl font-medium tracking-wider capitalize mb-8">
        {text}
      </h2>
      <Separator />
    </div>
  );
}
export default SectionTitle;
