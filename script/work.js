async function getAPI() {
  let response = await fetch("./json/work.json");
  let data = await response.json();
 
  return data;
}

getAPI().then(data => createCards(data));

function createCards(data) {
  const container = document.getElementById('work');

  data.work.forEach(item => {
    const workcard = document.createElement('div');
    workcard.classList.add('workcard');

    const card = document.createElement('div');
    card.classList.add('subcard');

    const leftSection = document.createElement('div');
    leftSection.classList.add('left');

    if (item.thumbnail) {
      const icon = document.createElement('div');
      icon.classList.add('icon');
      const thumbnail = document.createElement('img');
      thumbnail.classList.add('thumbnail');
      thumbnail.src = item.thumbnail;

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

          linkElement.appendChild(i)
          linkElement.href = linkItem[link];
          links.appendChild(linkElement);
        }
      });
    }
    card.appendChild(leftSection);
    card.appendChild(links);
    workcard.appendChild(card);


    if (item.technology) {

      const technologyDiv = document.createElement('div');
      technologyDiv.classList.add('technology');

  
      item.technology.forEach(tech => {
        const pTag = document.createElement('p');
        pTag.textContent = tech;
        technologyDiv.appendChild(pTag);
      });
      workcard.appendChild(technologyDiv)
    }

    if (item.RoleandResponsibility) {
      const RandR = document.createElement('div');
      RandR.classList.add('role-responsibility');

      const sectionHeader = document.createElement('div');
      sectionHeader.className = 'role-section-header';
      sectionHeader.innerHTML = '<h4>Roles & Responsibilities</h4><span class="instruction-text">(Click categories to expand/collapse)</span>';
      RandR.appendChild(sectionHeader);

      item.RoleandResponsibility.forEach(roleGroup => {
          const keys = Object.keys(roleGroup);
          keys.forEach(key => {
            const roleDiv = document.createElement('div');
            roleDiv.classList.add('role', 'collapsible-trigger');
            
            const arrow = document.createElement('span');
            arrow.className = 'dropdown-arrow';
            arrow.innerHTML = '<i class="fa-solid fa-chevron-right"></i>';
            
            const titleSpan = document.createElement('span');
            titleSpan.textContent = key;
            
            roleDiv.appendChild(arrow);
            roleDiv.appendChild(titleSpan);
      
            RandR.appendChild(roleDiv);
      
            const responsibilities = document.createElement('div');
            responsibilities.classList.add('responsibilities', 'collapsed');
      
            roleGroup[key].forEach(responsibility => {
              const respDiv = document.createElement('div');
              respDiv.classList.add('respossibilities');
              respDiv.textContent = responsibility;
      
              responsibilities.appendChild(respDiv);
            });

            roleDiv.addEventListener('click', () => {
              const isCollapsed = responsibilities.classList.toggle('collapsed');
              roleDiv.classList.toggle('active-trigger', !isCollapsed);
              const chevron = arrow.querySelector('i');
              if (isCollapsed) {
                chevron.className = 'fa-solid fa-chevron-right';
              } else {
                chevron.className = 'fa-solid fa-chevron-down';
              }
            });

            RandR.appendChild(responsibilities);
          });  
      });
      workcard.appendChild(RandR);
    }

    if (item.accomplishment) {

      const accomplishmentDiv = document.createElement('div');
      accomplishmentDiv.classList.add('accomplishment');

  
      item.accomplishment.forEach(accomplishment => {
        const pTag = document.createElement('p');
        pTag.textContent = accomplishment;
        accomplishmentDiv.appendChild(pTag);
      });
      workcard.appendChild(accomplishmentDiv)
    }

    
    container.appendChild(workcard);

  });
}
