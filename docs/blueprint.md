# **App Name**: Aether Australia

## Core Features:

- Dynamic Homepage Layout: Render a 'Visual-First' homepage with a horizontal split-screen hero, property grid, and editorial blocks as specified in the 'Master Homepage Replication Prompt'.
- AI-Powered Property Search: Implement a search bar with natural language query capabilities for location, property type, and other criteria to help users find suitable properties using an AI tool.
- Interactive Property Listings: Display property listings in a responsive 3-column grid, including a 4:3 image ratio, frosted glass overlays for price/title, and minimalist metadata icons (Bed, Bath, Car, Square Metres).
- Property Image Enhancements: Apply image hover effects for property cards (1.05x zoom, agent name reveal) and implement lazy loading with 'blur-2xl' glassmorphic placeholders for all images.
- Editorial Content Sections: Integrate dedicated sections for 'The Integrity Suite' (circular icon cards), 'Market Insights' (Z-pattern block with serif headline), and a 'Testimonial Slider' for engagement.
- Agent Finder Module: Provide a full-width search input and CTA button to enable users to find local real estate experts by suburb, agent name, or agency.

## Style Guidelines:

- Primary Color: Deep Pacific Teal (#005F73) to convey professionalism and sophistication, aligning with the brand's corporate aesthetic.
- Background Color: A subtle, cool off-white (#F7FBFB), visually extending the serene and minimalist environment described.
- Accent Color: A vibrant Aqua Green (#26D99C), used to draw attention to interactive elements and create a modern contrast with the primary teal.
- Supplementary Colors: Utilize minimalist off-white (#FAFAFA) for background panels and a dark Navy (#111111) for prominent call-to-action buttons, as specified.
- Headlines will use 'Public Sans' (sans-serif, Extra Bold). Sub-headlines and general body text will utilize 'Inter' (sans-serif, Light). Market insights headlines will employ 'Playfair Display' (serif) for an editorial feel. Note: currently only Google Fonts are supported.
- Use minimalist white icons for property metadata (Bed, Bath, Car, Square Metres) and circular icons for 'The Integrity Suite' section to maintain a clean, high-end look.
- Employ a horizontal split-screen (55% Left / 45% Right) for the Hero section. Property listings will feature a 3-column responsive grid with generous 'gap-12' whitespace. Editorial content uses a Z-pattern block, emphasizing a 'Visual-First' hierarchy.
- Implement subtle parallax scrolling at a 0.15 ratio for hero and background images, providing depth. Property listing images will animate with a 1.05x zoom and frosted glass bar reveal on hover, along with implied testimonial slider transitions.
- UI elements, such as the search bar and testimonial card, will utilize Glassmorphism (`backdrop-filter: blur(20px)`, `background: rgba(255, 255, 255, 0.85)` for specific elements, or global `.glass` class: `background: rgba(255, 255, 255, 0.1); backdrop-filter: blur(15px); border: 1px solid rgba(255, 255, 255, 0.2);`) for a sophisticated, translucent effect.