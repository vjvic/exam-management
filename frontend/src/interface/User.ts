export interface User {
  _id?: string;
  fName?: string;
  lName?: string;
  email: string;
  password?: string;
  confirmPassword?: string;
  profilePic?: string;
  role?: string;
  token?: string;
}
