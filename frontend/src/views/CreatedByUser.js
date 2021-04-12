import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Card, Box, Typography, makeStyles } from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import Skeleton from "@material-ui/lab/Skeleton";

import { AppContainer } from "./../components/shared/AppContainer";
import { UserAvatar } from "./../components/shared/userProfile/UserAvatar";
import { fetchAllOffersCreatedBy } from "./../redux/actions/allOffersActions";
import { CarCardList } from "./../components/carCard/CarCardList";
import { CarCardSkeletonList } from "./../components/carCard/CarCardSkeletonList";

export function CreatedByCurrentUser(props) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const userId = props.match.params.user;
  const { offers, loading, error } = useSelector((state) => state.allOffers);

  useEffect(() => {
    const { user } = JSON.parse(localStorage.getItem("user"));
    dispatch(fetchAllOffersCreatedBy(user._id));
  }, [dispatch, userId]);

  if (error === "fetchAllOffersCreatedBy") {
    return (
      <AppContainer>
        <Alert severity="error">Nie ma takiego użytkownika</Alert>
      </AppContainer>
    );
  }

  const { user } = JSON.parse(localStorage.getItem("user"));
  return (
    <AppContainer>
      <Card>
        <Box p={2} display="flex" alignContent="center">
          {loading === "fetchAllOffersCreatedBy" ? (
            <Skeleton variant="circle" width={65} height={65} />
          ) : (
            <UserAvatar name={user.name} />
          )}
          <Box mr={3} />
          <Typography
            variant="h4"
            component="h3"
            align="center"
            className={classes.name}
          >
            Moje ogłoszenia
          </Typography>
        </Box>
      </Card>
      <Box mt={6} mb={6}>
        {loading === "fetchAllOffersCreatedBy" ? (
          <CarCardSkeletonList skeletonCount={6} />
        ) : offers.length > 0 ? (
          <CarCardList offers={offers} />
        ) : (
          <Alert severity="info">Nie dodałeś jeszcze żadnego ogłoszenia</Alert>
        )}
      </Box>
    </AppContainer>
  );
}

export function CreatedByUser(props) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const userId = props.match.params.user;
  const { offers, loading, error } = useSelector((state) => state.allOffers);

  useEffect(() => {
    dispatch(fetchAllOffersCreatedBy(userId));
  }, [dispatch, userId]);

  if (error === "fetchAllOffersCreatedBy") {
    return (
      <AppContainer>
        <Alert severity="error">Nie ma takiego użytkownika</Alert>
      </AppContainer>
    );
  }

  return (
    <AppContainer>
      <Card>
        <Box p={2} display="flex" alignContent="center">
          {loading === "fetchAllOffersCreatedBy" ? (
            <Skeleton variant="circle" width={65} height={65} />
          ) : (
            offers[0] && <UserAvatar name={offers[0].createdBy.name} />
          )}
          <Box mr={3} />
          <Typography
            variant="h4"
            component="h3"
            align="center"
            className={classes.name}
          >
            {loading === "fetchAllOffersCreatedBy" ? (
              <Skeleton variant="rect" height={35} width={120} />
            ) : (
              offers[0] && offers[0].createdBy.name
            )}
          </Typography>
        </Box>
      </Card>
      <Box mt={6} mb={6}>
        {loading === "fetchAllOffersCreatedBy" ? (
          <CarCardSkeletonList skeletonCount={6} />
        ) : (
          <CarCardList offers={offers} />
        )}
      </Box>
    </AppContainer>
  );
}

const useStyles = makeStyles((theme) => ({
  name: { textTransform: "capitalize", alignSelf: "center" },
}));
