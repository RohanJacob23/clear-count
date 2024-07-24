import { Button } from "../ui/button";
import { CheckIcon } from "@radix-ui/react-icons";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import Reveal from "../animations/home/Reveal";
import PricingCardReveal from "../animations/home/PricingCardReveal";

export default function Pricing() {
  const plans = [
    {
      name: "Basic plan",
      desc: "This pricing plan is being worked on as for now",
      price: "--",
      isMostPop: false,
      features: ["Comming Soon...", "Comming Soon...", "Comming Soon..."],
    },
    {
      name: "Startup",
      desc: "This pricing plan is being worked on as for now",
      price: "--",
      isMostPop: true,
      features: ["Comming Soon...", "Comming Soon...", "Comming Soon..."],
    },
    {
      name: "Enterprise",
      desc: "This pricing plan is being worked on as for now",
      price: "--",
      isMostPop: false,
      features: ["Comming Soon...", "Comming Soon...", "Comming Soon..."],
    },
  ];
  return (
    <section className="relative z-50 max-w-screen-xl mx-auto md:px-8 py-14">
      <div className="relative max-w-xl mx-auto sm:text-center">
        <Reveal>
          <h1>Pricing for all sizes</h1>
          <p className="mt-3 max-w-xl">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
            efficitur consequat nunc.
          </p>
        </Reveal>
      </div>

      <div className="mt-16 justify-center gap-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {plans.map((item, idx) => (
          <PricingCardReveal key={idx} delay={idx * 0.15}>
            <Card className="rounded-lg relative">
              {item.isMostPop ? (
                <p className="w-32 absolute -top-5 left-0 right-0 mx-auto px-3 py-2 rounded-full border shadow-md bg-muted text-center text-muted-foreground font-semibold text-sm">
                  Most popular
                </p>
              ) : null}

              <CardHeader className="space-y-4 border-b">
                <CardTitle>{item.name}</CardTitle>
                <CardTitle>
                  ${item.price}{" "}
                  <span className="text-xl font-normal text-muted-foreground">
                    /mo
                  </span>
                </CardTitle>
                <p>{item.desc}</p>
              </CardHeader>

              <CardContent className="p-6">
                <ul className="space-y-3">
                  <li className="pb-2">Features</li>
                  {item.features.map((featureItem, idx) => (
                    <li key={idx} className="flex items-center gap-5">
                      <CheckIcon className="size-5" />
                      <p className="!m-0">{featureItem}</p>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Button disabled className="w-full">
                  Working On...
                </Button>
              </CardFooter>
            </Card>
          </PricingCardReveal>
        ))}
      </div>
    </section>
  );
}
