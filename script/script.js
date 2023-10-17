async function getAPI(){
    let host = "https://1111darsh.com"
    let response = await fetch(host + "/json/certificates.json");
    let data = await response.json()
    console.log(data)

    return data;
}

getAPI().then(data => createCertificateBlock(data) );


function createCertificateBlock(data) {
    const certificateSection = document.getElementById("certificate-section");
    const certificateBlock = document.createElement("a");
    certificateBlock.className = "certificate";
    certificateBlock.href = data.link;

    const certImage = document.createElement("div");
    certImage.className = "cert-image";

    const certDetails = document.createElement("div");
    certDetails.className = "cert-details";

    const titleHeader = document.createElement("h3");
    titleHeader.textContent = data.title;

    const providerHeader = document.createElement("h4");
    providerHeader.textContent = data.provider;

    const dateHeader = document.createElement("h5");
    dateHeader.textContent = data.date;

    certDetails.appendChild(titleHeader);
    certDetails.appendChild(providerHeader);
    certDetails.appendChild(dateHeader);

    certificateBlock.appendChild(certImage);
    certificateBlock.appendChild(certDetails);
    certificateSection.appendChild(certificateBlock);
}
