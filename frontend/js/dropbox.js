async function getAccessToken() {
    try {
        const res = await fetch('http://localhost:3000/get-access-token')
        const data = await res.json()
        return data.access_token
    } catch (error) {
        console.error('Erro ao obter o Acess Token: ', error)
    }
}

async function listFiles(path, carouselId) {
    const accessToken = await getAccessToken()
    var dbx = new Dropbox.Dropbox({ accessToken: accessToken })

    dbx.filesListFolder({ path: path })
        .then(function (res) {
            displayFilesInCarousel(res.result.entries, carouselId)
        })
        .catch(function (error) {
            console.error(error.error || error)
        })
}

function displayFilesInCarousel(files, carouselId) {
    var carouselContent = document.getElementById(carouselId);
    carouselContent.innerHTML = '';

    if (carouselId === 'carousel-content') {
        files.forEach((file) => {
            var item = document.createElement('div')
            item.className = 'publication'

            var imgElement = document.createElement('img')
            imgElement.src = '../images/article.svg'
            imgElement.alt = file.name

            var containerElement = document.createElement('div')
            containerElement.className = 'publication-container'

            var titleElement = document.createElement('h1')
            titleElement.className = 'pub-title'
            titleElement.textContent = file.name

            var dateElement = document.createElement('p')
            dateElement.className = 'pub-date'
            dateElement.textContent = new Date(file.client_modified).toLocaleDateString();


            var downloadButton = document.createElement('button')
            downloadButton.className = 'publication-button'
            downloadButton.textContent = 'Baixar'
            downloadButton.onclick = function () {
                downloadFile(file.path_lower)
            }

            containerElement.appendChild(titleElement)
            containerElement.appendChild(dateElement)

            item.appendChild(imgElement)
            item.appendChild(containerElement)
            item.appendChild(downloadButton)

            carouselContent.appendChild(item);
        });
    } else if (carouselId === 'carousel') {
        var sortedFiles = files.sort((a, b) => new Date(b.client_modified) - new Date(a.client_modified));

        var recentFiles = sortedFiles.slice(0, 3);

        recentFiles.forEach((file) => {
            var item = document.createElement('div');
            item.className = 'article';

            var imgElement = document.createElement('img');
            imgElement.src = '../images/article.svg';
            imgElement.alt = file.name;

            var containerElement = document.createElement('div');
            containerElement.className = 'article-info';

            var titleElement = document.createElement('h3');
            titleElement.className = 'article-title';
            titleElement.textContent = file.name;

            var dateElement = document.createElement('p');
            dateElement.className = 'article-date';
            dateElement.textContent = new Date(file.client_modified).toLocaleDateString();

            var downloadButton = document.createElement('button');
            downloadButton.className = 'read-more';
            downloadButton.textContent = 'Baixar';
            downloadButton.onclick = function () {
                downloadFile(file.path_lower);
            };

            containerElement.appendChild(titleElement);
            containerElement.appendChild(dateElement);

            item.appendChild(imgElement);
            item.appendChild(containerElement);
            item.appendChild(downloadButton);

            carouselContent.appendChild(item);
        });

    } else {
        files.forEach((file) => {
            var item = document.createElement('a')
            item.className = 'file-name'

            item.textContent = file.name
            item.onclick = function (event) {
                event.preventDefault();
                downloadFile(file.path_lower);
            };

            carouselContent.appendChild(item)
        })
    }

}

async function downloadFile(filePath) {
    const accessToken = await getAccessToken()

    var dbx = new Dropbox.Dropbox({ accessToken: accessToken });

    dbx.filesGetTemporaryLink({ path: filePath })
        .then(function (data) {
            var downloadUrl = data.result.link
            var downloadButton = document.createElement('a')
            downloadButton.setAttribute('href', downloadUrl)
            downloadButton.setAttribute('download', data.result.name)
            downloadButton.click()
        })
        .catch(function (error) {
            console.error(error.error || error)
        })
}
