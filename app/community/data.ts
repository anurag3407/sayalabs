export type RepoLink = {
  label: string;
  url: string;
};

export type ContentBlock = {
  type: "text" | "code" | "heading";
  value: string;
};

export type Repo = {
  slug: string;
  kanji: string;
  name: string;
  tagline: string;
  desc: string;
  tags: string[];
  stars: string;
  lang: string;
  mesh: string;
  installation: string[];
  links: RepoLink[];
  content: ContentBlock[];
};

export const repos: Repo[] = [
  {
    slug: "antigravity-in-claude-code-mcp",
    kanji: "浮",
    name: "Antigravity in Claude Code MCP",
    tagline: "An advanced, production-ready MCP server.",
    desc: "This MCP securely wraps the agy (Antigravity) engine, injecting a dedicated team of subagent interns directly into Claude Code.",
    tags: ["MCP", "Claude Code", "AI Agents", "Protocol"],
    stars: "New",
    lang: "TypeScript",
    mesh: "mesh-gradient--indigo",
    installation: [
      "curl -sSL https://raw.githubusercontent.com/Sayalab/agy_in_claude_mcp/main/public/install-agy.sh | bash"
    ],
    links: [
      { label: "GitHub Repository", url: "https://github.com/Sayalab/agy_in_claude_mcp.git" }
    ],
    content: [
      {
        type: "text",
        value: "An advanced, production-ready MCP (Model Context Protocol) server designed to supercharge your AI agents."
      },
      {
        type: "text",
        value: "This MCP securely wraps the agy (Antigravity) engine, injecting a dedicated team of subagent interns, powerful web-search capabilities, and high-quality image generation protocols directly into Claude Code."
      },
      {
        type: "text",
        value: "Once installed, simply open Claude Code and type:\n\"Use ask-agy to generate an image of a futuristic city\"\nor\n\"Delegate this heavy refactoring task to your agy intern.\""
      },
      {
        type: "heading",
        value: "🗑️ Removal & Cleanup"
      },
      {
        type: "text",
        value: "If you ever need to completely remove the Sayalabs MCP and wipe the injected protocols from your system, execute these commands in your terminal:"
      },
      {
        type: "code",
        value: `# 1. Remove the MCP from Claude's global configuration\nclaude mcp remove agy\n\n# 2. Delete the downloaded repository\nrm -rf ~/.agy_in_claude_code\n\n# 3. Delete the injected Sayalabs Intern & Image Generation skills\nrm -rf ~/.gemini/config/skills/sayalabs_intern\nrm CLAUDE.md\n\n# 4. Clean up the background log files\nrm -rf ~/.antigravity/logs/intern-thoughts.log`
      },
      {
        type: "text",
        value: "(Note: If the MCP still appears in Claude Code under your \"Project MCPs\", simply open the .mcp.json file in your active folder and delete the agy block from the list.)"
      }
    ]
  }
];
