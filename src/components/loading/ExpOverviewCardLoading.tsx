import React from "react";
import { Card, CardContent } from "../ui/card";
import { Skeleton } from "../ui/skeleton";

export default function ExpOverviewCardLoading() {
  return (
    <Card className="flex-1 min-w-40 sm:min-w-56 rounded-lg">
      <CardContent className="p-6">
        <div className="space-y-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-5 w-5/6" />
        </div>
      </CardContent>
    </Card>
  );
}
