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
  const initialPublicationLimit = 5;
  let publicationsExpanded = false;

  const typeLabels = {
    "Journal Article": "期刊論文",
    "Preprint": "預印本待確認"
  };

  const themeLabels = {
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
  };

  const venueLabels = {
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
  };

  function localizeType(type) {
    return typeLabels[type] || type || "紀錄";
  }

  function localizeTheme(theme) {
    return themeLabels[theme] || theme;
  }

  function localizeVenue(venue) {
    return venueLabels[venue] || venue;
  }

  function updateHeader() {
    if (!header) return;
    header.classList.toggle("is-solid", window.scrollY > 24);
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

    uniqueValues("year")
      .sort((a, b) => b - a)
      .forEach((year) => addOption(yearFilter, year));

    uniqueValues("type")
      .sort()
      .forEach((type) => addOption(typeFilter, type, localizeType(type)));
  }

  function publicationMatches(item) {
    const query = (searchInput?.value || "").trim().toLowerCase();
    const selectedYear = yearFilter?.value || "all";
    const selectedType = typeFilter?.value || "all";
    const haystack = [
      item.title,
      item.venue,
      localizeVenue(item.venue),
      item.theme,
      localizeTheme(item.theme),
      item.type,
      localizeType(item.type),
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
    year.textContent = item.year || "未列年份";
    const date = document.createElement("div");
    date.className = "publication-date";
    date.textContent = item.date || "";
    dateBlock.append(year, date);

    const body = document.createElement("div");
    const title = document.createElement("h3");
    title.className = "publication-title";
    title.textContent = item.title;

    const venue = document.createElement("div");
    venue.className = "publication-venue";
    venue.textContent = item.venue ? `出版來源：${localizeVenue(item.venue)}` : "出版來源未列";

    const tags = document.createElement("div");
    tags.className = "publication-tags";
    tags.append(makeTag(localizeType(item.type)));
    if (item.theme) tags.append(makeTag(localizeTheme(item.theme)));
    body.append(title, venue, tags);

    const link = document.createElement("a");
    link.className = "doi-link";
    link.href = `https://doi.org/${item.doi}`;
    link.target = "_blank";
    link.rel = "noreferrer";
    link.textContent = "DOI";
    link.setAttribute("aria-label", `${item.title} 的 DOI 連結`);

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
        ? `${visiblePublications.length} / ${filtered.length} 筆`
        : `${filtered.length} 筆`;
    }

    if (publicationCount) {
      publicationCount.textContent = String(publications.length);
    }

    if (!filtered.length) {
      const empty = document.createElement("p");
      empty.className = "empty-state";
      empty.textContent = "沒有符合條件的發表紀錄。";
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
      ? "收合至 5 筆"
      : `展開更多（共 ${total} 筆）`;
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

  window.addEventListener("scroll", updateHeader, { passive: true });
  [searchInput, yearFilter, typeFilter].forEach((control) => {
    control?.addEventListener("input", collapseAndRender);
    control?.addEventListener("change", collapseAndRender);
  });
  resetButton?.addEventListener("click", resetFilters);
  toggleButton?.addEventListener("click", togglePublications);

  populateFilters();
  renderPublications();
  updateHeader();
})();
