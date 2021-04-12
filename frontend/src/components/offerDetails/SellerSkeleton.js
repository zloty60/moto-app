import { Card, Box } from "@material-ui/core";
import Skeleton from "@material-ui/lab/Skeleton";

export function SellerSkeleton() {
  return (
    <Card>
      <Box p={3} pt={4}>
        <Box display="flex" justifyContent="center">
          <Skeleton variant="circle" width={65} height={65} />
        </Box>
        <Box mt={3} display="flex" justifyContent="center">
          <Skeleton width="60%" height={41} />
        </Box>
        <Box mt={2} />
        <Skeleton height="28px" />
        <Skeleton />
      </Box>
    </Card>
  );
}
