export interface BlogPost {
	slug: string;
	title: string;
	description: string;
	date: string;
	readTime: string;
	category: "Security" | "Research" | "Tutorial";
	tags: string[];
	content: string;
}

const blogPosts: BlogPost[] = [
	{
		slug: "fivem-lua-deobfuscation",
		title: "Bypassing FiveM's Protection Systems: 3D Assets vs Lua Scripts",
		description:
			"A comprehensive analysis of FiveM's dual protection systems - discovering publicly available tools that bypass ChaCha20 encryption for 3D assets and developing my own automated bytecode dumping system for Lua scripts.",
		date: "2025-08-06",
		readTime: "15 min read",
		category: "Security",
		tags: [
			"FiveM",
			"Reverse Engineering",
			"Lua",
			"ChaCha20",
			"Cryptography",
			"Bytecode",
		],
		content: `# Bypassing FiveM's Protection Systems: 3D Assets vs Lua Scripts

## Introduction

During my exploration of FiveM server security, I discovered that CFX.re employs two completely different protection systems depending on the resource type. This research reveals how both systems can be bypassed - and more importantly, how easily accessible these exploits already are in the community.

## Part 1: 3D Asset Encryption (Maps, Vehicles, Clothing) - Publicly Available Exploits

While researching FiveM's security, I discovered that tools to bypass their sophisticated ChaCha20 encryption for 3D assets are already freely available on public forums.

### The Encryption Architecture

FiveM uses a sophisticated multi-layer encryption system for their escrow-protected 3D assets stored in .fxap files.

**Layer 1: Master Key Encryption (ChaCha20)**
All .fxap files begin with a hardcoded master key encryption:

\`\`\`python
MASTER_KEY = [0xb3, 0xcb, 0x2e, 0x04, 0x87, 0x94, 0xd6, 0x73, 
              0x08, 0x23, 0xc4, 0x93, 0x7a, 0xbd, 0x18, 0xad, 
              0x6b, 0xe6, 0xdc, 0xb3, 0x91, 0x43, 0x0d, 0x28, 
              0xf9, 0x40, 0x9d, 0x48, 0x37, 0xb9, 0x38, 0xfb]
\`\`\`

**Layer 2: Resource-Specific Encryption**
After the master key decryption, each resource has a unique key obtained through FiveM's keymaster API system.

### File Structure Analysis
Each encrypted .fxap file follows this structure:
- **Bytes 0-4**: FXAP signature
- **Bytes 0x4a-0x56**: First ChaCha20 IV (12 bytes)
- **Bytes 0x56+**: Encrypted content

### The Public Exploit Process

**Step 1: Resource ID Extraction**
The publicly available tool extracts resource IDs from the first decryption layer:

\`\`\`python
iv = file[0x4a:0x4a + 0xc]
cipher = ChaCha20.new(key=bytes(MASTER_KEY), nonce=iv)
decrypted = cipher.decrypt(file[0x56:])
resource_id = int.from_bytes(decrypted[0x4a:0x4a + 4], byteorder="big")
\`\`\`

**Step 2: Grant Token Acquisition**
Using server keys, the system queries FiveM's keymaster API:

\`\`\`python
url = f"https://keymaster.fivem.net/api/validate/{server_key}"
grants_token = response.json().get("grants_token")
payload = self._decode_jwt(grants_token)
resource_keys = payload.get("grants", {})
\`\`\`

**Step 3: Double Decryption Process**
The tool performs two sequential ChaCha20 decryptions to extract the assets.

### What This Means for Security

The fact that I found a complete, working Python toolkit on a public forum demonstrates:

- **Widespread Knowledge**: This vulnerability is already well-known in certain communities
- **Easy Access**: No advanced skills required - just download and run
- **Complete Automation**: Batch processing of entire resource folders
- **Active Usage**: Tools are maintained and updated by the community

**Affected Assets:**
- Maps and MLOs (interior designs)
- Custom vehicles and modifications  
- Clothing and fashion assets
- Any 3D content protected via .fxap files

## Part 2: Lua Script Protection - My Custom Decompilation System

Unlike the 3D assets where tools already existed, I developed my own automated system for bypassing Lua script protection.

### Lua Protection Architecture

FiveM protects Lua scripts through:
1. **Bytecode Compilation**: Scripts are compiled to Lua 5.4 bytecode
2. **Runtime Loading**: Bytecode is executed directly by the FiveM runtime
3. **Obfuscation**: Variable names and logic flow are obscured

### My Automated Decompilation Solution

I created a complete batch automation system using:
- **Modified FXServer**: Custom build with bytecode dumping capability
- **Automated Configuration**: Dynamic server.cfg generation
- **Resource Management**: Automatic file copying and setup
- **Decompilation Pipeline**: Java-based unluac54 integration

### The Decompilation Process

**Step 1: Environment Setup**
My batch script automatically configures the environment:

\`\`\`batch
echo [INFO] Setting up directories...
mkdir server\\resources\\dumpresource
mkdir C:\\turboh
mkdir output
\`\`\`

**Step 2: Server Configuration**
Dynamic generation of server.cfg with minimal resources:

\`\`\`batch
echo endpoint_add_tcp "127.0.0.1:30120"
echo sv_maxclients 1
echo sv_licenseKey "%LICENSE_KEY%"
echo start mapmanager
echo start spawnmanager  
echo start fivem
echo ensure dumpresource
echo quit 50
\`\`\`

**Step 3: Bytecode Extraction**
The modified FXServer dumps bytecode during resource loading:

\`\`\`batch
start /wait artifacts\\FXServer.exe +exec server.cfg
\`\`\`

**Step 4: Automated Decompilation**
Using unluac54 to convert bytecode back to readable Lua:

\`\`\`batch
java -jar unluac54.jar C:\\turboh\\turboh.luac > output\\decompiled.lua
\`\`\`

### Key Features of My System

**User-Friendly Interface:**
- Simple path input (drag and drop support)
- CFX license key validation
- Automatic cleanup and error handling

**Bypass Mechanisms:**
- Uses server configuration to bypass txAdmin restrictions
- Minimal resource loading for stability
- Automatic server shutdown after dumping

**Error Handling:**
- Validates Java installation
- Checks for required files
- Provides detailed error messages

## Security Implications

### The Disturbing Reality

**3D Asset Protection**: Completely bypassed by publicly available tools that anyone can download and use immediately.

**Lua Script Protection**: Can be defeated with minimal technical knowledge using freely available components.

### Financial Impact
Server owners invest $50-500+ per protected resource, believing their content is secure. Both protection systems can be bypassed with tools that require no advanced technical skills.

### Real-World Findings

In decompiled resources, I discovered:
- **Database credentials** in plain text
- **Discord webhook URLs** with server tokens
- **Admin backdoors** hidden in "protected" scripts
- **API keys** for external services
- **Player data collection** mechanisms

## The Fundamental Problem

### Why Both Systems Fail

**3D Asset Protection:**
- Centralized key management allows bulk key extraction
- Over-privileged server keys grant excessive resource access
- Client-side decryption enables reverse engineering

**Lua Script Protection:**
- Client-side execution allows runtime interception
- Bytecode remains accessible during resource loading
- Standard decompilation tools work on the output

## Detection and Prevention

### For Server Owners
- **Accept the Reality**: Current escrow protection is not secure
- **Server-Side Validation**: Implement critical logic server-side only
- **Key Management**: Rotate server keys regularly (limited effectiveness)
- **Access Control**: Restrict server configuration access

### For Developers
- **Architectural Security**: Design security into the system from the ground up
- **Server-Side Logic**: Move sensitive operations away from client-side
- **Real-Time Monitoring**: Implement runtime integrity checking
- **Layered Defense**: Don't rely on single protection mechanisms

## Responsible Disclosure Timeline

- **Discovery**: August 2025 (3D tools found publicly, Lua system developed)
- **Tool Development**: Completed automated Lua decompilation system
- **Vendor Notification**: Reported findings to CFX development team
- **Public Disclosure**: This research (awaiting vendor response)

## Conclusion

This research reveals a troubling security landscape:

**3D Assets**: Protection already completely compromised with tools freely available on public forums.

**Lua Scripts**: Protection easily bypassed with basic automation and freely available decompilation tools.

The ease of access to these exploits demonstrates that FiveM's protection systems provide only the illusion of security. The 3D asset tools didn't even require development - they're already being actively used in the community.

### Key Takeaways

1. **Security through obscurity fails**: Both protection systems rely on hiding implementation details
2. **Community knowledge**: Exploits are often already public when you discover them
3. **False sense of security**: Server owners are paying for protection that doesn't exist
4. **Need for architectural change**: Real security requires fundamental design changes

### Recommendations

**For the FiveM Community:**
- Stop relying on escrow protection for security-critical functions
- Implement proper server-side validation
- Regular security audits of all resources
- Understand that "protected" and "secure" are not the same thing

**For CFX.re:**
- Acknowledge the fundamental flaws in current protection systems
- Consider server-side execution models for sensitive operations
- Implement hardware security modules for key management
- Focus on architectural security over obfuscation

The tools and techniques described here highlight why proper security architecture must replace security theater. Protection systems that can be bypassed by publicly available tools downloaded from forums offer no real security value.`,
	},
];

export function getBlogPosts(): BlogPost[] {
	return blogPosts.sort(
		(a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
	);
}

export function getBlogPost(slug: string): BlogPost | undefined {
	return blogPosts.find((post) => post.slug === slug);
}
