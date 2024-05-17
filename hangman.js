//dummy data
const words=[
    ['apple','A Fruit'],
    ['elephant','A Animal'],
    ['repalle','A Town'],
    ['manvitha','A Bad Boy'],
    
]
const c =document.getElementById("canvas")
const ctx = c.getContext('2d')
    c.width=400
    c.height=450
const msg=document.getElementById("res")
const hint=document.getElementById('hint');
const word=document.getElementById('word');
let selectedWord=''
let displayWord=''    //user will guess(_ _ _ _ _ )display word to the user
let attempts=0         // how many we are giving
let MaxAttempts=6       // 6 attempts to guess a word
let guessedletters=[]     //we can use  the letters that already used 

const initializeGame=()=>{
    const selectedIndex =parseInt(Math.random()*words.length)
    selectedWord=words[selectedIndex][0]
    console.log(selectedWord)
    hint.innerHTML+=`: ${words[selectedIndex][1]}`
    displayWord="_ ".repeat(selectedWord.length).trim()
    word.innerText=displayWord;
    console.log(selectedWord);
    draw();
   
}

const draw=()=>{
    ctx.rect(50,370,300,20);
    ctx.stroke()


    ctx.rect(100,50,20,320);
    ctx.stroke()
    
    ctx.rect(120,70,120,10)
    ctx.stroke()


    


    //face
    if(attempts>1)
        {
            //top
            ctx.moveTo(200,80)
    ctx.lineTo(200,120)
    ctx.stroke() 

    ctx.moveTo(230,150)
    ctx.arc(200,150,30,0,Math.PI*2)
    ctx.stroke()
        }
    //body
    if(attempts>2){
    ctx.moveTo(200,180);
    ctx.lineTo(200,280)
    ctx.stroke()
    }
    //left hand
    if(attempts>3){
    ctx.moveTo(200,200)
    ctx.lineTo(150,240)
    ctx.stroke()
    }
    //right hand
    if(attempts>4){
    ctx.moveTo(200,200)
    ctx.lineTo(250,240)
    ctx.stroke()
    }
    //left leg
    if(attempts>5){
    ctx.moveTo(200,280)
    ctx.lineTo(150,350)
    ctx.stroke()
    }
    //right leg
    if(attempts>6){
    ctx.moveTo(200,280)
    ctx.lineTo(250,350)
    ctx.stroke()
    }


}
initializeGame();


const updateWord=()=>{
    let updated=''
    for (let i=0;i<selectedWord.length;i++){
        if(guessedletters.indexOf(selectedWord[i])>-1){
            updated+=selectedWord[i]+' '

        }
        else{
            updated+="_ "
        }
        
    }
    console.log("updated",updated)
    displayWord=updated
word.innerText=updated

}

const performAction=(event)=>{
    const keyPressed=event.key
    console.log(keyPressed.toLowerCase());
    if(guessedletters.includes(keyPressed)){
        return;
        
    }
    if(selectedWord.includes(keyPressed)){
        

    }else{
        attempts++;
    }
    guessedletters.push(keyPressed.toLowerCase())
    console.log(attempts,guessedletters)
    updateWord();
    draw();
   
    if(displayWord.replace(/ /g, '') === selectedWord){
        msg.innerText = "You won"
        clearInterval(timerInterval)
        msg.className = "success"
    }
    if(attempts === 7){
        msg.innerText = "Game over"
        clearInterval(timerInterval)

        document.removeEventListener('keydown',performAction)
        msg.className = "warning"
    }

}
document.addEventListener('keydown',performAction)

let count=60
let timerInterval
const co=document.getElementById("counter")
const timer=()=>{
    let counters
    if(count>0){
     counters=count--;
    }
     if(!counters)
        {
            
            document.getElementById("counter").innerText = `Time's Up`;
            document.removeEventListener('keydown',performAction)

            
            
        }
    
    else {
        
        document.getElementById("counter").innerText=`Count Down: ${counters}`;
        
    }


}
timerInterval=setInterval(timer,1000);
const restart=()=>{
    clearInterval(timerInterval); 
    count = 60; 
    selectedIndex=0;
    selectedWord='';
    attempts = 1; 
    guessedletters = []; 
    displayWord='' 
    msg.innerText = ""; 
    hint.innerHTML='Hint';
    timerInterval = setInterval(timer, 1000); 
    initializeGame();
    document.addEventListener('keydown',performAction);
    draw();
    
}
 
draw()