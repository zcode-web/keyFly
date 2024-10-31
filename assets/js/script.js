let score = 0;
let isGameActive = false;
let timerInterval;
const gameDuration = 120; // 120 seconds per game
const winAmount = 1000;
let win = 0;
const muteBtn = document.getElementById("mute-btn");
const backgroundMusic = document.getElementById("background-music");
const quotes = [
    "Hello world!", "Quick brown fox", "Typing is fun!", "Sky is blue", 
    "Fast typing", "Birds are flying", "Coding rocks!", "Love to learn", "Type fast",
    "Why did the scarecrow win an award? Because he was outstanding in his field!",
    "The early bird gets the worm, but the second mouse gets the cheese.",
    "To be or not to be, that is the question! - Shakespeare",
    "Why don’t scientists trust atoms? Because they make up everything!",
    "What do you call fake spaghetti? An impasta!",
    "A day without laughter is a day wasted. - Charlie Chaplin",
    "Why did the bicycle fall over? Because it was two-tired!",
    "CAN YOU SOLVE THIS: 6 * 7?",
    "3 * 5 = ?",
    "The only limit to our realization of tomorrow is our doubts of today. - Franklin D. Roosevelt",
    "Believe you can and you’re halfway there. - Theodore Roosevelt",
    "Why did the math book look sad? Because it had too many problems! ",
    "WHY DID THE MATH BOOK LOOK SAD? BECAUSE IT HAD TOO MANY PROBLEMS!",
    "Life is like a camera. Focus on what’s important, capture the good times, develop from the negatives. 📷",
    "I told my computer I needed a break, and now it won’t stop sending me beach wallpapers!",
    "Why did the golfer bring two pairs of pants? In case he got a hole in one!",
    "If you think nobody cares if you’re alive, try missing a couple of payments!",
    "BELIEVE YOU CAN AND YOU’RE HALFWAY THERE. - THEODORE ROOSEVELT",
    "You can’t have everything... where would you put it?",
    "WHY DID THE SCARECROW WIN AN AWARD? BECAUSE HE WAS OUTSTANDING IN HIS FIELD!",
    "2 + 2 = ?",
    "10 - 4 = ?",
    "12 / 3 = ?",
    "THE EARLY BIRD GETS THE WORM, BUT THE SECOND MOUSE GETS THE CHEESE.",
    "WHAT DO YOU CALL FAKE SPAGHETTI? AN IMPASTA!",
    "LIFE IS LIKE A CAMERA. FOCUS ON WHAT’S IMPORTANT, CAPTURE THE GOOD TIMES, DEVELOP FROM THE NEGATIVES.",
    "WHAT IS 15 + 7?",
    "A DAY WITHOUT LAUGHTER IS A DAY WASTED. - CHARLIE CHAPLIN",
    "WHAT DO YOU CALL A BEAR WITH NO TEETH? A GUMMY BEAR!",
    "YOU CAN’T HAVE EVERYTHING... WHERE WOULD YOU PUT IT?",
    "IF YOU THINK NOBODY CARES IF YOU’RE ALIVE, TRY MISSING A COUPLE OF PAYMENTS!",
    "WHAT IS 100 DIVIDED BY 4?",
    "ARE WE HAVING FUN YET?",
    "THIS IS A TEST OF YOUR TYPING SKILLS! LET'S SEE HOW FAST YOU CAN GO!"
];

document.getElementById("startButton").addEventListener("click", startGame);

function startGame() {
    if (!isGameActive) {
        isGameActive = true;
        score = 0;
        win = 0;
        document.getElementById("score").innerText = score;
        document.getElementById('win').innerText = win * score;
        document.getElementById("timer").innerText = gameDuration;
        document.getElementById("startButton").disabled = true;
        startTimer(gameDuration);
        generateCloud();
    }
}

function startTimer(duration) {
    let timeLeft = duration;
    timerInterval = setInterval(() => {
        timeLeft--;
        document.getElementById("timer").innerText = timeLeft;
        
        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            endGame();
        }
    }, 1000);
}

function endGame() {
    isGameActive = false;
    clearInterval(timerInterval);
    document.getElementById("startButton").disabled = false;
    document.getElementById("sky").innerHTML = ""; // Clear any remaining clouds
    alert(`Game over! Your final score is: ${score}`);
}

function generateCloud() {
    if (!isGameActive) return;

    const sky = document.getElementById("sky");
    const cloud = document.createElement("div");
    cloud.classList.add("cloud");

    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
    cloud.innerHTML = `<p>${randomQuote}</p><input type="text" placeholder="Type here...">`;

    // Position and style the cloud randomly
    cloud.style.left = Math.random() * (window.innerWidth - 200) + "px";
    cloud.style.animationDuration = `${Math.random() * 10 + 5}s`;
    cloud.style.backgroundColor = `hsl(${Math.random() * 360}, 80%, 90%)`;

    sky.appendChild(cloud);

    // Event listener for input validation
    const input = cloud.querySelector("input");
    input.addEventListener("input", () => {
        // Trim input and validate in real time
        if (input.value.trim() === randomQuote && isGameActive) {
            score += 5; // Increase score by 5 for each correct word
            document.getElementById("score").innerText = score;
            if(score >= 15){
                document.getElementById('win').innerText = score * winAmount +".00 UGX";
            }
            else{
                document.getElementById('win').innerText = "WON 0.00 UGX";
            }
            
            input.value = ""; // Clear input
            sky.removeChild(cloud); // Remove the cloud
            generateCloud();  // Generate the next cloud
        }
    });

    // Remove cloud after animation ends
    cloud.addEventListener("animationend", () => {
        if (sky.contains(cloud)) sky.removeChild(cloud);
        if (isGameActive) generateCloud();
    });
    
        muteBtn.addEventListener("onclick", () => {
            if (backgroundMusic.muted){
                backgroundMusic.muted = false;
                muteBtn.textContent = "🔊 Mute";
            } else {
                backgroundMusic.muted = true;
                muteBtn.textContent = "🔈 Unmute";
            }
        });
        
    
}
