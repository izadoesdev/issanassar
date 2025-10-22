"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const SCROLL_OFFSET = 200;

const sections = [
	{ id: "about", label: "About" },
	{ id: "stack", label: "Stack" },
	{ id: "work", label: "Work" },
	{ id: "contact", label: "Contact" },
];

export function FloatingNav() {
	const [activeSection, setActiveSection] = useState("about");

	useEffect(() => {
		const handleScroll = () => {
			const scrollPosition = window.scrollY + SCROLL_OFFSET;

			for (const section of sections) {
				const element = document.getElementById(section.id);
				if (element) {
					const { offsetTop, offsetHeight } = element;
					if (
						scrollPosition >= offsetTop &&
						scrollPosition < offsetTop + offsetHeight
					) {
						setActiveSection(section.id);
						break;
					}
				}
			}
		};

		window.addEventListener("scroll", handleScroll);
		handleScroll();
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	const scrollToSection = (sectionId: string) => {
		const element = document.getElementById(sectionId);
		if (element) {
			element.scrollIntoView({ behavior: "smooth", block: "start" });
		}
	};

	return (
		<motion.nav
			animate={{ opacity: 1, x: 0 }}
			className="-translate-y-1/2 fixed top-1/2 right-8 z-50 hidden lg:block"
			initial={{ opacity: 0, x: 20 }}
		>
			<div className="flex flex-col gap-4">
				{sections.map((section, index) => (
					<motion.button
						animate={{ opacity: 1, x: 0 }}
						aria-label={`Navigate to ${section.label}`}
						className="group relative flex items-center"
						initial={{ opacity: 0, x: 20 }}
						key={section.id}
						onClick={() => scrollToSection(section.id)}
						transition={{ delay: index * 0.1 }}
						type="button"
					>
						<motion.span
							animate={{
								opacity: activeSection === section.id ? 1 : 0,
							}}
							className="absolute right-6 whitespace-nowrap rounded bg-foreground px-2 py-1 text-background text-xs"
							initial={{ opacity: 0 }}
							whileHover={{ opacity: 1 }}
						>
							{section.label}
						</motion.span>
						<motion.div
							animate={{
								scale: activeSection === section.id ? 1.5 : 1,
								backgroundColor:
									activeSection === section.id ? "currentColor" : "transparent",
							}}
							className="size-2 rounded-full border-2 border-foreground"
							whileHover={{ scale: 1.25 }}
						/>
					</motion.button>
				))}
			</div>
		</motion.nav>
	);
}
