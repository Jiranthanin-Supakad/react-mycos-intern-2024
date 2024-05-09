import { createTheme } from "@mui/material";
import { brown, grey } from "@mui/material/colors";

export const themeConfig = createTheme({
  palette: {
    primary: {
      main: "#35383C",
      contrastText: brown[700],
    },
    secondary: {
      main: grey[600],
    },
  },
  components: {
    MuiButton: {
      defaultProps: {
        variant: "contained",
      },
    },
  },
});
