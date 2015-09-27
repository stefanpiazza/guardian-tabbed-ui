function getTabData() {
    var xmlhttp,
        response;

    if (window.XMLHttpRequest) {
        xmlhttp = new XMLHttpRequest();
    }
    
    else {
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    } 

    xmlhttp.addEventListener('readystatechange', function () {
        if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
            response = JSON.parse(xmlhttp.response);
            setTabContent(response);                       
        }                
    })

    xmlhttp.open("GET", "http://content.guardianapis.com/" + event.target.value + "?api-key=9wur7sdh84azzazdt3ye54k4", true);
    xmlhttp.send();                               
}

function setTabContent(contentData) {
    var sectionId = contentData.response.section.id
    var results = contentData.response.results;

    deleteNewsContent(sectionId);

    for (var i = 0; i < results.length; i+=1) {
        document.getElementById(sectionId + '-tab-content').appendChild(createNewsContent(results[i]));
    }
}

function createNewsContent(result) {
    var link = document.createElement('a');
    link.href = result.webUrl;
    link.innerHTML = result.webTitle

    var item = document.createElement('li');

    item.appendChild(link);

    return item
}

function deleteNewsContent(sectionId) {
    while (document.getElementById(sectionId + '-tab-content').childNodes.length > 0) {
        document.getElementById(sectionId + '-tab-content').removeChild(document.getElementById(sectionId + '-tab-content').childNodes[0]);
    }
}