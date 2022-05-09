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
      main: "#2196f3",
    },
    secondary: {
      main: "#F75A54",
    },
    /*   background: {
      default: "#f1f5f8",
    }, */
  },
  components: {
    MuiAppBar: {
      defaultProps: {
        elevation: 1,
        color: "primary",
      },
    },
    MuiButton: {
      defaultProps: {
        /* disableRipple: true, */
        /* disableElevation: true, */
      },
    },
    MuiCard: {
      defaultProps: {
        raised: false,
        elevation: 1,
      },
    },
    MuiPaper: {
      defaultProps: {
        elevation: 1,
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
