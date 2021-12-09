"use stricr";

let game = {
    gameTableElement: document.querySelector('#game'),
    winnerText: document.querySelector('.winner-text'),
    pathImgLine: document.querySelectorAll('path'),
    divSwgLine: document.querySelectorAll('.img-line-box'),
    btnElement: document.querySelector('.box-btn'),
    counterMove: 0,
    statusGame: true,
    startSign: "x",
    winNum1: [0, 1, 2],
    winNum2: [3, 4, 5],
    winNum3: [6, 7, 8],
    winNum4: [0, 3, 6],
    winNum5: [1, 4, 7],
    winNum6: [2, 5, 8],
    winNum7: [0, 4, 8],
    winNum8: [2, 4, 6],
    winnNumbers: {},

    init() {

        // Выводим все ячейки
        this.renderMap();

        this.getWinNunmber();

        //Инициализируем все обработчики событий
        this.initEventHandlers();

        if (!this.statusGame) {
            return;
        }
    },

    /**
     * Вывод ячеек в HTML
     */
    renderMap() {

        for (let col = 1; col <= 3; col++) {
            let trEl = document.createElement('tr');
            this.gameTableElement.append(trEl);
            for (let row = 1; row <= 3; row++) {
                let tdEl = document.createElement('td');
                tdEl.dataset.col = col.toString();
                tdEl.dataset.row = row.toString();
                trEl.append(tdEl);
            }
        }
    },

    /**
     * Функция создает из  нашей переиенной winnNumbers, new Map объект, и добавляет туда массив из выйгрышных комбинаций как ключ, а в качестве значения позицию SWG линии которая соответствует выйгрышной комбинации
     */
    getWinNunmber() {
        this.winnNumbers = new Map();
        this.winnNumbers
            .set(this.winNum1, this.pathImgLine[0])
            .set(this.winNum2, this.pathImgLine[1])
            .set(this.winNum3, this.pathImgLine[2])
            .set(this.winNum4, this.pathImgLine[3])
            .set(this.winNum5, this.pathImgLine[4])
            .set(this.winNum6, this.pathImgLine[5])
            .set(this.winNum7, this.pathImgLine[6])
            .set(this.winNum8, this.pathImgLine[7])
        console.log(this.winnNumbers)
    },

    /**
     * Ставим обработчики, при клике на таблицу вызывается функция this.cellClickHandler, при клике на кнопку вызывается функция clickNextGame
     */
    initEventHandlers() {
        this.gameTableElement.addEventListener('click', event => this.cellClickHandler(event));
        this.btnElement.addEventListener('click', this.clickNextGame)
    },


    /**
     * Обработчик событий клика
     * @param {MouseEvent} event Событие
     */
    cellClickHandler(event) {

        if (event.target.textContent !== "") {
            return;
        } else if (this.startSign === "x") {
            event.target.textContent = "o";
            this.startSign = "o";
            this.counterMove++
            this.gameCheck(this.startSign);
        } else if (this.startSign === "o") {
            event.target.textContent = "x";
            this.startSign = "x";
            this.counterMove++
            this.gameCheck(this.startSign);
        }
    },
    /**
     * Функция перезагружает страницу
     */
    clickNextGame() {
        location.reload();
    },

    /**
     * Функция проверяет есть ли выйгрыш
     * @param {String} sign Показывает кто ходит
     */
    gameCheck(sign) {

        let tdEl = document.getElementsByTagName('td');
        let winnNumbersKey = [];
        for (let [key, value] of this.winnNumbers) { winnNumbersKey.push(key) }

        for (let i = 0; i < winnNumbersKey.length; i++) {

            if (
                tdEl[winnNumbersKey[i][0]].textContent === sign && tdEl[winnNumbersKey[i][1]].textContent === sign && tdEl[winnNumbersKey[i][2]].textContent === sign
            ) {
                this.getLineSwg(winnNumbersKey[i])
                setTimeout(() => {
                    this.pathImgLine.forEach(el => el.classList.add("hidden"));
                    this.gameTableElement.classList.add("hidden");
                    this.winnerText.innerHTML = `Победил: <span>${sign}</span>`;
                    this.winnerText.style.transform = "scale(1.0)";
                    this.btnElement.style.transform = "scale(1.0)";
                    this.statusGame = false;
                }, 2500);
            }
            else if (this.counterMove == 9) {
                this.pathImgLine.forEach(el => el.classList.add("hidden"));
                this.gameTableElement.classList.add("hidden");
                this.winnerText.innerHTML = `Ничья!!!!!!! `;
                this.winnerText.style.transform = "scale(1.0)";
                this.btnElement.style.transform = "scale(1.0)";
                this.statusGame = false;

            }
        }

    },

    /**
     * Функция рисует линию, которая перечеркивает выйгрышное поле
     * @param {Array} winnNum Выйгрышная комбинация
     */
    getLineSwg(winnNum) {
        let pathElementSwg = this.winnNumbers.get(winnNum)
        this.divSwgLine.forEach(el => el.style.display = 'block');
        pathElementSwg.style.cssText = `
        animation: anim-line; animation-duration: 2s; animation-fill-mode: forwards;`
    }


}

// Запускаем игру при полной загрузки страницы
window.addEventListener("load", game.init());