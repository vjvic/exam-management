import {
  Stack,
  Typography,
  FormControl,
  OutlinedInput,
  InputLabel,
  Button,
  Box,
  MenuItem,
  FormHelperText,
  Alert,
  Grid,
  Container,
} from "@mui/material";
import Select from "@mui/material/Select";
import { FormContainer, Wrapper } from "./styles";
import { Link } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { register, reset } from "../../features/auth/authSlice";
import { User } from "../../interface/User";
import { RootState } from "../../app/store";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const schema = yup.object().shape({
  fName: yup.string().required("First name is required"),
  lName: yup.string().required("Last name is required"),
  role: yup.string().required(),
  email: yup.string().email().required(),
  password: yup.string().min(8).required(),
  confirmPassword: yup
    .string()
    .required("Confirm Password is required")
    .oneOf([yup.ref("password")], "Passwords must match"),
});

const Signup = () => {
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
    const newUser: User = {
      fName: data.fName,
      lName: data.lName,
      email: data.email,
      password: data.password,
      profilePic: "test",
      role: data.role,
    };

    dispatch(register(newUser));

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
                Sign up
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
                <Stack direction="row" spacing={2}>
                  <FormControl fullWidth>
                    <InputLabel>First Name</InputLabel>
                    <OutlinedInput
                      label="First Name"
                      {...reg("fName")}
                      error={errors!?.fName!?.message!?.length > 0}
                    />
                    <FormHelperText error>
                      {errors!?.fName!?.message}
                    </FormHelperText>
                  </FormControl>

                  <FormControl fullWidth>
                    <InputLabel>Last Name</InputLabel>
                    <OutlinedInput
                      label="Last Name"
                      {...reg("lName")}
                      error={errors!?.lName!?.message!?.length > 0}
                    />
                    <FormHelperText error>
                      {errors!?.lName!?.message}
                    </FormHelperText>
                  </FormControl>
                </Stack>

                <FormControl>
                  <InputLabel>Email</InputLabel>
                  <OutlinedInput
                    label="Email"
                    {...reg("email")}
                    error={errors!?.email!?.message!?.length > 0}
                  />
                  <FormHelperText error>
                    {errors!?.email!?.message}
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
                    {errors!?.password!?.message}
                  </FormHelperText>
                </FormControl>

                <FormControl>
                  <InputLabel>Confirm Password</InputLabel>
                  <OutlinedInput
                    label="Confirm Password"
                    type="password"
                    {...reg("confirmPassword")}
                    error={errors!?.confirmPassword!?.message!?.length > 0}
                  />
                  <FormHelperText error>
                    {errors!?.confirmPassword!?.message}
                  </FormHelperText>
                </FormControl>

                <FormControl fullWidth>
                  <InputLabel>Role</InputLabel>
                  <Select
                    label="Role"
                    {...reg("role")}
                    defaultValue={""}
                    error={errors!?.role!?.message!?.length > 0}
                  >
                    <MenuItem value="faculty">Faculty</MenuItem>
                    <MenuItem value="student">Student</MenuItem>
                  </Select>

                  <FormHelperText error>
                    {errors!?.role!?.message}
                  </FormHelperText>
                </FormControl>
              </Stack>

              <Button
                variant="contained"
                fullWidth
                sx={{ marginTop: 5 }}
                type="submit"
              >
                Sign up
              </Button>
            </form>

            <Typography sx={{ marginY: 2 }}>
              Already have an account? <Link to="/signin">Login</Link>
            </Typography>
          </Wrapper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Signup;
