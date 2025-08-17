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

const blogPosts: BlogPost[] = [
	{
		slug: 'fivem-lua-deobfuscation',
		title: 'Bypassing FiveM\'s Lua Obfuscation: A Complete Technical Analysis',
		description: 'A deep dive into FiveM\'s encryption architecture, how I reverse-engineered the protection system, and built automated tools to decrypt maps, clothing, and vehicle resources.',
		date: '2025-08-06',
		readTime: '12 min read',
		category: 'Security',
		tags: ['FiveM', 'Reverse Engineering', 'Lua', 'Deobfuscation', 'ChaCha20', 'Cryptography'],
		content: `
# Bypassing FiveM's Lua Obfuscation: A Complete Technical Analysis

## Introduction

During my exploration of FiveM server security, I discovered a significant vulnerability in how protected Lua scripts are handled. What started as curiosity about server-side script protection led to completely reverse-engineering FiveM's encryption system and building automated tools that can decrypt any protected resource - including maps, clothing, and vehicles.

## The Encryption Architecture

FiveM uses a sophisticated multi-layer encryption system for their escrow protection:

### Layer 1: Master Key Encryption (ChaCha20)
All .fxap files begin with a hardcoded master key encryption using ChaCha20:

\`\`\`python
MASTER_KEY = [0xb3, 0xcb, 0x2e, 0x04, 0x87, 0x94, 0xd6, 0x73, 
              0x08, 0x23, 0xc4, 0x93, 0x7a, 0xbd, 0x18, 0xad, 
              0x6b, 0xe6, 0xdc, 0xb3, 0x91, 0x43, 0x0d, 0x28, 
              0xf9, 0x40, 0x9d, 0x48, 0x37, 0xb9, 0x38, 0xfb]
\`\`\`

### Layer 2: Resource-Specific Encryption
After the master key decryption, each resource has a unique key obtained through FiveM's keymaster API system.

### File Structure Analysis
Each encrypted file follows this structure:
- **Bytes 0-4**: FXAP signature
- **Bytes 0x4a-0x56**: First ChaCha20 IV (12 bytes)
- **Bytes 0x56+**: Encrypted content

## The Complete Exploitation Process

### Step 1: Resource ID Extraction
The resource ID is embedded within the first decryption layer:

\`\`\`python
iv = file[0x4a:0x4a + 0xc]
cipher = ChaCha20.new(key=bytes(MASTER_KEY), nonce=iv)
decrypted = cipher.decrypt(file[0x56:])
resource_id = int.from_bytes(decrypted[0x4a:0x4a + 4], byteorder="big")
\`\`\`

### Step 2: Grant Token Acquisition
Using server keys, the system queries FiveM's keymaster API to retrieve JWT tokens containing resource grants:

\`\`\`python
url = f"https://keymaster.fivem.net/api/validate/{server_key}"
grants_token = response.json().get("grants_token")
payload = self._decode_jwt(grants_token)
resource_keys = payload.get("grants", {})
\`\`\`

### Step 3: Double Decryption Process
The actual content requires two sequential ChaCha20 decryptions:

1. **First decryption**: Using the master key to reveal the structure
2. **Second decryption**: Using the resource-specific key with a different IV

\`\`\`python
# First round with master key
cipher = ChaCha20.new(key=bytes(MASTER_KEY), nonce=iv)
first_round = cipher.decrypt(encrypted)

# Extract the real IV for second round
real_iv = first_round[:0x5c][-16:][-12:]
content = first_round[0x5c:]

# Second round with resource key
cipher = ChaCha20.new(key=bytes.fromhex(resource_key), nonce=real_iv)
decrypted_content = cipher.decrypt(content)
\`\`\`

## Automated Decryption Tool

I built a complete Python toolkit that automates this entire process:

### Core Features
- **Automatic resource detection**: Supports maps (.ymap, .ytyp), clothing, vehicles, and scripts
- **Batch processing**: Decrypt entire folders of resources automatically
- **Grant caching**: Stores resource keys locally to avoid repeated API calls
- **Watermarking**: Adds identification to decrypted files

### Usage Example
\`\`\`bash
# Load server key and fetch all grants
python escrow.py -s -k cfxk_1Gqh4rzXDTC2Q7esH4qaX_4E0TpE

# Decrypt all resources in assets folder
python auto.py
\`\`\`

### Technical Implementation
The tool handles the complete workflow:

1. **Resource Discovery**: Scans for .fxap files in resource directories
2. **Key Management**: Maintains a local database of resource IDs and their corresponding decryption keys
3. **Batch Decryption**: Processes multiple resource types simultaneously
4. **Output Management**: Organizes decrypted files maintaining original folder structure

## Security Implications

### Impact Assessment
This vulnerability affects all FiveM escrow-protected content:

- **Maps and MLOs**: Complete interior/exterior designs can be stolen
- **Vehicle Modifications**: Custom car models and handling files exposed
- **Clothing Assets**: Expensive fashion collections become freely available
- **Script Logic**: Server-side anti-cheat and core functionality revealed

### Financial Impact
Server owners often pay $50-500+ for protected resources, believing they're secure. This tool makes that protection worthless.

### Real-World Findings
In decrypted resources, I discovered:

- **Hardcoded Discord webhooks** with server tokens
- **Database connection strings** in plain text
- **Admin backdoors** hidden in "protected" scripts
- **API keys** for external services
- **Player data harvesting** mechanisms

## The Grant System Vulnerability

The core vulnerability lies in FiveM's grant validation system. Server keys provide access to decrypt ANY resource the server has permission for, not just the ones currently in use.

### Grant Token Structure
JWT tokens contain all accessible resource IDs:

\`\`\`json
{
  "grants": {
    "113303": "3a53c618abb3c6537b6dfd9ffd26ae63951e789ff8a05a15b435a2efe10caedb",
    "113299": "1cc4b563fdf86dc0410b59ec46d465b9f140887be9f80a4a9b0f13b03da6e8cb",
    "57670": "b2b7d212189dcdfd3dbf9d7656c2423934688a5d126e05d97694753bc8263479"
  }
}
\`\`\`

## Detection and Prevention

### For Server Owners
- **Key Rotation**: Regularly rotate server keys (though this won't stop existing key exploitation)
- **Network Monitoring**: Watch for unusual keymaster API requests
- **Resource Auditing**: Regularly audit what resources your key has access to
- **Access Control**: Limit who has access to server configuration files

### For Developers
- **Server-Side Validation**: Never rely solely on client-side or "protected" script validation
- **Layered Security**: Implement multiple security layers beyond code obfuscation
- **Key Management**: Consider more sophisticated key derivation systems
- **Real-Time Protection**: Implement server-side integrity checking

## Responsible Disclosure Timeline

- **Discovery**: August 2025
- **Tool Development**: Completed proof-of-concept automation
- **Vendor Notification**: Reported to CFX development team
- **Public Disclosure**: This research (awaiting vendor response)

## Conclusion

This research demonstrates a fundamental flaw in security-through-obscurity approaches. FiveM's escrow system, while sophisticated in its encryption implementation, fails due to:

1. **Centralized key management** making bulk key extraction possible
2. **Client-side decryption** allowing reverse engineering
3. **Over-privileged access** where server keys grant excessive permissions

Real security requires architectural changes, not just stronger obfuscation. The ease with which this protection can be bypassed should serve as a warning to both developers and server owners about the limitations of current FiveM resource protection.

### Technical Recommendations

For FiveM developers:
- Implement server-side resource validation
- Use hardware security modules for key storage
- Implement per-resource key derivation
- Add runtime integrity checking

For the community:
- Don't rely on escrow protection for critical security
- Implement proper server-side validation
- Regular security audits of all resources
- Understanding that "protected" doesn't mean "secure"

The tools and techniques described here highlight the importance of proper security architecture over security theater.
		`
	}
];

export function getBlogPosts(): BlogPost[] {
	return blogPosts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getBlogPost(slug: string): BlogPost | undefined {
	return blogPosts.find(post => post.slug === slug);
}