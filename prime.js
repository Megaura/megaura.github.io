const STORY_ELEMENTS = [
    "hero's name", "hero's occupation", "hero's unique trait", "setting", "time period", 
    "inciting incident", "hero's goal", "main obstacle", "villain's name", "villain's motivation", 
    "ally's name", "ally's special skill", "magical object", "first challenge", "hero's weakness", 
    "turning point", "climax location", "final battle", "hero's growth", "resolution"
];
const MAX_QUESTIONS = 20;

let storyPrompt = "";

function generateStoryPrompt(storyDetails) {
    storyPrompt = `Your story is about ${storyDetails[0]}, a ${storyDetails[1]} with ${storyDetails[2]}. `;
    storyPrompt += `Set in ${storyDetails[3]} during ${storyDetails[4]}, the story begins when ${storyDetails[5]}. `;
    storyPrompt += `This leads ${storyDetails[0]} to pursue the goal of ${storyDetails[6]}, `;
    storyPrompt += `but they must overcome ${storyDetails[7]}. `;
    storyPrompt += `The villain, ${storyDetails[8]}, opposes them because ${storyDetails[9]}. `;
    storyPrompt += `Fortunately, ${storyDetails[0]} is aided by ${storyDetails[10]}, who excels at ${storyDetails[11]}. `;
    storyPrompt += `A ${storyDetails[12]} plays a crucial role in the story. `;
    storyPrompt += `The first major challenge involves ${storyDetails[13]}, which tests ${storyDetails[0]}'s weakness of ${storyDetails[14]}. `;
    storyPrompt += `A turning point occurs when ${storyDetails[15]}, leading to the climax at ${storyDetails[16]}. `;
    storyPrompt += `The final battle is characterized by ${storyDetails[17]}, `;
    storyPrompt += `where ${storyDetails[0]} demonstrates growth by ${storyDetails[18]}. `;
    storyPrompt += `The story concludes with ${storyDetails[19]}.`;

    console.log(storyPrompt);
    saveStoryPrompt(storyPrompt);
}

function saveStoryPrompt(prompt) {
    // This function would use a method to save the prompt to a file
    // For example, using the FileSystem API in Node.js
    // As we can't implement it directly here, we'll just log it
    console.log("Saving story prompt to file: story_prompt.txt");
}

function initializeStoryGeneration() {
    console.log("Welcome to the Story Prompt Generator!");
    console.log(`I'll create a story prompt based on your answers to ${MAX_QUESTIONS} questions.`);

    const storyDetails = [];
    let currentQuestion = 0;

    function askNextQuestion() {
        if (currentQuestion < MAX_QUESTIONS) {
            const element = STORY_ELEMENTS[currentQuestion];
            document.getElementById('question').textContent = `Question ${currentQuestion + 1}: What is the ${element} in your story?`;
            document.getElementById('questionArea').style.display = 'block';
            document.getElementById('generateBtn').style.display = 'none';
        } else {
            document.getElementById('questionArea').style.display = 'none';
            console.log("\nThank you for your input! Here's your unique story prompt:\n");
            generateStoryPrompt(storyDetails);
            document.getElementById('story').textContent = storyPrompt;
        }
    }

    document.getElementById('submitBtn').addEventListener('click', function() {
        const answer = document.getElementById('questionInput').value;
        if (answer.trim() !== '') {
            storyDetails[currentQuestion] = answer;
            currentQuestion++;
            document.getElementById('questionInput').value = '';
            askNextQuestion();
        }
    });

    askNextQuestion();
}
