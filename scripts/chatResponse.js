

function getBotResponse(input) {
        if (input == "hello") {
            return "Welcome to SeedIt. What can I help you?";
        } 
        if (input == "hi") {
            return "Welcome to SeedIt. What can I help you?";
        } 
        if (input == "goodbye") {
            return "Talk to you later!";
        }
        if (input == "1"){
            return "You can find our plant information at our Plants page, which you can find in our navbar at the top of the screen.";
        }
        if (input =="2"){
            return "Our mission is to help individuals improve their own personal wellness while helping the environment and their communities at the same time by giving them information to help them with the planting process. You can find more detailed information at our About Us page, which you can find in the navbar at the top of the screen.";
        }
        if (input =="3"){
            return "You can edit your profile items such as name or profile image by going to the profile page while logged in, which you can find at the navbar at the top of the page.";
        }
        else {
        return "Sorry! I do not have an answer to that. Here are some of the things I can help you with, enter the corresponding number for more info: <br> 1) Plant Information <br> 2) Our Mission <br> 3) Editing your Profile";
        }
    }
