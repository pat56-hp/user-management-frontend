import { IconTrendingDown, IconTrendingUp } from "@tabler/icons-react";

import { Badge } from "src/components/ui/badge";
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "src/components/ui/card";
import useUser from "../hooks/use-user";
import { useEffect } from "react";

export function SectionCards({ statistics }) {
  return (
    statistics && (
      <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-3 @5xl/main:grid-cols-3">
        <Card className="@container/card">
          <CardHeader className="flex flex-row items-start justify-between">
            <CardDescription>Total Utilisateurs</CardDescription>
            <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
              {statistics.total_users || 0}
            </CardTitle>
          </CardHeader>
        </Card>
        <Card className="@container/card">
          <CardHeader className="flex flex-row items-start justify-between">
            <CardDescription>Utilisateur(s) Actif</CardDescription>
            <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
              {statistics.active_users || 0}
            </CardTitle>
          </CardHeader>
        </Card>
        <Card className="@container/card">
          <CardHeader className="flex flex-row items-start justify-between">
            <CardDescription>Utilisateur(s) Inactif(s)</CardDescription>
            <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
              {statistics.inactive_users || 0}
            </CardTitle>
          </CardHeader>
        </Card>
      </div>
    )
  );
}
