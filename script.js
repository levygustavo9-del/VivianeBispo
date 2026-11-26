"use strict";

const CINEMATIC_CONFIG = {
  duration: 1000,
  vertical: 30,
  horizontal: 30,
  scale: 0.97,
  blur: 5,
  stagger: 120,
  easing: "cubic-bezier(0.22, 1, 0.36, 1)"
};

const CONTACT = {
  displayPhone: "(82) 9142-4946",
  whatsappNumber: "5582991424946",
  instagram: "https://www.instagram.com/vivianebispo.designer/",
  address: "Loteamento Vila Rica, Qd. U1, nº 63, Rio Largo – AL, CEP 57100-000"
};

const SERVICES = [
  {
    id: "sobrancelhas",
    name: "Sobrancelhas",
    description: "Cuidados que valorizam o desenho natural do olhar. Veja um resultado de brow lamination enviado para este portfólio.",
    purpose: "Design, alinhamento e valorização do olhar.",
    process: "A avaliação define o formato ideal. A técnica organiza os fios, realça o desenho natural e preserva a harmonia facial.",
    preparation: "Chegue sem maquiagem na região das sobrancelhas e informe alergias ou tratamentos recentes.",
    care: "Evite molhar, coçar ou aplicar produtos na região pelo período orientado pela profissional.",
    image: "src/sobrancelhas.png",
    cases: [
      {
        type: "pair",
        technique: "Brow lamination",
        before: "src/brow lamination antes.png",
        after: "src/brow lamination depois.png",
        alt: "Comparação de sobrancelhas antes e depois do brow lamination"
      }
    ]
  },
  {
    id: "micropigmentacao",
    name: "Micropigmentação",
    description: "Resultados de micropigmentação fio a fio e microlabial. Converse com a Viviane para saber mais sobre cada procedimento.",
    purpose: "Definição delicada e correção de contorno.",
    process: "Após conversa e avaliação, são definidos desenho, intensidade e pigmentação conforme a área e o procedimento.",
    preparation: "Não consumir álcool, medicamentos ou substâncias que possam afetar a pele antes da avaliação, conforme orientação profissional.",
    care: "Siga a rotina de higienização e cicatrização indicada. Evite sol, piscina e atrito até a recuperação.",
    image: "src/micropigmentacao.png",
    cases: [
      {
        type: "pair",
        technique: "Micropigmentação fio a fio",
        before: "src/mircropigmentaçao fio a fio antes.png",
        after: "src/mircropigmentaçao fio a fio depois.png",
        alt: "Comparação de sobrancelhas antes e depois da micropigmentação fio a fio"
      },
      {
        type: "pair",
        technique: "Microlabial",
        before: "src/microlabial antes.png",
        after: "src/microlabial depois.png",
        alt: "Comparação de lábios antes e depois do procedimento microlabial"
      }
    ]
  },
  {
    id: "depilacao",
    name: "Depilação",
    description: "Converse com a Viviane sobre a modalidade, a região de interesse e os cuidados adequados para você.",
    purpose: "Remoção dos fios com cuidado e orientação.",
    process: "A profissional avalia a área e a modalidade adequada, explica os cuidados antes e depois e realiza o procedimento com atenção.",
    preparation: "Os fios devem estar no tamanho recomendado pela profissional. Informe pele sensível, alergias e medicamentos em uso.",
    care: "Evite calor intenso, exposição solar direta e atrito na região nas primeiras horas após o atendimento.",
    image: "src/depilação.png",
    cases: []
  },
  {
    id: "estrias",
    name: "Tratamento de estrias",
    description: "Cada caso merece uma conversa individual. Consulte a Viviane para conhecer as possibilidades de atendimento.",
    purpose: "Cuidados personalizados para a aparência da pele.",
    process: "A análise considera tipo, idade e características das marcas. A Viviane orienta possibilidades, rotina de cuidado e quantidade de sessões.",
    preparation: "Leve informações sobre o histórico da pele, tratamentos anteriores e possíveis alterações recentes.",
    care: "Use proteção solar, hidratante e os produtos indicados pela profissional. Os resultados variam conforme cada caso.",
    image: "src/estrias.png",
    cases: [
      {
        type: "pair",
        technique: "Tratamento de estrias",
        before: "src/estrias antes.png",
        after: "src/estrias depois.png",
        alt: "Comparação da pele antes e depois do tratamento de estrias"
      }
    ]
  }
];

const TESTIMONIALS = [];
const STUDIO_PHOTOS = [];
let testimonialIndex = 0;

const tabList = document.querySelector(".service-tabs");
const serviceName = document.getElementById("service-name");
const serviceDescription = document.getElementById("service-description");
const serviceCount = document.getElementById("service-count");
const serviceBook = document.getElementById("service-book");
const servicePurpose = document.getElementById("service-purpose");
const serviceDetailsButton = document.getElementById("service-details-button");
const serviceInfoImage = document.getElementById("service-info-image");
const serviceImagePlaceholder = document.querySelector(".service-image-placeholder");
const beforeAfterGrid = document.getElementById("before-after-grid");
let selectedService = SERVICES[0];
let caseIndex = 0;
let comparisonValue = 50;

function whatsappUrl(message) {
  return `https://wa.me/${CONTACT.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

function serviceMessage(name) {
  return `Olá, Viviane! Gostaria de consultar um horário para ${name.toLowerCase()}.`;
}

function setWhatsappLinks() {
  document.querySelectorAll('[data-whatsapp="general"]').forEach((link) => {
    link.href = whatsappUrl("Olá, Viviane! Gostaria de consultar os horários disponíveis.");
    link.target = "_blank";
    link.rel = "noopener noreferrer";
  });
  document.querySelectorAll('[data-whatsapp="service"]').forEach((link) => {
    link.href = whatsappUrl(serviceMessage(selectedService.name));
    link.target = "_blank";
    link.rel = "noopener noreferrer";
  });
  document.querySelectorAll(".instagram-link").forEach((link) => {
    link.href = CONTACT.instagram;
  });
}

function renderTabs() {
  tabList.innerHTML = "";
  SERVICES.forEach((service, index) => {
    const tab = document.createElement("button");
    tab.className = "service-tab";
    tab.type = "button";
    tab.id = `service-tab-${service.id}`;
    tab.role = "tab";
    tab.setAttribute("aria-controls", "service-panel");
    tab.setAttribute("aria-selected", String(service.id === selectedService.id));
    tab.tabIndex = service.id === selectedService.id ? 0 : -1;
    tab.textContent = service.name;
    tab.addEventListener("click", () => selectService(service.id, true));
    tab.addEventListener("keydown", (event) => {
      if (!["ArrowRight", "ArrowLeft", "Home", "End"].includes(event.key)) return;
      event.preventDefault();
      const currentIndex = SERVICES.findIndex((item) => item.id === service.id);
      let nextIndex = currentIndex;
      if (event.key === "ArrowRight") nextIndex = (currentIndex + 1) % SERVICES.length;
      if (event.key === "ArrowLeft") nextIndex = (currentIndex + SERVICES.length - 1) % SERVICES.length;
      if (event.key === "Home") nextIndex = 0;
      if (event.key === "End") nextIndex = SERVICES.length - 1;
      selectService(SERVICES[nextIndex].id, true);
    });
    tabList.append(tab);
  });
}

function selectService(serviceId, focusTab = false) {
  const service = SERVICES.find((item) => item.id === serviceId);
  if (!service) return;
  selectedService = service;
  caseIndex = 0;
  comparisonValue = 50;
  renderService();
  renderTabs();
  if (focusTab) document.getElementById(`service-tab-${service.id}`).focus();
  setWhatsappLinks();
}

function renderService() {
  const selectedTab = document.getElementById(`service-tab-${selectedService.id}`);
  if (selectedTab) {
    selectedTab.setAttribute("aria-selected", "true");
    selectedTab.tabIndex = 0;
    document.getElementById("service-panel").setAttribute("aria-labelledby", selectedTab.id);
  }
  serviceName.textContent = selectedService.name;
  serviceDescription.textContent = selectedService.description;
  serviceCount.textContent = `${String(SERVICES.indexOf(selectedService) + 1).padStart(2, "0")} / 04`;
  serviceBook.querySelector(".service-book-label").textContent = selectedService.name.toLowerCase();
  servicePurpose.textContent = selectedService.purpose;
  if (selectedService.image) {
    serviceInfoImage.src = selectedService.image;
    serviceInfoImage.alt = `Imagem ilustrativa de ${selectedService.name}`;
    serviceInfoImage.hidden = false;
    if (serviceImagePlaceholder) serviceImagePlaceholder.hidden = true;
  } else {
    serviceInfoImage.removeAttribute("src");
    serviceInfoImage.alt = "";
    serviceInfoImage.hidden = true;
    if (serviceImagePlaceholder) serviceImagePlaceholder.hidden = false;
  }
  setWhatsappLinks();
}

function renderComparison(resultCase) {
  const viewer = document.createElement("div");
  viewer.className = "result-viewer";
  const stage = document.createElement("div");
  stage.className = "comparison-stage";
  stage.setAttribute("role", "group");
  stage.setAttribute("aria-label", resultCase.alt);
  stage.style.setProperty("--split", `${comparisonValue}%`);

  const before = document.createElement("img");
  before.src = resultCase.before;
  before.alt = `${resultCase.alt} — antes`;
  before.loading = "lazy";
  before.width = 638;
  before.height = 685;
  const after = document.createElement("img");
  after.src = resultCase.after;
  after.alt = `${resultCase.alt} — depois`;
  after.className = "after-image";
  after.loading = "lazy";
  after.width = 646;
  after.height = 686;
  const beforeLabel = document.createElement("span");
  beforeLabel.className = "comparison-label before";
  beforeLabel.textContent = "Antes";
  const afterLabel = document.createElement("span");
  afterLabel.className = "comparison-label after";
  afterLabel.textContent = "Depois";
  const divider = document.createElement("span");
  divider.className = "comparison-divider";
  divider.setAttribute("aria-hidden", "true");
  const knob = document.createElement("span");
  knob.className = "comparison-knob";
  knob.setAttribute("aria-hidden", "true");
  knob.textContent = "↔";
  const range = document.createElement("input");
  range.className = "comparison-range";
  range.type = "range";
  range.min = "0";
  range.max = "100";
  range.value = String(comparisonValue);
  range.setAttribute("aria-label", `Comparador de antes e depois: ${resultCase.technique}`);
  range.setAttribute("aria-valuetext", `Divisão em ${comparisonValue} por cento`);
  range.addEventListener("input", () => {
    comparisonValue = Number(range.value);
    stage.style.setProperty("--split", `${comparisonValue}%`);
    knob.style.left = `${comparisonValue}%`;
    range.setAttribute("aria-valuetext", `Divisão em ${comparisonValue} por cento`);
  });
  stage.append(before, after, beforeLabel, afterLabel, divider, knob, range);

  const controls = document.createElement("div");
  controls.className = "comparison-controls";
  const beforeAfter = document.createElement("div");
  beforeAfter.className = "before-after-controls";
  beforeAfter.append(makeSplitButton("Antes", 0), makeSplitButton("Depois", 100));
  const caseNavigation = document.createElement("div");
  caseNavigation.className = "case-navigation";
  const previous = document.createElement("button");
  previous.className = "case-nav-button";
  previous.type = "button";
  previous.textContent = "‹";
  previous.setAttribute("aria-label", "Resultado anterior");
  previous.disabled = selectedService.cases.length < 2;
  previous.addEventListener("click", () => changeCase(-1));
  const position = document.createElement("span");
  position.className = "case-position";
  position.textContent = `${caseIndex + 1} de ${selectedService.cases.length}`;
  const next = document.createElement("button");
  next.className = "case-nav-button";
  next.type = "button";
  next.textContent = "›";
  next.setAttribute("aria-label", "Próximo resultado");
  next.disabled = selectedService.cases.length < 2;
  next.addEventListener("click", () => changeCase(1));
  caseNavigation.append(previous, position, next);
  controls.append(beforeAfter, caseNavigation);
  viewer.append(stage, controls);
  const caption = document.createElement("p");
  caption.className = "case-position";
  caption.style.margin = "10px 2px 0";
  caption.textContent = resultCase.technique;
  visual.append(viewer, caption);

  function makeSplitButton(label, value) {
    const button = document.createElement("button");
    button.className = "mini-control";
    button.type = "button";
    button.textContent = label;
    button.setAttribute("aria-label", `Mostrar ${label.toLowerCase()} da comparação`);
    button.addEventListener("click", () => {
      comparisonValue = value;
      stage.style.setProperty("--split", `${value}%`);
      knob.style.left = `${value}%`;
      range.value = String(value);
      range.setAttribute("aria-valuetext", `Divisão em ${value} por cento`);
    });
    return button;
  }
}

function renderMontage(resultCase) {
  const viewer = document.createElement("div");
  viewer.className = "result-viewer";
  const image = document.createElement("img");
  image.className = "montage-image";
  image.src = resultCase.image;
  image.alt = resultCase.alt;
  image.loading = "lazy";
  image.addEventListener("click", () => openResultDialog(resultCase.image, resultCase.alt));
  const enlarge = document.createElement("button");
  enlarge.className = "enlarge-button";
  enlarge.type = "button";
  enlarge.textContent = "Ampliar resultado";
  enlarge.addEventListener("click", () => openResultDialog(resultCase.image, resultCase.alt));
  viewer.append(image, enlarge);
  visual.append(viewer);
}

function changeCase(direction) {
  const total = selectedService.cases.length;
  if (total < 2) return;
  caseIndex = (caseIndex + direction + total) % total;
  comparisonValue = 50;
  renderService();
}

function openResultDialog(src, alt) {
  const dialog = document.getElementById("result-dialog");
  const image = document.getElementById("dialog-image");
  image.src = src;
  image.alt = alt;
  dialog.showModal();
}

function openServiceDialog() {
  const dialog = document.getElementById("service-dialog");
  document.getElementById("service-dialog-title").textContent = selectedService.name;
  document.getElementById("service-dialog-process").textContent = selectedService.process;
  document.getElementById("service-dialog-purpose").textContent = selectedService.purpose;
  document.getElementById("service-dialog-preparation").textContent = selectedService.preparation;
  document.getElementById("service-dialog-care").textContent = selectedService.care;
  document.getElementById("service-dialog-book").href = whatsappUrl(serviceMessage(selectedService.name));
  dialog.showModal();
}

function renderBeforeAfterSection() {
  if (!beforeAfterGrid) return;
  beforeAfterGrid.replaceChildren();

  const resultCases = SERVICES.flatMap((service) =>
    service.cases.map((resultCase) => ({ ...resultCase, service: service.name }))
  );
  if (!resultCases.length) return;

  const viewport = document.createElement("div");
  viewport.className = "before-after-viewport";
  const track = document.createElement("div");
  track.className = "before-after-track";
  viewport.append(track);
  beforeAfterGrid.append(viewport);
  let currentIndex = 0;

  resultCases.forEach((resultCase) => {
    const item = document.createElement("article");
    item.className = "before-after-item reveal";
    item.dataset.reveal = "scale";

    const comparison = document.createElement("div");
    comparison.className = "before-after-comparison";

    const stage = document.createElement("div");
    stage.className = "comparison-stage before-after-stage";
    stage.style.setProperty("--split", "50%");

    const before = document.createElement("img");
    before.src = resultCase.before;
    before.alt = `${resultCase.alt} - antes`;
    before.loading = "lazy";
    before.width = 638;
    before.height = 685;

    const after = document.createElement("img");
    after.src = resultCase.after;
    after.alt = `${resultCase.alt} - depois`;
    after.className = "after-image";
    after.loading = "lazy";
    after.width = 646;
    after.height = 686;

    const beforeLabel = document.createElement("span");
    beforeLabel.className = "comparison-label before";
    beforeLabel.textContent = "Antes";
    const afterLabel = document.createElement("span");
    afterLabel.className = "comparison-label after";
    afterLabel.textContent = "Depois";
    const divider = document.createElement("span");
    divider.className = "comparison-divider";
    divider.setAttribute("aria-hidden", "true");
    const knob = document.createElement("span");
    knob.className = "comparison-knob";
    knob.setAttribute("aria-hidden", "true");
    knob.textContent = "↔";
    const range = document.createElement("input");
    range.className = "comparison-range";
    range.type = "range";
    range.min = "0";
    range.max = "100";
    range.value = "50";
    range.setAttribute("aria-label", `Comparar antes e depois de ${resultCase.service}`);

    range.addEventListener("input", () => {
      stage.style.setProperty("--split", `${range.value}%`);
      knob.style.left = `${range.value}%`;
    });

    stage.append(before, after, beforeLabel, afterLabel, divider, knob, range);
    comparison.append(stage);

    const comment = document.createElement("aside");
    comment.className = "before-after-comment";
    comment.innerHTML = `<p class="eyebrow"><span></span> Experiência da cliente</p><blockquote>Depoimento autorizado será publicado aqui.</blockquote><span class="comment-author">Agende para viver sua transformação</span><p class="comment-service">${resultCase.service}</p>`;

    item.append(comparison, comment);
    track.append(item);
  });

  const controls = document.createElement("div");
  controls.className = "before-after-controls";
  const previous = document.createElement("button");
  previous.type = "button";
  previous.className = "carousel-arrow carousel-prev";
  previous.setAttribute("aria-label", "Resultado anterior");
  previous.textContent = "‹";
  const position = document.createElement("div");
  position.className = "carousel-dots";
  const next = document.createElement("button");
  next.type = "button";
  next.className = "carousel-arrow carousel-next";
  next.setAttribute("aria-label", "Próximo resultado");
  next.textContent = "›";

  const dots = resultCases.map((_, index) => {
    const dot = document.createElement("button");
    dot.type = "button";
    dot.className = "carousel-dot";
    dot.setAttribute("aria-label", `Ir para o resultado ${index + 1}`);
    dot.addEventListener("click", () => goTo(index));
    position.append(dot);
    return dot;
  });

  const goTo = (index) => {
    currentIndex = (index + resultCases.length) % resultCases.length;
    track.style.transform = `translate3d(-${currentIndex * 100}%, 0, 0)`;
    dots.forEach((dot, dotIndex) => dot.classList.toggle("is-active", dotIndex === currentIndex));
  };

  previous.addEventListener("click", () => goTo(currentIndex - 1));
  next.addEventListener("click", () => goTo(currentIndex + 1));
  controls.append(previous, position, next);
  beforeAfterGrid.append(controls);

  let startX = 0;
  let dragging = false;
  viewport.addEventListener("pointerdown", (event) => {
    if (event.pointerType === "mouse" && event.button !== 0) return;
    startX = event.clientX;
    dragging = true;
    track.classList.add("is-dragging");
    viewport.setPointerCapture?.(event.pointerId);
  });
  viewport.addEventListener("pointerup", (event) => {
    if (!dragging) return;
    dragging = false;
    track.classList.remove("is-dragging");
    const distance = event.clientX - startX;
    if (Math.abs(distance) > 45) goTo(currentIndex + (distance < 0 ? 1 : -1));
  });
  viewport.addEventListener("pointercancel", () => {
    dragging = false;
    track.classList.remove("is-dragging");
  });
  goTo(0);
}

function renderOptionalContent() {
  if (TESTIMONIALS.length) {
    const section = document.getElementById("depoimentos");
    section.hidden = false;
    document.querySelectorAll('[data-optional-nav="depoimentos"]').forEach((link) => { link.hidden = false; });
    const content = document.getElementById("testimonial-content");
    content.replaceChildren();

    const viewport = document.createElement("div");
    viewport.className = "testimonial-viewport";
    const track = document.createElement("div");
    track.className = "testimonial-track";
    viewport.append(track);

    TESTIMONIALS.forEach((item) => {
      const slide = document.createElement("article");
      slide.className = "testimonial-slide";
      const quote = document.createElement("blockquote");
      quote.textContent = `“${item.quote}”`;
      slide.append(quote);
      if (item.author) {
        const author = document.createElement("p");
        author.className = "testimonial-author";
        author.textContent = item.author;
        slide.append(author);
      }
      track.append(slide);
    });
    content.append(viewport);

    if (TESTIMONIALS.length > 1) {
      const controls = document.createElement("div");
      controls.className = "testimonial-controls carousel-controls";
      const previous = document.createElement("button");
      previous.type = "button";
      previous.className = "carousel-arrow";
      previous.setAttribute("aria-label", "Depoimento anterior");
      previous.textContent = "‹";
      const dots = document.createElement("div");
      dots.className = "carousel-dots";
      const next = document.createElement("button");
      next.type = "button";
      next.className = "carousel-arrow";
      next.setAttribute("aria-label", "Próximo depoimento");
      next.textContent = "›";

      const goTo = (index) => {
        testimonialIndex = (index + TESTIMONIALS.length) % TESTIMONIALS.length;
        track.style.transform = `translate3d(-${testimonialIndex * 100}%, 0, 0)`;
        dots.querySelectorAll(".carousel-dot").forEach((dot, dotIndex) => {
          dot.classList.toggle("is-active", dotIndex === testimonialIndex);
        });
      };

      TESTIMONIALS.forEach((_, index) => {
        const dot = document.createElement("button");
        dot.type = "button";
        dot.className = "carousel-dot";
        dot.setAttribute("aria-label", `Ir para o depoimento ${index + 1}`);
        dot.addEventListener("click", () => goTo(index));
        dots.append(dot);
      });

      previous.addEventListener("click", () => goTo(testimonialIndex - 1));
      next.addEventListener("click", () => goTo(testimonialIndex + 1));
      controls.append(previous, dots, next);
      content.append(controls);

      let startX = 0;
      let dragging = false;
      viewport.addEventListener("pointerdown", (event) => {
        if (event.pointerType === "mouse" && event.button !== 0) return;
        startX = event.clientX;
        dragging = true;
        track.classList.add("is-dragging");
        viewport.setPointerCapture?.(event.pointerId);
      });
      viewport.addEventListener("pointerup", (event) => {
        if (!dragging) return;
        dragging = false;
        track.classList.remove("is-dragging");
        const distance = event.clientX - startX;
        if (Math.abs(distance) > 45) goTo(testimonialIndex + (distance < 0 ? 1 : -1));
      });
      viewport.addEventListener("pointercancel", () => {
        dragging = false;
        track.classList.remove("is-dragging");
      });
      goTo(0);
    }
  }
  if (STUDIO_PHOTOS.length) {
    const section = document.getElementById("espaco");
    section.hidden = false;
    document.querySelectorAll('[data-optional-nav="espaco"]').forEach((link) => { link.hidden = false; });
    const grid = document.getElementById("studio-grid");
    grid.style.gridTemplateColumns = `repeat(${Math.min(STUDIO_PHOTOS.length, 3)}, minmax(0, 1fr))`;
    STUDIO_PHOTOS.forEach((item) => {
      const image = document.createElement("img");
      if (item.featured) {
        image.className = STUDIO_PHOTOS.length > 2 ? "studio-featured studio-featured-large" : "studio-featured";
      }
      image.src = item.src;
      image.alt = item.alt;
      image.loading = "lazy";
      grid.append(image);
    });
  }
}

function initMenu() {
  const toggle = document.querySelector(".menu-toggle");
  const nav = document.getElementById("primary-navigation");
  const closeMenu = () => {
    toggle.setAttribute("aria-expanded", "false");
    toggle.setAttribute("aria-label", "Abrir menu");
    nav.classList.remove("is-open");
    document.body.classList.remove("menu-open");
  };
  toggle.addEventListener("click", () => {
    const isOpen = toggle.getAttribute("aria-expanded") !== "true";
    toggle.setAttribute("aria-expanded", String(isOpen));
    toggle.setAttribute("aria-label", isOpen ? "Fechar menu" : "Abrir menu");
    nav.classList.toggle("is-open", isOpen);
    document.body.classList.toggle("menu-open", isOpen);
    if (isOpen) nav.querySelector("a").focus();
  });
  nav.querySelectorAll("a").forEach((link) => link.addEventListener("click", closeMenu));
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && toggle.getAttribute("aria-expanded") === "true") {
      closeMenu();
      toggle.focus();
    }
  });
}

function initFaq() {
  document.querySelectorAll(".faq-question").forEach((button) => {
    button.addEventListener("click", () => {
      const isExpanded = button.getAttribute("aria-expanded") === "true";
      const panel = document.getElementById(button.getAttribute("aria-controls"));
      button.setAttribute("aria-expanded", String(!isExpanded));
      panel.hidden = isExpanded;
    });
  });
}

function initForm() {
  const form = document.getElementById("contact-form");
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    if (!form.reportValidity()) return;
    const formData = new FormData(form);
    const name = String(formData.get("name")).trim();
    const service = String(formData.get("service"));
    const request = service === "Quero conversar antes de escolher"
      ? "conversar antes de escolher uma modalidade"
      : `consultar um horário para ${service.toLowerCase()}`;
    const message = `Olá, Viviane! Meu nome é ${name} e gostaria de ${request}.`;
    window.open(whatsappUrl(message), "_blank", "noopener,noreferrer");
    document.getElementById("form-status").textContent = "Conversa aberta no WhatsApp. O horário será confirmado pela profissional.";
  });
}

function initFooterServiceLinks() {
  document.querySelectorAll("[data-service-link]").forEach((link) => {
    link.addEventListener("click", () => {
      const serviceId = link.getAttribute("data-service-link");
      selectService(serviceId);
    });
  });
}

function initHeaderBehavior() {
  const header = document.querySelector(".site-header");
  const updateHeader = () => {
    header.classList.toggle("is-scrolled", window.scrollY > 24);
  };
  window.addEventListener("scroll", updateHeader, { passive: true });
  updateHeader();
}

function initSmoothScroll() {
  const isDesktop = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  const isMobile = window.matchMedia("(max-width: 640px)").matches;
  if (!isDesktop || isMobile) return;

  document.documentElement.classList.add("smooth-scroll-active");
  let target = window.scrollY;
  let current = window.scrollY;
  let active = false;
  let wheelFrame = 0;

  const render = () => {
    const distance = target - current;
    current += distance * 0.14;

    if (Math.abs(distance) > 0.5) {
      window.scrollTo({ top: current, behavior: "auto" });
      wheelFrame = window.requestAnimationFrame(render);
    } else {
      current = target;
      window.scrollTo({ top: target, behavior: "auto" });
      active = false;
      wheelFrame = 0;
    }
  };

  window.addEventListener("wheel", (event) => {
    if (event.ctrlKey || event.metaKey) return;

    let delta = event.deltaY;
    if (event.deltaMode === WheelEvent.DOM_DELTA_LINE) delta *= 16;
    if (event.deltaMode === WheelEvent.DOM_DELTA_PAGE) delta *= window.innerHeight;

    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    if (event.deltaY === 0 || (target <= 0 && delta < 0) || (target >= maxScroll && delta > 0)) return;

    event.preventDefault();
    target = Math.max(0, Math.min(maxScroll, target + delta * 0.72));

    if (!active) {
      active = true;
      current = window.scrollY;
      wheelFrame = window.requestAnimationFrame(render);
    }
  }, { passive: false });

  window.addEventListener("scroll", () => {
    if (!active) target = window.scrollY;
  }, { passive: true });

  window.addEventListener("resize", () => {
    if (wheelFrame) window.cancelAnimationFrame(wheelFrame);
    wheelFrame = 0;
    active = false;
    target = window.scrollY;
    current = window.scrollY;
  }, { passive: true });

  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", (event) => {
      const hash = link.getAttribute("href");
      if (!hash || hash === "#") return;
      const destination = document.querySelector(hash);
      if (!destination) return;

      event.preventDefault();
      const header = document.querySelector(".site-header");
      const headerOffset = header ? header.offsetHeight + 18 : 18;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      target = Math.max(0, Math.min(maxScroll, destination.getBoundingClientRect().top + window.scrollY - headerOffset));
      current = window.scrollY;
      active = true;

      if (history.replaceState) history.replaceState(null, "", hash);
      if (wheelFrame) window.cancelAnimationFrame(wheelFrame);
      wheelFrame = window.requestAnimationFrame(render);
    });
  });
}

function initReveal() {
  document.documentElement.classList.add("cinematic-ready");

  document.querySelectorAll(".difference-card").forEach((item, index) => {
    item.classList.add("reveal");
    item.dataset.reveal = "scale";
    item.style.setProperty("--reveal-delay", `${index * CINEMATIC_CONFIG.stagger}ms`);
  });
  document.querySelectorAll(".location-card").forEach((item, index) => {
    item.classList.add("reveal");
    item.dataset.reveal = index % 2 ? "right" : "left";
  });
  document.querySelectorAll(".faq-item").forEach((item, index) => {
    item.classList.add("reveal");
    item.dataset.reveal = "up";
    item.style.setProperty("--reveal-delay", `${index * CINEMATIC_CONFIG.stagger}ms`);
  });
  document.querySelectorAll(".intro-item").forEach((item, index) => {
    item.classList.add("reveal");
    item.dataset.reveal = "up";
    item.style.setProperty("--reveal-delay", `${index * CINEMATIC_CONFIG.stagger}ms`);
  });
  document.querySelectorAll(".footer-column, .footer-brand").forEach((item, index) => {
    item.classList.add("reveal");
    item.dataset.reveal = "up";
    item.style.setProperty("--reveal-delay", `${index * CINEMATIC_CONFIG.stagger}ms`);
  });
  document.querySelectorAll(".service-panel, .location-grid, .contact-form").forEach((item) => {
    item.classList.add("reveal");
    item.dataset.reveal = "up";
  });
  document.querySelectorAll(".testimonial-content, .testimonial-content blockquote, .testimonial-author").forEach((item, index) => {
    item.classList.add("reveal");
    item.dataset.reveal = "up";
    item.style.setProperty("--reveal-delay", `${index * CINEMATIC_CONFIG.stagger}ms`);
  });
  document.querySelectorAll(".contact-heading").forEach((item) => {
    item.classList.add("reveal");
    item.dataset.reveal = "left";
  });

  const items = document.querySelectorAll(".reveal");
  if (!("IntersectionObserver" in window)) {
    items.forEach((item) => item.classList.add("is-visible"));
    return;
  }
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      entry.target.classList.toggle("is-visible", entry.isIntersecting);
    });
  }, { threshold: .10, rootMargin: "0px 0px -7% 0px" });
  items.forEach((item) => observer.observe(item));
}

function initScrollProgress() {
  const progress = document.querySelector(".scroll-progress span");
  if (!progress) return;

  let ticking = false;
  const updateProgress = () => {
    const scrollable = document.documentElement.scrollHeight - window.innerHeight;
    const ratio = scrollable > 0 ? window.scrollY / scrollable : 0;
    progress.style.transform = `scaleX(${Math.max(0, Math.min(1, ratio))})`;
    ticking = false;
  };
  const requestUpdate = () => {
    if (ticking) return;
    ticking = true;
    window.requestAnimationFrame(updateProgress);
  };

  window.addEventListener("scroll", requestUpdate, { passive: true });
  window.addEventListener("resize", requestUpdate, { passive: true });
  updateProgress();
}

function initJourney() {
  const section = document.querySelector(".cinematic-journey");
  if (!section) return;

  const timeline = section.querySelector(".journey-timeline");
  const track = section.querySelector(".journey-track");
  const activePath = section.querySelector(".journey-path-active");
  const chapterList = section.querySelector(".journey-chapters");
  const lightHalo = section.querySelector(".journey-light-halo");
  const lightCore = section.querySelector(".journey-light-core");
  const cta = section.querySelector(".journey-cta");
  const chapters = [...section.querySelectorAll(".journey-chapter")];
  if (!timeline || !track || !activePath || !chapterList || !lightHalo || !lightCore) return;

  const pathLength = activePath.getTotalLength();
  const viewBoxSize = 1000;
  const pathSegments = 512;
  const clamp = (value, min, max) => Math.max(min, Math.min(max, value));
  const pathPoints = Array.from({ length: pathSegments + 1 }, (_, index) =>
    activePath.getPointAtLength(pathLength * index / pathSegments)
  );
  activePath.style.strokeDasharray = `${pathLength} ${pathLength}`;
  const getPointAtProgress = (progress) => {
    const scaledProgress = clamp(progress, 0, 1) * pathSegments;
    const index = Math.min(Math.floor(scaledProgress), pathSegments - 1);
    const fraction = scaledProgress - index;
    const from = pathPoints[index];
    const to = pathPoints[index + 1];
    return {
      x: from.x + (to.x - from.x) * fraction,
      y: from.y + (to.y - from.y) * fraction
    };
  };

  const findProgress = (x, y) => {
    let nearestLength = 0;
    let nearestDistance = Infinity;
    for (let index = 0; index <= pathSegments; index += 1) {
      const length = pathLength * index / pathSegments;
      const point = pathPoints[index];
      const distance = (point.x - x) ** 2 + (point.y - y) ** 2;
      if (distance < nearestDistance) {
        nearestDistance = distance;
        nearestLength = length;
      }
    }
    return nearestLength / pathLength;
  };
  const revealWindows = [
    { start: .18, end: .27 },
    { start: .49, end: .58 },
    { start: .79, end: .88 }
  ];
  const chapterStates = chapters.map((chapter, index) => {
    const [x, y] = chapter.dataset.pathPoint.split(",").map(Number);
    const progress = findProgress(x, y);
    const revealWindow = revealWindows[index];
    return {
      chapter,
      copy: chapter.querySelector(".journey-copy"),
      number: chapter.querySelector(".journey-chapter-number"),
      marker: chapter.querySelector(".journey-marker"),
      direction: chapter.dataset.side === "left" ? -1 : 1,
      progress,
      start: Math.min(revealWindow.start, progress),
      end: Math.max(revealWindow.end, progress)
    };
  });

  let sectionTop = 0;
  let sectionHeight = 0;
  let trackTop = 0;
  let trackLeft = 0;
  let trackWidth = 0;
  let trackHeight = 0;
  let viewportHeight = window.innerHeight;
  let frameRequested = false;
  let currentProgress = 0;
  let targetProgress = 0;
  let horizontalOffset = 24;
  let isMobile = false;
  let mobileLineSvgX = 0;
  let mobileLineStartY = 0;
  let mobileLineEndY = 0;
  let mobileLineProgress = 0;

  const refreshGeometry = () => {
    const sectionRect = section.getBoundingClientRect();
    const trackRect = track.getBoundingClientRect();
    sectionTop = sectionRect.top + window.scrollY;
    sectionHeight = sectionRect.height;
    trackTop = trackRect.top + window.scrollY;
    trackLeft = trackRect.left + window.scrollX;
    trackWidth = trackRect.width;
    trackHeight = trackRect.height;
    viewportHeight = window.innerHeight;
    isMobile = window.matchMedia("(max-width: 760px)").matches;
    horizontalOffset = isMobile ? 14 : 24;
    const chapterListRect = chapterList.getBoundingClientRect();
    const mobileLineRatio = isMobile
      ? Number.parseFloat(getComputedStyle(chapterList).getPropertyValue("--journey-mobile-line-x")) / 100
      : 0;
    const mobileLineX = chapterListRect.left + chapterListRect.width * mobileLineRatio;

    chapterStates.forEach(({ chapter, marker, progress }) => {
      const point = getPointAtProgress(progress);
      const chapterRect = chapter.getBoundingClientRect();
      const x = isMobile
        ? mobileLineX - chapterRect.left
        : trackRect.left - chapterRect.left + point.x / viewBoxSize * trackRect.width;
      const y = trackRect.top - chapterRect.top + point.y / viewBoxSize * trackRect.height;
      marker.style.left = `${x}px`;
      marker.style.top = `${y}px`;
    });

    if (isMobile && chapterStates.length > 1 && trackWidth && trackHeight) {
      const firstMarkerRect = chapterStates[0].marker.getBoundingClientRect();
      const lastMarkerRect = chapterStates[chapterStates.length - 1].marker.getBoundingClientRect();
      mobileLineSvgX = (mobileLineX - trackRect.left) / trackWidth * viewBoxSize;
      mobileLineStartY = (firstMarkerRect.top + firstMarkerRect.height / 2 - trackRect.top) / trackHeight * viewBoxSize;
      mobileLineEndY = (lastMarkerRect.top + lastMarkerRect.height / 2 - trackRect.top) / trackHeight * viewBoxSize;
    }
  };

  const getScrollProgress = () => {
    const start = sectionTop - viewportHeight * .82;
    const end = sectionTop + sectionHeight - viewportHeight;
    return clamp((window.scrollY - start) / (end - start), 0, 1);
  };

  const renderTimeline = (progress) => {
    if (isMobile && chapterStates.length > 1) {
      const firstMarkerProgress = chapterStates[0].progress;
      const lastMarkerProgress = chapterStates[chapterStates.length - 1].progress;
      mobileLineProgress = clamp(
        (progress - firstMarkerProgress) / (lastMarkerProgress - firstMarkerProgress),
        0,
        1
      );
      chapterList.style.setProperty("--journey-mobile-progress", `${mobileLineProgress}`);
    }

    const dashOffset = pathLength * (1 - progress);
    if (!isMobile) {
      activePath.style.strokeDashoffset = `${dashOffset}`;
    }

    const lightPoint = isMobile
      ? {
          x: mobileLineSvgX,
          y: mobileLineStartY + (mobileLineEndY - mobileLineStartY) * mobileLineProgress
        }
      : getPointAtProgress(progress);
    lightHalo.setAttribute("cx", `${lightPoint.x}`);
    lightHalo.setAttribute("cy", `${lightPoint.y}`);
    lightCore.setAttribute("cx", `${lightPoint.x}`);
    lightCore.setAttribute("cy", `${lightPoint.y}`);

    chapterStates.forEach(({ chapter, copy, number, marker, direction, start, end }) => {
      const reveal = clamp((progress - start) / (end - start), 0, 1);
      chapter.style.setProperty("--chapter-reveal", `${reveal}`);
      copy.style.opacity = `${reveal}`;
      copy.style.transform = `translate3d(${direction * (1 - reveal) * horizontalOffset}px, 0, 0)`;
      number.style.opacity = `${reveal}`;
      marker.style.setProperty("--marker-ring-opacity", `${.3 + reveal * .22}`);
      marker.style.setProperty("--marker-core-opacity", `${.72 + reveal * .28}`);
    });

    const ctaReveal = clamp((progress - .91) / .09, 0, 1);
    if (cta) {
      cta.style.opacity = `${ctaReveal}`;
      cta.style.transform = `translate3d(0, ${(1 - ctaReveal) * 14}px, 0)`;
      const visibility = ctaReveal > 0 ? "visible" : "hidden";
      if (cta.style.visibility !== visibility) {
        cta.style.visibility = visibility;
        cta.style.pointerEvents = ctaReveal > 0 ? "auto" : "none";
      }
    }
  };

  const animateTimeline = () => {
    const difference = targetProgress - currentProgress;
    if (Math.abs(difference) < .001) {
      currentProgress = targetProgress;
      renderTimeline(currentProgress);
      frameRequested = false;
      return;
    }
    currentProgress += difference * .14;
    renderTimeline(currentProgress);
    window.requestAnimationFrame(animateTimeline);
  };

  const requestUpdate = () => {
    targetProgress = getScrollProgress();
    if (frameRequested) return;
    frameRequested = true;
    window.requestAnimationFrame(animateTimeline);
  };

  refreshGeometry();
  section.classList.add("is-enhanced");
  targetProgress = getScrollProgress();
  currentProgress = targetProgress;
  renderTimeline(currentProgress);
  window.addEventListener("scroll", requestUpdate, { passive: true });
  window.addEventListener("resize", () => {
    refreshGeometry();
    requestUpdate();
  }, { passive: true });
  if ("ResizeObserver" in window) {
    const resizeObserver = new ResizeObserver(() => {
      refreshGeometry();
      requestUpdate();
    });
    resizeObserver.observe(section);
    resizeObserver.observe(timeline);
  }
  requestUpdate();
}

function initEmotionalBannerParallax() {
  const banner = document.querySelector(".emotional-banner");
  if (!banner) return;

  const image = banner.querySelector("img");
  let frameRequested = false;
  let bannerTop = 0;
  let bannerHeight = 0;
  let viewportHeight = window.innerHeight;
  let currentOffset = 0;
  let targetOffset = 0;

  const refreshLayout = () => {
    bannerTop = banner.getBoundingClientRect().top + window.scrollY;
    bannerHeight = banner.offsetHeight;
    viewportHeight = window.innerHeight;
  };

  const updatePosition = () => {
    frameRequested = false;
    const progress = Math.max(0, Math.min(1,
      (viewportHeight - (bannerTop - window.scrollY)) / (viewportHeight + bannerHeight)
    ));
    const isCompact = window.innerWidth <= 640;
    const travel = isCompact ? 300 : 360;
    targetOffset = (progress - 0.5) * travel;
    currentOffset += (targetOffset - currentOffset) * 0.14;
    const depthScale = isCompact ? 1.22 : 1.2;

    banner.classList.add("is-parallax-active");
    image.style.setProperty("--parallax-y", `${currentOffset.toFixed(2)}px`);
    image.style.transform = `translate3d(0, ${currentOffset.toFixed(2)}px, 0) scale(${depthScale})`;

    if (Math.abs(targetOffset - currentOffset) > 0.25) {
      frameRequested = true;
      window.requestAnimationFrame(updatePosition);
    }
  };

  const requestUpdate = () => {
    if (frameRequested) return;
    frameRequested = true;
    window.requestAnimationFrame(updatePosition);
  };

  window.addEventListener("scroll", requestUpdate, { passive: true });
  window.addEventListener("resize", () => {
    refreshLayout();
    requestUpdate();
  }, { passive: true });
  window.addEventListener("orientationchange", () => {
    refreshLayout();
    requestUpdate();
  }, { passive: true });
  window.addEventListener("pageshow", () => {
    refreshLayout();
    requestUpdate();
  });
  refreshLayout();
  updatePosition();
}

function initDialog() {
  const dialog = document.getElementById("result-dialog");
  const close = dialog.querySelector(".dialog-close");
  close.addEventListener("click", () => dialog.close());
  dialog.addEventListener("click", (event) => {
    if (event.target === dialog) dialog.close();
  });
  dialog.addEventListener("close", () => {
    const image = document.getElementById("dialog-image");
    image.removeAttribute("src");
    image.alt = "";
  });

  const serviceDialog = document.getElementById("service-dialog");
  const serviceClose = serviceDialog.querySelector(".service-dialog-close");
  serviceClose.addEventListener("click", () => serviceDialog.close());
  serviceDialog.addEventListener("click", (event) => {
    if (event.target === serviceDialog) serviceDialog.close();
  });

  if (serviceDetailsButton) {
    serviceDetailsButton.addEventListener("click", openServiceDialog);
  }
}

document.getElementById("current-year").textContent = String(new Date().getFullYear());
document.getElementById("contact-display-phone").textContent = CONTACT.displayPhone;
document.getElementById("maps-link").href = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(CONTACT.address)}`;
renderTabs();
renderService();
renderOptionalContent();
renderBeforeAfterSection();
setWhatsappLinks();
initMenu();
initFaq();
initForm();
initFooterServiceLinks();
initHeaderBehavior();
initSmoothScroll();
initReveal();
initScrollProgress();
initJourney();
initEmotionalBannerParallax();
initDialog();
