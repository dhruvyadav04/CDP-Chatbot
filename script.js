const chatMessages = document.getElementById('chatMessages');
const userInput = document.getElementById('userInput');
const sendButton = document.getElementById('sendButton');

// Mock CDP documentation data
const cdpDocs = {
    segment: {
        "set up a new source": "To set up a new source in Segment:\n1. Log in to your Segment workspace\n2. Click on 'Add Source' in the Sources section\n3. Choose the type of source you want to add\n4. Follow the on-screen instructions to configure the source\n5. Save and activate the source",
        "create a destination": "To create a destination in Segment:\n1. Go to the Destinations page in your Segment workspace\n2. Click 'Add Destination'\n3. Select the desired destination from the catalog\n4. Configure the destination settings\n5. Map your events and properties\n6. Enable the destination"
    },
    mparticle: {
        "create a user profile": "To create a user profile in mParticle:\n1. Use the mParticle SDK in your app or website\n2. Call the `setUserIdentity` method with a unique identifier\n3. Add user attributes using the `setUserAttribute` method\n4. Trigger events associated with the user using `logEvent`\n5. The user profile will be automatically created and updated",
        "set up data feeds": "To set up data feeds in mParticle:\n1. Navigate to Setup > Inputs > Feeds in the mParticle dashboard\n2. Click 'Add Feed'\n3. Select the desired feed type\n4. Configure the feed settings and credentials\n5. Map the incoming data to mParticle's data model\n6. Activate the feed"
    },
    lytics: {
        "build an audience segment": "To build an audience segment in Lytics:\n1. Go to the Audiences section in your Lytics account\n2. Click 'Create New Audience'\n3. Define your segment criteria using the segment builder\n4. Use behavioral, demographic, or custom attributes\n5. Preview and test your segment\n6. Name and save your audience segment",
        "create a campaign": "To create a campaign in Lytics:\n1. Navigate to the Campaigns section\n2. Click 'Create New Campaign'\n3. Select the campaign type (e.g., email, web personalization)\n4. Choose your target audience\n5. Set up the campaign content and rules\n6. Configure tracking and goals\n7. Activate the campaign"
    },
    zeotap: {
        "integrate data": "To integrate your data with Zeotap:\n1. Log in to your Zeotap account\n2. Go to the Data Integration section\n3. Choose the integration method (e.g., API, SDK, or file upload)\n4. Follow the integration guide for your chosen method\n5. Map your data fields to Zeotap's schema\n6. Test the integration\n7. Activate the data flow",
        "create a segment": "To create a segment in Zeotap:\n1. Access the Audience Builder in your Zeotap account\n2. Click 'Create New Segment'\n3. Define your segment criteria using available attributes\n4. Use Boolean logic to combine multiple conditions\n5. Preview the segment size and composition\n6. Name and save your segment"
    }
};

function addMessage(message, isUser = false) {
    const messageElement = document.createElement('div');
    messageElement.classList.add('message');
    messageElement.classList.add(isUser ? 'user-message' : 'bot-message');
    messageElement.textContent = message;
    chatMessages.appendChild(messageElement);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function processUserInput(input) {
    input = input.toLowerCase();
    let response = "I'm sorry, I couldn't find an answer to your question. Can you please try rephrasing or ask about a specific CDP feature?";

    // Check if the question is related to CDPs
    const cdpKeywords = ['segment', 'mparticle', 'lytics', 'zeotap', 'cdp', 'customer data platform'];
    const isCdpRelated = cdpKeywords.some(keyword => input.includes(keyword));

    if (!isCdpRelated) {
        return "I'm sorry, but I can only answer questions related to Customer Data Platforms (CDPs) like Segment, mParticle, Lytics, and Zeotap. Could you please ask a question about one of these platforms?";
    }

    for (const [cdp, docs] of Object.entries(cdpDocs)) {
        if (input.includes(cdp)) {
            for (const [topic, answer] of Object.entries(docs)) {
                if (input.includes(topic.toLowerCase())) {
                    response = answer;
                    break;
                }
            }
            break;
        }
    }

    return response;
}

function handleUserInput() {
    const userMessage = userInput.value.trim();
    if (userMessage) {
        addMessage(userMessage, true);
        userInput.value = '';

        setTimeout(() => {
            const botResponse = processUserInput(userMessage);
            addMessage(botResponse);
        }, 500);
    }
}

sendButton.addEventListener('click', handleUserInput);
userInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        handleUserInput();
    }
});

// Initial bot message
addMessage("Hello! I'm the CDP Chatbot. How can I help you today?");
