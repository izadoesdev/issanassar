"use client";

import { Databuddy } from "@databuddy/sdk/react";
import { ThemeProvider } from "next-themes";
import type { ReactNode } from "react";

export function Providers({ children }: { children: ReactNode }) {
	return (
		<ThemeProvider attribute="class" defaultTheme="system" enableSystem>
			<Databuddy clientId="Rq4dPbvZAERml1kx_3PJt" trackErrors trackWebVitals />
			{children}
		</ThemeProvider>
	);
}
