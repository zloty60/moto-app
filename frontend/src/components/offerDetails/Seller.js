import { Card, Box, Typography, Link, makeStyles } from "@material-ui/core";

import { UserAvatar } from "./../shared/userProfile/UserAvatar";

export function Seller({ offer }) {
  const classes = useStyles();
  const { createdBy } = offer;

  return (
    <Card>
      <Box p={3} pt={4}>
        <Box display="flex" justifyContent="center">
          {createdBy && <UserAvatar name={createdBy.name} />}
        </Box>
        <Box mt={3} />
        <Typography
          gutterBottom
          variant="h4"
          component="h3"
          align="center"
          className={classes.name}
        >
          {createdBy ? createdBy.name : null}
        </Typography>

        <Box mt={1} textAlign="center">
          {createdBy && (
            <Link href={`/uzytkownik/${createdBy._id}/oferty`}>
              Pokaż wszystkie ogłoszenia użytkownika
            </Link>
          )}
        </Box>
      </Box>
    </Card>
  );
}

const useStyles = makeStyles((theme) => ({
  name: { textTransform: "capitalize" },
}));
