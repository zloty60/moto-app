import { Card, Box, Typography } from "@material-ui/core";
import { UserAvatar } from "./../shared/userProfile/UserAvatar";

export function UserCard({ name, email }) {
  return (
    <Card>
      <Box p={3}>
        <Box display="flex" flexDirection="column" alignItems="center">
          <UserAvatar name={name} />
          <Box mt={4} />
          <Typography gutterBottom variant="h4" component="h3" align="center">
            {name}
          </Typography>
          <Typography variant="h6">{email}</Typography>
        </Box>
      </Box>
    </Card>
  );
}
