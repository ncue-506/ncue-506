(function () {
  const publications = Array.isArray(window.PUBLICATIONS) ? window.PUBLICATIONS : [];
  const header = document.querySelector("[data-header]");
  const list = document.querySelector("#publication-list");
  const searchInput = document.querySelector("#publication-search");
  const yearFilter = document.querySelector("#year-filter");
  const typeFilter = document.querySelector("#type-filter");
  const resetButton = document.querySelector("#reset-publications");
  const toggleButton = document.querySelector("#toggle-publications");
  const resultCount = document.querySelector("#publication-result-count");
  const publicationCount = document.querySelector("[data-publication-count]");
  const languageButtons = document.querySelectorAll("[data-language-option]");
  const initialPublicationLimit = 5;
  const languageStorageKey = "ncue506-language";
  let publicationsExpanded = false;
  let currentLanguage = getInitialLanguage();

  const translations = {
    zh: {
      pageTitle: "廖錦文 教授 | 國立彰化師範大學",
      metaDescription: "廖錦文教授研究室網站，整理教授資訊、研究方向、實驗室空間與 ORCID 研究發表。",
      skipLink: "跳到主要內容",
      siteName: "廖錦文 教授",
      mainNavLabel: "主要導覽",
      navAbout: "關於",
      navResearch: "研究方向",
      navPublications: "研究發表",
      navPublicationsCompact: "發表",
      navLab: "實驗室",
      languageSwitchLabel: "語言選擇",
      professorInfoLabel: "教授資訊",
      profileAlt: "廖錦文教授照片",
      authorName: "廖錦文",
      authorSecondaryName: "Chin-Wen Liao",
      position: "教授<br>國立彰化師範大學<br>電機與機械科技學系",
      emailLabel: "電子郵件",
      officePhoneLabel: "辦公室電話",
      officeHoursLabel: "晤談時間",
      officeHoursValue: "星期四 1-2、8-9 節",
      kicker: "國立彰化師範大學",
      aboutHeading: "關於",
      aboutParagraphOne: "本研究室由廖錦文教授主持。廖教授於國立臺灣師範大學取得工業教育碩士與博士學位，目前任教於國立彰化師範大學電機與機械科技學系。研究室長期關注技術及職業教育如何回應工程現場與產業轉型，並把師資培育、課程教學、組織學習、能源與環境教育、電機控制、嵌入式系統與工程實作連成可被教學現場採用的研究脈絡。",
      aboutParagraphTwo: "我們關心的不只是學生是否完成作品，而是能否理解規格、建立驗證方法、讀懂量測資料，並在真實限制下做出可靠設計。近年的工作圍繞電動車人才能力、Industry 4.0 維修能力、Verification IP、SPI/SMBus/I2C 協定教學、Microchip MCU 實作平台、ModuLab 環境監測與 VR/AI 輔助教學等主題展開。",
      professorNote: "研究室希望學生在做中學，也在驗證中學。每一次接線、量測、問卷設計、資料分析與系統修正，都應該累積成能被說明、被檢驗、也能帶到下一個問題的工程能力。",
      researchHeading: "研究方向",
      interestVocational: "技術及職業教育",
      interestTeacher: "師資培育、課程教學與組織學習",
      interestControl: "電機控制與工程實作",
      interestEmbedded: "嵌入式系統教育：SPI、SMBus、I2C 與 MCU 實驗平台",
      interestVerification: "Verification IP、UVM 與 AI 輔助驗證流程",
      interestEV: "電動車人才能力與永續移動",
      interestSensing: "模組化感測平台與環境監測",
      themesHeading: "研究主題",
      themeIndicatorsHeading: "能力指標與決策框架",
      themeIndicatorsBody: "研究室以 Delphi、AHP、DEMATEL 與一致性檢核等方法，把產業現場需要的能力轉化為可討論、可排序的指標架構。這條研究線延伸到 Industry 4.0 維修能力、電動車銷售與維修人才、離岸風電水下焊接、CNC 產業競爭力與技職競賽能力，目的不是只列出能力清單，而是協助學校、產業與訓練單位判斷哪些能力應優先投入。",
      themeEmbeddedHeading: "嵌入式系統與晶片教育",
      themeEmbeddedBody: "晶片與嵌入式系統研究聚焦在「讓學生看得懂規格，也能做出可驗證的系統」。相關工作包含 SPI protocol 的 UVM 驗證、SMBus 教學架構、AI-assisted Verification IP synthesis，以及以 Microchip MCU 平台支援的協定與感測實作。這些題目共同指向一件事：把抽象的硬體協定、測試平台與驗證流程，轉成能在課堂與研究室中反覆演練的工程方法。",
      themeLabHeading: "實驗室平台與環境監測",
      themeLabBody: "ModuLab 研究從實驗室環境監測出發，建立可插拔、可擴充、可長時間運作的模組化感測平台。平台結合 MCU、I2C 感測模組、資料紀錄與即時視覺化，讓溫度、濕度、光照、pH 等訊號能被穩定收集與解讀。對研究室而言，這不只是設備開發，而是一種 proof-of-concept 訓練：學生必須同時處理硬體接線、資料品質、系統穩定性與使用情境。",
      themeDigitalHeading: "數位、VR 與 AI 輔助教學",
      themeDigitalBody: "在技職教育現場，數位工具必須回到學習成效與實作能力本身。研究室曾以 VR 融入車身電系綜合維修實習，探討學生探究實作能力與學習成效；也從 text-to-image 生成技術、SMBus protocol education 與 DV-GPT 架構出發，思考 AI 如何協助學生理解抽象概念、形成設計方案與檢查自己的推論，而不是取代必要的實作訓練。",
      themeHumanHeading: "永續、人本設計與學習支持",
      themeHumanBody: "另一條研究線關注工程與教育如何服務真實的人。從電動車 ESG 人才能力、永續衛生設計與通用設計，到智慧障礙學生生涯發展、學生幽默因應與主觀幸福感、農業技職教育中的教師領導與學習成效，研究室持續把技術問題放回使用者、學習者與社會情境中檢視，讓工程教育不只追求功能，也重視責任與可持續性。",
      publicationsHeading: "研究發表",
      publicationsIntro: "本頁整理研究室近年發表紀錄，預設先顯示最新 5 筆；若預印本已有正式期刊版本，網站僅保留期刊紀錄。",
      publicationToolbarLabel: "發表篩選工具",
      searchLabel: "搜尋",
      searchPlaceholder: "SPI、電動車、技職教育",
      yearLabel: "年份",
      allYears: "全部年份",
      typeLabel: "類型",
      allTypes: "全部類型",
      resetButton: "清除",
      publishedIn: "出版來源：",
      venueMissing: "出版來源未列",
      yearMissing: "未列年份",
      noResults: "沒有符合條件的發表紀錄。",
      showMore: "展開更多（共 {count} 筆）",
      showLess: "收合至 5 筆",
      doiAria: "{title} 的 DOI 連結",
      recordFallback: "紀錄",
      labHeading: "實驗室空間",
      labIntro: "以下照片作為實驗室工作環境的紀錄：包含教學桌面、控制面板、接線練習、量測設備與相關輔助系統。",
      labGridLabel: "實驗室照片",
      labPhotoOneAlt: "實驗室教學桌、設備與書櫃全景",
      labPhotoOneCaption: "教學桌面與設備配置。",
      labPhotoTwoAlt: "實驗室控制設備與工作台",
      labPhotoTwoCaption: "控制設備與工作台。",
      labPhotoThreeAlt: "實驗室量測設備與接線板",
      labPhotoThreeCaption: "量測設備與接線練習。",
      labPhotoFourAlt: "控制面板與電機設備近景",
      labPhotoFourCaption: "控制面板與電機設備近景。",
      footer: "廖錦文 教授 / 國立彰化師範大學"
    },
    en: {
      pageTitle: "Professor Chin-Wen Liao | National Changhua University of Education",
      metaDescription: "A static lab website for Professor Chin-Wen Liao, presenting professor information, research directions, lab space, and ORCID publication records.",
      skipLink: "Skip to main content",
      siteName: "Professor Chin-Wen Liao",
      mainNavLabel: "Main navigation",
      navAbout: "About",
      navResearch: "Research",
      navPublications: "Publications",
      navPublicationsCompact: "Papers",
      navLab: "Lab",
      languageSwitchLabel: "Language selection",
      professorInfoLabel: "Professor information",
      profileAlt: "Portrait of Professor Chin-Wen Liao",
      authorName: "Chin-Wen Liao",
      authorSecondaryName: "Liao, Chin-Wen",
      position: "Professor<br>National Changhua University of Education<br>Department of Electrical and Mechanical Technology",
      emailLabel: "Email",
      officePhoneLabel: "Office Phone",
      officeHoursLabel: "Office Hours",
      officeHoursValue: "Thursday, periods 1-2 and 8-9",
      kicker: "National Changhua University of Education",
      aboutHeading: "About",
      aboutParagraphOne: "Led by Professor Chin-Wen Liao, the lab is based in the Department of Electrical and Mechanical Technology at National Changhua University of Education. Professor Liao received his master's and doctoral degrees in Industrial Education from National Taiwan Normal University. The lab studies how technical and vocational education can respond to engineering practice and industrial transformation, connecting teacher education, curriculum and instruction, organizational learning, energy and environmental education, electrical control, embedded systems, and engineering practice into research that can be adopted in teaching contexts.",
      aboutParagraphTwo: "We are concerned not only with whether students can complete a project, but whether they can understand specifications, build verification methods, interpret measurement data, and produce reliable designs under real constraints. Recent work centers on electric vehicle workforce competency, Industry 4.0 maintenance capability, Verification IP, SPI/SMBus/I2C protocol education, Microchip MCU practice platforms, ModuLab environmental monitoring, and VR/AI-assisted instruction.",
      professorNote: "The lab expects students to learn by building and by verifying. Every wiring exercise, measurement, questionnaire design, data analysis, and system revision should accumulate into engineering capability that can be explained, examined, and carried into the next problem.",
      researchHeading: "Research Directions",
      interestVocational: "Technical and vocational education",
      interestTeacher: "Teacher education, curriculum instruction, and organizational learning",
      interestControl: "Electrical control and engineering practice",
      interestEmbedded: "Embedded systems education: SPI, SMBus, I2C, and MCU laboratory platforms",
      interestVerification: "Verification IP, UVM, and AI-assisted verification workflows",
      interestEV: "Electric vehicle workforce competency and sustainable mobility",
      interestSensing: "Modular sensing platforms and environmental monitoring",
      themesHeading: "Research Themes",
      themeIndicatorsHeading: "Competency Indicators and Decision Frameworks",
      themeIndicatorsBody: "The lab uses Delphi, AHP, DEMATEL, consistency diagnostics, and related methods to turn workplace competency demands into indicator frameworks that can be discussed and prioritized. This research line covers Industry 4.0 maintenance capability, electric vehicle sales and maintenance personnel, underwater welding for offshore wind power, CNC industry competitiveness, and vocational skills competition indicators. The goal is not merely to list competencies, but to help schools, industries, and training organizations decide which capabilities deserve priority investment.",
      themeEmbeddedHeading: "Embedded Systems and Chip Education",
      themeEmbeddedBody: "Research in chip and embedded systems education focuses on helping students understand specifications and build verifiable systems. Related work includes UVM verification for the SPI protocol, SMBus education frameworks, AI-assisted Verification IP synthesis, and protocol and sensing practice supported by Microchip MCU platforms. These topics share one purpose: turning abstract hardware protocols, test platforms, and verification workflows into engineering methods that can be rehearsed repeatedly in courses and lab settings.",
      themeLabHeading: "Lab Platforms and Environmental Monitoring",
      themeLabBody: "The ModuLab research line begins with laboratory environmental monitoring and develops a modular sensing platform that is pluggable, extensible, and suitable for long-duration operation. By combining MCUs, I2C sensing modules, data logging, and real-time visualization, the platform enables stable collection and interpretation of temperature, humidity, light, pH, and related signals. For the lab, this is not only device development; it is proof-of-concept training in which students must handle wiring, data quality, system stability, and usage scenarios together.",
      themeDigitalHeading: "Digital, VR, and AI-Assisted Instruction",
      themeDigitalBody: "In technical and vocational education, digital tools must return to learning effectiveness and practical capability. The lab has studied VR integration in vehicle body electrical system maintenance practice to examine inquiry practice capability and learning effectiveness. It also draws on text-to-image generation, SMBus protocol education, and DV-GPT frameworks to explore how AI can help students understand abstract concepts, form design proposals, and check their own reasoning without replacing essential hands-on training.",
      themeHumanHeading: "Sustainability, Human-Centered Design, and Learning Support",
      themeHumanBody: "Another research line asks how engineering and education can serve real people. From ESG-oriented electric vehicle workforce competencies, sustainable hygiene solutions, and universal design to career development for students with intellectual disabilities, coping humor and subjective well-being among university students, and teacher leadership in agricultural vocational education, the lab places technical problems back into user, learner, and social contexts. Engineering education should pursue function while also attending to responsibility and sustainability.",
      publicationsHeading: "Publications",
      publicationsIntro: "This section presents recent lab publications. The list initially shows the latest 5 records; when a preprint has a confirmed journal version, only the journal record is retained.",
      publicationToolbarLabel: "Publication filters",
      searchLabel: "Search",
      searchPlaceholder: "SPI, electric vehicles, vocational education",
      yearLabel: "Year",
      allYears: "All years",
      typeLabel: "Type",
      allTypes: "All types",
      resetButton: "Clear",
      publishedIn: "Source: ",
      venueMissing: "Source not listed",
      yearMissing: "Year not listed",
      noResults: "No publication records match the selected filters.",
      showMore: "Show more ({count} records)",
      showLess: "Show fewer (5 records)",
      doiAria: "DOI link for {title}",
      recordFallback: "Record",
      labHeading: "Lab Space",
      labIntro: "The photos below document the laboratory work environment, including teaching benches, control panels, wiring exercises, measurement equipment, and supporting systems.",
      labGridLabel: "Lab photos",
      labPhotoOneAlt: "Wide view of lab teaching benches, equipment, and bookshelves",
      labPhotoOneCaption: "Teaching benches and equipment layout.",
      labPhotoTwoAlt: "Lab control equipment and workbench",
      labPhotoTwoCaption: "Control equipment and workbench.",
      labPhotoThreeAlt: "Lab measurement equipment and wiring board",
      labPhotoThreeCaption: "Measurement equipment and wiring practice.",
      labPhotoFourAlt: "Close-up view of a control panel and electrical equipment",
      labPhotoFourCaption: "Close-up view of control panels and electrical equipment.",
      footer: "Professor Chin-Wen Liao / National Changhua University of Education"
    }
  };

  const labelSets = {
    zh: {
      types: {
        "Journal Article": "期刊論文",
        "Preprint": "預印本待確認"
      },
      themes: {
        "Industry 4.0": "Industry 4.0",
        "Wearable Signals": "穿戴式訊號",
        "Verification IP": "Verification IP",
        "Sensing Platform": "感測平台",
        "Embedded Education": "嵌入式系統教育",
        "Electric Vehicles": "電動車",
        "Learning & Wellbeing": "學習與心理健康",
        "Sustainability Education": "永續教育",
        "Digital Education": "數位教育",
        "XR Education": "XR 教育",
        "Wearable Technologies": "穿戴式科技",
        "Career Development": "生涯發展",
        "Universal Design": "通用設計",
        "CNC Industry": "CNC 產業",
        "Offshore Wind": "離岸風電",
        "Vehicle Electrical Systems": "車輛電系",
        "Vocational Education": "技職教育",
        "Environmental Education": "環境教育",
        "Digital Electronics": "數位電子"
      },
      venues: {
        "Acta Psychologica": "心理學期刊",
        "Applied Sciences": "應用科學期刊",
        "Behavioral Sciences": "行為科學期刊",
        "Electronics": "電子學期刊",
        "Eng": "工程學期刊",
        "Information": "資訊學期刊",
        "International Journal of Developmental Disabilities": "發展障礙國際期刊",
        "Preprints": "預印本平台（待確認）",
        "South African Journal of Education": "南非教育期刊",
        "Sustainability": "永續性期刊",
        "World Electric Vehicle Journal": "世界電動車期刊"
      }
    },
    en: {
      types: {
        "Journal Article": "Journal Article",
        "Preprint": "Preprint Pending Confirmation"
      },
      themes: {
        "Industry 4.0": "Industry 4.0",
        "Wearable Signals": "Wearable Signals",
        "Verification IP": "Verification IP",
        "Sensing Platform": "Sensing Platform",
        "Embedded Education": "Embedded Education",
        "Electric Vehicles": "Electric Vehicles",
        "Learning & Wellbeing": "Learning and Wellbeing",
        "Sustainability Education": "Sustainability Education",
        "Digital Education": "Digital Education",
        "XR Education": "XR Education",
        "Wearable Technologies": "Wearable Technologies",
        "Career Development": "Career Development",
        "Universal Design": "Universal Design",
        "CNC Industry": "CNC Industry",
        "Offshore Wind": "Offshore Wind",
        "Vehicle Electrical Systems": "Vehicle Electrical Systems",
        "Vocational Education": "Vocational Education",
        "Environmental Education": "Environmental Education",
        "Digital Electronics": "Digital Electronics"
      },
      venues: {
        "Acta Psychologica": "Acta Psychologica",
        "Applied Sciences": "Applied Sciences",
        "Behavioral Sciences": "Behavioral Sciences",
        "Electronics": "Electronics",
        "Eng": "Eng",
        "Information": "Information",
        "International Journal of Developmental Disabilities": "International Journal of Developmental Disabilities",
        "Preprints": "Preprints.org (Pending Confirmation)",
        "South African Journal of Education": "South African Journal of Education",
        "Sustainability": "Sustainability",
        "World Electric Vehicle Journal": "World Electric Vehicle Journal"
      }
    }
  };

  function getInitialLanguage() {
    try {
      const storedLanguage = window.localStorage.getItem(languageStorageKey);
      if (storedLanguage === "en" || storedLanguage === "zh") return storedLanguage;
    } catch (error) {
      return "zh";
    }
    return "zh";
  }

  function saveLanguage(language) {
    try {
      window.localStorage.setItem(languageStorageKey, language);
    } catch (error) {
      // Language preference persistence is optional for this static page.
    }
  }

  function t(key, values = {}) {
    const value = translations[currentLanguage][key] || translations.zh[key] || "";
    return Object.entries(values).reduce(
      (text, [name, replacement]) => text.split(`{${name}}`).join(String(replacement)),
      value
    );
  }

  function formatCount(count) {
    if (currentLanguage === "zh") return `${count} 筆`;
    return `${count} ${count === 1 ? "record" : "records"}`;
  }

  function formatVisibleCount(visible, total) {
    if (currentLanguage === "zh") return `${visible} / ${total} 筆`;
    return `${visible} of ${total} ${total === 1 ? "record" : "records"}`;
  }

  function localize(group, key) {
    return labelSets[currentLanguage][group][key] || key;
  }

  function localizeType(type) {
    return localize("types", type) || type || t("recordFallback");
  }

  function localizeTheme(theme) {
    return localize("themes", theme);
  }

  function localizeVenue(venue) {
    return localize("venues", venue);
  }

  function abbreviateGivenName(givenName) {
    return String(givenName || "")
      .trim()
      .split(/\s+/)
      .map((part) => part
        .split("-")
        .map((segment) => (segment ? `${segment[0].toUpperCase()}.` : ""))
        .filter(Boolean)
        .join("-"))
      .filter(Boolean)
      .join(" ");
  }

  function formatAuthorName(author) {
    if (typeof author === "string") return author;
    const initials = abbreviateGivenName(author.given);
    const family = String(author.family || "").trim();
    return [initials, family].filter(Boolean).join(" ");
  }

  function isProfessorAuthor(author) {
    if (!author || typeof author === "string") return false;
    const given = String(author.given || "").toLowerCase().replace(/[^a-z]/g, "");
    const family = String(author.family || "").toLowerCase();
    return given === "chinwen" && family === "liao";
  }

  function formatPublicationDate(dateValue, yearValue) {
    const value = String(dateValue || "");
    const match = value.match(/^(\d{4})(?:-(\d{2}))?(?:-(\d{2}))?$/);
    if (!match) return value;

    const [, year, month, day] = match;
    if (String(yearValue) !== year || !month) return value;

    const monthNumber = Number(month);
    const dayNumber = day ? Number(day) : null;
    if (currentLanguage === "zh") {
      return dayNumber ? `${monthNumber} 月 ${dayNumber} 日` : `${monthNumber} 月`;
    }

    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    return dayNumber ? `${monthNames[monthNumber - 1]} ${dayNumber}` : monthNames[monthNumber - 1];
  }

  function labelVariants(group, key) {
    return Object.values(labelSets)
      .map((labels) => labels[group][key])
      .filter(Boolean);
  }

  function updateHeader() {
    if (!header) return;
    header.classList.toggle("is-solid", window.scrollY > 24);
  }

  function updateStaticText() {
    document.documentElement.lang = currentLanguage === "en" ? "en" : "zh-Hant";
    document.title = t("pageTitle");

    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) metaDescription.setAttribute("content", t("metaDescription"));

    document.querySelectorAll("[data-i18n]").forEach((element) => {
      element.textContent = t(element.dataset.i18n);
    });

    document.querySelectorAll("[data-i18n-html]").forEach((element) => {
      element.innerHTML = t(element.dataset.i18nHtml);
    });

    document.querySelectorAll("[data-i18n-attr]").forEach((element) => {
      element.dataset.i18nAttr.split(";").forEach((entry) => {
        const [attribute, key] = entry.split(":").map((part) => part.trim());
        if (attribute && key) element.setAttribute(attribute, t(key));
      });
    });

    languageButtons.forEach((button) => {
      const isActive = button.dataset.languageOption === currentLanguage;
      button.classList.toggle("is-active", isActive);
      button.setAttribute("aria-pressed", isActive ? "true" : "false");
    });
  }

  function byDateDescending(a, b) {
    return String(b.date || b.year).localeCompare(String(a.date || a.year));
  }

  function uniqueValues(key) {
    return [...new Set(publications.map((item) => item[key]).filter(Boolean))];
  }

  function addOption(select, value, label) {
    const option = document.createElement("option");
    option.value = String(value);
    option.textContent = label || String(value);
    select.append(option);
  }

  function populateFilters() {
    if (!yearFilter || !typeFilter) return;

    const selectedYear = yearFilter.value || "all";
    const selectedType = typeFilter.value || "all";

    yearFilter.replaceChildren();
    addOption(yearFilter, "all", t("allYears"));
    uniqueValues("year")
      .sort((a, b) => b - a)
      .forEach((year) => addOption(yearFilter, year));
    yearFilter.value = [...yearFilter.options].some((option) => option.value === selectedYear)
      ? selectedYear
      : "all";

    typeFilter.replaceChildren();
    addOption(typeFilter, "all", t("allTypes"));
    uniqueValues("type")
      .sort()
      .forEach((type) => addOption(typeFilter, type, localizeType(type)));
    typeFilter.value = [...typeFilter.options].some((option) => option.value === selectedType)
      ? selectedType
      : "all";
  }

  function publicationMatches(item) {
    const query = (searchInput?.value || "").trim().toLowerCase();
    const selectedYear = yearFilter?.value || "all";
    const selectedType = typeFilter?.value || "all";
    const authorText = (item.authors || [])
      .map((author) => [
        author.given,
        author.family,
        formatAuthorName(author)
      ].filter(Boolean).join(" "))
      .join(" ");
    const haystack = [
      item.title,
      authorText,
      item.venue,
      ...labelVariants("venues", item.venue),
      item.theme,
      ...labelVariants("themes", item.theme),
      item.type,
      ...labelVariants("types", item.type),
      item.year,
      item.doi
    ]
      .join(" ")
      .toLowerCase();

    const matchesQuery = !query || haystack.includes(query);
    const matchesYear = selectedYear === "all" || String(item.year) === selectedYear;
    const matchesType = selectedType === "all" || item.type === selectedType;
    return matchesQuery && matchesYear && matchesType;
  }

  function makeTag(text) {
    const tag = document.createElement("span");
    tag.className = "tag";
    tag.textContent = text;
    return tag;
  }

  function makePublicationCard(item) {
    const article = document.createElement("article");
    article.className = "publication-card";

    const dateBlock = document.createElement("div");
    const year = document.createElement("div");
    year.className = "publication-year";
    year.textContent = item.year || t("yearMissing");
    const date = document.createElement("div");
    date.className = "publication-date";
    date.textContent = formatPublicationDate(item.date, item.year);
    dateBlock.append(year, date);

    const body = document.createElement("div");
    const title = document.createElement("h3");
    title.className = "publication-title";
    title.textContent = item.title;

    const authors = document.createElement("p");
    authors.className = "publication-authors";
    (item.authors || []).forEach((author, index) => {
      if (index > 0) authors.append(document.createTextNode(", "));
      const authorElement = document.createElement(isProfessorAuthor(author) ? "strong" : "span");
      authorElement.textContent = formatAuthorName(author);
      authors.append(authorElement);
    });

    const venue = document.createElement("div");
    venue.className = "publication-venue";
    venue.textContent = item.venue ? `${t("publishedIn")}${localizeVenue(item.venue)}` : t("venueMissing");

    const tags = document.createElement("div");
    tags.className = "publication-tags";
    tags.append(makeTag(localizeType(item.type)));
    if (item.theme) tags.append(makeTag(localizeTheme(item.theme)));
    body.append(title);
    if ((item.authors || []).length) body.append(authors);
    body.append(venue, tags);

    const link = document.createElement("a");
    link.className = "doi-link";
    link.href = `https://doi.org/${item.doi}`;
    link.target = "_blank";
    link.rel = "noreferrer";
    link.textContent = "DOI";
    link.setAttribute("aria-label", t("doiAria", { title: item.title }));

    article.append(dateBlock, body, link);
    return article;
  }

  function renderPublications() {
    if (!list) return;

    const filtered = publications
      .filter(publicationMatches)
      .sort(byDateDescending);
    const visiblePublications = publicationsExpanded
      ? filtered
      : filtered.slice(0, initialPublicationLimit);

    list.replaceChildren();

    if (resultCount) {
      resultCount.textContent = filtered.length > initialPublicationLimit && !publicationsExpanded
        ? formatVisibleCount(visiblePublications.length, filtered.length)
        : formatCount(filtered.length);
    }

    if (publicationCount) {
      publicationCount.textContent = String(publications.length);
    }

    if (!filtered.length) {
      const empty = document.createElement("p");
      empty.className = "empty-state";
      empty.textContent = t("noResults");
      list.append(empty);
      updateToggleButton(filtered.length);
      return;
    }

    const fragment = document.createDocumentFragment();
    visiblePublications.forEach((item) => fragment.append(makePublicationCard(item)));
    list.append(fragment);
    updateToggleButton(filtered.length);
  }

  function updateToggleButton(total) {
    if (!toggleButton) return;

    const shouldShow = total > initialPublicationLimit;
    toggleButton.hidden = !shouldShow;
    toggleButton.setAttribute("aria-expanded", publicationsExpanded ? "true" : "false");
    toggleButton.textContent = publicationsExpanded
      ? t("showLess")
      : t("showMore", { count: total });
  }

  function resetFilters() {
    if (searchInput) searchInput.value = "";
    if (yearFilter) yearFilter.value = "all";
    if (typeFilter) typeFilter.value = "all";
    publicationsExpanded = false;
    renderPublications();
  }

  function collapseAndRender() {
    publicationsExpanded = false;
    renderPublications();
  }

  function togglePublications() {
    publicationsExpanded = !publicationsExpanded;
    renderPublications();
  }

  function setLanguage(language) {
    if (language !== "en" && language !== "zh") return;
    currentLanguage = language;
    saveLanguage(language);
    updateStaticText();
    populateFilters();
    renderPublications();
  }

  window.addEventListener("scroll", updateHeader, { passive: true });
  [searchInput, yearFilter, typeFilter].forEach((control) => {
    control?.addEventListener("input", collapseAndRender);
    control?.addEventListener("change", collapseAndRender);
  });
  resetButton?.addEventListener("click", resetFilters);
  toggleButton?.addEventListener("click", togglePublications);
  languageButtons.forEach((button) => {
    button.addEventListener("click", () => setLanguage(button.dataset.languageOption));
  });

  setLanguage(currentLanguage);
  updateHeader();
})();
