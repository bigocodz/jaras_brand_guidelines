const header = document.querySelector("[data-site-header]");
const navLinks = Array.from(document.querySelectorAll(".site-nav a"));
const toast = document.querySelector("[data-toast]");
const languageToggle = document.querySelector("[data-lang-toggle]");
const currentLanguageLabel = document.querySelector("[data-current-lang]");
const guidebookGrid = document.querySelector("[data-guidebook-grid]");
const guideFilterButtons = Array.from(document.querySelectorAll("[data-guide-filter]"));
let toastTimer;
let currentLanguage = "ar";
let activeGuideFilter = "all";

const translations = {
  ar: {
    title: "دليل هوية جرس",
    metaDescription: "دليل هوية جرس للعلامة التجارية: الشعار، الألوان، الخطوط، العناصر البصرية، النمط، وتطبيقات الهوية.",
    switchLanguage: "Switch to English",
    switchLabel: "EN",
    copied: (value) => `تم نسخ ${value}`,
    brandHome: "العودة إلى بداية دليل جرس",
    primaryNav: "التنقل الرئيسي",
    heroVisual: "نموذج بطاقة عمل جرس",
    brandOverview: "نظرة عامة على الهوية",
    brandValues: "قيم العلامة",
    logoRules: "قواعد استخدام الشعار",
    patternBoard: "نمط نصف دائرة جرس",
    backToTop: "العودة إلى الأعلى",
    businessCardAlt: "نموذج بطاقة عمل جرس",
    logoAlt: "شعار جرس الأساسي",
    displayAlt: "تطبيق جرس على شاشة ضيافة",
    badgeAlt: "نموذج بطاقة تعريف جرس",
    toteAlt: "نموذج حقيبة جرس",
    laptopAlt: "نموذج حملة رقمية لجرس",
    flagsAlt: "نموذج أعلام جرس",
    mobileAlt: "نموذج تطبيق جوال جرس",
    rollupAlt: "نموذج رول أب جرس",
    navWho: "من نحن",
    navGuidebook: "الدليل الكامل",
    navLogo: "الشعار",
    navColors: "الألوان",
    navTypography: "الخطوط",
    navApplications: "التطبيقات",
    downloadPdf: "PDF",
    heroTitle: "دليل هوية جرس",
    heroCopy: "نظام هوية لقطاع الضيافة يرتكز على إشارة واضحة: تشغيل أحدث، تجربة ضيف لا تنسى، ولغة بصرية تبدأ من علامة جرس.",
    viewFullGuide: "استعراض الدليل الكامل",
    viewSystem: "النظام البصري",
    viewMockups: "التطبيقات",
    identityKicker: "الهوية",
    introTitle: "مصممة لتحديث تجربة الضيافة.",
    introCopy: "تمكّن جرس ملاك مرافق الإقامة والفنادق من تقديم خدمة استثنائية، ورفع كفاءة التشغيل، وصناعة تجربة ضيف لا تنسى.",
    guidebookKicker: "الدليل الكامل",
    guidebookTitle: "كل صفحات هوية جرس في تجربة واحدة.",
    guidebookCopy: "استعرض الصفحات الأصلية من ملف الهوية، مرتبة حسب الأقسام حتى يسهل الوصول إلى الشعار، الألوان، الخطوط، النمط، وتطبيقات الهوية.",
    guidebookFilters: "تصفية صفحات الدليل",
    filterAll: "الكل",
    filterFoundation: "الأساسيات",
    filterLogo: "الشعار",
    filterSystem: "النظام البصري",
    filterApplications: "التطبيقات",
    pageLabel: "دليل الهوية",
    pageNo: "صفحة رقم",
    whoKicker: "من نحن",
    whoTitle: "الرؤية، الرسالة، والقيم",
    visionTitle: "رؤيتنا",
    visionCopy: "قيادة تحديث قطاع الضيافة عبر حلول مبتكرة ترفع كفاءة التشغيل، وتحسّن تجربة الضيف، وتزيد الإيرادات، وتدعم الاستدامة.",
    missionTitle: "رسالتنا",
    missionCopy: "تمكين ملاك مرافق الإقامة والفنادق من تقديم خدمة استثنائية تقود إلى تجربة ضيافة لا تنسى.",
    valueInnovationTitle: "الابتكار",
    valueInnovationCopy: "نوظف التقنية المتقدمة لنقود تحول قطاع الضيافة بخطوات أسرع.",
    valueCreativityTitle: "الإبداع",
    valueCreativityCopy: "نصمم أدوات فعالة ومختلفة تمنح عملاءنا حلولاً عملية ومميزة.",
    valueProfessionalTitle: "الاحترافية",
    valueProfessionalCopy: "نلتزم بالتميز والموثوقية والنزاهة في كل ما نقدمه.",
    valueHospitalityTitle: "الضيافة",
    valueHospitalityCopy: "نضع التجربة الاستثنائية للعميل والضيف في قلب كل قرار.",
    visualKicker: "النمط البصري",
    visualTitle: "نظام من الإشارة، المساحة، وإيقاع نصف الدائرة.",
    halfTitle: "عنصر نصف الدائرة",
    halfCopy: "العنصر الأساسي يتكرر من الشعار إلى التخطيط، النمط، والحملات.",
    motionTitle: "حركة دقيقة",
    motionCopy: "ميل بسيط يمنح العلامة حضوراً عملياً وجاهزاً للخدمة.",
    patternMiniTitle: "نمط مرن",
    patternMiniCopy: "وحدات قابلة للتكرار تعزز حضور العلامة دون مزاحمة المحتوى.",
    logoKicker: "الشعار",
    logoTitle: "الشعار الأساسي وقواعد الاستخدام",
    clearSpaceTitle: "المساحة الآمنة",
    clearSpaceCopy: "اترك مساحة حماية حول الشعار ليبقى القفل الثنائي واضحاً ومقروءاً.",
    noEffectsTitle: "بدون مؤثرات",
    noEffectsCopy: "لا تضف ظلالاً أو توهجاً أو فلاتر أو أي معالجة إضافية للشعار.",
    noDistortionTitle: "بدون تشويه",
    noDistortionCopy: "لا تمدد الشعار أو تضغطه أو تديره أو تعيد رسمه بصيغة جديدة.",
    contrastTitle: "التباين أولاً",
    contrastCopy: "اختر نسخة الشعار المناسبة فقط عندما تضمن الخلفية وضوح القراءة.",
    colorsKicker: "ألوان العلامة",
    colorsTitle: "لوحة أساسية مع ألوان داعمة",
    mainColor: "رئيسي",
    supportColor: "داعم",
    typeKicker: "الخطوط",
    typeTitle: "هرمية ثنائية اللغة",
    forTitles: "للعناوين",
    forParagraphs: "للفقرات",
    sampleArabic: "العربية",
    sampleArabicTitle: "العنوان يكتب هنا",
    sampleArabicCopy: "هذا النص هو مثال لنص يمكن أن يستبدل في نفس المساحة، حيث يمكن أن يزيد عدد الحروف بحسب احتياج التصميم.",
    sampleEnglish: "English",
    sampleEnglishTitle: "Title Here",
    sampleEnglishCopy: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt.",
    elementsKicker: "عناصر العلامة",
    elementsTitle: "نصف الدائرة هو الرابط البصري للهوية.",
    elementsCopy: "يظهر العنصر الرئيسي مرات متعددة داخل الشعار، لذلك يشكّل أساساً طبيعياً للأنماط، التخطيطات، المنشورات، والتطبيقات المكانية.",
    applicationsKicker: "معرض الإلهام",
    applicationsTitle: "تطبيقات الهوية عبر نقاط التواصل",
    mockupFeatureTitle: "عندما ترن، نحن هنا لخدمتك",
    mockupFeatureCopy: "يتسع النظام من الواجهات الرقمية الصغيرة إلى المساحات الواقعية مع الحفاظ على منطق اللون، الخط، وإشارة نصف الدائرة.",
    captionBusinessCard: "بطاقة عمل",
    captionBadge: "بطاقة تعريف",
    captionTote: "حقيبة",
    captionDigital: "رقمي",
    captionFlags: "أعلام",
    captionMobile: "جوال",
    captionRollup: "رول أب",
  },
  en: {
    title: "jaras Brand Guidelines",
    metaDescription: "Jaras brand guidelines for logo, colors, typography, visual elements, pattern, and mockup applications.",
    switchLanguage: "التبديل إلى العربية",
    switchLabel: "ع",
    copied: (value) => `${value} copied`,
    brandHome: "jaras brand guidelines home",
    primaryNav: "Primary navigation",
    heroVisual: "jaras business card mockup",
    brandOverview: "Brand overview",
    brandValues: "Brand values",
    logoRules: "Logo usage rules",
    patternBoard: "jaras half-circle pattern",
    backToTop: "Back to top",
    businessCardAlt: "jaras business card mockup",
    logoAlt: "jaras primary logo",
    displayAlt: "jaras hospitality display mockup",
    badgeAlt: "jaras lanyard badge mockup",
    toteAlt: "jaras tote bag mockup",
    laptopAlt: "jaras laptop campaign mockup",
    flagsAlt: "jaras flags mockup",
    mobileAlt: "jaras mobile app mockup",
    rollupAlt: "jaras rollup banner mockup",
    navWho: "Who We Are",
    navGuidebook: "Full Guide",
    navLogo: "Logo",
    navColors: "Colors",
    navTypography: "Typography",
    navApplications: "Applications",
    downloadPdf: "PDF",
    heroTitle: "jaras Brand Guidelines",
    heroCopy: "A hospitality identity system built around a clear signal: modern operations, memorable guest experiences, and a visual language anchored by the jaras mark.",
    viewFullGuide: "View Full Guide",
    viewSystem: "View System",
    viewMockups: "Mockups",
    identityKicker: "Identity",
    introTitle: "Built for hospitality modernization.",
    introCopy: "Jaras enables accommodation and hotel owners to provide exceptional service, improve operational efficiency, and create unforgettable guest experiences.",
    guidebookKicker: "Full Guideline",
    guidebookTitle: "Every Jaras guideline page in one experience.",
    guidebookCopy: "Browse the original identity pages grouped by section, making logo, color, typography, pattern, social, and mockup guidance easy to reach.",
    guidebookFilters: "Filter guideline pages",
    filterAll: "All",
    filterFoundation: "Foundation",
    filterLogo: "Logo",
    filterSystem: "Visual System",
    filterApplications: "Applications",
    pageLabel: "Brand guidelines",
    pageNo: "Page No.",
    whoKicker: "Who We Are",
    whoTitle: "Vision, mission, and values",
    visionTitle: "Our Vision",
    visionCopy: "Lead the modernization of the hospitality sector through innovative solutions that increase efficiency, improve guest experiences, raise revenue, and promote sustainability.",
    missionTitle: "Our Mission",
    missionCopy: "Enable accommodation and hotel owners to provide exceptional service that leads to an unforgettable guest experience.",
    valueInnovationTitle: "Innovation",
    valueInnovationCopy: "We leverage cutting-edge technology to stay ahead in transforming hospitality.",
    valueCreativityTitle: "Creativity",
    valueCreativityCopy: "Our approach encourages out-of-the-box thinking and effective tools.",
    valueProfessionalTitle: "Professional",
    valueProfessionalCopy: "We deliver excellence, reliability, and integrity in everything we do.",
    valueHospitalityTitle: "Hospitality",
    valueHospitalityCopy: "We prioritize exceptional experiences for clients and their guests.",
    visualKicker: "Visual Style",
    visualTitle: "A system of signal, space, and half-circle rhythm.",
    halfTitle: "Half-circle element",
    halfCopy: "The core element repeats from the logo into layout, pattern, and campaigns.",
    motionTitle: "Subtle motion",
    motionCopy: "A modest angled construction gives the mark a forward, service-ready posture.",
    patternMiniTitle: "Modular pattern",
    patternMiniCopy: "Pattern units extend brand recognition without competing with content.",
    logoKicker: "Logo",
    logoTitle: "Primary lockup and usage rules",
    clearSpaceTitle: "Clear Space",
    clearSpaceCopy: "Keep protective space around the logo so the bilingual lockup remains legible.",
    noEffectsTitle: "No Effects",
    noEffectsCopy: "Do not add shadows, glows, filters, or extra treatments to the logo.",
    noDistortionTitle: "No Distortion",
    noDistortionCopy: "Do not stretch, compress, rotate, or redraw the lockup.",
    contrastTitle: "Contrast First",
    contrastCopy: "Choose logo variations only where background contrast supports readability.",
    colorsKicker: "Brand Colors",
    colorsTitle: "Core palette and support accents",
    mainColor: "Main",
    supportColor: "Support",
    typeKicker: "Typography",
    typeTitle: "Bilingual hierarchy",
    forTitles: "For Titles",
    forParagraphs: "For Paragraphs",
    sampleArabic: "Arabic",
    sampleArabicTitle: "العنوان يكتب هنا",
    sampleArabicCopy: "هذا النص هو مثال لنص يمكن أن يستبدل في نفس المساحة، حيث يمكن أن يزيد عدد الحروف بحسب احتياج التصميم.",
    sampleEnglish: "English",
    sampleEnglishTitle: "Title Here",
    sampleEnglishCopy: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt.",
    elementsKicker: "Brand Elements",
    elementsTitle: "The half-circle is the connective tissue.",
    elementsCopy: "The primary element appears repeatedly in the logo, making it the natural foundation for patterns, layouts, social posts, and environmental graphics.",
    applicationsKicker: "Inspiration Gallery",
    applicationsTitle: "Applications across touchpoints",
    mockupFeatureTitle: "When You Ring, We're Here to Serve",
    mockupFeatureCopy: "The system scales from compact digital layouts to physical spaces while preserving the same color logic, typography, and half-circle gesture.",
    captionBusinessCard: "Business Card",
    captionBadge: "Badge",
    captionTote: "Tote Bag",
    captionDigital: "Digital",
    captionFlags: "Flags",
    captionMobile: "Mobile",
    captionRollup: "Rollup",
  },
};

const guidePages = [
  { page: 1, category: "foundation", ar: "غلاف دليل الهوية", en: "Brand Guidelines Cover" },
  { page: 2, category: "foundation", ar: "المحتويات", en: "Contents" },
  { page: 3, category: "foundation", ar: "من نحن", en: "Who We Are" },
  { page: 4, category: "foundation", ar: "رؤيتنا", en: "Our Vision" },
  { page: 5, category: "foundation", ar: "رسالتنا", en: "Our Mission" },
  { page: 6, category: "system", ar: "النمط البصري", en: "Visual Style" },
  { page: 7, category: "foundation", ar: "قيم العلامة", en: "Our Values" },
  { page: 8, category: "system", ar: "بنية الأيقونة", en: "Icon Structure" },
  { page: 9, category: "system", ar: "بنية الكتابة", en: "Type Structure" },
  { page: 10, category: "logo", ar: "الشعار الأساسي - أفقي", en: "Main Logo - Horizontal" },
  { page: 11, category: "logo", ar: "الشعار الأساسي - عمودي", en: "Main Logo - Vertical" },
  { page: 12, category: "logo", ar: "المساحة الآمنة", en: "Clear Space" },
  { page: 13, category: "logo", ar: "استخدامات الشعار الخاطئة", en: "Logo Misuse" },
  { page: 14, category: "logo", ar: "مواضع الشعار", en: "Logo Placements" },
  { page: 15, category: "system", ar: "شبكة التخطيط", en: "Grid System" },
  { page: 16, category: "system", ar: "ألوان العلامة", en: "Brand Colors" },
  { page: 17, category: "logo", ar: "تنويعات لون الشعار", en: "Logo Color Variation" },
  { page: 18, category: "system", ar: "الخطوط", en: "Typography" },
  { page: 19, category: "system", ar: "عناصر العلامة", en: "Brand Elements" },
  { page: 20, category: "system", ar: "النمط", en: "Pattern" },
  { page: 21, category: "applications", ar: "معرض الإلهام", en: "Inspiration Gallery" },
  { page: 22, category: "applications", ar: "وسائل التواصل الاجتماعي", en: "Social Media" },
  { page: 23, category: "applications", ar: "بطاقة العمل", en: "Business Card Mockup" },
  { page: 24, category: "applications", ar: "بطاقة التعريف", en: "Badge Mockup" },
  { page: 25, category: "applications", ar: "حقيبة جرس", en: "Tote Bag Mockup" },
  { page: 26, category: "applications", ar: "تطبيق الحاسب", en: "Laptop Mockup" },
  { page: 27, category: "applications", ar: "الأعلام", en: "Flags Mockup" },
  { page: 28, category: "applications", ar: "تطبيق الواجهة الرقمية", en: "Website Application" },
  { page: 29, category: "applications", ar: "تطبيق الجوال", en: "Mobile Mockup" },
  { page: 30, category: "applications", ar: "شاشة داخلية", en: "Display Mockup" },
  { page: 31, category: "applications", ar: "رول أب", en: "Rollup Mockup" },
];

function updateHeader() {
  header.classList.toggle("is-scrolled", window.scrollY > 12);
}

function activateLink(hash, reveal = false) {
  if (!hash) return;
  const activeLink = navLinks.find((link) => link.hash === hash);
  if (!activeLink) return;

  navLinks.forEach((link) => {
    link.classList.toggle("is-active", link === activeLink);
  });

  if (reveal) {
    activeLink.scrollIntoView({ block: "nearest", inline: "center" });
  }
}

function showToast(message) {
  if (!toast) return;
  toast.textContent = message;
  toast.classList.add("is-visible");
  window.clearTimeout(toastTimer);
  toastTimer = window.setTimeout(() => {
    toast.classList.remove("is-visible");
  }, 1400);
}

function renderGuidebook() {
  if (!guidebookGrid) return;
  const dictionary = translations[currentLanguage] || translations.ar;
  const pages = guidePages.filter((item) => activeGuideFilter === "all" || item.category === activeGuideFilter);

  guidebookGrid.replaceChildren();

  pages.forEach((item) => {
    const pageNumber = String(item.page).padStart(2, "0");
    const title = item[currentLanguage] || item.en;
    const card = document.createElement("article");
    card.className = "guide-page-card";
    card.dataset.category = item.category;

    const meta = document.createElement("div");
    meta.className = "guide-page-meta";

    const titleBlock = document.createElement("div");
    const label = document.createElement("span");
    label.className = "guide-page-label";
    label.textContent = dictionary.pageLabel;
    const heading = document.createElement("h3");
    heading.textContent = title;
    titleBlock.append(label, heading);

    const number = document.createElement("span");
    number.className = "guide-page-number";
    number.textContent = `${dictionary.pageNo} ${pageNumber}`;

    const visual = document.createElement("a");
    visual.className = "guide-page-visual";
    visual.href = `assets/pages/jaras-guideline-${pageNumber}.jpg`;
    visual.target = "_blank";
    visual.rel = "noopener";
    visual.setAttribute("aria-label", `${dictionary.pageNo} ${pageNumber}: ${title}`);

    const image = document.createElement("img");
    image.src = `assets/pages/jaras-guideline-${pageNumber}.jpg`;
    image.alt = `${dictionary.pageNo} ${pageNumber}: ${title}`;
    image.loading = item.page <= 4 ? "eager" : "lazy";
    image.decoding = "async";
    visual.append(image);

    meta.append(titleBlock, number);
    card.append(meta, visual);
    guidebookGrid.append(card);
  });
}

function setGuideFilter(filter) {
  activeGuideFilter = filter || "all";
  guideFilterButtons.forEach((button) => {
    button.classList.toggle("is-active", button.dataset.guideFilter === activeGuideFilter);
  });
  renderGuidebook();
}

function applyLanguage(language) {
  const dictionary = translations[language] || translations.ar;
  currentLanguage = language;
  document.documentElement.lang = language;
  document.documentElement.dir = language === "ar" ? "rtl" : "ltr";
  document.title = dictionary.title;

  const description = document.querySelector('meta[name="description"]');
  if (description) {
    description.setAttribute("content", dictionary.metaDescription);
  }

  document.querySelectorAll("[data-i18n]").forEach((element) => {
    const key = element.getAttribute("data-i18n");
    if (typeof dictionary[key] === "string") {
      element.textContent = dictionary[key];
    }
  });

  document.querySelectorAll("[data-i18n-alt]").forEach((element) => {
    const key = element.getAttribute("data-i18n-alt");
    if (typeof dictionary[key] === "string") {
      element.setAttribute("alt", dictionary[key]);
    }
  });

  document.querySelectorAll("[data-i18n-aria]").forEach((element) => {
    const key = element.getAttribute("data-i18n-aria");
    if (typeof dictionary[key] === "string") {
      element.setAttribute("aria-label", dictionary[key]);
    }
  });

  if (languageToggle && currentLanguageLabel) {
    currentLanguageLabel.textContent = dictionary.switchLabel;
    languageToggle.setAttribute("aria-label", dictionary.switchLanguage);
  }

  renderGuidebook();
  activateLink(window.location.hash, true);
}

function setActiveLink(entries) {
  const visible = entries
    .filter((entry) => entry.isIntersecting)
    .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

  if (!visible) return;

  activateLink(`#${visible.target.id}`);
}

window.addEventListener("scroll", updateHeader, { passive: true });
window.addEventListener("hashchange", () => activateLink(window.location.hash, true));
updateHeader();
applyLanguage(currentLanguage);

languageToggle?.addEventListener("click", () => {
  applyLanguage(currentLanguage === "ar" ? "en" : "ar");
});

navLinks.forEach((link) => {
  link.addEventListener("click", () => activateLink(link.hash, true));
});

guideFilterButtons.forEach((button) => {
  button.addEventListener("click", () => setGuideFilter(button.dataset.guideFilter));
});

const observedSections = navLinks
  .map((link) => document.querySelector(link.hash))
  .filter(Boolean);

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(setActiveLink, {
    rootMargin: "-34% 0px -48% 0px",
    threshold: [0.1, 0.35, 0.6],
  });
  observedSections.forEach((section) => observer.observe(section));
}

document.querySelectorAll("[data-copy]").forEach((button) => {
  button.addEventListener("click", async () => {
    const value = button.getAttribute("data-copy");
    try {
      await navigator.clipboard.writeText(value);
      showToast(translations[currentLanguage].copied(value));
    } catch {
      showToast(value);
    }
  });
});
