import {
  Stack,
  Typography,
  FormControl,
  OutlinedInput,
  InputLabel,
  Button,
  Box,
  FormHelperText,
  Alert,
  Grid,
  Container,
} from "@mui/material";
import { FormContainer, Wrapper } from "./styles";
import { Link } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { login, reset } from "../../features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { useEffect } from "react";
import { RootState } from "../../app/store";
import { User } from "../../interface/User";

const schema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().required(),
});

const Signin = () => {
  const {
    register: reg,
    handleSubmit,
    formState: { errors },
  } = useForm<User>({
    resolver: yupResolver(schema),
  });

  const navigate = useNavigate();

  const dispatch = useAppDispatch();
  const { isSuccess, message } = useAppSelector(
    (state: RootState) => state.auth
  );

  const onSubmit: SubmitHandler<User> = (data, e) => {
    const user = { email: data.email, password: data.password };

    dispatch(login(user));

    e!.target.reset();
  };

  useEffect(() => {
    if (isSuccess) navigate("/");

    return () => {
      dispatch(reset());
    };
  }, [isSuccess, dispatch, navigate]);

  return (
    <Container>
      <Grid
        container
        spacing={2}
        sx={{ alignItems: "center", height: "100vh" }}
      >
        <Grid item lg={6} md={6} sm={12} xs={12}>
          <img
            src="/logosample.jpg"
            alt="logo"
            style={{
              height: "500px",
              width: "100%",
              objectFit: "cover",
              borderRadius: "10px",
            }}
          />
        </Grid>

        <Grid item lg={6} md={6} sm={12} xs={12}>
          <Wrapper>
            <Box sx={{ marginBottom: 5 }}>
              <Typography variant="h5" fontWeight="bold">
                Sign in
              </Typography>
              <Typography
                variant="body1"
                component="p"
                sx={{ marginY: 1, color: "#808080" }}
              >
                Enter your details below.
              </Typography>
              {message && (
                <Alert severity="error">
                  {typeof message === "string" && message}
                </Alert>
              )}
            </Box>

            {/*  Form  */}
            <form onSubmit={handleSubmit(onSubmit)}>
              <Stack spacing={2}>
                <FormControl>
                  <InputLabel>Email</InputLabel>
                  <OutlinedInput
                    label="Email"
                    {...reg("email")}
                    error={errors!?.email!?.message!?.length > 0}
                  />
                  <FormHelperText error>
                    {errors!?.email?.message}
                  </FormHelperText>
                </FormControl>

                <FormControl>
                  <InputLabel>Password</InputLabel>
                  <OutlinedInput
                    label="Password"
                    type="password"
                    {...reg("password")}
                    error={errors!?.password!?.message!?.length > 0}
                  />
                  <FormHelperText error>
                    {errors!?.password?.message}
                  </FormHelperText>
                </FormControl>
              </Stack>

              <Button
                variant="contained"
                fullWidth
                sx={{ marginTop: 5 }}
                type="submit"
              >
                Login
              </Button>
            </form>

            <Typography sx={{ marginY: 2 }}>
              Don't have an account? <Link to="/signup">Get Started</Link>
            </Typography>
          </Wrapper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Signin;
