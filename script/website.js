async function getAPI() {
  let response = await fetch("./json/website.json");
  let data = await response.json();
  return data;
}

getAPI().then(data => createSite(data));

function createSite(jsonData) {

  createAnimation();
  createPanel();

  // Smooth scrolling for navigation links
  setTimeout(() => {
    const navLinks = document.querySelectorAll('.nav');
    navLinks.forEach(navLink => {
      navLink.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href').substring(1);
        const targetSection = document.getElementById(targetId);
        if (targetSection) {
          const topPos = targetSection.getBoundingClientRect().top + window.pageYOffset;
          window.scrollTo({
            top: topPos,
            behavior: 'smooth'
          });
        }
      });
    });
  }, 100);

  const categories = [
    'aboutme',
    'cv',
    'skill',
    'certificate',
    'work',
    'project',
    'education',
    'contectme'
  ];

  if (jsonData['dream']) {
    createDreamCard(jsonData['dream']);
  }

  categories.forEach(category => {
    if (jsonData[category]) {
      createCards(jsonData, category);
    }
  });

  // Scroll Reveal Animations Observer
  setTimeout(() => {
    const revealElements = document.querySelectorAll('.reveal');
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -40px 0px'
    };
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active-reveal');
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);
    revealElements.forEach(el => revealObserver.observe(el));
  }, 100);
}

function createCards(data, category) {
  const container = document.getElementById(category);
  if (!container) return;

  let targetContainer = container;
  const useGrid = ['skill', 'certificate', 'project'].includes(category);

  if (useGrid) {
    targetContainer = document.createElement('div');
    targetContainer.classList.add('grid-wrapper');
    container.appendChild(targetContainer);
  }

  let index = 0;
  data[category].forEach(item => {
    const card = document.createElement('div');
    card.classList.add('subcard');

    if (category === 'certificate' && index >= 6) {
      card.classList.add('collapsed-card');
      card.style.display = 'none';
    }

    const leftSection = document.createElement('div');
    leftSection.classList.add('left');

    if (item.thumbnail) {
      const icon = document.createElement('div');
      icon.classList.add('icon');
      const thumbnail = document.createElement('img');
      thumbnail.classList.add('thumbnail');
      thumbnail.setAttribute('width', 100);
      thumbnail.setAttribute('height', 100);
      thumbnail.src = item.thumbnail;
      thumbnail.alt = "Img";

      icon.appendChild(thumbnail);
      leftSection.appendChild(icon);
    }

    if (item.iicon) {
      const icon = document.createElement('div');
      icon.classList.add('icon');

      const ilogo = document.createElement('i');
      const classes = item.iicon.split(' ');
      classes.forEach(className => {
        ilogo.classList.add(className);
      });

      icon.appendChild(ilogo);
      leftSection.appendChild(icon);
    }
    const center = document.createElement('div');
    center.classList.add('center');

    if (item.title) {
      const title = document.createElement('div');
      title.classList.add('title');
      title.textContent = item.title;
      center.appendChild(title);
    }

    if (item.details) {
      const details = document.createElement('div');
      details.classList.add('details');
      details.textContent = item.details;
      center.appendChild(details);
    }

    leftSection.appendChild(center);

    const links = document.createElement('div');
    links.classList.add('links');

    if (item.link) {
      item.link.forEach(linkItem => {
        for (let link in linkItem) {
          const linkElement = document.createElement('a');
          const i = document.createElement('i');

          const classes = link.split(' ');
          classes.forEach(className => {
            i.classList.add(className);
          });

          linkElement.appendChild(i);
          linkElement.href = linkItem[link];
          linkElement.ariaLabel = "link";
          links.appendChild(linkElement);
        }
      });
    }

    card.appendChild(leftSection);
    card.appendChild(links);
    targetContainer.appendChild(card);
    index++;
  });

  if (category === 'certificate' && data[category].length > 6) {
    const btn = document.createElement('button');
    btn.className = 'toggle-certs-btn';
    btn.textContent = 'Show All Certifications (' + data[category].length + ')';
    btn.style.margin = '20px auto';
    btn.style.display = 'block';

    btn.addEventListener('click', () => {
      const collapsedCards = targetContainer.querySelectorAll('.collapsed-card');
      const isExpanded = btn.classList.contains('expanded');

      collapsedCards.forEach(c => {
        c.style.display = isExpanded ? 'none' : 'flex';
      });

      if (isExpanded) {
        btn.classList.remove('expanded');
        btn.textContent = 'Show All Certifications (' + data[category].length + ')';
        container.scrollIntoView({ behavior: 'smooth' });
      } else {
        btn.classList.add('expanded');
        btn.textContent = 'Show Less';
      }
    });
    container.appendChild(btn);
  }
}

function createDreamCard(dreamData) {
  const container = document.getElementById('Dream');
  if (!container || !dreamData || !dreamData.length) return;

  const item = dreamData[0];

  const card = document.createElement('div');
  card.className = 'subcard dream-card';

  const leftDiv = document.createElement('div');
  leftDiv.className = 'dream-left';

  const img = document.createElement('img');
  img.alt = 'paa';
  img.src = item.thumbnail || './images/Paa.jpeg';
  img.className = 'dream-img';
  leftDiv.appendChild(img);

  const rightDiv = document.createElement('div');
  rightDiv.className = 'dream-right';

  if (item.paragraphs) {
    item.paragraphs.forEach((para, index) => {
      if (index > 0) {
        rightDiv.appendChild(document.createElement('br'));
        rightDiv.appendChild(document.createElement('br'));
      }
      rightDiv.appendChild(document.createTextNode(para));
    });
  }

  card.appendChild(leftDiv);
  card.appendChild(rightDiv);
  container.appendChild(card);
}

function createAnimation() {
  const duration = 25;
  document.documentElement.style.setProperty('--animation-duration', `${duration}s`);
  
  const boxes = document.querySelectorAll('.axis-1 .box');
  const count = boxes.length;
  if (count > 0) {
    const step = duration / count;
    boxes.forEach((box, index) => {
      box.style.animationDelay = `-${index * step}s`;
    });
  }
}

function createPanel() {
  const panel = document.getElementById('panel');
  if (!panel) return;
  const navContainer = document.createElement('div');

  const navigator = [
    { src: './images/p01home.png', href: '#home', label: 'Home' },
    { src: './images/p002information.png', href: '#aboutme', label: 'About Me' },
    { src: './images/p005cv.png', href: '#cv', label: 'Resume' },
    { src: './images/p007skill.png', href: '#skill', label: 'Skills' },
    { src: './images/p003certificate.png', href: '#certificate', label: 'Certifications' },
    { src: './images/p008computer.png', href: '#work', label: 'Experience' },
    { src: './images/p003scholarship.png', href: '#education', label: 'Education' },
    { src: './images/p009code.png', href: '#project', label: 'Projects' },
    { src: './images/p010network.png', href: '#contectme', label: 'Contact' }
  ];

  navigator.forEach(imageData => {
    const anchor = document.createElement('a');
    anchor.className = 'nav';
    anchor.href = imageData.href;
    anchor.setAttribute('data-tooltip', imageData.label);

    const img = document.createElement('img');
    img.className = 'navigator';
    img.alt = imageData.label;
    img.src = imageData.src;

    anchor.appendChild(img);
    navContainer.appendChild(anchor);
  });

  panel.appendChild(navContainer);

  const clockElement = document.createElement('div');
  clockElement.className = 'nav-clock';
  panel.appendChild(clockElement);

  function updateClock() {
    const now = new Date();
    clockElement.textContent = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }
  updateClock();
  setInterval(updateClock, 1000);

  panel.classList.add("panelhide");

  var prevScrollpos = window.pageYOffset;
  window.onscroll = function () {
    var currentScrollPos = window.pageYOffset;
    if (prevScrollpos < currentScrollPos) {
      panel.classList.add("panelshow");
    }
    if (currentScrollPos != 0) {
      panel.classList.add("panelshow");
      panel.classList.remove("panelhide");
    } else {
      panel.classList.remove("panelshow");
      panel.classList.add("panelhide");
    }
    prevScrollpos = currentScrollPos;

    // ScrollSpy active link toggle
    const sections = document.querySelectorAll('.card, #home');
    const navLinks = document.querySelectorAll('.nav');
    let currentActiveId = '';
    
    sections.forEach(section => {
      const rect = section.getBoundingClientRect();
      if (rect.top <= window.innerHeight * 0.4 && rect.bottom >= window.innerHeight * 0.4) {
        currentActiveId = section.getAttribute('id');
      }
    });

    if (currentActiveId) {
      navLinks.forEach(link => {
        if (link.getAttribute('href') === '#' + currentActiveId) {
          link.classList.add('active');
        } else {
          link.classList.remove('active');
        }
      });
    }
  }
}