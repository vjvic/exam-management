import { createTheme, ThemeOptions } from "@mui/material/styles";

declare module "@mui/material/styles" {
  interface Theme {
    paletteOptions: {
      type: string;
      primary: {
        main?: string;
      };
      secondary: {
        main: string;
      };
      background: {
        default: string;
      };
    };
    Components: {
      MuiAppBar: {
        elevation: number;
        color: string;
      };
      MuiButton: {
        disableRipple: boolean;
        disableElevation: boolean;
      };
      MuiCard: {
        raised: boolean;
        elevation: number;
      };
      MuiPaper: {
        elevation: number;
      };
    };
    overrides: {
      MuiAppBar: {
        colorInherit: {
          backgroundColor: string;
          color: string;
        };
      };
    };
    shape: {
      borderRadius: number;
    };
  }
  // allow configuration using `createTheme`
  interface ThemeOptions {
    paletteOptions?: {
      type?: string;
      primary?: {
        main?: string;
      };
      secondary?: {
        main?: string;
      };
      background?: {
        default?: string;
      };
    };
    Components?: {
      MuiAppBar?: {
        elevation?: number;
        color?: string;
      };
      MuiButton?: {
        disableRipple?: boolean;
        disableElevation?: boolean;
      };
      MuiCard?: {
        raised?: boolean;
        elevation: number;
      };
      MuiPaper?: {
        elevation?: number;
      };
    };
    overrides?: {
      MuiAppBar?: {
        colorInherit?: {
          backgroundColor?: string;
          color?: string;
        };
      };
    };
    shape?: {
      borderRadius?: number;
    };
  }
}

export const themeOptions: ThemeOptions = createTheme({
  palette: {
    primary: {
      main: "#33a689",
    },
    secondary: {
      main: "#a63350",
    },
    background: {
      default: "#f1f5f8",
    },
  },
  components: {
    MuiAppBar: {
      defaultProps: {
        elevation: 1,
        color: "transparent",
      },
    },
    MuiButton: {
      defaultProps: {
        disableRipple: true,
        disableElevation: true,
      },
    },
    MuiCard: {
      defaultProps: {
        raised: false,
        elevation: 0,
      },
    },
    MuiPaper: {
      defaultProps: {
        elevation: 0,
      },
    },
  },
  overrides: {
    MuiAppBar: {
      colorInherit: {
        color: "#333",
      },
    },
  },
  shape: {
    borderRadius: 5,
  },
});
