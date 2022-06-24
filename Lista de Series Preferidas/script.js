class CatalogAnimes {
    constructor() {
        this.id = 1;
        this.animes = [];
        this.idEdit = null;
    }

    addAnime() {
        let anime = {};

        if (this.checkFields()) {
            anime = this.registerAnime();
            this.includeAnime(anime);
            this.renderAnimes();
        }

        if (this.animes.length > 1) {
            document.getElementById('select').style.display = 'inline-block';
            this.sortingOptions();
        }

        this.cleanInputs();
    }

    confirmAnimeEdit() {
        if (this.checkFields()) {
            this.updateAnime();
            this.renderAnimes();
        }

        if (this.animes.length > 1) {
            document.getElementById('select').style.display = 'inline-block';
            this.sortingOptions();
        }

        document.getElementById('addButton').style.display = 'inline';
        document.getElementById('confirmButton').style.display = 'none';

        this.cleanInputs();
        this.idEdit = null;
    }

    checkFields() {
        let msg = '';
        let editedNameField = document.getElementById('inputName').value;
        let editedImgField = document.getElementById('inputImg').value;
        let editedScoreField = document.getElementById('inputScore').value;

        if (editedNameField.trim().length === 0) {
            msg += '- Insira o NOME do anime! \n';
        }

        for (let animeIndex = 0; animeIndex < this.animes.length; animeIndex++) {
            if (this.compareAnimeNames(this.animes[animeIndex].name, editedNameField)) {
                alert('Esse anime já está na lista!')
                return false
            }
        }

        if (editedImgField === '') {
            msg += '- Passe uma URL de imagem! \n';
        } else if (this.checkImage(editedImgField) === false) {
            msg += '- URL inválida! Passe outra. \n';
        }

        if (editedScoreField === '') {
            msg += '- Dê uma NOTA para o anime! \n';
        }

        if (msg !== '') {
            alert(msg);
            return false;
        }
        return true;
    }

    registerAnime() {
        let anime = {};

        anime.id = Number(this.id);
        anime.name = document.getElementById('inputName').value;
        anime.img = document.getElementById('inputImg').value;
        anime.score = document.getElementById('inputScore').value;
        anime.firstLetter = anime.name.substr(0, 1);

        return anime;
    }

    updateAnime() {
        let animeIndex = this.findAnimeIndex(this.idEdit);
        let anime = this.animes[animeIndex];

        anime.id = Number(this.idEdit);
        anime.name = document.getElementById('inputName').value;
        anime.img = document.getElementById('inputImg').value;
        anime.score = document.getElementById('inputScore').value;
        anime.firstLetter = anime.name.substr(0, 1);

        return anime;
    }

    compareAnimeNames(animeNameInArray, newAnimeName) {
        let animesArrayLowerCase = animeNameInArray.toLowerCase().trim()
        let newAnimeLowerCase = newAnimeName.toLowerCase().trim()

        if (animesArrayLowerCase === newAnimeLowerCase) {
            return true
        }
    }

    checkImage(image) {
        if (image.endsWith('.jpg') || image.endsWith('.png')) {
            return true
        }
        return false
    }

    includeAnime(anime) {
        this.animes.push(anime);
        this.id++;
    }

    renderAnimes(selectedFilter) {
        let htmlBlocks = document.getElementById('block');
        htmlBlocks.innerHTML = '';
        let h1Content = '';

        for (let i = 0; i < this.animes.length; i++) {
            let imagePosition = 'normal';

            if (i % 2 !== 0) {
                imagePosition = 'inverse';
            }

            if (selectedFilter === 'name') {
                h1Content = `${this.animes[i].firstLetter}`
            } else if (selectedFilter === 'score') {
                h1Content = `${this.animes[i].score}`
            } else {
                h1Content = `${this.animes[i].id}`;
            }

            htmlBlocks.innerHTML +=
                `<div id="individualBlock">
                    <div id="textBlock" class=${imagePosition}>
                        <h1>${h1Content}</h1>
                        Anime: ${this.animes[i].name} <br>
                        Nota: ${this.animes[i].score} <br>
                        <button id="editButton" onclick="catalog.editFields(` + this.animes[i].id + `)">Editar</button>
                    </div>
                    <div class="imageBlock">
                        <img src="${this.animes[i].img}">
                    </div>
                </div>`
        }
    }

    cleanInputs() {
        document.getElementById('inputName').value = '';
        document.getElementById('inputImg').value = '';
        document.getElementById('inputScore').value = '';

        document.getElementById('addButton').innerText = 'Adicionar';
    }

    sortingOptions() {
        let selectOptions = document.getElementById('sortingOptions');
        let selectedOption = selectOptions.options[selectOptions.selectedIndex].value;

        switch (selectedOption) {
            case 'name':
                this.animes.sort(function (anime, animeSeguinte) {
                    if (anime.name > animeSeguinte.name) {
                        return true;
                    } else {
                        return -1;
                    }
                })

                this.renderAnimes('name');
                break;

            case 'score':
                this.animes.sort(function (anime, animeSeguinte) {
                    if (Number(anime.score) > Number(animeSeguinte.score)) {
                        return -1;
                    } else {
                        return true;
                    }
                })

                this.renderAnimes('score');
                break;

            case 'older':
                this.animes.sort(function (anime, animeSeguinte) {
                    if (Number(anime.id) > Number(animeSeguinte.id)) {
                        return true;
                    } else {
                        return -1;
                    }
                })

                this.renderAnimes('older');
                break;

            case 'mostRecent':
                this.animes.sort(function (anime, animeSeguinte) {
                    if (Number(anime.id) < Number(animeSeguinte.id)) {
                        return true;
                    } else {
                        return -1;
                    }
                })

                this.renderAnimes('mostRecent');
                break;
        }
    }

    editFields(id) {
        let animeEditing = this.findAnimeWithId(id);
        this.idEdit = id;

        document.getElementById('inputName').value = animeEditing.name;
        document.getElementById('inputImg').value = animeEditing.img;
        document.getElementById('inputScore').value = animeEditing.score;

        document.getElementById('addButton').style.display = 'none';
        document.getElementById('confirmButton').style.display = 'inline';
    }

    findAnimeWithId(id) {
        return this.animes.find(anime => anime.id === id)
    }

    findAnimeIndex(id) {
        return this.animes.findIndex(anime => anime.id === id)
    }
}

let catalog = new CatalogAnimes();