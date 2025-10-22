import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";

const manrope = Manrope({
	variable: "--font-manrope",
	subsets: ["latin"],
});

export const metadata: Metadata = {
	title: "Issa Nassar | Software Engineer & Founder",
	description:
		"Building Databuddy and tools for developers. Open source enthusiast focused on observability, infrastructure, and developer experience.",
	keywords: [
		"Software Engineer",
		"Bun",
		"Elysia",
		"TypeScript",
		"Databuddy",
		"Open Source",
		"Developer Tools",
		"Observability",
	],
	authors: [{ name: "Issa Nassar" }],
	creator: "Issa Nassar",
	publisher: "Issa Nassar",
	openGraph: {
		type: "website",
		locale: "en_US",
		url: "https://issanassar.dev",
		siteName: "Issa Nassar",
		title: "Issa Nassar | Software Engineer & Founder",
		description:
			"Building Databuddy and tools for developers. Open source enthusiast focused on observability, infrastructure, and developer experience.",
		images: [
			{
				url: "/og-image",
				width: 1200,
				height: 630,
				alt: "Issa Nassar - Software Engineer & Founder",
			},
		],
	},
	twitter: {
		card: "summary_large_image",
		title: "Issa Nassar | Software Engineer & Founder",
		description:
			"Building Databuddy and tools for developers. Open source enthusiast focused on observability, infrastructure, and developer experience.",
		images: ["/og-image"],
		creator: "@izadoesdev",
	},
	robots: {
		index: true,
		follow: true,
		googleBot: {
			index: true,
			follow: true,
		},
	},
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" suppressHydrationWarning>
			<body className={`${manrope.variable} font-sans antialiased`}>
				<Providers>{children}</Providers>
			</body>
		</html>
	);
}
