import { Container, Box } from "@material-ui/core";

export function AppContainer(props) {
  return (
    <Container>
      <Box mt={5} mb={5}>
        {props.children}
      </Box>
    </Container>
  );
}
