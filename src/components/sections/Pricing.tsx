import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import { CheckIcon } from "@radix-ui/react-icons";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";

export default function Pricing() {
  const plans = [
    {
      name: "Basic plan",
      desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      price: 12,
      isMostPop: false,
      features: [
        "Curabitur faucibus",
        "massa ut pretium maximus",
        "Sed posuere nisi",
        "Pellentesque eu nibh et neque",
        "Suspendisse a leo",
        "Praesent quis venenatis ipsum",
        "Duis non diam vel tortor",
      ],
    },
    {
      name: "Startup",
      desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      price: 35,
      isMostPop: true,
      features: [
        "Curabitur faucibus",
        "massa ut pretium maximus",
        "Sed posuere nisi",
        "Pellentesque eu nibh et neque",
        "Suspendisse a leo",
        "Praesent quis venenatis ipsum",
        "Duis non diam vel tortor",
      ],
    },
    {
      name: "Enterprise",
      desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      price: 60,
      isMostPop: false,
      features: [
        "Curabitur faucibus",
        "massa ut pretium maximus",
        "Sed posuere nisi",
        "Pellentesque eu nibh et neque",
        "Suspendisse a leo",
        "Praesent quis venenatis ipsum",
        "Duis non diam vel tortor",
      ],
    },
  ];
  return (
    <section className="max-w-screen-xl mx-auto md:px-8 py-14">
      <div className="relative max-w-xl mx-auto sm:text-center">
        <h1>Pricing for all sizes</h1>
        <p className="mt-3 max-w-xl">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
          efficitur consequat nunc.
        </p>
      </div>

      <div className="mt-16 justify-center gap-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {plans.map((item, idx) => (
          <Card key={idx} className="rounded-lg relative">
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
              <Button className="w-full">Get Started</Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </section>
  );
}
