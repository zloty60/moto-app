import { Grid, useTheme, useMediaQuery } from "@material-ui/core";

import { CarCardSkeleton } from "./CarCardSkeleton";

export function CarCardSkeletonList({ skeletonCount = 6 }) {
  const skeletonArr = [];

  for (let i = 0; i < skeletonCount; i++) {
    skeletonArr.push(i);
  }

  const theme = useTheme();
  const md = useMediaQuery(theme.breakpoints.up("md"));
  return (
    <Grid container spacing={md ? 4 : 3}>
      {skeletonArr &&
        skeletonArr.map((el) => (
          <Grid key={el} item xs={12} sm={6} lg={4}>
            <CarCardSkeleton />
          </Grid>
        ))}
    </Grid>
  );
}
