
document.addEventListener('DOMContentLoaded', function() {


const jsonData = {
    "skill": [
      {
        "title": "AWS",
        "details": "4 years of experience",
        "link": [
          {
            "github": "link1"
          },
          {
            "cert": "link2"
          },
          {
            "project": "link3"
          }
        ]
      },
      {
        "title": "GCP",
        "details": "4 years of experience",
        "link": [
          {
            "github": "link4"
          },
          {
            "cert": "link5"
          },
          {
            "project": "link6"
          }
        ]
      }
    ]
  };
  
  // Function to generate HTML from JSON data
  function createSkillCards(data) {
    const skillContainer = document.getElementById('skill');
  
    data.skill.forEach(skill => {
      const subcard = document.createElement('div');
      subcard.classList.add('subcard');
  
      const leftSection = document.createElement('div');
      leftSection.classList.add('left');
  
      const icon = document.createElement('div');
      icon.classList.add('icon');
      leftSection.appendChild(icon);
  
      const center = document.createElement('div');
      center.classList.add('center');
  
      const title = document.createElement('div');
      title.classList.add('title');
      title.textContent = skill.title;
  
      const details = document.createElement('div');
      details.classList.add('details');
      details.textContent = skill.details;
  
      center.appendChild(title);
      center.appendChild(details);
      leftSection.appendChild(center);
  
      const links = document.createElement('div');
      links.classList.add('links');
  
      skill.link.forEach(linkItem => {
        for (let link in linkItem) {
          const linkElement = document.createElement('a');
          linkElement.textContent = "x";
          linkElement.href = linkItem[link];
          links.appendChild(linkElement);
        }
      });
  
      subcard.appendChild(leftSection);
      subcard.appendChild(links);
  
      skillContainer.appendChild(subcard);
    });
  }
  
  // Call the function with the provided JSON data
  createSkillCards(jsonData);
});