import React, { useState } from "react";

const COLORS = {
  bg: "#0a0f0d",
  card: "#111a14",
  cardBorder: "#1e2e22",
  accent: "#4ade80",
  accentGlow: "rgba(74,222,128,0.15)",
  warn: "#fb923c",
  danger: "#f87171",
  text: "#e2f0e6",
  textMuted: "#6b8f74",
  textDim: "#9ab8a0",
};

const FONT = "'DM Mono', 'Courier New', monospace";
const FONT_DISPLAY = "'Playfair Display', Georgia, serif";

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
    <div style={{ marginBottom: 9 }}>
      <div style={{ display: "flex", justifyContent: "space-between", fontSize: 10, color: COLORS.textMuted, marginBottom: 3, fontFamily: FONT }}>
        <span>{label}</span><span style={{ color: COLORS.textDim }}>{value}g / {max}g</span>
      </div>
      <div style={{ background: "#1a2b1e", borderRadius: 4, height: 5, overflow: "hidden" }}>
        <div style={{
          height: "100%", borderRadius: 4, width: `${pct}%`,
          background: pct > 90 ? COLORS.danger : pct > 70 ? COLORS.warn : color,
          transition: "width 0.5s ease", boxShadow: `0 0 6px ${color}60`,
        }} />
      </div>
    </div>
  );
}

function Card({ children, style = {} }) {
  return <div style={{ background: COLORS.card, border: `1px solid ${COLORS.cardBorder}`, borderRadius: 12, padding: "16px 18px", ...style }}>{children}</div>;
}

function SLabel({ children }) {
  return <div style={{ fontSize: 9, color: COLORS.textMuted, letterSpacing: "0.1em", marginBottom: 8 }}>{children}</div>;
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

  const inputStyle = {
    background: "#0d1810", border: `1px solid ${COLORS.cardBorder}`, borderRadius: 7,
    padding: "8px 12px", color: COLORS.text, fontFamily: FONT, fontSize: 12,
    width: "100%", boxSizing: "border-box", outline: "none",
  };

  const tabBtn = (active) => ({
    padding: "6px 14px", borderRadius: 20, cursor: "pointer", fontFamily: FONT, fontSize: 11,
    border: active ? `1px solid ${COLORS.accent}40` : "1px solid transparent",
    background: active ? COLORS.accentGlow : "transparent",
    color: active ? COLORS.accent : COLORS.textMuted, transition: "all 0.2s",
  });

  const toggleBtn = (active, color = COLORS.accent) => ({
    padding: "7px 11px", borderRadius: 7, cursor: "pointer", textAlign: "left",
    border: `1px solid ${active ? color + "50" : COLORS.cardBorder}`,
    background: active ? `${color}14` : "transparent",
    color: active ? color : COLORS.textMuted, fontFamily: FONT, fontSize: 11, transition: "all 0.2s",
  });

  return (
    <div style={{
      minHeight: "100vh", background: COLORS.bg, color: COLORS.text, fontFamily: FONT, padding: "22px 14px",
      backgroundImage: "radial-gradient(ellipse at 15% 15%, rgba(74,222,128,0.05) 0%, transparent 55%)",
    }}>
      <link href="https://fonts.googleapis.com/css2?family=DM+Mono:wght@300;400;500&family=Playfair+Display:wght@400;700&display=swap" rel="stylesheet" />
      <div style={{ maxWidth: 680, margin: "0 auto" }}>

        {/* ── Header ── */}
        <div style={{ marginBottom: 22, borderBottom: `1px solid ${COLORS.cardBorder}`, paddingBottom: 16 }}>
          <div style={{ display: "flex", alignItems: "baseline", gap: 10 }}>
            <h1 style={{ fontFamily: FONT_DISPLAY, fontSize: 26, fontWeight: 700, margin: 0, color: COLORS.accent }}>NutriCare</h1>
            <span style={{ fontSize: 10, color: COLORS.textMuted, letterSpacing: "0.1em" }}>TRACKER NUTRIȚIONAL AI</span>
          </div>
          {profileSaved && profile.name && (
            <p style={{ margin: "4px 0 0", fontSize: 11, color: COLORS.textMuted }}>
              Bună, <span style={{ color: COLORS.textDim }}>{profile.name}</span> · Azi ({getTodayDisplayDay()}): <span style={{ color: COLORS.accent }}>{todayActLabel}</span>
              {profile.goals?.length > 0 && <> · {profile.goals.map(g => GOALS.find(x => x.id === g)?.label).filter(Boolean).join(", ")}</>}
            </p>
          )}
        </div>

        {/* ── Tabs ── */}
        <div style={{ display: "flex", gap: 6, marginBottom: 18, flexWrap: "wrap" }}>
          {[["tracker", "Jurnal Azi"], ["advisor", "Sfaturi AI"], ["profile", "Profilul Meu"]].map(([id, lbl]) => (
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
                marginBottom: 8, padding: "9px 14px", borderRadius: 8,
                border: `1px solid ${COLORS.accent}30`, background: COLORS.accentGlow,
                display: "flex", alignItems: "center", justifyContent: "space-between",
              }}>
                <span style={{ fontSize: 11, color: COLORS.accent }}>🏃 Azi: {todayActLabel}</span>
                <span style={{ fontSize: 11, color: COLORS.accent }}>+{todayExtra} kcal arse</span>
              </div>
            )}

            {/* Tomorrow banner */}
            {tomorrowIsActive && (
              <div style={{
                marginBottom: 10, padding: "9px 14px", borderRadius: 8,
                border: `1px solid ${COLORS.warn}30`, background: `${COLORS.warn}0d`,
                display: "flex", alignItems: "center", justifyContent: "space-between",
              }}>
                <span style={{ fontSize: 11, color: COLORS.warn }}>⚡ Mâine ({tomorrowDisplayDay}): {tomorrowActLabel}</span>
                <span style={{ fontSize: 10, color: COLORS.textMuted }}>pregătire activă</span>
              </div>
            )}

            {/* Calorie ring */}
            {tdee && (
              <Card style={{ marginBottom: 12, display: "flex", gap: 18, alignItems: "center", flexWrap: "wrap" }}>
                <div style={{ position: "relative", width: 82, height: 82, flexShrink: 0 }}>
                  <svg width="82" height="82" viewBox="0 0 82 82">
                    <circle cx="41" cy="41" r="32" fill="none" stroke="#1a2b1e" strokeWidth="7" />
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
                  <div style={{ fontSize: 20, fontFamily: FONT_DISPLAY, color: COLORS.text }}>
                    {totalCals} <span style={{ fontSize: 11, color: COLORS.textMuted }}>kcal consumate</span>
                  </div>
                  <div style={{ fontSize: 10, color: COLORS.textMuted, marginBottom: 2 }}>
                    Țintă zilnică: <span style={{ color: COLORS.textDim }}>{tdee} kcal</span>
                    {todayExtra > 0 && <span style={{ color: COLORS.accent }}> (incl. {todayExtra} kcal activitate)</span>}
                  </div>
                  <div style={{ fontSize: 10, color: calsLeft > 0 ? COLORS.textDim : COLORS.danger, marginBottom: 8 }}>
                    {calsLeft > 0 ? `✓ Mai ai ${calsLeft} kcal disponibile` : `⚠ Ai depășit cu ${Math.abs(calsLeft || 0)} kcal`}
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
                <div style={{ fontSize: 10, color: COLORS.textMuted, marginBottom: 8, padding: "6px 9px", background: "#0d1810", borderRadius: 5, borderLeft: `2px solid ${COLORS.accent}50` }}>
                  {todayExtra > 0 && <div>💪 Ai făcut <span style={{ color: COLORS.accent }}>{todayActLabel}</span> azi — analiza recomandă proteine și carbohidrați pentru recuperare.</div>}
                  {tomorrowIsActive && <div style={{ marginTop: todayExtra > 0 ? 4 : 0 }}>⚡ Mâine ai <span style={{ color: COLORS.warn }}>{tomorrowActLabel}</span> — analiza va sugera și alimente pentru pregătire (carbo-loading, hidratare).</div>}
                </div>
              )}
              <div style={{ display: "flex", gap: 7 }}>
                <input value={mealInput} onChange={e => setMealInput(e.target.value)}
                  onKeyDown={e => e.key === "Enter" && analyzeMeal()}
                  placeholder="ex: 2 ouă cu pâine prăjită și cafea..."
                  style={{ ...inputStyle, flex: 1 }} />
                <button onClick={analyzeMeal} disabled={analyzing || !mealInput.trim()} style={{
                  padding: "8px 13px", borderRadius: 7, border: "none", cursor: "pointer",
                  background: analyzing ? "#1a2b1e" : COLORS.accent,
                  color: analyzing ? COLORS.textMuted : "#0a0f0d",
                  fontFamily: FONT, fontSize: 11, fontWeight: 500, whiteSpace: "nowrap",
                }}>{analyzing ? "Se analizează..." : "Analizează →"}</button>
              </div>

              {mealAnalysis && !mealAnalysis.error && (
                <div style={{ marginTop: 11, padding: 13, background: "#0d1810", borderRadius: 8, border: `1px solid ${COLORS.cardBorder}` }}>
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
                    width: "100%", padding: "7px", borderRadius: 6, border: `1px solid ${COLORS.accent}40`,
                    background: COLORS.accentGlow, color: COLORS.accent, fontFamily: FONT, fontSize: 11, cursor: "pointer",
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
              <div style={{ textAlign: "center", padding: "34px 0", color: COLORS.textMuted, fontSize: 11 }}>
                <div style={{ fontSize: 24, marginBottom: 6 }}>🥗</div>
                Înregistrează prima masă de mai sus
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
                padding: "9px 16px", borderRadius: 7, border: "none", cursor: "pointer",
                background: aiLoading ? "#1a2b1e" : COLORS.accent,
                color: aiLoading ? COLORS.textMuted : "#0a0f0d",
                fontFamily: FONT, fontSize: 11, fontWeight: 500,
              }}>{aiLoading ? "Se generează..." : "✦ Obține Sfaturile Mele"}</button>
            </Card>
            {aiAdvice && (
              <Card>
                <SLabel>✦ SFATURILE TALE PERSONALIZATE</SLabel>
                <div style={{ fontSize: 12, color: COLORS.textDim, lineHeight: 1.9, whiteSpace: "pre-wrap" }}>{aiAdvice}</div>
              </Card>
            )}
            {!aiAdvice && !aiLoading && (
              <div style={{ textAlign: "center", padding: "34px 0", color: COLORS.textMuted, fontSize: 11 }}>
                <div style={{ fontSize: 24, marginBottom: 6 }}>🤖</div>
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
                  style={{ ...inputStyle, cursor: "pointer" }}>
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
                          flex: 1, background: isToday ? "#0e1c10" : "#0d1810",
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
              <Card style={{ marginBottom: 12, borderColor: `${COLORS.accent}30` }}>
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
              width: "100%", padding: "11px", borderRadius: 8, border: "none", cursor: "pointer",
              background: COLORS.accent, color: "#0a0f0d", fontFamily: FONT, fontSize: 12, fontWeight: 500,
            }}>Salvează Profilul și Începe Urmărirea →</button>
          </div>
        )}

        <div style={{ marginTop: 20, textAlign: "center", fontSize: 9, color: COLORS.textMuted, letterSpacing: "0.05em" }}>
          NutriCare · Alimentat de AI · Nu înlocuiește sfatul medical
        </div>
      </div>
    </div>
  );
}

