"use client";

import { motion } from "framer-motion";
import { Github, Mail, MessageCircle } from "lucide-react";
import Image from "next/image";
import { TerminalContact } from "@/components/designs/terminal/TerminalContact";
import { PageTransition } from "@/components/layout/PageTransition";
import { useDesign } from "@/lib/design-context";

const emailUser = "casper.truberg";
const emailDomain = "outlook.dk";

const contacts = [
	{
		label: "Email",
		value: `${emailUser}@${emailDomain}`,
		href: `mailto:${emailUser}@${emailDomain}`,
		icon: Mail,
		isCustomIcon: false,
	},
	{
		label: "GitHub",
		value: "github.com/Capper-Dev",
		href: "https://github.com/Capper-Dev",
		icon: Github,
		isCustomIcon: false,
	},
	{
		label: "Discord",
		value: "casper.dev",
		href: "https://discord.com/users/casper.dev",
		icon: "/discord.svg",
		isCustomIcon: true,
	},
];

const containerVariants = {
	hidden: { opacity: 0 },
	visible: {
		opacity: 1,
		transition: {
			staggerChildren: 0.15,
		},
	},
};

const itemVariants = {
	hidden: { opacity: 0, y: 30 },
	visible: { opacity: 1, y: 0 },
};

function GlassContact() {
	return (
		<PageTransition>
			<div className="mx-auto flex h-screen max-w-2xl flex-col justify-center overflow-hidden px-6">
				<motion.div
					className="space-y-8"
					variants={containerVariants}
					initial="hidden"
					animate="visible"
				>
					<motion.div
						className="space-y-2 text-center"
						variants={itemVariants}
						transition={{ duration: 0.6, ease: "easeOut" }}
					>
						<h1 className="bg-gradient-to-r from-white to-neutral-300 bg-clip-text font-bold text-3xl text-transparent">
							Get In Touch
						</h1>
						<p className="text-neutral-400">
							I&apos;m always interested in new opportunities and conversations
						</p>
					</motion.div>

					<motion.div className="space-y-3" variants={containerVariants}>
						{contacts.map((contact, index) => (
							<motion.a
								key={contact.label}
								href={contact.href}
								target="_blank"
								rel="noopener noreferrer"
								variants={itemVariants}
								transition={{
									duration: 0.6,
									ease: "easeOut",
									delay: index * 0.1,
								}}
								className="group relative flex items-center gap-4 overflow-hidden rounded-xl border border-neutral-800 bg-neutral-900/30 p-4 transition-all duration-300 hover:border-neutral-700 hover:bg-neutral-900/50"
							>
								<div className="absolute inset-0 bg-gradient-to-r from-white/5 to-neutral-300/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

								<div className="relative z-10">
									{contact.isCustomIcon ? (
										<Image
											src={contact.icon as string}
											alt={`${contact.label} icon`}
											width={20}
											height={20}
											loading="eager"
											className="h-5 w-5 text-neutral-400 opacity-60 brightness-0 invert filter"
										/>
									) : (
										<contact.icon className="h-5 w-5 text-neutral-400" />
									)}
								</div>

								<div className="relative z-10">
									<div className="font-medium">{contact.label}</div>
									<div className="text-neutral-400 text-sm">
										{contact.value}
									</div>
								</div>
							</motion.a>
						))}
					</motion.div>

					<motion.div
						className="relative overflow-hidden rounded-xl border border-neutral-700/50 bg-gradient-to-r from-white/5 to-neutral-300/5 p-4"
						variants={itemVariants}
						transition={{ duration: 0.6, ease: "easeOut", delay: 0.4 }}
					>
						<div className="flex items-start gap-3">
							<MessageCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-neutral-300" />
							<div>
								<h3 className="mb-2 font-semibold">Currently</h3>
								<p className="text-neutral-400 text-sm leading-relaxed">
									Open to interesting projects, collaborations, and
									opportunities to learn. Whether you want to chat about code,
									discuss a project idea, or just say hi— I&apos;d love to hear
									from you!
								</p>
							</div>
						</div>
					</motion.div>
				</motion.div>
			</div>
		</PageTransition>
	);
}

export default function ContactPage() {
	const { design } = useDesign();
	if (design === "terminal") return <TerminalContact />;
	return <GlassContact />;
}
