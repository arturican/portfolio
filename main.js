// Edit only this array to update the list.
const projects = [
  {
    title: "Todolist",
    subtitle: "Todo list app",
    url: "https://arturican.ru",
    stack: ["React", "TypeScript"],
    icon: "📝",
  },
  {
    title: "Title 2",
    subtitle: "Subtitle 2",
    url: "#",
    stack: ["Next.js", "Node.js"],
    icon: "🧩",
  },
  {
    title: "Title 3",
    subtitle: "Subtitle 3",
    url: "#",
    stack: ["Node.js", "PostgreSQL"],
    icon: "⚙️",
  },
];

const list = document.getElementById("projects");
const frag = document.createDocumentFragment();

for (const p of projects) {
  const li = document.createElement("li");
  li.className = "item";

  const a = document.createElement("a");
  a.className = "card";
  a.href = p.url;
  a.target = "_blank";
  a.rel = "noreferrer noopener";
  a.setAttribute("aria-label", `Open project: ${p.title}`);

  const body = document.createElement("div");
  body.className = "cardBody";

  const left = document.createElement("div");
  left.className = "cardMain";

  const icon = document.createElement("div");
  icon.className = "cardIcon";
  icon.setAttribute("aria-hidden", "true");
  icon.textContent = p.icon || "🔗";

  const text = document.createElement("div");
  text.className = "cardText";

  const title = document.createElement("span");
  title.className = "cardTitle";
  title.textContent = p.title;

  const subtitle = document.createElement("span");
  subtitle.className = "cardSubtitle";
  subtitle.textContent = p.subtitle;

  const badges = document.createElement("div");
  badges.className = "cardBadges";
  (p.stack || []).forEach((tech) => {
    const badge = document.createElement("span");
    badge.className = "badge";
    badge.textContent = tech;
    badges.appendChild(badge);
  });

  text.append(title, subtitle, badges);
  left.append(icon, text);

  const meta = document.createElement("div");
  meta.className = "cardMeta";

  const cta = document.createElement("span");
  cta.className = "cardCta";
  cta.textContent = "Open project";

  const arrow = document.createElement("span");
  arrow.className = "cardArrow";
  arrow.setAttribute("aria-hidden", "true");
  arrow.textContent = "↗";

  meta.append(cta, arrow);
  body.append(left, meta);
  a.appendChild(body);
  li.appendChild(a);
  frag.appendChild(li);
}

list.appendChild(frag);

