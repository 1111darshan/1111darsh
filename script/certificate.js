
document.addEventListener('DOMContentLoaded', function () {


    const jsonData = {
        "certificate": [
            {
                "thumbnail": "./images/11dlogo.png",
                "title": "AWS",
                "details": "4 years of experience",
                "link": [
                    {
                        "fab fa-github fa-2x": "link1"
                    },
                    {
                        "fas fa-certificate fa-2x": "link2"
                    }
                ]
            },
            {
                "thumbnail": "./images/11dlogo.png",
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
    function createcertificateCards(data) {
        const certificateContainer = document.getElementById('certificat');

        data.certificate.forEach(certificate => {
            const subcard = document.createElement('div');
            subcard.classList.add('subcard');

            const leftSection = document.createElement('div');
            leftSection.classList.add('left');

            const icon = document.createElement('div');
            icon.classList.add('icon');
            leftSection.appendChild(icon);

            const thumbnail = document.createElement('img');
            thumbnail.classList.add('thumbnail');
            thumbnail.src = certificate.thumbnail;

            icon.appendChild(thumbnail);
            leftSection.appendChild(icon);

            const center = document.createElement('div');
            center.classList.add('center');

            const title = document.createElement('div');
            title.classList.add('title');
            title.textContent = certificate.title;

            const details = document.createElement('div');
            details.classList.add('details');
            details.textContent = certificate.details;

            center.appendChild(title);
            center.appendChild(details);
            leftSection.appendChild(center);

            const links = document.createElement('div');
            links.classList.add('links');

            certificate.link.forEach(linkItem => {
                for (let link in linkItem) {
                    const linkElement = document.createElement('a');
                    const i = document.createElement('i');
                    // i.classList.add('fas', link);

                    const classes = link.split(' ');
                    classes.forEach(className => {
                        i.classList.add(className);
                    });

                    linkElement.appendChild(i)
                    linkElement.href = linkItem[link];
                    links.appendChild(linkElement);
                }
            });

            subcard.appendChild(leftSection);
            subcard.appendChild(links);

            certificateContainer.appendChild(subcard);
        });
    }

    // Call the function with the provided JSON data
    createcertificateCards(jsonData);
});