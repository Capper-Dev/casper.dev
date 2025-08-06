export interface BlogPost {
	slug: string;
	title: string;
	description: string;
	date: string;
	readTime: string;
	category: 'Security' | 'Research' | 'Tutorial';
	tags: string[];
	content: string;
}

export const blogPosts: BlogPost[] = [
	{
		slug: 'fivem-lua-deobfuscation',
		title: 'Bypassing FiveM\'s Lua Obfuscation: A Security Analysis',
		description: 'How I discovered and exploited a method to deobfuscate FiveM\'s protected Lua scripts using freely available tools, and the security implications.',
		date: '2025-08-06',
		readTime: '8 min read',
		category: 'Security',
		tags: ['FiveM', 'Reverse Engineering', 'Lua', 'Deobfuscation'],
		content: `
# Bypassing FiveM's Lua Obfuscation: A Security Analysis

## Introduction

During my exploration of FiveM server security, I discovered a significant vulnerability in how protected Lua scripts are handled. What started as curiosity about server-side script protection led to finding a straightforward method to deobfuscate supposedly "secure" resources.

## The Problem

FiveM uses bytecode compilation and escrow systems to protect valuable server resources. Server owners invest significant money in protected scripts, believing their intellectual property is secure. However, this protection can be bypassed using just two freely available GitHub repositories.

## The Discovery

While researching FiveM's architecture, I found that:

1. **Bytecode Extraction**: During runtime, the bytecode can be dumped using a modified FXServer build
2. **Decompilation**: The dumped bytecode can be decompiled back to readable Lua using existing tools

## Tools Used

- **Custom FXServer Build**: Modified to dump bytecode during execution
- **unluac54.jar**: A Java-based Lua decompiler available on GitHub
- **Simple batch script**: To automate the decompilation process

## The Process

### Step 1: Server Modification
The process begins with running a custom FXServer build designed to dump bytecode:

\`\`\`bash
.\\artifacts\\FXServer.exe +exec server.cfg
\`\`\`

### Step 2: Bytecode Extraction
When a protected resource loads, the modified server dumps the bytecode to a .luac file instead of just executing it.

### Step 3: Decompilation
Using the decompiler:

\`\`\`batch
@echo off
java -jar unluac54.jar input.luac > output.lua
\`\`\`

## Results

The decompiled code reveals:
- Complete server-side logic
- Database queries and structures  
- API endpoints and webhooks
- Security implementations
- All "protected" functionality

## Security Implications

This vulnerability has serious implications:

- **IP Theft**: Expensive protected resources can be easily stolen
- **Security Bypass**: Hidden security measures are exposed
- **Financial Impact**: Developers lose revenue from script protection
- **Server Vulnerabilities**: Exposed code reveals attack vectors

## Example Findings

In the decompiled code, I found concerning elements like:
- Hardcoded Discord webhooks
- Database manipulation queries
- Administrative backdoors
- Plain text API keys

## Responsible Disclosure

I have reported this vulnerability to CFX (FiveM developers) and am awaiting their response. This blog post serves as documentation of the finding while maintaining responsible disclosure practices.

## Recommendations

For server owners:
- Don't rely solely on Lua obfuscation for security
- Implement proper access controls
- Regular security audits of all resources
- Consider server-side validation over client-side protection

For developers:
- Implement server-side security measures
- Use proper encryption for sensitive data
- Regular updates to protection mechanisms
- Layered security approach

## Conclusion

This research highlights the importance of not relying on obscurity for security. While tools like escrow systems provide some protection, they're not foolproof. True security comes from proper implementation, not just hiding code.

The ease of this bypass demonstrates why security through obscurity is fundamentally flawed. Real protection requires robust security architecture, not just code obfuscation.
		`
	}
];

export function getBlogPosts(): BlogPost[] {
	return blogPosts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getBlogPost(slug: string): BlogPost | undefined {
	return blogPosts.find(post => post.slug === slug);
}