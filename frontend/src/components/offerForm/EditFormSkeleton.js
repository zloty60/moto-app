import { Card, Box } from "@material-ui/core";
import Skeleton from "@material-ui/lab/Skeleton";

export function EditFormSkeleton() {
  return (
    <Card>
      <Box pt={3} pb={3} pl={2} pr={2}>
        <Box
          marginBottom={4}
          marginTop={3}
          display="flex"
          flexDirection="column"
          alignItems="center"
        >
          <Skeleton variant="circle" width={40} height={40} />
          <Box marginTop={2} />
          <Skeleton variant="text" width="35%" height="32px" />
          <Box marginTop={4} />
          <Skeleton width="100%" height="56px" />
          <Skeleton width="100%" height="56px" />
          <Skeleton width="100%" height="56px" />
          <Skeleton width="100%" height="200px" />
        </Box>
      </Box>
    </Card>
  );
}
