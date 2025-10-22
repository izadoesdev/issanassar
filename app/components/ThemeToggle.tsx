"use client";

import { MoonIcon, SunIcon } from "@phosphor-icons/react";
import { motion } from "framer-motion";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export function ThemeToggle() {
	const [mounted, setMounted] = useState(false);
	const { theme, setTheme } = useTheme();

	useEffect(() => {
		setMounted(true);
	}, []);

	const toggleTheme = () => {
		setTheme(theme === "dark" ? "light" : "dark");
	};

	return (
		<motion.button
			animate={{ opacity: 1, scale: 1 }}
			aria-label="Toggle theme"
			className="rounded border border-border p-2.5 hover:bg-accent hover:shadow-lg"
			initial={{ opacity: 0, scale: 0.8 }}
			onClick={toggleTheme}
			type="button"
			whileHover={{ scale: 1.1 }}
			whileTap={{ scale: 0.95 }}
		>
			{mounted ? (
				theme === "dark" ? (
					<SunIcon size={20} weight="regular" />
				) : (
					<MoonIcon size={20} weight="regular" />
				)
			) : (
				<div className="size-5" />
			)}
		</motion.button>
	);
}
