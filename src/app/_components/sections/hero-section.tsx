import Image from "next/image";

import { Badge } from "@/components/ui/badge";
import { ButtonLink } from "@/components/ui/button-link";

import type { HomeAction, HomeHeroImage } from "../home-content";

type HeroSectionProps = {
  benefits: string[];
  description: string;
  eyebrow: string;
  image: HomeHeroImage;
  primaryAction: HomeAction;
  secondaryAction: HomeAction;
  title: string;
};

export function HeroSection({
  benefits,
  description,
  eyebrow,
  image,
  primaryAction,
  secondaryAction,
  title,
}: HeroSectionProps) {
  return (
    <section className="bg-background">
      <div className="mx-auto flex w-full max-w-[1440px] flex-col items-center px-5 py-16 text-center sm:px-8 sm:py-20 lg:px-12 lg:py-24">
        <p className="text-sm font-semibold text-primary">{eyebrow}</p>
        <h1 className="mt-3 max-w-5xl text-4xl font-semibold leading-tight sm:text-5xl lg:text-[56px]">
          {title}
        </h1>
        <p className="mt-5 max-w-3xl text-base leading-8 text-muted-foreground sm:text-lg">
          {description}
        </p>

        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <ButtonLink href={primaryAction.href}>
            {primaryAction.label}
          </ButtonLink>
          <ButtonLink href={secondaryAction.href} variant="secondary">
            {secondaryAction.label}
          </ButtonLink>
        </div>

        <div className="mt-8 flex flex-wrap justify-center gap-2">
          {benefits.map((benefit) => (
            <Badge key={benefit}>{benefit}</Badge>
          ))}
        </div>

        <figure className="mt-12 w-full max-w-6xl">
          <Image
            alt={image.alt}
            className="h-auto w-full [box-shadow:var(--product-shadow)]"
            height={image.height}
            priority
            src={image.src}
            width={image.width}
          />
        </figure>
      </div>
    </section>
  );
}
