import {
  Stack,
  Typography,
  FormControl,
  Button,
  Box,
  FormHelperText,
  Alert,
  TextField,
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
    <Box component="section">
      <FormContainer>
        <Wrapper>
          <Box sx={{ marginBottom: 5 }}>
            <Typography variant="h5" fontWeight="bold">
              Sign in
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
                <TextField
                  variant="standard"
                  label="Email"
                  {...reg("email")}
                  error={errors!?.email!?.message!?.length > 0}
                />
                <FormHelperText error>{errors!?.email?.message}</FormHelperText>
              </FormControl>

              <FormControl>
                <TextField
                  variant="standard"
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
      </FormContainer>
    </Box>
  );
};

export default Signin;
