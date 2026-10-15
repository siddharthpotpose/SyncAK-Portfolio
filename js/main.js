document.addEventListener('DOMContentLoaded', () => {

  const hasAOS = typeof AOS !== 'undefined';
  const hasGSAP = typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined';

  if (hasAOS) {
    AOS.init({ duration: 700, once: true, offset: 50, easing: 'ease-out-cubic' });
  }

  if (hasGSAP) {
    gsap.registerPlugin(ScrollTrigger);
  }

  /* ==========================================================
     1. MARQUEE — 21 gif tiles split into two rows, scroll-linked
  ========================================================== */
  const gifUrls = [
    "https://motionsites.ai/assets/hero-space-voyage-preview-eECLH3Yc.gif",
    "https://motionsites.ai/assets/hero-codenest-preview-Cgppc2qV.gif",
    "https://motionsites.ai/assets/hero-vex-ventures-preview-BczMFIiw.gif",
    "https://motionsites.ai/assets/hero-stellar-ai-v2-preview-DjvxjG3C.gif",
    "https://motionsites.ai/assets/hero-asme-preview-B_nGDnTP.gif",
    "https://motionsites.ai/assets/hero-transform-data-preview-Cx5OU29N.gif",
    "https://motionsites.ai/assets/hero-vitara-preview-Cjz2QYyU.gif",
    "https://motionsites.ai/assets/hero-terra-preview-BFjrCr7T.gif",
    "https://motionsites.ai/assets/hero-skyelite-preview-DHaZIgUv.gif",
    "https://motionsites.ai/assets/hero-aethera-preview-DknSlcTa.gif",
    "https://motionsites.ai/assets/hero-designpro-preview-D8c5_een.gif",
    "https://motionsites.ai/assets/hero-stellar-ai-preview-D3HL6bw1.gif",
    "https://motionsites.ai/assets/hero-xportfolio-preview-D4A8maiC.gif",
    "https://motionsites.ai/assets/hero-orbit-web3-preview-BXt4OttD.gif",
    "https://motionsites.ai/assets/hero-nexora-preview-cx5HmUgo.gif",
    "https://motionsites.ai/assets/hero-evr-ventures-preview-DZxeVFEX.gif",
    "https://motionsites.ai/assets/hero-planet-orbit-preview-DWAP8Z1P.gif",
    "https://motionsites.ai/assets/hero-new-era-preview-CocuDUm9.gif",
    "https://motionsites.ai/assets/hero-wealth-preview-B70idl_u.gif",
    "https://motionsites.ai/assets/hero-luminex-preview-CxOP7ce6.gif",
    "https://motionsites.ai/assets/hero-celestia-preview-0yO3jXO8.gif"
  ];

  const row1Imgs = gifUrls.slice(0, 11);
  const row2Imgs = gifUrls.slice(11);

  function buildRow(container, imgs) {
    const tripled = [...imgs, ...imgs, ...imgs];
    container.innerHTML = tripled
      .map((src, i) => `<img src="${src}" alt="project preview ${i + 1}" loading="lazy">`)
      .join('');
  }

  const row1El = document.getElementById('marqueeRow1');
  const row2El = document.getElementById('marqueeRow2');
  const marqueeSection = document.getElementById('marqueeSection');

  if (row1El && row2El && marqueeSection) {
    buildRow(row1El, row1Imgs);
    buildRow(row2El, row2Imgs);

    function updateMarquee() {
      const sectionTop = marqueeSection.offsetTop;
      const offset = (window.scrollY - sectionTop + window.innerHeight) * 0.3;
      row1El.style.transform = `translateX(${offset - 200}px)`;
      row2El.style.transform = `translateX(${-(offset - 200)}px)`;
    }
    window.addEventListener('scroll', updateMarquee, { passive: true });
    updateMarquee();
  }

  /* ==========================================================
     2. MAGNET — mouse-following hero portrait
  ========================================================== */
  const magnetEl = document.getElementById('magnetPortrait');
  const PADDING = 150;
  const STRENGTH = 3;

  if (magnetEl) {
    function onMouseMove(e) {
      const rect = magnetEl.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const distX = Math.abs(e.clientX - centerX);
      const distY = Math.abs(e.clientY - centerY);

      if (distX < rect.width / 2 + PADDING && distY < rect.height / 2 + PADDING) {
        const x = (e.clientX - centerX) / STRENGTH;
        const y = (e.clientY - centerY) / STRENGTH;
        magnetEl.style.transition = 'transform 0.3s ease-out';
        magnetEl.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      } else {
        magnetEl.style.transition = 'transform 0.6s ease-in-out';
        magnetEl.style.transform = 'translate3d(0px, 0px, 0)';
      }
    }
    window.addEventListener('mousemove', onMouseMove, { passive: true });
  }

  /* ==========================================================
     3. ANIMATED TEXT — character-by-character scroll reveal
  ========================================================== */
  const textEl = document.getElementById('animatedText');
  if (textEl) {
    const original = textEl.textContent.trim();
    textEl.innerHTML = original
      .split('')
      .map(ch => `<span class="char">${ch === ' ' ? '&nbsp;' : ch}</span>`)
      .join('');

    const chars = textEl.querySelectorAll('.char');

    if (hasGSAP) {
      gsap.to(chars, {
        opacity: 1,
        stagger: {
          each: 1 / chars.length,
          from: 'start'
        },
        scrollTrigger: {
          trigger: textEl,
          start: 'top 80%',
          end: 'bottom 20%',
          scrub: true
        }
      });
    }
  }

  /* ==========================================================
     4. STICKY PROJECT CARDS — scale down as next card arrives
  ========================================================== */
  const cards = Array.from(document.querySelectorAll('.project-card'));
  const total = cards.length;

  if (hasGSAP) {
    cards.forEach((card, i) => {
      const targetScale = 1 - (total - 1 - i) * 0.03;

      if (i < total - 1) {
        ScrollTrigger.create({
          trigger: card,
          start: 'top top',
          endTrigger: cards[i + 1],
          end: 'top top',
          scrub: true,
          onUpdate: (self) => {
            const scale = gsap.utils.interpolate(1, targetScale, self.progress);
            gsap.set(card, { scale });
          }
        });
      }
    });
  }

  const projectVideos = cards
    .map((card, index) => {
      const video = card.querySelector('video');
      if (!video) return null;

      card.style.zIndex = index + 1;
      video.classList.add('project-video');
      video.muted = false;
      video.volume = 1;
      video.loop = true;
      video.controls = false;
      video.playsInline = true;
      video.removeAttribute('muted');
      video.setAttribute('loop', '');
      video.setAttribute('playsinline', '');
      video.setAttribute('preload', 'metadata');

      return { card, video };
    })
    .filter(Boolean);
  const projectsSection = document.getElementById('projects');
  let activeItem = null;
  let videoFrame = null;

  function pauseProjectVideos(exceptItem = null) {
    projectVideos.forEach(item => {
      if (item === exceptItem) return;
      const { card, video } = item;
      video.pause();
      video.muted = false;
      video.removeAttribute('muted');
      if (video.currentTime > 0.05) {
        try {
          video.currentTime = 0;
        } catch (error) {
          video.load();
        }
      }
      card.classList.remove('is-video-active');
    });

    if (!exceptItem) {
      activeItem = null;
    }
  }

  function playProjectVideo(item) {
    if (!item || activeItem === item) return;

    pauseProjectVideos(item);
    item.video.muted = false;
    item.video.volume = 1;
    item.video.removeAttribute('muted');
    item.card.classList.add('is-video-active');
    activeItem = item;

    const playAttempt = item.video.play();
    if (playAttempt && typeof playAttempt.catch === 'function') {
      playAttempt.catch(() => {
        item.card.classList.remove('is-video-active');
        if (activeItem === item) {
          activeItem = null;
        }
      });
    }
  }

  function unlockProjectAudio() {
    projectVideos.forEach(({ video }) => {
      video.muted = false;
      video.volume = 1;
      video.removeAttribute('muted');
    });

    syncProjectVideos();
  }

  function getTopProjectAtFocusPoint() {
    if (!projectsSection) return null;

    const sectionRect = projectsSection.getBoundingClientRect();
    const viewportHeight = window.innerHeight;

    if (sectionRect.bottom < 120 || sectionRect.top > viewportHeight - 120) {
      return null;
    }

    const focusX = Math.round(window.innerWidth / 2);
    const focusY = Math.round(Math.min(viewportHeight * 0.58, viewportHeight - 80));
    const elements = document.elementsFromPoint(focusX, focusY);

    for (const element of elements) {
      const card = element.closest?.('.project-card');
      const item = projectVideos.find(projectItem => projectItem.card === card);

      if (item) {
        return item;
      }
    }

    return null;
  }

  function getClosestVisibleProject() {
    const viewportHeight = window.innerHeight;
    const viewportCenter = viewportHeight * 0.56;
    let bestItem = null;
    let bestScore = 0;

    projectVideos.forEach(item => {
      const rect = item.card.getBoundingClientRect();
      const visibleHeight = Math.max(0, Math.min(rect.bottom, viewportHeight) - Math.max(rect.top, 0));
      const visibleRatio = visibleHeight / Math.min(rect.height, viewportHeight);
      const cardFocus = rect.top + rect.height * 0.45;
      const distancePenalty = Math.abs(cardFocus - viewportCenter) / viewportHeight;
      const score = visibleRatio - distancePenalty * 0.4;

      if (score > bestScore) {
        bestScore = score;
        bestItem = item;
      }
    });

    return bestScore > 0.22 ? bestItem : null;
  }

  function syncProjectVideos() {
    videoFrame = null;

    if (document.hidden || projectVideos.length === 0) {
      pauseProjectVideos();
      return;
    }

    const bestItem = getTopProjectAtFocusPoint() || getClosestVisibleProject();

    if (bestItem) {
      playProjectVideo(bestItem);
    } else {
      pauseProjectVideos();
    }
  }

  function requestVideoSync() {
    if (videoFrame) return;
    videoFrame = requestAnimationFrame(syncProjectVideos);
  }

  if (projectVideos.length) {
    window.addEventListener('scroll', requestVideoSync, { passive: true });
    window.addEventListener('resize', requestVideoSync, { passive: true });
    window.addEventListener('pointerdown', unlockProjectAudio, { passive: true, once: true });
    window.addEventListener('keydown', unlockProjectAudio, { once: true });
    document.addEventListener('visibilitychange', syncProjectVideos);
    window.addEventListener('pageshow', requestVideoSync);
    syncProjectVideos();
  }

  const forestRevealSection = document.querySelector('.forest-reveal-section');
  const forestRevealMask = document.querySelector('.forest-reveal-mask');

  if (forestRevealSection && forestRevealMask) {
    const setForestReveal = () => {
      const rect = forestRevealSection.getBoundingClientRect();
      const viewportHeight = window.innerHeight || document.documentElement.clientHeight || 1;
      const sectionScroll = Math.max(forestRevealSection.offsetHeight - viewportHeight, 1);
      const progress = Math.min(Math.max(-rect.top / sectionScroll, 0), 1);
      const startRadius = Math.max(88, Math.min(window.innerWidth, viewportHeight) * 0.18);
      const endRadius = Math.hypot(window.innerWidth, viewportHeight) * 1.08;
      const radius = startRadius + (endRadius - startRadius) * progress;

      forestRevealMask.style.setProperty('--reveal-radius', `${radius}px`);
    };

    window.addEventListener('scroll', setForestReveal, { passive: true });
    window.addEventListener('resize', setForestReveal, { passive: true });
    window.addEventListener('pageshow', setForestReveal);
    setForestReveal();
  }

  if (hasGSAP) {
    ScrollTrigger.refresh();
  }
});





document.addEventListener("contextmenu", e => e.preventDefault());

document.addEventListener("keydown", function(e){

    if(e.keyCode == 123){
        e.preventDefault();
    }

    if(e.ctrlKey && e.shiftKey &&
       ['I','J','C'].includes(e.key.toUpperCase())){
        e.preventDefault();
    }

    if(e.ctrlKey && e.key.toUpperCase() === 'U'){
        e.preventDefault();
    }

});


// -------------------------------------------


// 0-------------------------------------------



const canInitFiniteCards =
  typeof gsap !== 'undefined' &&
  typeof ScrollTrigger !== 'undefined';

if (canInitFiniteCards) {
  gsap.registerPlugin(ScrollTrigger);
}

const infiniteCardsSection = document.querySelector(".infinite-cards");

if (infiniteCardsSection && canInitFiniteCards) {

  const cardItems = gsap.utils.toArray(
    ".infinite-cards__list li",
    infiniteCardsSection
  );

  gsap.set(cardItems, {
    xPercent: 400,
    autoAlpha: 0,
    scale: 0,
    transformOrigin: "50% 50%"
  });

  const spacing = 0.12;
  const cardDuration = 1;
  const streamStart = cardDuration / 2;
  const streamEnd = (cardItems.length - 1) * spacing + cardDuration / 2;

  const cardsSequence = gsap.timeline({
    paused: true,
    defaults: {
      ease: "none"
    }
  });

  cardItems.forEach((card, index) => {
    const cardStart = index * spacing;

    cardsSequence.set(card, { zIndex: index + 1 }, cardStart);

    cardsSequence
      .fromTo(
        card,
        {
          scale: 0,
          autoAlpha: 0
        },
        {
          scale: 1,
          autoAlpha: 1,
          zIndex: 100 + index,
          duration: cardDuration / 2,
          yoyo: true,
          repeat: 1,
          ease: "power1.in",
          immediateRender: false
        },
        cardStart
      )
      .fromTo(
        card,
        {
          xPercent: 400
        },
        {
          xPercent: -400,
          duration: cardDuration,
          ease: "none",
          immediateRender: false
        },
        cardStart
      );
  });

  cardsSequence.time(streamStart);

  const cardsTimeline = gsap.timeline({
    defaults: {
      ease: "none"
    }
  });

  cardsTimeline.fromTo(
    cardsSequence,
    {
      time: streamStart
    },
    {
      time: streamEnd,
      duration: 1,
      immediateRender: true
    }
  );

  function getInfiniteCardsScrollDistance() {
    const viewportWidth = window.innerWidth || document.documentElement.clientWidth;
    const viewportHeight = window.innerHeight || document.documentElement.clientHeight;

    if (viewportWidth <= 420) {
      return cardItems.length * Math.max(viewportHeight * 0.28, 170);
    }

    if (viewportWidth <= 767) {
      return cardItems.length * Math.max(viewportHeight * 0.34, 220);
    }

    if (viewportWidth <= 1023) {
      return cardItems.length * Math.max(viewportHeight * 0.48, 330);
    }

    return cardItems.length * Math.max(viewportHeight * 0.62, 460);
  }

  const trigger = ScrollTrigger.create({
    trigger: infiniteCardsSection,
    start: "top top",
    end: () => `+=${getInfiniteCardsScrollDistance()}`,
    animation: cardsTimeline,
    pin: infiniteCardsSection,
    scrub: 0.8,
    invalidateOnRefresh: true,
    anticipatePin: 1
  });

  const prevButton =
    infiniteCardsSection.querySelector(
      ".infinite-cards__btn--prev"
    );

  const nextButton =
    infiniteCardsSection.querySelector(
      ".infinite-cards__btn--next"
    );

  function getCurrentCardIndex() {
    return gsap.utils.clamp(
      0,
      cardItems.length - 1,
      Math.round((cardsSequence.time() - streamStart) / spacing)
    );
  }

  function scrollToCard(index) {
    const clampedIndex = gsap.utils.clamp(0, cardItems.length - 1, index);
    const targetTime = clampedIndex * spacing + cardDuration / 2;
    const progress = (targetTime - streamStart) / (streamEnd - streamStart);
    const scrollTop =
      trigger.start +
      progress * (trigger.end - trigger.start);

    window.scrollTo({
      top: scrollTop,
      behavior: "smooth"
    });
  }

  if (nextButton) {
    nextButton.addEventListener("click", () => {
      const currentIndex = getCurrentCardIndex();

      if (currentIndex === cardItems.length - 1) {
        window.scrollTo({
          top: trigger.end + 2,
          behavior: "smooth"
        });
        return;
      }

      scrollToCard(currentIndex + 1);
    });
  }

  if (prevButton) {
    prevButton.addEventListener("click", () => {
      const currentIndex = getCurrentCardIndex();

      if (currentIndex === 0) {
        window.scrollTo({
          top: trigger.start - 2,
          behavior: "smooth"
        });
        return;
      }

      scrollToCard(currentIndex - 1);
    });
  }

}
