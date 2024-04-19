import { Card, CardContent } from "../ui/card";
import { Skeleton } from "../ui/skeleton";

export default function TransactionTableLoading() {
  return (
    <section className="w-full">
      <div className="flex gap-4 mb-4">
        <Skeleton className="max-w-sm w-full h-8" />
        <Skeleton className="h-8 w-32" />
      </div>
      <Card>
        <CardContent className="p-6 space-y-4">
          <div className="flex gap-2 justify-evenly">
            {Array.from({ length: 5 }).map((_, index) => (
              <Skeleton key={index} className="h-6 w-1/6" />
            ))}
          </div>

          {Array.from({ length: 5 }, (_, index) => (
            <div key={index} className="flex gap-2 justify-evenly">
              {Array.from({ length: 5 }, (_, i) => (
                <Skeleton key={i} className="h-4 w-1/6" />
              ))}
            </div>
          ))}
        </CardContent>
      </Card>
    </section>
  );
}
