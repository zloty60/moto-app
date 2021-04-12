import { Card, Box } from "@material-ui/core";
import Skeleton from "@material-ui/lab/Skeleton";

export function OfferDescriptionSkeleton() {
  return (
    <Card>
      <Box pt={4} pl={3} pr={3} pb={3}>
        <Skeleton width="85%" height={32} />
        <Box mt={2} />
        <Skeleton width="30%" height={36} />
        <Box mt={3} />
        <Skeleton width="100%" height={32} />
        <Skeleton width="100%" height={32} />
        <Box mt={3} />
        <Skeleton width="30%" height={32} />
        <Box mt={1} />
        <Skeleton />
        <Skeleton />
        <Skeleton />
        <Skeleton />
        <Skeleton />
      </Box>
    </Card>
  );
}
