import React from "react";
import { ThemeProvider, createTheme } from "@mui/material";
import App from "../App";
export default function mainTheme() {
	const theme = createTheme();

	return (
		<ThemeProvider theme={theme}>
			<App />
		</ThemeProvider>
	);
}
