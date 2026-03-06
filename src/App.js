import React { useState } from "react";

const COLORS = {
  bg: "#f7f3ed",
  bgWarm: "#fdf9f4",
  card: "#ffffff",
  cardBorder: "#e8dfd4",
  cardShadow: "0 2px 12px rgba(120,80,40,0.07)",
  accent: "#3d8f5f",
  accentLight: "#e8f5ee",
  accentGlow: "rgba(61,143,95,0.12)",
  warn: "#c96a1a",
  warnLight: "#fef0e6",
  danger: "#c0392b",
  dangerLight: "#fdecea",
  text: "#2d2416",
  textMuted: "#8a7560",
  textDim: "#5a4a35",
  leaf1: "#4a9e6a",
  leaf2: "#2d7a4f",
  tomato: "#e05a3a",
  carrot: "#e8832a",
  broccoli: "#3a8a4a",
  lemon: "#d4a820",
  border2: "#d4c9bc",
};

const FONT = "'Lora', Georgia, serif";
const FONT_DISPLAY = "'Playfair Display', Georgia, serif";
const FONT_MONO = "'DM Mono', monospace";

// Vegetable SVG illustrations
const VegIllustrations = {
  broccoli: (size=32) => (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
      <circle cx="11" cy="10" r="6" fill="#4a9e6a"/>
      <circle cx="19" cy="8" r="5" fill="#3a8a4a"/>
      <circle cx="16" cy="13" r="6" fill="#5aae7a"/>
      <rect x="14" y="17" width="4" height="10" rx="2" fill="#6b4226"/>
      <rect x="12" y="21" width="2" height="5" rx="1" fill="#7a5230" transform="rotate(-15 12 21)"/>
      <rect x="18" y="20" width="2" height="5" rx="1" fill="#7a5230" transform="rotate(15 18 20)"/>
    </svg>
  ),
  carrot: (size=32) => (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
      <path d="M16 28 L10 8 Q16 4 22 8 Z" fill="#e8832a"/>
      <path d="M16 28 L13 14 Q16 10 19 14 Z" fill="#f09040"/>
      <path d="M14 6 Q12 2 8 4" stroke="#4a9e6a" strokeWidth="2" strokeLinecap="round" fill="none"/>
      <path d="M16 5 Q16 1 16 1" stroke="#3a8a4a" strokeWidth="2" strokeLinecap="round" fill="none"/>
      <path d="M18 6 Q20 2 24 4" stroke="#5aae7a" strokeWidth="2" strokeLinecap="round" fill="none"/>
    </svg>
  ),
  tomato: (size=32) => (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
      <circle cx="16" cy="18" r="11" fill="#e05a3a"/>
      <circle cx="16" cy="18" r="11" fill="url(#tg)" opacity="0.3"/>
      <path d="M16 7 Q14 4 10 5" stroke="#4a9e6a" strokeWidth="2.5" strokeLinecap="round" fill="none"/>
      <path d="M16 7 Q18 4 22 5" stroke="#3a8a4a" strokeWidth="2" strokeLinecap="round" fill="none"/>
      <path d="M16 7 L16 10" stroke="#4a9e6a" strokeWidth="2.5" strokeLinecap="round"/>
      <ellipse cx="20" cy="15" rx="2" ry="4" fill="white" opacity="0.2" transform="rotate(-20 20 15)"/>
      <defs><radialGradient id="tg" cx="30%" cy="30%"><stop offset="0%" stopColor="white"/><stop offset="100%" stopColor="transparent"/></radialGradient></defs>
    </svg>
  ),
  leaf: (size=28) => (
    <svg width={size} height={size} viewBox="0 0 28 28" fill="none">
      <path d="M14 24 Q4 18 6 8 Q14 2 22 8 Q24 18 14 24Z" fill="#4a9e6a"/>
      <path d="M14 24 Q14 14 14 6" stroke="#2d7a4f" strokeWidth="1.5" fill="none"/>
      <path d="M14 14 Q10 11 8 12" stroke="#2d7a4f" strokeWidth="1" fill="none"/>
      <path d="M14 18 Q18 15 20 16" stroke="#2d7a4f" strokeWidth="1" fill="none"/>
    </svg>
  ),
  avocado: (size=32) => (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
      <path d="M16 28 Q8 26 8 16 Q8 6 16 4 Q24 6 24 16 Q24 26 16 28Z" fill="#4a9e6a"/>
      <path d="M16 26 Q10 24 10 16 Q10 8 16 6 Q22 8 22 16 Q22 24 16 26Z" fill="#7dc47a"/>
      <ellipse cx="16" cy="18" rx="5" ry="6" fill="#c8913a"/>
    </svg>
  ),
};

const DAYS = ["Lun", "Mar", "Mie", "Joi", "Vin", "Sâm", "Dum"];
const DAYS_KEYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const ACTIVITIES = [
  { id: "rest",        label: "Zi de odihnă",           extra: 0   },
  { id: "walking_8k", label: "Mers pe jos 8k pași",     extra: 300 },
  { id: "running",    label: "Alergare",                extra: 500 },
  { id: "gym",        label: "Sală / Antrenament forță",extra: 400 },
  { id: "yoga",       label: "Yoga / Stretching",       extra: 150 },
  { id: "cycling",    label: "Ciclism",                 extra: 450 },
  { id: "swimming",   label: "Înot",                    extra: 500 },
  { id: "hiit",       label: "HIIT",                    extra: 550 },
];

const CONDITIONS = [
  { id: "diabetes",     label: "Diabet / Pre-diabet" },
  { id: "hypertension", label: "Boli cardiovasculare / Hipertensiune" },
  { id: "ibs",          label: "Probleme digestive (IBS, Crohn)" },
  { id: "celiac",       label: "Celiac / Intoleranță la gluten" },
  { id: "lactose",      label: "Intoleranță la lactoză" },
  { id: "gout",         label: "Gută" },
  { id: "kidney",       label: "Boli renale" },
  { id: "thyroid",      label: "Probleme tiroidiene" },
  { id: "hpv",          label: "Infecție HPV" },
  { id: "skin_barrier", label: "Barieră cutanată deteriorată" },
  { id: "acne_sugar",   label: "Acnee (legată de zahăr)" },
];

const GOALS = [
  { id: "lose",      label: "Slăbire" },
  { id: "maintain",  label: "Menținere greutate" },
  { id: "gain",      label: "Creștere musculară" },
  { id: "skin",      label: "Îmbunătățirea pielii" },
  { id: "immunity",  label: "Imunitate crescută" },
  { id: "energy",    label: "Mai multă energie" },
  { id: "gut",       label: "Sănătate digestivă" },
  { id: "hormones",  label: "Echilibru hormonal" },
];

const ACTIVITY_MULTIPLIERS = {
  sedentary: 1.2, lightly_active: 1.375,
  moderately_active: 1.55, very_active: 1.725,
};

const defaultWeekSchedule = {
  Mon: "walking_8k", Tue: "running",    Wed: "rest",
  Thu: "walking_8k", Fri: "running",    Sat: "yoga", Sun: "rest",
};

const defaultProfile = {
  name: "", age: "", weight: "", height: "", gender: "female",
  activityLevel: "lightly_active", goals: ["maintain"],
  conditions: [], allergies: "", weekSchedule: defaultWeekSchedule,
};

function getTodayKey() {
  const d = new Date().getDay();
  return DAYS_KEYS[d === 0 ? 6 : d - 1];
}

function getTodayDisplayDay() {
  const d = new Date().getDay();
  return DAYS[d === 0 ? 6 : d - 1];
}

function getTomorrowKey() {
  const d = new Date().getDay(); // 0=Sun..6=Sat
  // tomorrow in our Mon-based index
  const todayIdx = d === 0 ? 6 : d - 1;
  const tomorrowIdx = (todayIdx + 1) % 7;
  return DAYS_KEYS[tomorrowIdx];
}

function getTomorrowDisplayDay() {
  const d = new Date().getDay();
  const todayIdx = d === 0 ? 6 : d - 1;
  return DAYS[(todayIdx + 1) % 7];
}

function calcTDEE(profile) {
  const w = parseFloat(profile.weight), h = parseFloat(profile.height), a = parseFloat(profile.age);
  if (!w || !h || !a) return null;
  let bmr = profile.gender === "male" ? 10*w + 6.25*h - 5*a + 5 : 10*w + 6.25*h - 5*a - 161;
  let tdee = bmr * (ACTIVITY_MULTIPLIERS[profile.activityLevel] || 1.375);
  const todayAct = ACTIVITIES.find(x => x.id === (profile.weekSchedule?.[getTodayKey()] || "rest"));
  tdee += todayAct?.extra || 0;
  if (profile.goals?.includes("lose")) tdee -= 400;
  if (profile.goals?.includes("gain")) tdee += 300;
  return Math.round(tdee);
}

function NutritionBar({ label, value, max, color }) {
  const pct = Math.min(100, Math.round((value / max) * 100));
  return (
    <div style={{ marginBottom: 10 }}>
      <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, color: COLORS.textMuted, marginBottom: 4, fontFamily: FONT_MONO }}>
        <span>{label}</span><span style={{ color: COLORS.textDim }}>{value}g / {max}g</span>
      </div>
      <div style={{ background: "#ede6dc", borderRadius: 6, height: 7, overflow: "hidden" }}>
        <div style={{
          height: "100%", borderRadius: 6, width: `${pct}%`,
          background: pct > 95 ? COLORS.danger : pct > 75 ? COLORS.warn : color,
          transition: "width 0.6s cubic-bezier(0.4,0,0.2,1)",
        }} />
      </div>
    </div>
  );
}

function Card({ children, style = {} }) {
  return <div style={{ background: COLORS.card, border: `1px solid ${COLORS.cardBorder}`, borderRadius: 16, padding: "18px 20px", boxShadow: COLORS.cardShadow, ...style }}>{children}</div>;
}

function SLabel({ children }) {
  return <div style={{ fontSize: 9, color: COLORS.textMuted, letterSpacing: "0.12em", marginBottom: 8, fontFamily: FONT_MONO, textTransform: "uppercase" }}>{children}</div>;
}

export default function App() {
  const [tab, setTab] = useState("tracker");
  const [profile, setProfile] = useState(defaultProfile);
  const [profileSaved, setProfileSaved] = useState(false);
  const [meals, setMeals] = useState([]);
  const [mealInput, setMealInput] = useState("");
  const [aiLoading, setAiLoading] = useState(false);
  const [aiAdvice, setAiAdvice] = useState("");
  const [mealAnalysis, setMealAnalysis] = useState(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [mealIdeas, setMealIdeas] = useState([]);
  const [ideasLoading, setIdeasLoading] = useState(false);
  const [mealType, setMealType] = useState("toate");

  const tdee = calcTDEE(profile);
  const totalCals    = meals.reduce((s, m) => s + (m.calories || 0), 0);
  const totalProtein = meals.reduce((s, m) => s + (m.protein  || 0), 0);
  const totalCarbs   = meals.reduce((s, m) => s + (m.carbs    || 0), 0);
  const totalFat     = meals.reduce((s, m) => s + (m.fat      || 0), 0);

  const proteinTarget = profile.weight ? Math.round(parseFloat(profile.weight) * (profile.goals?.includes("gain") ? 2.2 : 1.6)) : 120;
  const carbTarget    = tdee ? Math.round((tdee * 0.45) / 4) : 200;
  const fatTarget     = tdee ? Math.round((tdee * 0.30) / 9) : 70;

  const todayKey      = getTodayKey();
  const todayActId    = profile.weekSchedule?.[todayKey] || "rest";
  const todayActivity = ACTIVITIES.find(a => a.id === todayActId);
  const todayActLabel = todayActivity?.label || "Zi de odihnă";
  const todayExtra    = todayActivity?.extra || 0;

  const tomorrowKey      = getTomorrowKey();
  const tomorrowActId    = profile.weekSchedule?.[tomorrowKey] || "rest";
  const tomorrowActivity = ACTIVITIES.find(a => a.id === tomorrowActId);
  const tomorrowActLabel = tomorrowActivity?.label || "Zi de odihnă";
  const tomorrowExtra    = tomorrowActivity?.extra || 0;
  const tomorrowIsActive = tomorrowExtra > 0;
  const tomorrowDisplayDay = getTomorrowDisplayDay();

  const calPct   = tdee ? Math.min(100, Math.round((totalCals / tdee) * 100)) : 0;
  const calsLeft = tdee ? tdee - totalCals : null;

  // calories burned estimate from today's activity (for display in tracker)
  const activityBurnDisplay = todayExtra > 0
    ? `+${todayExtra} kcal arse (${todayActLabel})`
    : null;

  function toggleGoal(id) {
    setProfile(p => ({ ...p, goals: p.goals.includes(id) ? p.goals.filter(g => g !== id) : [...p.goals, id] }));
  }
  function toggleCondition(id) {
    setProfile(p => ({ ...p, conditions: p.conditions.includes(id) ? p.conditions.filter(c => c !== id) : [...p.conditions, id] }));
  }
  function setDayActivity(day, act) {
    setProfile(p => ({ ...p, weekSchedule: { ...p.weekSchedule, [day]: act } }));
  }

  async function analyzeMeal() {
    if (!mealInput.trim()) return;
    setAnalyzing(true); setMealAnalysis(null);
    const conds = profile.conditions.length ? `Condiții medicale: ${profile.conditions.join(", ")}.` : "";
    const goals  = profile.goals?.length    ? `Obiective: ${profile.goals.join(", ")}.` : "";
    const actCtx = `Activitate fizică de azi: ${todayActLabel} (calorii arse suplimentar: ${todayExtra} kcal).`;
    const tomorrowCtx = tomorrowIsActive
      ? `Mâine (${tomorrowDisplayDay}) urmează: ${tomorrowActLabel} (${tomorrowExtra} kcal). Ține cont de asta: dacă masa de seară sau ultima masă a zilei, recomandă carbohidrați complecși și proteine pentru încărcare înainte de antrenament.`
      : `Mâine (${tomorrowDisplayDay}) este zi de odihnă sau activitate ușoară.`;
    const prompt = `Analizează această masă: "${mealInput}". ${conds} ${goals} ${actCtx} ${tomorrowCtx} Alergii: ${profile.allergies || "niciuna"}.
Dacă are acne_sugar: avertizează despre alimente cu indice glicemic ridicat și creșteri ale zahărului în sânge.
Dacă are skin_barrier: menționează alimente bogate în omega-3, zinc, vitamina E.
Dacă are hpv: menționează nutrienți care stimulează imunitatea (folat, vit C, vit D).
Ține cont de activitatea de azi pentru recuperare, și de activitatea de mâine pentru pregătire (carbo-loading, hidratare).
Răspunde DOAR cu un obiect JSON, fără markdown:
{"name":"nume scurt masă","calories":număr,"protein":număr,"carbs":număr,"fat":număr,"fiber":număr,"sugar":număr,"warnings":["..."],"improvements":["...","..."],"score":număr_1_la_10}`;
    try {
      const res  = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ model: "claude-sonnet-4-20250514", max_tokens: 1000, messages: [{ role: "user", content: prompt }] }),
      });
      const data = await res.json();
      const text = data.content?.map(i => i.text || "").join("") || "";
      setMealAnalysis(JSON.parse(text.replace(/```json|```/g, "").trim()));
    } catch {
      setMealAnalysis({ error: "Nu s-a putut analiza. Încearcă din nou." });
    }
    setAnalyzing(false);
  }

  function addMealToLog() {
    if (!mealAnalysis || mealAnalysis.error) return;
    setMeals(p => [...p, {
      ...mealAnalysis, id: Date.now(),
      time: new Date().toLocaleTimeString("ro-RO", { hour: "2-digit", minute: "2-digit" }),
    }]);
    setMealInput(""); setMealAnalysis(null);
  }

  async function getAIAdvice() {
    setAiLoading(true); setAiAdvice("");
    const mealSummary = meals.length ? meals.map(m => `${m.name} (${m.calories} kcal)`).join(", ") : "Nicio masă înregistrată.";
    const conds = profile.conditions.length ? `Condiții medicale: ${profile.conditions.join(", ")}.` : "";
    const goals  = profile.goals?.length    ? `Obiective: ${profile.goals.join(", ")}.` : "";
    const tomorrowAdviceCtx = tomorrowIsActive
      ? `Mâine (${tomorrowDisplayDay}) urmează ${tomorrowActLabel} (${tomorrowExtra} kcal). Menționează cum să se pregătească alimentar azi pentru performanță și energie mâine (carbohidrați complecși seara, hidratare, evitarea alimentelor grele).`
      : `Mâine (${tomorrowDisplayDay}) este zi de odihnă.`;
    const prompt = `Ești un nutriționist clinician și specialist în sănătatea pielii. Oferă sfaturi personalizate în limba română.
Pacient: ${profile.age} ani, ${profile.gender}, ${profile.weight} kg, ${profile.height} cm. ${conds} ${goals} Alergii: ${profile.allergies || "niciuna"}.
Activitate azi: ${todayActLabel} (${todayExtra} kcal suplimentare arse).
${tomorrowAdviceCtx}
Mese de azi: ${mealSummary}.
Aport: ${totalCals}/${tdee || "?"} kcal. P:${totalProtein}g C:${totalCarbs}g G:${totalFat}g.
Scrie 3-4 paragrafe de sfaturi acționabile. Dacă are skin_barrier sau acne_sugar, include un paragraf despre legătura dietă-piele (alimente recomandate/interzise, impactul zahărului). Dacă are hpv, menționează alimente care susțin imunitatea. Ține cont de activitatea fizică de azi (recuperare, hidratare, carbohidrați) și de activitatea de mâine (pregătire). Încheie cu 2 sugestii de mese pentru caloriile rămase, ținând cont și de mâine.`;
    try {
      const res  = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ model: "claude-sonnet-4-20250514", max_tokens: 1000, messages: [{ role: "user", content: prompt }] }),
      });
      const data = await res.json();
      setAiAdvice(data.content?.map(i => i.text || "").join("") || "Nu există sfaturi disponibile.");
    } catch {
      setAiAdvice("Eroare la încărcare. Încearcă din nou.");
    }
    setAiLoading(false);
  }


  async function getMealIdeas() {
    setIdeasLoading(true); setMealIdeas([]);
    const conds = profile.conditions.length ? `Condiții medicale: ${profile.conditions.join(", ")}.` : "";
    const goals = profile.goals?.length ? `Obiective: ${profile.goals.join(", ")}.` : "";
    const calsRemaining = tdee ? Math.max(0, tdee - totalCals) : 500;
    const actCtx = `Activitate azi: ${todayActLabel}. Mâine: ${tomorrowActLabel}.`;
    const typeCtx = mealType !== "toate" ? `Tip masă dorit: ${mealType}.` : "";
    const prompt = `Ești nutriționist. Generează 4 idei de mese personalizate în română. ${conds} ${goals} ${actCtx} ${typeCtx} Calorii rămase azi: ${calsRemaining} kcal. Alergii: ${profile.allergies || "niciuna"}.
Răspunde DOAR cu un array JSON, fără markdown:
[{"name":"Nume masă","calories":number,"protein":number,"carbs":number,"fat":number,"ingredients":["ingredient 1","ingredient 2","ingredient 3"],"tip":"sfat scurt de 1 propoziție"}]
Asigură-te că fiecare masă e potrivită pentru condițiile medicale și obiective. Variază tipurile (mic dejun, prânz, cină, gustare).`;
    try {
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ model: "claude-sonnet-4-20250514", max_tokens: 2000, messages: [{ role: "user", content: prompt }] }),
      });
      const data = await res.json();
      const text = data.content?.map(i => i.text || "").join("") || "";
      setMealIdeas(JSON.parse(text.replace(/```json|```/g, "").trim()));
    } catch {
      setMealIdeas([{ error: "Nu s-au putut genera idei. Încearcă din nou." }]);
    }
    setIdeasLoading(false);
  }

  const inputStyle = {
    background: "#faf6f1", border: `1px solid ${COLORS.cardBorder}`, borderRadius: 10,
    padding: "9px 13px", color: COLORS.text, fontFamily: FONT, fontSize: 13,
    width: "100%", boxSizing: "border-box", outline: "none",
    boxShadow: "inset 0 1px 3px rgba(120,80,40,0.06)",
  };

  const tabBtn = (active) => ({
    padding: "7px 16px", borderRadius: 22, cursor: "pointer", fontFamily: FONT_MONO, fontSize: 11,
    border: active ? `1.5px solid ${COLORS.accent}` : `1px solid ${COLORS.cardBorder}`,
    background: active ? COLORS.accent : COLORS.card,
    color: active ? "white" : COLORS.textMuted,
    transition: "all 0.2s", fontWeight: active ? 500 : 400,
    boxShadow: active ? "0 2px 8px rgba(61,143,95,0.25)" : "none",
  });

  const toggleBtn = (active, color = COLORS.accent) => ({
    padding: "8px 12px", borderRadius: 10, cursor: "pointer", textAlign: "left",
    border: `1.5px solid ${active ? color : COLORS.cardBorder}`,
    background: active ? (color === COLORS.accent ? COLORS.accentLight : COLORS.warnLight) : COLORS.bgWarm,
    color: active ? color : COLORS.textMuted, fontFamily: FONT, fontSize: 12, transition: "all 0.2s",
  });

  return (
    <div style={{
      minHeight: "100vh", background: COLORS.bg, color: COLORS.text, fontFamily: FONT, padding: "22px 14px",
      backgroundImage: `
        radial-gradient(ellipse at 90% 10%, rgba(74,158,106,0.08) 0%, transparent 40%),
        radial-gradient(ellipse at 5% 85%, rgba(232,131,42,0.06) 0%, transparent 40%),
        radial-gradient(ellipse at 50% 50%, rgba(212,168,32,0.04) 0%, transparent 60%)
      `,
    }}>
      <link href="https://fonts.googleapis.com/css2?family=DM+Mono:wght@300;400;500&family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=Lora:wght@400;500;600&display=swap" rel="stylesheet" />
      <div style={{ maxWidth: 680, margin: "0 auto" }}>

        {/* ── Header ── */}
        <div style={{ marginBottom: 24, paddingBottom: 18, borderBottom: `1px solid ${COLORS.cardBorder}`, position: "relative" }}>
          {/* Decorative veggie strip */}
          <div style={{ position: "absolute", right: 0, top: -4, display: "flex", gap: 4, opacity: 0.7 }}>
            {VegIllustrations.broccoli(28)}
            {VegIllustrations.tomato(28)}
            {VegIllustrations.carrot(28)}
            {VegIllustrations.avocado(28)}
          </div>
          <div style={{ display: "flex", alignItems: "baseline", gap: 10 }}>
            <h1 style={{ fontFamily: FONT_DISPLAY, fontSize: 28, fontWeight: 700, margin: 0, color: COLORS.accent, letterSpacing: "-0.02em" }}>NutriCare</h1>
            <span style={{ fontSize: 10, color: COLORS.textMuted, letterSpacing: "0.12em", fontFamily: FONT_MONO }}>TRACKER AI</span>
          </div>
          {profileSaved && profile.name && (
            <p style={{ margin: "5px 0 0", fontSize: 12, color: COLORS.textMuted, fontFamily: FONT }}>
              Bună, <span style={{ color: COLORS.accent, fontWeight: 600 }}>{profile.name}</span> · Azi ({getTodayDisplayDay()}): <span style={{ color: COLORS.accent }}>{todayActLabel}</span>
              {profile.goals?.length > 0 && <> · {profile.goals.map(g => GOALS.find(x => x.id === g)?.label).filter(Boolean).join(", ")}</>}
            </p>
          )}
        </div>

        {/* ── Tabs ── */}
        <div style={{ display: "flex", gap: 7, marginBottom: 20, flexWrap: "wrap" }}>
          {[["tracker", "Jurnal Azi"], ["ideas", "Idei Mese"], ["advisor", "Sfaturi AI"], ["profile", "Profilul Meu"]].map(([id, lbl]) => (
            <button key={id} onClick={() => setTab(id)} style={tabBtn(tab === id)}>{lbl}</button>
          ))}
        </div>

        {/* ══════════════════════════════════════
            TAB: JURNAL AZI
        ══════════════════════════════════════ */}
        {tab === "tracker" && (
          <div>
            {/* Activity banner */}
            {todayExtra > 0 && (
              <div style={{
                marginBottom: 8, padding: "10px 14px", borderRadius: 12,
                border: `1.5px solid ${COLORS.accent}40`, background: COLORS.accentLight,
                display: "flex", alignItems: "center", justifyContent: "space-between",
              }}>
                <span style={{ fontSize: 12, color: COLORS.accent, fontFamily: FONT }}>🏃 Azi: {todayActLabel}</span>
                <span style={{ fontSize: 12, color: COLORS.accent, fontFamily: FONT_MONO, fontWeight: 500 }}>+{todayExtra} kcal arse</span>
              </div>
            )}

            {/* Tomorrow banner */}
            {tomorrowIsActive && (
              <div style={{
                marginBottom: 12, padding: "10px 14px", borderRadius: 12,
                border: `1.5px solid ${COLORS.warn}40`, background: COLORS.warnLight,
                display: "flex", alignItems: "center", justifyContent: "space-between",
              }}>
                <span style={{ fontSize: 12, color: COLORS.warn, fontFamily: FONT }}>⚡ Mâine ({tomorrowDisplayDay}): {tomorrowActLabel}</span>
                <span style={{ fontSize: 10, color: COLORS.textMuted, fontFamily: FONT_MONO }}>pregătire activă</span>
              </div>
            )}

            {/* Calorie ring */}
            {tdee && (
              <Card style={{ marginBottom: 12, display: "flex", gap: 18, alignItems: "center", flexWrap: "wrap" }}>
                <div style={{ position: "relative", width: 82, height: 82, flexShrink: 0 }}>
                  <svg width="82" height="82" viewBox="0 0 82 82">
                    <circle cx="41" cy="41" r="32" fill="none" stroke="#ede6dc" strokeWidth="7" />
                    <circle cx="41" cy="41" r="32" fill="none"
                      stroke={calPct > 100 ? COLORS.danger : COLORS.accent} strokeWidth="7"
                      strokeDasharray={`${2 * Math.PI * 32}`}
                      strokeDashoffset={`${2 * Math.PI * 32 * (1 - calPct / 100)}`}
                      strokeLinecap="round" transform="rotate(-90 41 41)"
                      style={{ transition: "stroke-dashoffset 0.6s ease", filter: `drop-shadow(0 0 5px ${COLORS.accent}80)` }}
                    />
                  </svg>
                  <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <span style={{ fontSize: 14, color: COLORS.accent }}>{calPct}%</span>
                  </div>
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 22, fontFamily: FONT_DISPLAY, color: COLORS.text, fontWeight: 600 }}>
                    {totalCals} <span style={{ fontSize: 12, color: COLORS.textMuted, fontWeight: 400 }}>kcal consumate</span>
                  </div>
                  <div style={{ fontSize: 11, color: COLORS.textMuted, marginBottom: 2, fontFamily: FONT }}>
                    Țintă: <span style={{ color: COLORS.textDim, fontWeight: 600 }}>{tdee} kcal</span>
                    {todayExtra > 0 && <span style={{ color: COLORS.accent }}> (+{todayExtra} activitate)</span>}
                  </div>
                  <div style={{ fontSize: 11, color: calsLeft > 0 ? COLORS.accent : COLORS.danger, marginBottom: 10, fontWeight: 500 }}>
                    {calsLeft > 0 ? `✓ Mai ai ${calsLeft} kcal` : `⚠ Depășit cu ${Math.abs(calsLeft || 0)} kcal`}
                  </div>
                  <NutritionBar label="Proteine" value={totalProtein} max={proteinTarget} color={COLORS.accent} />
                  <NutritionBar label="Carbohidrați" value={totalCarbs} max={carbTarget} color="#60a5fa" />
                  <NutritionBar label="Grăsimi" value={totalFat} max={fatTarget} color={COLORS.warn} />
                </div>
              </Card>
            )}

            {/* Meal input */}
            <Card style={{ marginBottom: 12 }}>
              <SLabel>ÎNREGISTREAZĂ O MASĂ</SLabel>
              {(todayExtra > 0 || tomorrowIsActive) && (
                <div style={{ fontSize: 10, color: COLORS.textMuted, marginBottom: 8, padding: "6px 9px", background: COLORS.accentLight, borderRadius: 8, borderLeft: `3px solid ${COLORS.accent}` }}>
                  {todayExtra > 0 && <div style={{ color: COLORS.textDim }}>💪 Ai făcut <span style={{ color: COLORS.accent, fontWeight: 600 }}>{todayActLabel}</span> azi — analiza recomandă proteine și carbohidrați pentru recuperare.</div>}
                  {tomorrowIsActive && <div style={{ marginTop: todayExtra > 0 ? 4 : 0, color: COLORS.textDim }}>⚡ Mâine ai <span style={{ color: COLORS.warn, fontWeight: 600 }}>{tomorrowActLabel}</span> — analiza va sugera alimente pentru pregătire.</div>}
                </div>
              )}
              <div style={{ display: "flex", gap: 7 }}>
                <input value={mealInput} onChange={e => setMealInput(e.target.value)}
                  onKeyDown={e => e.key === "Enter" && analyzeMeal()}
                  placeholder="ex: 2 ouă cu pâine prăjită și cafea..."
                  style={{ ...inputStyle, flex: 1 }} />
                <button onClick={analyzeMeal} disabled={analyzing || !mealInput.trim()} style={{
                  padding: "9px 15px", borderRadius: 10, border: "none", cursor: "pointer",
                  background: analyzing ? COLORS.cardBorder : COLORS.accent,
                  color: analyzing ? COLORS.textMuted : "white",
                  fontFamily: FONT, fontSize: 12, fontWeight: 600, whiteSpace: "nowrap",
                  boxShadow: analyzing ? "none" : "0 2px 8px rgba(61,143,95,0.3)",
                }}>{analyzing ? "Se analizează..." : "Analizează →"}</button>
              </div>

              {mealAnalysis && !mealAnalysis.error && (
                <div style={{ marginTop: 11, padding: 14, background: COLORS.bgWarm, borderRadius: 12, border: `1.5px solid ${COLORS.cardBorder}` }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 7 }}>
                    <div>
                      <div style={{ fontFamily: FONT_DISPLAY, fontSize: 14, color: COLORS.text }}>{mealAnalysis.name}</div>
                      <div style={{ fontSize: 18, color: COLORS.accent, fontWeight: 500 }}>{mealAnalysis.calories} <span style={{ fontSize: 10, color: COLORS.textMuted }}>kcal</span></div>
                    </div>
                    <div style={{
                      width: 38, height: 38, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center",
                      background: mealAnalysis.score >= 7 ? `${COLORS.accent}20` : mealAnalysis.score >= 5 ? `${COLORS.warn}20` : `${COLORS.danger}20`,
                      border: `1px solid ${mealAnalysis.score >= 7 ? COLORS.accent : mealAnalysis.score >= 5 ? COLORS.warn : COLORS.danger}40`,
                      color: mealAnalysis.score >= 7 ? COLORS.accent : mealAnalysis.score >= 5 ? COLORS.warn : COLORS.danger,
                      fontSize: 12,
                    }}>{mealAnalysis.score}/10</div>
                  </div>
                  <div style={{ display: "flex", gap: 12, marginBottom: 9, flexWrap: "wrap" }}>
                    {[["Prot", mealAnalysis.protein], ["Carb", mealAnalysis.carbs], ["Grăs", mealAnalysis.fat], ["Zahăr", mealAnalysis.sugar], ["Fibre", mealAnalysis.fiber]].map(([l, v]) => (
                      <div key={l} style={{ textAlign: "center" }}>
                        <div style={{ fontSize: 12, color: COLORS.textDim }}>{v}g</div>
                        <div style={{ fontSize: 9, color: COLORS.textMuted }}>{l}</div>
                      </div>
                    ))}
                  </div>
                  {mealAnalysis.warnings?.map((w, i) => <div key={i} style={{ fontSize: 10, color: COLORS.warn, marginBottom: 2 }}>⚠ {w}</div>)}
                  {mealAnalysis.improvements?.length > 0 && (
                    <div style={{ marginTop: 5, marginBottom: 9 }}>
                      <div style={{ fontSize: 9, color: COLORS.textMuted, letterSpacing: "0.06em", marginBottom: 3 }}>ÎMBUNĂTĂȚIRI</div>
                      {mealAnalysis.improvements.map((t, i) => <div key={i} style={{ fontSize: 10, color: COLORS.textDim, marginBottom: 2 }}>✦ {t}</div>)}
                    </div>
                  )}
                  <button onClick={addMealToLog} style={{
                    width: "100%", padding: "9px", borderRadius: 9, border: "none",
                    background: COLORS.accent, color: "white", fontFamily: FONT, fontSize: 12, cursor: "pointer",
                    fontWeight: 600, boxShadow: "0 2px 8px rgba(61,143,95,0.25)",
                  }}>+ Adaugă în jurnal</button>
                </div>
              )}
              {mealAnalysis?.error && <div style={{ marginTop: 7, fontSize: 11, color: COLORS.danger }}>{mealAnalysis.error}</div>}
            </Card>

            {/* Meal log */}
            {meals.length > 0 && (
              <Card>
                <SLabel>MESELE DE AZI</SLabel>
                {meals.map((meal, i) => (
                  <div key={meal.id} style={{
                    display: "flex", alignItems: "center", justifyContent: "space-between",
                    padding: "8px 0", borderBottom: i < meals.length - 1 ? `1px solid ${COLORS.cardBorder}` : "none",
                  }}>
                    <div>
                      <div style={{ fontSize: 12, color: COLORS.text }}>{meal.name}</div>
                      <div style={{ fontSize: 9, color: COLORS.textMuted, marginTop: 1 }}>
                        {meal.time} · P:{meal.protein}g C:{meal.carbs}g G:{meal.fat}g Zahăr:{meal.sugar}g
                      </div>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
                      <span style={{ fontSize: 13, color: COLORS.accent }}>{meal.calories}</span>
                      <button onClick={() => setMeals(p => p.filter(m => m.id !== meal.id))}
                        style={{ background: "none", border: "none", color: COLORS.textMuted, cursor: "pointer", fontSize: 14 }}>×</button>
                    </div>
                  </div>
                ))}
                {/* Daily summary footer */}
                <div style={{ marginTop: 10, paddingTop: 10, borderTop: `1px solid ${COLORS.cardBorder}`, display: "flex", justifyContent: "space-between", fontSize: 10, color: COLORS.textMuted }}>
                  <span>Total: <span style={{ color: COLORS.accent }}>{totalCals} kcal</span></span>
                  {tdee && <span>Rămas: <span style={{ color: calsLeft > 0 ? COLORS.accent : COLORS.danger }}>{calsLeft > 0 ? calsLeft : 0} kcal</span></span>}
                  {activityBurnDisplay && <span style={{ color: COLORS.accent }}>{activityBurnDisplay}</span>}
                </div>
              </Card>
            )}
            {meals.length === 0 && !mealAnalysis && (
              <div style={{ textAlign: "center", padding: "34px 0", color: COLORS.textMuted, fontSize: 12, fontFamily: FONT }}>
                <div style={{ display: "flex", justifyContent: "center", gap: 8, marginBottom: 12, opacity: 0.5 }}>
                  {VegIllustrations.avocado(34)}
                  {VegIllustrations.leaf(30)}
                  {VegIllustrations.tomato(34)}
                </div>
                Înregistrează prima masă de mai sus
              </div>
            )}
          </div>
        )}

        {/* ══════════════════════════════════════
            TAB: IDEI DE MESE
        ══════════════════════════════════════ */}
        {tab === "ideas" && (
          <div>
            <Card style={{ marginBottom: 12 }}>
              <SLabel>IDEI DE MESE PERSONALIZATE</SLabel>
              <p style={{ fontSize: 11, color: COLORS.textDim, margin: "0 0 12px", lineHeight: 1.7 }}>
                AI generează 4 idei de mese adaptate profilului tău, condițiilor medicale și caloriilor rămase azi
                {tdee && <span style={{ color: COLORS.accent }}> ({Math.max(0, tdee - totalCals)} kcal disponibile)</span>}.
              </p>
              <div style={{ marginBottom: 12 }}>
                <SLabel>TIP MASĂ</SLabel>
                <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                  {["toate", "mic dejun", "prânz", "cină", "gustare"].map(t => (
                    <button key={t} onClick={() => setMealType(t)} style={{
                      padding: "6px 12px", borderRadius: 20, cursor: "pointer",
                      border: `1px solid ${mealType === t ? COLORS.accent + "50" : COLORS.cardBorder}`,
                      background: mealType === t ? COLORS.accentGlow : "transparent",
                      color: mealType === t ? COLORS.accent : COLORS.textMuted,
                      fontFamily: FONT, fontSize: 11, textTransform: "capitalize", transition: "all 0.2s",
                    }}>{t}</button>
                  ))}
                </div>
              </div>
              <button onClick={getMealIdeas} disabled={ideasLoading} style={{
                padding: "10px 20px", borderRadius: 12, border: "none", cursor: "pointer",
                background: ideasLoading ? COLORS.cardBorder : COLORS.accent,
                color: ideasLoading ? COLORS.textMuted : "white",
                fontFamily: FONT, fontSize: 12, fontWeight: 600,
                boxShadow: ideasLoading ? "none" : "0 2px 10px rgba(61,143,95,0.3)",
              }}>{ideasLoading ? "Se generează..." : "✦ Generează Idei"}</button>
            </Card>

            {mealIdeas.length > 0 && !mealIdeas[0]?.error && (
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {mealIdeas.map((idea, i) => (
                  <Card key={i} style={{ borderColor: `${COLORS.accent}20` }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8 }}>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontFamily: FONT_DISPLAY, fontSize: 15, color: COLORS.text, marginBottom: 3 }}>{idea.name}</div>
                        <div style={{ fontSize: 18, color: COLORS.accent, fontWeight: 500 }}>
                          {idea.calories} <span style={{ fontSize: 10, color: COLORS.textMuted }}>kcal</span>
                        </div>
                      </div>
                      <button onClick={() => {
                        setMeals(p => [...p, {
                          ...idea, id: Date.now(),
                          time: new Date().toLocaleTimeString("ro-RO", { hour: "2-digit", minute: "2-digit" }),
                          warnings: [], improvements: [], score: 7, fiber: 0, sugar: 0,
                        }]);
                        setTab("tracker");
                      }} style={{
                        padding: "7px 13px", borderRadius: 9, border: "none",
                        background: COLORS.accent, color: "white",
                        fontFamily: FONT, fontSize: 11, cursor: "pointer", whiteSpace: "nowrap",
                        fontWeight: 600, boxShadow: "0 2px 6px rgba(61,143,95,0.25)",
                      }}>+ Adaugă</button>
                    </div>

                    <div style={{ display: "flex", gap: 14, marginBottom: 10 }}>
                      {[["Prot", idea.protein], ["Carb", idea.carbs], ["Grăs", idea.fat]].map(([l, v]) => (
                        <div key={l} style={{ textAlign: "center" }}>
                          <div style={{ fontSize: 12, color: COLORS.textDim }}>{v}g</div>
                          <div style={{ fontSize: 9, color: COLORS.textMuted }}>{l}</div>
                        </div>
                      ))}
                    </div>

                    {idea.ingredients?.length > 0 && (
                      <div style={{ marginBottom: 8 }}>
                        <div style={{ fontSize: 9, color: COLORS.textMuted, letterSpacing: "0.06em", marginBottom: 4 }}>INGREDIENTE</div>
                        <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
                          {idea.ingredients.map((ing, j) => (
                            <span key={j} style={{
                              fontSize: 11, padding: "3px 10px", borderRadius: 20,
                              border: `1px solid ${COLORS.cardBorder}`, color: COLORS.textDim,
                              background: COLORS.bgWarm, fontFamily: FONT,
                            }}>{ing}</span>
                          ))}
                        </div>
                      </div>
                    )}

                    {idea.tip && (
                      <div style={{ fontSize: 11, color: COLORS.textDim, borderLeft: `3px solid ${COLORS.accent}`, paddingLeft: 10, fontStyle: "italic", fontFamily: FONT, background: COLORS.accentLight, padding: "7px 7px 7px 12px", borderRadius: "0 8px 8px 0" }}>
                        🌿 {idea.tip}
                      </div>
                    )}
                  </Card>
                ))}
              </div>
            )}

            {mealIdeas[0]?.error && (
              <div style={{ textAlign: "center", padding: "20px 0", color: COLORS.danger, fontSize: 11 }}>{mealIdeas[0].error}</div>
            )}

            {mealIdeas.length === 0 && !ideasLoading && (
              <div style={{ textAlign: "center", padding: "34px 0", color: COLORS.textMuted, fontSize: 12, fontFamily: FONT }}>
                <div style={{ display: "flex", justifyContent: "center", gap: 8, marginBottom: 12, opacity: 0.6 }}>
                  {VegIllustrations.broccoli(36)}
                  {VegIllustrations.carrot(36)}
                  {VegIllustrations.tomato(36)}
                </div>
                Apasă „Generează Idei" pentru sugestii personalizate
              </div>
            )}
          </div>
        )}

        {/* ══════════════════════════════════════
            TAB: SFATURI AI
        ══════════════════════════════════════ */}
        {tab === "advisor" && (
          <div>
            <Card style={{ marginBottom: 12 }}>
              <SLabel>SFATURI NUTRIȚIONALE PERSONALIZATE</SLabel>
              <p style={{ fontSize: 11, color: COLORS.textDim, margin: "0 0 10px", lineHeight: 1.7 }}>
                Sfaturi adaptate la condițiile tale medicale, obiective, activitatea de azi (<span style={{ color: COLORS.accent }}>{todayActLabel}</span>){tomorrowIsActive && <> și pregătirea pentru mâine (<span style={{ color: COLORS.warn }}>{tomorrowActLabel}</span>)</>} și mesele înregistrate.
              </p>
              <button onClick={getAIAdvice} disabled={aiLoading} style={{
                padding: "10px 20px", borderRadius: 12, border: "none", cursor: "pointer",
                background: aiLoading ? COLORS.cardBorder : COLORS.accent,
                color: aiLoading ? COLORS.textMuted : "white",
                fontFamily: FONT, fontSize: 12, fontWeight: 600,
                boxShadow: aiLoading ? "none" : "0 2px 10px rgba(61,143,95,0.3)",
              }}>{aiLoading ? "Se generează..." : "✦ Obține Sfaturile Mele"}</button>
            </Card>
            {aiAdvice && (
              <Card>
                <SLabel>✦ SFATURILE TALE PERSONALIZATE</SLabel>
                <div style={{ fontSize: 12, color: COLORS.textDim, lineHeight: 1.9, whiteSpace: "pre-wrap" }}>{aiAdvice}</div>
              </Card>
            )}
            {!aiAdvice && !aiLoading && (
              <div style={{ textAlign: "center", padding: "34px 0", color: COLORS.textMuted, fontSize: 12, fontFamily: FONT }}>
                <div style={{ display: "flex", justifyContent: "center", gap: 8, marginBottom: 12, opacity: 0.5 }}>
                  {VegIllustrations.broccoli(34)}
                  {VegIllustrations.avocado(34)}
                </div>
                Completează profilul și înregistrează mese pentru cele mai bune sfaturi
              </div>
            )}
          </div>
        )}

        {/* ══════════════════════════════════════
            TAB: PROFILUL MEU
        ══════════════════════════════════════ */}
        {tab === "profile" && (
          <div>
            {/* Date personale */}
            <Card style={{ marginBottom: 12 }}>
              <SLabel>DATE PERSONALE</SLabel>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 9 }}>
                {[["Nume", "name", "text", "Numele tău"], ["Vârstă", "age", "number", "Ani"], ["Greutate (kg)", "weight", "number", "kg"], ["Înălțime (cm)", "height", "number", "cm"]].map(([lbl, key, type, ph]) => (
                  <div key={key}>
                    <div style={{ fontSize: 9, color: COLORS.textMuted, marginBottom: 3, letterSpacing: "0.06em" }}>{lbl.toUpperCase()}</div>
                    <input type={type} value={profile[key]} placeholder={ph}
                      onChange={e => setProfile(p => ({ ...p, [key]: e.target.value }))} style={inputStyle} />
                  </div>
                ))}
              </div>
              <div style={{ marginTop: 9 }}>
                <div style={{ fontSize: 9, color: COLORS.textMuted, marginBottom: 5, letterSpacing: "0.06em" }}>SEX</div>
                <div style={{ display: "flex", gap: 6 }}>
                  {[["female", "Femeie"], ["male", "Bărbat"], ["other", "Altul"]].map(([val, lbl]) => (
                    <button key={val} onClick={() => setProfile(p => ({ ...p, gender: val }))} style={toggleBtn(profile.gender === val)}>{lbl}</button>
                  ))}
                </div>
              </div>
              <div style={{ marginTop: 9 }}>
                <div style={{ fontSize: 9, color: COLORS.textMuted, marginBottom: 4, letterSpacing: "0.06em" }}>NIVEL DE ACTIVITATE DE BAZĂ</div>
                <select value={profile.activityLevel} onChange={e => setProfile(p => ({ ...p, activityLevel: e.target.value }))}
                  style={{ ...inputStyle, cursor: "pointer", appearance: "auto" }}>
                  <option value="sedentary">Sedentar (birou)</option>
                  <option value="lightly_active">Ușor activ (1-3x/săptămână)</option>
                  <option value="moderately_active">Moderat activ (3-5x/săptămână)</option>
                  <option value="very_active">Foarte activ (6-7x/săptămână)</option>
                </select>
              </div>
            </Card>

            {/* Program săptămânal */}
            <Card style={{ marginBottom: 12 }}>
              <SLabel>PROGRAM SĂPTĂMÂNAL DE ACTIVITATE</SLabel>
              <p style={{ fontSize: 10, color: COLORS.textMuted, margin: "0 0 10px", lineHeight: 1.6 }}>
                Setează activitatea pentru fiecare zi — ținta de calorii se ajustează automat pentru ziua de azi.
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
                {DAYS_KEYS.map((dayKey, idx) => {
                  const isToday = dayKey === todayKey;
                  const actId   = profile.weekSchedule?.[dayKey] || "rest";
                  const extra   = ACTIVITIES.find(a => a.id === actId)?.extra || 0;
                  return (
                    <div key={dayKey} style={{
                      display: "flex", alignItems: "center", gap: 8, padding: "7px 9px", borderRadius: 7,
                      border: `1px solid ${isToday ? COLORS.accent + "40" : COLORS.cardBorder}`,
                      background: isToday ? COLORS.accentGlow : "transparent",
                    }}>
                      <span style={{ fontSize: 11, minWidth: 38, color: isToday ? COLORS.accent : COLORS.textMuted, fontWeight: isToday ? 500 : 400 }}>
                        {DAYS[idx]}{isToday ? " ★" : ""}
                      </span>
                      <select value={actId} onChange={e => setDayActivity(dayKey, e.target.value)}
                        style={{
                          flex: 1, background: isToday ? COLORS.accentLight : COLORS.bgWarm,
                          border: `1px solid ${isToday ? COLORS.accent + "30" : COLORS.cardBorder}`,
                          borderRadius: 6, padding: "5px 9px", color: COLORS.text,
                          fontFamily: FONT, fontSize: 11, outline: "none", cursor: "pointer",
                        }}>
                        {ACTIVITIES.map(a => <option key={a.id} value={a.id}>{a.label}</option>)}
                      </select>
                      {extra > 0 && <span style={{ fontSize: 10, color: COLORS.accent, whiteSpace: "nowrap" }}>+{extra} kcal</span>}
                    </div>
                  );
                })}
              </div>
            </Card>

            {/* Obiective */}
            <Card style={{ marginBottom: 12 }}>
              <SLabel>OBIECTIVE — SELECTEAZĂ TOT CE SE APLICĂ</SLabel>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 6 }}>
                {GOALS.map(g => {
                  const active = profile.goals?.includes(g.id);
                  return <button key={g.id} onClick={() => toggleGoal(g.id)} style={toggleBtn(active)}>{active ? "✓ " : ""}{g.label}</button>;
                })}
              </div>
            </Card>

            {/* Condiții medicale */}
            <Card style={{ marginBottom: 12 }}>
              <SLabel>CONDIȚII MEDICALE</SLabel>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 6 }}>
                {CONDITIONS.map(c => {
                  const active = profile.conditions.includes(c.id);
                  return <button key={c.id} onClick={() => toggleCondition(c.id)} style={toggleBtn(active, COLORS.warn)}>{active ? "✓ " : ""}{c.label}</button>;
                })}
              </div>
              <div style={{ marginTop: 9 }}>
                <div style={{ fontSize: 9, color: COLORS.textMuted, marginBottom: 3, letterSpacing: "0.06em" }}>ALTE ALERGII / INTOLERANȚE</div>
                <input value={profile.allergies} onChange={e => setProfile(p => ({ ...p, allergies: e.target.value }))}
                  placeholder="ex: arahide, fructe de mare..." style={inputStyle} />
              </div>
            </Card>

            {/* Ținta calculată */}
            {tdee && (
              <Card style={{ marginBottom: 12, borderColor: COLORS.accent, background: COLORS.accentLight }}>
                <SLabel>ȚINTA TA ZILNICĂ</SLabel>
                <div style={{ fontSize: 28, fontFamily: FONT_DISPLAY, color: COLORS.accent }}>{tdee} <span style={{ fontSize: 12, color: COLORS.textMuted }}>kcal/zi</span></div>
                <div style={{ fontSize: 10, color: COLORS.textMuted, marginTop: 3 }}>
                  Proteine ~{proteinTarget}g · Carbohidrați ~{carbTarget}g · Grăsimi ~{fatTarget}g
                </div>
                {todayExtra > 0 && (
                  <div style={{ fontSize: 10, color: COLORS.accent, marginTop: 3 }}>
                    Include +{todayExtra} kcal pentru {todayActLabel} de azi
                  </div>
                )}
              </Card>
            )}

            <button onClick={() => { setProfileSaved(true); setTab("tracker"); }} style={{
              width: "100%", padding: "13px", borderRadius: 13, border: "none", cursor: "pointer",
              background: COLORS.accent, color: "white", fontFamily: FONT, fontSize: 13, fontWeight: 700,
              boxShadow: "0 4px 14px rgba(61,143,95,0.3)", letterSpacing: "0.01em",
            }}>Salvează Profilul și Începe Urmărirea →</button>
          </div>
        )}

        <div style={{ marginTop: 24, textAlign: "center", fontSize: 10, color: COLORS.textMuted, letterSpacing: "0.05em", fontFamily: FONT_MONO, display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
          {VegIllustrations.leaf(16)}
          NutriCare · Alimentat de AI · Nu înlocuiește sfatul medical
          {VegIllustrations.leaf(16)}
        </div>
      </div>
    </div>
  );
}
