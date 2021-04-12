import { useMediaQuery, useTheme } from "@material-ui/core";
import Skeleton from "@material-ui/lab/Skeleton";

export function ImageGalleryLoader() {
  const theme = useTheme();
  const xs = useMediaQuery(theme.breakpoints.up("xs"));
  const sm = useMediaQuery(theme.breakpoints.up("sm"));
  const md = useMediaQuery(theme.breakpoints.up("md"));
  let height;

  const setLoaderHeight = () => {
    if (xs) {
      height = 200;
    }
    if (sm) {
      height = 420;
    }
    if (md) {
      height = 510;
    }
  };

  setLoaderHeight();

  return <Skeleton variant="rect" width="100%" height={height} />;
}
