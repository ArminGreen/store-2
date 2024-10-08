import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

import Image from "next/image";
import hero1 from "@//images/hero1.jpg";
import hero2 from "@/images/hero2.jpg";
import hero3 from "@/images/hero3.jpg";
import hero4 from "@/images/hero4.jpg";

function HeroCarousel() {
  const images = [hero1, hero2, hero3, hero4];
  return (
    <div className="hidden lg:block">
      <Carousel>
        <CarouselContent>
          {images.map((image, index) => (
            <CarouselItem key={index}>
              <div className="p-1">
                <Card>
                  <CardContent className="p-2">
                    <Image
                      src={image}
                      alt="hero"
                      className="w-full h-[24rem] rounded-md object-cover"
                    />
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="left-6" />
        <CarouselNext className="right-6" />
      </Carousel>
    </div>
  );
}
export default HeroCarousel;
