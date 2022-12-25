import { Alert, Stack } from "@mui/material";

const ValidationException = (props) => {
  const { errors } = props;

  return (
    <>
      {errors && <Stack sx={{ width: '100%' }} spacing={2} className="mb-16">
        <Alert variant="filled" severity="error">
          {errors}
        </Alert>
      </Stack>}
    </>
  )
};

export default ValidationException;