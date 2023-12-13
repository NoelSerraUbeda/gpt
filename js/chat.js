class Conversation extends HTMLElement {

    constructor() {
        super();
        this.shadow = this.attachShadow({ mode: 'open' });

        document.addEventListener('startChat', this.handlestartChat.bind(this));
        document.addEventListener('newChat', this.handleNewChat.bind(this));
        document.addEventListener('newPrompt', this.handleNewPrompt.bind(this));
    }

    handlestartChat =() => {
        this.shadow.innerHTML = '';
    }

    handleNewChat =() => {
        this.render();
    }

    handleNewPrompt = event => {
        const promptContent = event.detail.message; 
        const chatArea = document.createElement('div');  
        const messageParagraph = document.createElement('p');  
    
        messageParagraph.textContent = promptContent;
    
        chatArea.appendChild(messageParagraph);
        this.shadow.appendChild(chatArea);
    }
    
    
    connectedCallback() {
        this.render();
    }

    render() {

        
        this.shadow.innerHTML =
        /*html*/`
        
        <style>
            .response-area {
                background-color: blue;
                padding: 10px;
            }

            .response {
                margin: 5px 0;
                color:blue;

            }

            .conversation{
                align-items: center;
                margin-bottom:10px;
                display: flex;
                flex-direction: column;
                justify-content: center;
                min-height: 75vh;
                width: 40%;
            }

            .welcome{
                align-items: center;
                display: flex;
                flex-direction: column;
                gap: 0.5rem;
                width: 100%;
                margin-left:35rem;
            }

            .welcome-title{
                align-items: center;
                justify-content: center;
                display: flex;
                width:20rem;
                margin-left:3.3rem;
            }

            .welcome-logo{
                align-items: center;
                background-color: hsl(0, 0%, 100%);
                border-radius: 50%;
                display: flex; 
                height: 4.3rem;
                justify-content: center;
                position: relative;
                width: 4.3rem;
            }

            .welcome-logo svg{
                color: hsl(0, 0%, 0%);
                height: 3rem;
                width: 3rem;
            }

            .welcome-title h1{
                color: hsl(0, 0%, 100%);
                font-family: "SoehneBuch", sans-serif;
                font-size: 1.5rem;
                margin: 0;
                margin-top:10px;
                margin-left:-20px;
                width:100%;
                display:flex;
            }    
        </style>

        <div class="conversation">
            <section class="welcome">
                <div class="welcome-logo">
                </div>
                <div class="welcome-title">
                    <h1>How can I help you today?</h1>
                </div>
            </section>
        </div>

      `
    }
}
customElements.define('conversation-component', Conversation);


