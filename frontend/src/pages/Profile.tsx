import {
  Container,
  Paper,
  Stack,
  TextField,
  Typography,
  Button,
} from "@mui/material";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { getProfile, updateProfile } from "../features/auth/authSlice";
import { useEffect, useState } from "react";
import { RootState } from "../app/store";

const Profile = () => {
  const [fName, setFName] = useState<string | undefined>("");
  const [lName, setLName] = useState<string | undefined>("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  //Redux hooks
  const dispatch = useAppDispatch();
  const { profile } = useAppSelector((state: RootState) => state.auth);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (password && password !== confirmPassword) {
      setError("password do not match");
      console.log("no");
    } else {
      console.log({ fName, lName, email, password });

      const updatedProfile = {
        fName,
        lName,
        email,
        password,
      };

      dispatch(updateProfile(updatedProfile));
    }
  };

  useEffect(() => {
    dispatch(getProfile());
  }, [dispatch]);

  useEffect(() => {
    if (profile) {
      setFName(profile.fName);
      setLName(profile.lName);
      setEmail(profile.email);
    }
  }, [profile]);

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" sx={{ mb: 3 }}>
        Profile
      </Typography>
      <Paper sx={{ p: 4 }}>
        <form onSubmit={handleSubmit}>
          <Stack spacing={2}>
            <Stack spacing={2} direction="row">
              <TextField
                variant="outlined"
                label="First Name"
                fullWidth
                value={fName}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setFName(e.target.value)
                }
              />
              <TextField
                variant="outlined"
                label="Last Name"
                fullWidth
                value={lName}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setLName(e.target.value)
                }
              />
            </Stack>
            <TextField
              variant="outlined"
              label="Email"
              type="email"
              fullWidth
              value={email}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setEmail(e.target.value)
              }
            />
            <TextField
              variant="outlined"
              label="New Password"
              type="password"
              fullWidth
              value={password}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setPassword(e.target.value)
              }
            />
            <TextField
              variant="outlined"
              label="Confirm New Password"
              type="password"
              fullWidth
              value={confirmPassword}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setConfirmPassword(e.target.value)
              }
              helperText={error && error}
              error={error ? true : false}
            />
            <Button variant="contained" type="submit" fullWidth>
              Submit
            </Button>
          </Stack>
        </form>
      </Paper>
    </Container>
  );
};

export default Profile;
