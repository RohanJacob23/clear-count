import { cn } from "@/lib/utils";
import {
  BarChartIcon,
  GlobeIcon,
  LockClosedIcon,
  MagnifyingGlassIcon,
  PieChartIcon,
  PlusCircledIcon,
  StarFilledIcon,
} from "@radix-ui/react-icons";
import { Card, CardContent } from "../ui/card";

export default function Features() {
  const features = [
    {
      icon: <MagnifyingGlassIcon className="size-4" />,
      title: "Intuitive Expense Tracking",
      gridStyling: "md:col-span-2 md:row-span-2",
      desc: "Add transactions quickly and easily, categorize with a tap, and track your spending effortlessly.",
    },
    {
      icon: <PieChartIcon className="size-4" />,
      gridStyling: "md:col-start-3",
      title: "Personalized Budgeting",
      desc: "Set realistic budgets for different categories, track progress in real-time, and avoid overspending.",
    },
    {
      icon: <BarChartIcon className="size-4" />,
      title: "Powerful Reports & Insights",
      gridStyling: "md:row-span-2 md:col-start-1 md:row-start-3",
      desc: "Gain valuable insights into your spending habits with clear reports and customizable charts & graphs.",
    },
    {
      icon: <LockClosedIcon className="size-4" />,
      title: "Secure & Reliable",
      gridStyling: "md:row-span-2 md:col-start-3 md:row-start-2",
      desc: "Your data is protected with bank-level security, and automatic backups ensure your information is always safe.",
    },
    {
      icon: <PlusCircledIcon className="size-4" />,
      gridStyling: "md:row-start-3",
      title: "Quick Add",
      desc: "Add transactions instantly with minimal effort. Capture expenses on the go without interrupting your day.",
    },
    {
      icon: <GlobeIcon className="size-4" />,
      title: "Multi-Currency Support",
      gridStyling: "md:col-span-2 md:col-start-2 md:row-start-4",
      desc: "Track expenses in different currencies, perfect for international travelers or businesses. Automatic conversion for easy comparison.",
    },
  ];
  return (
    <section className="py-14 min-h-screen">
      <div className="max-w-screen-xl mx-auto md:px-8">
        <div className="relative max-w-2xl mx-auto sm:text-center">
          <div className="relative z-10">
            <h1 className="">Let&apos;s help power your SaaS</h1>
            <p className="mt-3">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
              congue, nisl eget molestie varius, enim ex faucibus purus.
            </p>
          </div>
          <div
            className="absolute inset-0 max-w-xs mx-auto h-44 blur-[118px]"
            style={{
              background:
                "linear-gradient(152.92deg, rgba(192, 132, 252, 0.2) 4.54%, rgba(232, 121, 249, 0.26) 34.2%, rgba(192, 132, 252, 0.1) 77.55%)",
            }}
          ></div>
        </div>
        <div className="relative mt-12 max-w-md md:max-w-none mx-auto">
          <ul className="grid gap-6 grid-cols-1 md:grid-cols-3 md:grid-rows-4">
            {features.map((item, idx) => (
              <li key={idx} className={item.gridStyling}>
                <Card className="size-full rounded-lg">
                  <CardContent className="p-6 space-y-3">
                    {item.icon}
                    <h4>{item.title}</h4>
                    <p>{item.desc}</p>
                  </CardContent>
                </Card>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
