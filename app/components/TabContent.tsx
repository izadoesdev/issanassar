"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FiExternalLink } from "react-icons/fi";
import { HiOutlineMail } from "react-icons/hi";
import {
	SiBun,
	SiClickhouse,
	SiNextdotjs,
	SiPostgresql,
	SiReact,
	SiTailwindcss,
	SiTypescript,
} from "react-icons/si";
import { AgeCounter } from "./AgeCounter";
import { FloatingNav } from "./FloatingNav";
import { TabNavigation } from "./TabNavigation";

type Tab = "portfolio" | "about" | "writing";

const projects = [
	{
		title: "Databuddy",
		description:
			"An observability and feature management platform built for developers. It tracks app performance, logs, feature rollouts, and user feedback in real time. Built around Redpanda, ClickHouse, and Bun.",
		tags: ["Bun", "ElysiaJS", "ClickHouse", "React", "TypeScript"],
		link: "https://github.com/databuddyhq",
		demo: "https://databuddy.dev",
	},
	{
		title: "ProtoQueue",
		description:
			"A type-safe job queue built on NATS JetStream and Protocol Buffers. It focuses on reliability, low latency, and developer experience.",
		tags: ["TypeScript", "NATS", "Protocol Buffers", "Bun"],
		link: "https://github.com/izadoesdev/protoqueue",
		demo: "https://protoqueue.dev",
	},
	{
		title: "Zephra",
		description:
			"A full-stack framework on top of Elysia and React. It simplifies routing, SSR, and progressive deployment while staying fast and minimal.",
		tags: ["Bun", "ElysiaJS", "React", "TypeScript"],
		link: "https://github.com/izadoesdev/zephra",
		demo: "https://zephra.dev",
	},
];

const techStack = [
	{ icon: SiBun, name: "Bun", link: "https://bun.sh" },
	{ icon: SiReact, name: "React", link: "https://react.dev" },
	{ icon: SiNextdotjs, name: "Next.js", link: "https://nextjs.org" },
	{
		icon: SiTypescript,
		name: "TypeScript",
		link: "https://www.typescriptlang.org",
	},
	{ icon: SiTailwindcss, name: "Tailwind", link: "https://tailwindcss.com" },
	{
		icon: SiPostgresql,
		name: "PostgreSQL",
		link: "https://www.postgresql.org",
	},
	{ icon: SiClickhouse, name: "ClickHouse", link: "https://clickhouse.com" },
];

const writings = [
	{
		title: "Building observability tools developers actually want to use",
		date: "2024-01-15",
		excerpt:
			"Why most observability platforms miss the mark and what we're doing differently with Databuddy.",
	},
	{
		title: "Type-safe job queues: why Protocol Buffers matter",
		date: "2023-12-20",
		excerpt:
			"How combining NATS JetStream with Protocol Buffers creates a better developer experience.",
	},
	{
		title: "The case against unnecessary complexity",
		date: "2023-11-10",
		excerpt:
			"Most software is over-engineered. Here's how to build systems that actually solve problems.",
	},
];

export function TabContent() {
	const [activeTab, setActiveTab] = useState<Tab>("portfolio");

	return (
		<>
			<TabNavigation activeTab={activeTab} onTabChange={setActiveTab} />
			{activeTab === "portfolio" && <FloatingNav />}

			{activeTab === "portfolio" && (
				<>
					<motion.section
						animate={{ opacity: 1 }}
						className="mb-20 scroll-mt-20"
						id="about"
						initial={{ opacity: 0 }}
					>
						<h2 className="mb-6 font-semibold text-2xl">About me</h2>
						<p className="mb-4 text-lg text-muted-foreground leading-relaxed">
							I build systems that solve real problems without unnecessary
							complexity. I care about speed, reliability, and developer
							experience more than hype.
						</p>
						<p className="text-lg text-muted-foreground leading-relaxed">
							Right now, I'm building Databuddy — a developer-focused platform
							that connects analytics, feature flags, and app observability in
							one place. Most of my work lives in Bun, TypeScript, and Elysia,
							with a focus on scalability and clean architecture.
						</p>
					</motion.section>

					{/* Tech Stack Section */}
					<motion.section
						animate={{ opacity: 1 }}
						className="mb-20 scroll-mt-20"
						id="stack"
						initial={{ opacity: 0 }}
						transition={{ delay: 0.1 }}
					>
						<h2 className="mb-6 font-semibold text-2xl">Tech Stack</h2>
						<div className="grid grid-cols-3 gap-4 md:grid-cols-4 lg:grid-cols-7">
							{techStack.map((tech) => (
								<div
									className="flex flex-col items-center gap-2 rounded border border-border p-4 transition-all duration-200 hover:scale-105 hover:border-foreground/20 hover:bg-accent/50 hover:shadow-md"
									key={tech.name}
								>
									<Link href={tech.link} target="_blank">
										<tech.icon className="text-2xl" />
									</Link>
									<span className="text-muted-foreground text-xs">
										{tech.name}
									</span>
								</div>
							))}
						</div>
					</motion.section>

					{/* Projects Section */}
					<motion.section
						animate={{ opacity: 1 }}
						className="mb-20 scroll-mt-20"
						id="work"
						initial={{ opacity: 0 }}
						transition={{ delay: 0.2 }}
					>
						<h2 className="mb-8 font-semibold text-2xl">Selected Work</h2>
						<div className="space-y-6">
							{projects.map((project) => (
								<div
									className="rounded border border-border p-6 transition-all duration-200 hover:scale-[1.02] hover:border-foreground/20 hover:bg-accent/50 hover:shadow-lg"
									key={project.title}
								>
									<div className="mb-2 flex items-start justify-between">
										<h3 className="font-semibold text-xl">{project.title}</h3>
										<div className="flex gap-2">
											<a
												aria-label="View source code"
												className="rounded p-1 opacity-60 transition-all hover:scale-110 hover:opacity-100"
												href={project.link}
												rel="noopener noreferrer"
												target="_blank"
											>
												<FaGithub size={18} />
											</a>
											<a
												aria-label="View live demo"
												className="rounded p-1 opacity-60 transition-all hover:scale-110 hover:opacity-100"
												href={project.demo}
												rel="noopener noreferrer"
												target="_blank"
											>
												<FiExternalLink size={18} />
											</a>
										</div>
									</div>
									<p className="mb-4 text-muted-foreground">
										{project.description}
									</p>
									<div className="flex flex-wrap gap-2">
										{project.tags.map((tag) => (
											<span
												className="rounded bg-secondary px-3 py-1 text-secondary-foreground text-sm"
												key={tag}
											>
												{tag}
											</span>
										))}
									</div>
								</div>
							))}
						</div>
					</motion.section>

					<motion.section
						animate={{ opacity: 1 }}
						className="scroll-mt-20"
						id="contact"
						initial={{ opacity: 0 }}
						transition={{ delay: 0.3 }}
					>
						<h2 className="mb-6 font-semibold text-2xl">Get in Touch</h2>
						<p className="mb-8 text-lg text-muted-foreground">
							Feel free to reach out for collaborations or just a friendly chat.
						</p>
						<div className="flex flex-wrap gap-4">
							<Link
								className="inline-flex items-center gap-2 rounded border border-border px-4 py-2.5 transition-all duration-200 hover:scale-105 hover:bg-accent hover:shadow-md"
								href="mailto:issa@databuddy.cc"
							>
								<HiOutlineMail size={20} />
								<span>Email</span>
							</Link>
							<Link
								className="inline-flex items-center gap-2 rounded border border-border px-4 py-2.5 transition-all duration-200 hover:scale-105 hover:bg-accent hover:shadow-md"
								href="https://github.com/izadoesdev"
								rel="noopener noreferrer"
								target="_blank"
							>
								<FaGithub size={20} />
								<span>GitHub</span>
							</Link>
							<Link
								className="inline-flex items-center gap-2 rounded border border-border px-4 py-2.5 transition-all duration-200 hover:scale-105 hover:bg-accent hover:shadow-md"
								href="https://linkedin.com/in/issanassar"
								target="_blank"
							>
								<FaLinkedin size={20} />
								<span>LinkedIn</span>
							</Link>
							<Link
								className="inline-flex items-center gap-2 rounded border border-border px-4 py-2.5 transition-all duration-200 hover:scale-105 hover:bg-accent hover:shadow-md"
								href="https://x.com/izadoesdev"
								target="_blank"
							>
								<FaXTwitter size={20} />
								<span>Twitter</span>
							</Link>
						</div>
					</motion.section>
				</>
			)}

			{activeTab === "about" && (
				<motion.div
					animate={{ opacity: 1 }}
					className="pt-12"
					exit={{ opacity: 0 }}
					initial={{ opacity: 0 }}
				>
					<h2 className="mb-8 font-semibold text-3xl">About Me</h2>

					<div className="space-y-8">
						<AgeCounter />

						{/* Origin */}
						<motion.div
							animate={{ opacity: 1, y: 0 }}
							className="rounded border border-border p-6"
							initial={{ opacity: 0, y: 20 }}
							transition={{ delay: 0.1 }}
						>
							<h3 className="mb-4 font-semibold text-xl">Origin</h3>
							<p className="mb-4 text-lg text-muted-foreground">
								I'm from{" "}
								<span className="font-bold">
									<span className="text-red-600">Pal</span>
									<span className="text-black dark:text-white">es</span>
									<span className="text-green-600">tine</span>
								</span>
								<Image
									alt="Palestine"
									className="ml-2 inline-block rounded-[2px]"
									height={20}
									src="https://cdn.countryflags.com/thumbs/palestine/flag-400.png"
									width={40}
								/>
							</p>
							<p className="text-muted-foreground leading-relaxed">
								Growing up with so many restrictions and limitations taught to
								me learn outside the box, specifically with slower machines and
								performance constraints, lack of resources, and a lot of things
								being banned here, made me learn to be resourceful and creative.
								<br /> <br /> I also learned to be patient and persistent, and
								to never give up, I'm a big fan of making my own luck, which I
								blogged about, I'm also an open-source lover, I love the
								community and the people behind open source, which is why
								Databuddy is also fully open source
							</p>
						</motion.div>

						{/* Background */}
						<motion.div
							animate={{ opacity: 1, y: 0 }}
							className="rounded border border-border p-6"
							initial={{ opacity: 0, y: 20 }}
							transition={{ delay: 0.2 }}
						>
							<h3 className="mb-4 font-semibold text-xl">Background</h3>
							<p className="mb-4 text-muted-foreground leading-relaxed">
								I started coding young because I wanted to understand how things
								actually work. That curiosity turned into a habit of breaking
								things down, rebuilding them cleaner, and optimizing every
								layer.
							</p>
							<p className="text-muted-foreground leading-relaxed">
								Now, I focus on infrastructure, observability, and developer
								tooling. I like building things that make engineers faster and
								systems more reliable. Most of my work centers around Bun,
								Elysia, Clickhouse, NextJS, and Redpanda — because I prefer
								performance grounded in simplicity.
							</p>
						</motion.div>

						{/* Interests */}
						<motion.div
							animate={{ opacity: 1, y: 0 }}
							className="rounded border border-border p-6"
							initial={{ opacity: 0, y: 20 }}
							transition={{ delay: 0.3 }}
						>
							<h3 className="mb-4 font-semibold text-xl">Beyond Code</h3>
							<p className="text-muted-foreground leading-relaxed">
								Outside of building, I'm usually exploring new runtime tech,
								experimenting with distributed systems, or refining internal
								tools. I like contributing to open source and sharing what I
								learn in public. Teaching and building in public are the best
								ways to stay sharp.
							</p>
						</motion.div>

						{/* Philosophy */}
						<motion.div
							animate={{ opacity: 1, y: 0 }}
							className="rounded border border-border p-6"
							initial={{ opacity: 0, y: 20 }}
							transition={{ delay: 0.4 }}
						>
							<h3 className="mb-4 font-semibold text-xl">Philosophy</h3>
							<div className="space-y-3">
								<p className="text-muted-foreground">
									<span className="text-foreground">→</span> Simplicity scales
									better than complexity
								</p>
								<p className="text-muted-foreground">
									<span className="text-foreground">→</span> Developer
									experience is part of performance
								</p>
								<p className="text-muted-foreground">
									<span className="text-foreground">→</span> Build for clarity,
									not attention
								</p>
								<p className="text-muted-foreground">
									<span className="text-foreground">→</span> Performance matters
									only when it serves real users
								</p>
							</div>
						</motion.div>
					</div>
				</motion.div>
			)}

			{activeTab === "writing" && (
				<motion.div
					animate={{ opacity: 1 }}
					className="pt-12"
					exit={{ opacity: 0 }}
					initial={{ opacity: 0 }}
				>
					<h2 className="mb-8 font-semibold text-3xl">Writing</h2>
					<div className="space-y-8">
						{writings.map((post, index) => (
							<motion.article
								animate={{ opacity: 1, y: 0 }}
								className="rounded border border-border p-6 transition-all duration-200 hover:border-foreground/20 hover:bg-accent/50"
								initial={{ opacity: 0, y: 20 }}
								key={post.title}
								transition={{ delay: index * 0.1 }}
							>
								<time className="text-muted-foreground text-sm">
									{new Date(post.date).toLocaleDateString("en-US", {
										year: "numeric",
										month: "long",
										day: "numeric",
									})}
								</time>
								<h3 className="mt-2 mb-2 font-semibold text-xl">
									{post.title}
								</h3>
								<p className="text-muted-foreground">{post.excerpt}</p>
							</motion.article>
						))}
					</div>
				</motion.div>
			)}
		</>
	);
}
