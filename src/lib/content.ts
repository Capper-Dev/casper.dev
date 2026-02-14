export const siteContent = {
	name: "Casper",
	fullName: "Casper Truberg",
	location: "Denmark",
	timezone: "Europe/Copenhagen",
	siteUrl: "https://www.casper.dev",
	titles: ["Hobby Programmer", "Problem Solver", "Self Taught"],
	bio: "Hi, I'm a self-taught hobby programmer who loves building modern web applications with React, TypeScript, and Next.js. Welcome to my little corner of the internet.",

	about: {
		heading: "About Me",
		subtitle: "A bit about my journey and what drives me",
		cards: [
			{
				title: "Code",
				text: "My journey started with curiosity about how websites worked. What began as tinkering quickly became a genuine passion for building digital experiences.",
			},
			{
				title: "Learning",
				text: "I'm completely self-taught, learning through online resources and lots of trial and error. This path taught me to be resourceful and persistent.",
			},
			{
				title: "Passion",
				text: "Currently focused on modern web development with React, TypeScript, and Next.js. I love the entire process\u2014from planning to deployment. There's something magical about turning ideas into working applications.",
			},
		],
	},

	technologies: [
		{
			name: "React",
			icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg",
		},
		{
			name: "TypeScript",
			icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg",
		},
		{
			name: "Next.js",
			icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nextjs/nextjs-original.svg",
		},
		{
			name: "Tailwind CSS",
			icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg",
		},
		{
			name: "Supabase",
			icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/supabase/supabase-original.svg",
		},
		{
			name: "Vercel",
			icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vercel/vercel-original.svg",
		},
	],

	skills: [
		{
			name: "React",
			icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg",
		},
		{
			name: "TypeScript",
			icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg",
		},
		{
			name: "Next.js",
			icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nextjs/nextjs-original.svg",
		},
		{
			name: "Tailwind CSS",
			icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg",
		},
		{
			name: "tRPC",
			icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/trpc/trpc-original.svg",
		},
		{ name: "Drizzle", icon: "custom" },
		{
			name: "Supabase",
			icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/supabase/supabase-original.svg",
		},
		{
			name: "Node.js",
			icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg",
		},
		{
			name: "Git",
			icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg",
		},
		{
			name: "Vercel",
			icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vercel/vercel-original.svg",
		},
		{
			name: "CSS",
			icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-original.svg",
		},
		{
			name: "HTML",
			icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg",
		},
	],

	experience: {
		heading: "Experience",
		subtitle: "My self-taught journey through modern web development",
		areas: [
			{
				title: "Frontend & Design",
				text: "Building modern interfaces with React, TypeScript, and Next.js. Using Tailwind CSS for rapid styling and Lucide/Phosphor icons for clean iconography. Explored Mantine for component libraries.",
			},
			{
				title: "Full Stack Development",
				text: "Backend development with Node.js, type-safe APIs using tRPC, and database management with Drizzle ORM. Leveraging Supabase for backend services and real-time features.",
			},
			{
				title: "Development Workflow",
				text: "Using Git for version control, deploying on Vercel for seamless CI/CD, and building with solid foundations in HTML and CSS. Always exploring new tools and technologies to improve the development experience and code quality.",
			},
		],
	},

	projects: [
		{
			title: "Portfolio Website",
			description:
				"This very website! Built with Next.js 15 and modern animations.",
			tech: ["Next.js", "TypeScript", "Tailwind", "Framer Motion"],
			github: "https://github.com/Capper-Dev/casper.dev",
			image: "/images/portfolio.webp",
			isPrivate: false,
		},
		{
			title: "Odessa Website",
			description:
				"A website for a FiveM server, built with Next.js and tRPC. Private repo, due to made for customer.",
			tech: ["Next.js", "TypeScript", "tRPC", "Supabase", "Tailwind"],
			github: "https://github.com/Capper-Dev",
			image: "/images/odwebsite.webp",
			demo: "https://odessarp.com",
			isPrivate: true,
		},
		{
			title: "Vecto3D Portfolio",
			description:
				"A portfolio website for a 3D designer that specializes in FiveM related models and clothing.",
			tech: ["Next.js", "TypeScript", "tRPC", "Supabase", "Tailwind"],
			github: "https://github.com/Capper-Dev",
			image: "/images/vecto3d.webp",
			demo: "https://vecto3d.dk",
			isPrivate: true,
		},
	],

	contacts: [
		{
			label: "Email",
			value: "casper.truberg@outlook.dk",
			href: "mailto:casper.truberg@outlook.dk",
			type: "email" as const,
		},
		{
			label: "GitHub",
			value: "github.com/Capper-Dev",
			href: "https://github.com/Capper-Dev",
			type: "github" as const,
		},
		{
			label: "Discord",
			value: "casper.dev",
			href: "https://discord.com/users/casper.dev",
			type: "discord" as const,
		},
	],

	contactNote: {
		title: "Currently",
		text: "Open to interesting projects, collaborations, and opportunities to learn. Whether you want to chat about code, discuss a project idea, or just say hi\u2014I'd love to hear from you!",
	},
};
