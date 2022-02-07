const section = document.querySelector("section");
const playerLivesCount = document.querySelector("span");
let playerLives = 5;

// Link Text
playerLivesCount.textContent = playerLives;

// Generate the data
const getData = () => [
    {imgSrc: "img/beatles.jpeg", name: "beatles"},
    {imgSrc: "img/blink182.jpeg", name: "blink182"},
    {imgSrc: "img/fkatwigs.jpeg", name: "fkatwigs"},
    {imgSrc: "img/fleetwood.jpeg", name: "fleetwood"},
    {imgSrc: "img/joy-division.jpeg", name: "joy-division"},
    {imgSrc: "img/ledzep.jpeg", name: "ledzep"},
    {imgSrc: "img/metallica.jpeg", name: "metallica"},
    {imgSrc: "img/pinkfloyd.jpeg", name: "pinkfloyd"},
    {imgSrc: "img/beatles.jpeg", name: "beatles"},
    {imgSrc: "img/blink182.jpeg", name: "blink182"},
    {imgSrc: "img/fkatwigs.jpeg", name: "fkatwigs"},
    {imgSrc: "img/fleetwood.jpeg", name: "fleetwood"},
    {imgSrc: "img/joy-division.jpeg", name: "joy-division"},
    {imgSrc: "img/ledzep.jpeg", name: "ledzep"},
    {imgSrc: "img/metallica.jpeg", name: "metallica"},
    {imgSrc: "img/pinkfloyd.jpeg", name: "pinkfloyd"},
];

// Randomize
const randomize = () => {
    const cardData = getData();
    cardData.sort(() => Math.random() - 0.5);
    return cardData;
} 

// Card Generator
const cardGenerator = () => {
    const cardData = randomize();
    // Generate HTML
    cardData.forEach( (item, index) => {
        const card = document.createElement("div");
        const front = document.createElement("img");
        const back = document.createElement("div");
        card.classList = 'card';
        front.classList = 'front';
        back.classList = 'back';
        
        front.src = item.imgSrc;
        card.setAttribute("name", item.name)

        const img = document.createElement("img");
        img.setAttribute('class', 'poster')
        img.src = "img/back.jpg";


        section.appendChild(card);
        card.appendChild(front);
        card.appendChild(back);
        back.appendChild(img)
        card.addEventListener("click", (e) => {
            card.classList.toggle("toggle");
            checkCards(e);
        });
    });
};
// Check cards 
const checkCards = (e) => {
    const clickedCard = e.target;
    clickedCard.classList.add('flipped');
    const flippedCards = document.querySelectorAll(".flipped");
    const toggleCards = document.querySelectorAll(".toggle")

    if (flippedCards.length === 2) {
        if (flippedCards[0].getAttribute("name") === flippedCards[1].getAttribute("name")) {
            flippedCards.forEach(card => {
                card.classList.remove("flipped");
                card.style.pointerEvents = 'none';
            })
        } else {
            flippedCards.forEach(card => {
                card.classList.remove("flipped");
                setTimeout(() => card.classList.remove("toggle"), 1000);
            });
            playerLives --;
            playerLivesCount.textContent = playerLives;
            setTimeout(() => {
                if (playerLives === 0) {
                    restart("You Lost, Try Again");
                }
            }, 1000)

            
        }
    
        if (toggleCards.length === 16) {
            restart("You Won, Congrats");
        }
    }


}
// Restart
const restart = (text) => {
    let cardData = randomize();
    let front = document.querySelectorAll(".front");
    let cards = document.querySelectorAll(".card");
    section.style.pointerEvents = 'none'
    cardData.forEach((item, index) => {
        cards[index].classList.remove("toggle");
        setTimeout(() => {
            cards[index].style.pointerEvents = "all";
            front[index].src = item.imgSrc;
            cards[index].setAttribute("name", item.name);
            section.style.pointerEvents = 'all';
        }, 1000)

    })
    playerLives = 5;
    playerLivesCount.textContent = playerLives;
    setTimeout(() => window.alert(text), 500);

}

cardGenerator();