import { Card, CardContent } from "@material-ui/core";
import Skeleton from "@material-ui/lab/Skeleton";

export function CarCardSkeleton() {
  return (
    <Card>
      <Skeleton variant="rect" width="100%" height={250} />
      <CardContent>
        <Skeleton />
        <Skeleton width="80%" />
        <Skeleton width="80%" />
      </CardContent>
    </Card>
  );
}
