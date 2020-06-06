class CatFC {
    constructor(buttons, fighters) {
        this.buttons = buttons;
        this.fighters = fighters;
        this.fight = false;
        this.leftFighter;
        this.rightFighter;
    }

    init() {
        this._fighterHandler(this.fighters);
        this._buttonHandler(this.buttons, this.fighters);
    }

    _buttonHandler(buttons, fighters) {
        let randomButton;
        let fightButton;
        for (let key in buttons) {
            if (buttons.hasOwnProperty(key)) {
                if (key === "random") {
                    randomButton = document.querySelector(buttons[key]);
                    randomButton.addEventListener("click", (e) => {
                        e.preventDefault();
                        this._pickRandomFighter(fighters);
                    })
                }
                if (key === "fight") {
                    fightButton = document.querySelector(buttons[key]);
                    fightButton.addEventListener("click", (e) => {
                        e.preventDefault();
                        this._startFight(fightButton, randomButton);
                    });
                }
            }
        }
    }

    async _startFight(fightButton, randomButton) {
        fightButton.disabled = true;
        randomButton.disabled = true;
        let winner;
        this.fight = true;
        const countDown = document.querySelector("h2");
        this._wait(0).then(() => {
            countDown.innerHTML = "3";
        });
        this._wait(1000).then(() => {
            countDown.innerHTML = "2";
        });
        this._wait(2000).then(() => {
            countDown.innerHTML = "1";
        });
        this._wait(3000).then(() => {
            winner = this._letTheFightBegin(this.leftFighter, this.rightFighter,countDown,fightButton,randomButton);
        });
    }

    _letTheFightBegin(leftFighter, rightFighter, message,fightButton,randomButton) {
        const leftFighterData = JSON.parse(leftFighter.dataset.info);
        const rightFighterData = JSON.parse(rightFighter.dataset.info);
        const leftFighterWinrate = this._calculateWinrate(leftFighterData.record.wins, leftFighterData.record.loss);
        const rightFighterWinrate = this._calculateWinrate(rightFighterData.record.wins, rightFighterData.record.loss);

        const winner = this._selectWiner(leftFighterWinrate, rightFighterWinrate);
        const leftSideElement = document.querySelector(this.fighters.leftSide);
        const rightSideElement = document.querySelector(this.fighters.rightSide);
        const leftSidePickedFighter = leftSideElement.querySelector(".featured-cat-fighter");
        const rightSidePickedFighter = rightSideElement.querySelector(".featured-cat-fighter");

        console.log(winner);
        if (winner === "left") {
            console.log(leftSidePickedFighter);
            leftSidePickedFighter.style.border = "5px solid green";
            rightSidePickedFighter.style.border = "5px solid red";
            message.innerHTML = "Winner is " + leftFighterData.name;
            this._updateWins(winner,leftFighterData,leftFighter, leftSideElement,rightSideElement);
            this._updateLoss(winner,rightFighterData,rightFighter,leftSideElement,rightSideElement);
        }else{
            leftSidePickedFighter.style.border = "5px solid red";
            rightSidePickedFighter.style.border = "5px solid green";
            message.innerHTML= rightFighterData.name;
            this._updateWins(winner,rightFighterData,rightFighter, leftSideElement,rightSideElement);
            this._updateLoss(winner,leftFighterData,leftFighter, leftSideElement,rightSideElement);
        }
        

        fightButton.disabled = false;
        randomButton.disabled = false;
        this.fight = false;

    }

    // This function decides who is winner by the rules set in LV3
    _selectWiner(leftFighter, rightFighter) {
        let minimum = 0;
        let leftFighterMax = 49;
        let rightFighterMin = 50;
        let rightFighterMax = 99;

        console.log((leftFighter - rightFighter).toFixed(2));
        if (leftFighter > rightFighter) {
            if (leftFighter - rightFighter < 0.1) {
                leftFighterMax += 10;
                rightFighterMin += 10;
            } else {
                leftFighterMax += 20;
                rightFighterMin += 20;
            }
        }

        if (rightFighter > leftFighter) {
            if (rightFighter - leftFighter < 0.1) {
                leftFighterMax -= 10;
                rightFighterMin -= 10;
            } else {
                leftFighterMax -= 20;
                rightFighterMin -= 20;
            }
        }

        leftFighterMax /= 100;
        rightFighterMin /= 100;
        rightFighterMax /= 100;
        console.log(leftFighterMax);
        console.log(rightFighterMin);

        let randomGeneratedNumber = (Math.floor(Math.random() * Math.floor(100))) / 100;
        console.log(randomGeneratedNumber);

        if (randomGeneratedNumber >= minimum && randomGeneratedNumber <= leftFighterMax) {
            return "left";
        }

        if (randomGeneratedNumber >= rightFighterMin && randomGeneratedNumber <= rightFighterMax) {
            return "right";
        }
    }

    _calculateWinrate(wins, loss) {
        return (wins / (wins + loss)).toFixed(2);
    }

    _pickRandomFighter(fighters) {
        let first;
        let second;
        const fightButton = document.querySelector(this.buttons.fight);
        do {
            first = Math.floor(Math.random() * Math.floor(6));
            second = Math.floor(Math.random() * Math.floor(6));
        } while (first == second);

        const leftSideElement = document.querySelector(fighters.leftSide);
        const leftSidePickedFighter = leftSideElement.querySelector(".featured-cat-fighter-image");
        const leftSideTable = leftSideElement.querySelector(".cat-info");
        const leftSideFighters = leftSideElement.querySelectorAll(".fighter-box");
        let leftsideArray = [];
        Array.from(leftSideFighters).forEach(item => {
            leftsideArray.push(item);
        });

        this._pickFighterRandom(leftSidePickedFighter, leftSideTable, leftsideArray[first]);
        this.leftFighter = leftsideArray[first];

        const rightSideElement = document.querySelector(fighters.rightSide);
        const rightSidePickedFighter = rightSideElement.querySelector(".featured-cat-fighter-image");
        const rightSideTable = rightSideElement.querySelector(".cat-info");
        const rightSideFighters = rightSideElement.querySelectorAll(".fighter-box");
        let rightsideArray = [];
        Array.from(rightSideFighters).forEach(item => {
            rightsideArray.push(item);
        });

        this._resetBorders(leftSidePickedFighter, rightSidePickedFighter);
        this._pickFighterRandom(rightSidePickedFighter, rightSideTable, rightsideArray[second]);
        this.rightFighter = rightsideArray[second];

        this._checkIfReady(leftSidePickedFighter, rightSidePickedFighter, fightButton);
    }

    _fighterHandler(fighters) {
        let leftSidePickedFighter;
        let rightSidePickedFighter;
        const fightButton = document.querySelector(this.buttons.fight);
        fightButton.disabled = true;
        for (let key in fighters) {
            if (fighters.hasOwnProperty(key)) {
                if (key === "leftSide") {
                    const leftSideElement = document.querySelector(fighters[key]);
                    const leftSideTable = leftSideElement.querySelector(".cat-info");
                    leftSidePickedFighter = leftSideElement.querySelector(".featured-cat-fighter-image");
                    const leftSideFighters = leftSideElement.querySelectorAll(".fighter-box");

                    Array.from(leftSideFighters).forEach(item => {
                        item.addEventListener("click", (e) => {
                            e.preventDefault();
                            this.leftFighter = item;
                            this._pickFighter(leftSidePickedFighter, leftSideTable, item, rightSidePickedFighter);
                            this._checkIfReady(leftSidePickedFighter, rightSidePickedFighter, fightButton);
                            this._resetBorders(leftSidePickedFighter,rightSidePickedFighter);
                        });
                    });
                }

                if (key === "rightSide") {
                    const rightSideElement = document.querySelector(fighters[key]);
                    const rightSideTable = rightSideElement.querySelector(".cat-info");
                    rightSidePickedFighter = rightSideElement.querySelector(".featured-cat-fighter-image")
                    const rightSideFighters = rightSideElement.querySelectorAll(".fighter-box");
                    Array.from(rightSideFighters).forEach(item => {
                        item.addEventListener("click", (e) => {
                            e.preventDefault();
                            this.rightFighter = item;
                            this._pickFighter(rightSidePickedFighter, rightSideTable, item, leftSidePickedFighter);
                            this._checkIfReady(leftSidePickedFighter, rightSidePickedFighter, fightButton);
                            this._resetBorders(leftSidePickedFighter,rightSidePickedFighter);
                        });
                    });

                }
                
            }
        }
    }

    _resetBorders(left, right){
        const chooseCat = document.querySelector("h2");
        chooseCat.innerHTML = "Choose your cat";
        left.parentElement.style.border = "none";
        right.parentElement.style.border = "none";
    }


    // If both players are not picked you cannot start the battle
    _checkIfReady(leftSidePickedFighter, rightSidePickedFighter, fightButton) {
        if (this.fight) {
            return;
        }

        if (leftSidePickedFighter.src === "https://via.placeholder.com/300" || rightSidePickedFighter.src === "https://via.placeholder.com/300") {
            fightButton.disabled = true;
        } else if (leftSidePickedFighter.src === rightSidePickedFighter.src) {
            fightButton.disabled = true;
        } else {
            fightButton.disabled = false;
        }
    }

    //This function is used for a random pick of a fighter

    _pickFighterRandom(fighterSpot, infoTable, fighter) {
        const fighterImage = fighter.querySelector("img");
        fighterSpot.src = fighterImage.src;

        const fighterData = JSON.parse(fighter.dataset.info);
        let info = infoTable.querySelector(".name");

        info.textContent = fighterData.name;
        info = infoTable.querySelector(".age");
        info.textContent = fighterData.age;
        info = infoTable.querySelector(".skills");
        info.textContent = fighterData.catInfo;
        info = infoTable.querySelector(".record");
        info.textContent = "Wins: " + fighterData.record.wins + " Loss: " + fighterData.record.loss;
    }

    //Function that handles piccking fighter
    _pickFighter(fighterSpot, infoTable, fighter, pickedFighter) {

        if (this.fight) {
            return;
        }
        const fighterImage = fighter.querySelector("img");
        if (fighterImage.src === pickedFighter.src) {
            return;
        }
        fighterSpot.src = fighterImage.src;

        const fighterData = JSON.parse(fighter.dataset.info);
        let info = infoTable.querySelector(".name");

        info.textContent = fighterData.name;
        info = infoTable.querySelector(".age");
        info.textContent = fighterData.age;
        info = infoTable.querySelector(".skills");
        info.textContent = fighterData.catInfo;
        info = infoTable.querySelector(".record");
        info.textContent = "Wins: " + fighterData.record.wins + " Loss: " + fighterData.record.loss;
    }

    //update win stats of fighter
    _updateWins(winner, winnerData,winnerCat, leftSideElement, rightSideElement){
        let data = winnerData;
        data.record.wins++;
        
        console.log(winnerCat);
        
        let catWinnerSS;
        if(winner === "left"){
            winnerCat.setAttribute("data-info",JSON.stringify(data))
            let oppositeSideSameFighter;
            const oppositSide = document.querySelector("#secondSide");
            const listOfCats = oppositSide.querySelectorAll(".fighter-box");
            Array.from(listOfCats).forEach(item=>{
                catWinnerSS = JSON.parse(item.dataset.info);
                
                if(data.id == catWinnerSS.id){
                    item.setAttribute("data-info",JSON.stringify(data));
                }
            })
        }else{
            winnerCat.setAttribute("data-info",JSON.stringify(data))
            let oppositeSideSameFighter;
            const oppositSide = document.querySelector("#firstSide");
            const listOfCats = oppositSide.querySelectorAll(".fighter-box");
            Array.from(listOfCats).forEach(item=>{
                catWinnerSS = JSON.parse(item.dataset.info);
                
                if(data.id == catWinnerSS.id){
                    item.setAttribute("data-info",JSON.stringify(data));
                }
            })
        }
        this._updateInfoWinner(winner,winnerData,leftSideElement,rightSideElement);

        console.log("___WINNER_____")
        console.log(data.id);
        console.log(data.record.wins);
        console.log(data.record.loss);
        this._saveDataToDatabase(data.id,data.record.wins,data.record.loss);
    }

    _saveDataToDatabase(id, wins, loss){
        let dbUpdatedata = new FormData();
        dbUpdatedata.append('catId', id);
        dbUpdatedata.append('wins',wins);
        dbUpdatedata.append('loss',loss);

        fetch('controller/db/updateScore.php',{
            method: 'POST',
            body: dbUpdatedata
        })
        .catch(error=> alert(error));  
    }

    //function updates loss for character
    _updateLoss(winner, looserData,looserCat, leftSideElement, rightSideElement){
        let data = looserData;
        data.record.loss++;
        
        
        let catLooserSS;
        if(winner === "left"){
            looserCat.setAttribute("data-info",JSON.stringify(data))
            const oppositSide = document.querySelector("#firstSide");
            const listOfCats = oppositSide.querySelectorAll(".fighter-box");
            Array.from(listOfCats).forEach(item=>{
                catLooserSS = JSON.parse(item.dataset.info);
                
                if(data.id == catLooserSS.id){
                    item.setAttribute("data-info",JSON.stringify(data));
                }
            })
        }else{
            looserCat.setAttribute("data-info",JSON.stringify(data))
         
            const oppositSide = document.querySelector("#secondSide");
            const listOfCats = oppositSide.querySelectorAll(".fighter-box");
            Array.from(listOfCats).forEach(item=>{
                catLooserSS = JSON.parse(item.dataset.info);
                
                if(data.id == catLooserSS.id){
                    item.setAttribute("data-info",JSON.stringify(data));
                }
            })
        }
        this._updateInfoLooser(winner,looserData,leftSideElement,rightSideElement);

        console.log("___LOOSER_____")
        console.log(data.id);
        console.log(data.record.wins);
        console.log(data.record.loss);
        this._saveDataToDatabase(data.id,data.record.wins,data.record.loss)
    }

    // function updates picked fighter stats
    _updateInfoLooser(winner,looserData,leftSideElement,rightSideElement){
        if(winner === "left"){
            const record = rightSideElement.querySelector(".record");
            record.textContent = "Wins: " + looserData.record.wins + " Loss: " + looserData.record.loss;
        }else{
            const record = leftSideElement.querySelector(".record");
            record.textContent = "Wins: " + looserData.record.wins + " Loss: " + looserData.record.loss;
        }
    }

    //updates info of picked character
    _updateInfoWinner(winner,winnerData,leftSideElement, rightSideElement){

        if(winner === "left"){
            const record = leftSideElement.querySelector(".record");
            record.textContent = "Wins: " + winnerData.record.wins + " Loss: " + winnerData.record.loss;
        }else{
            const record = rightSideElement.querySelector(".record");
            record.textContent = "Wins: " + winnerData.record.wins + " Loss: " + winnerData.record.loss;
        }
    }

    async _wait(time) {
        return new Promise(resolve => setTimeout(resolve, time));
    }
}



let data = {
    buttons: {
        fight: "#generateFight",
        random: "#randomFight"
    },
    fighters: {
        leftSide: "#firstSide",
        rightSide: "#secondSide"
    }
};

const catFCObject = new CatFC(data.buttons, data.fighters);
catFCObject.init();