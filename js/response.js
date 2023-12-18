class Response extends HTMLElement {
    constructor() {
        super();
        this.shadow = this.attachShadow({ mode: 'open' });
    
        document.addEventListener('newPrompt', event => this.handleNewPrompt(event));
        document.addEventListener('newChat', event => this.handleNewChat(event));
        document.addEventListener('stopText', event => this.handleStopText(event));
    }

    handleNewChat = () => {
        this.shadow.innerHTML = '';
        this.render();
    }
    
    handleNewPrompt = async event => {
        const { message } = event.detail;
        const gptMessage = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris fermentum dui eu felis gravida, eu aliquet nibh accumsan. Maecenas tristique metus libero, a condimentum lorem gravida ut. Aenean commodo vitae ipsum condimentum faucibus. Morbi massa enim, bibendum vitae nisi quis, molestie aliquet purus. Vivamus maximus risus ac arcu scelerisque hendrerit. Integer ultricies metus libero, a commodo purus convallis nec. Donec blandit velit sit amet ligula vulputate, at interdum dolor malesuada. Vestibulum in ligula ut massa condimentum faucibus ut et sem. Aliquam vestibulum, metus non maximus porttitor, diam ante sollicitudin tortor, vel sollicitudin turpis leo nec magna. Nam eu molestie libero. Nunc posuere, eros sit amet sagittis rutrum, dui erat ultrices est, eget ornare velit urna rhoncus risus. Sed ut libero ac enim ultricies blandit ac vitae quam.";
    
        const firstLetterCapitalized = message.charAt(0).toUpperCase() + message.slice(1);
        const youMessage = firstLetterCapitalized.trim().endsWith('.') ? firstLetterCapitalized : `${firstLetterCapitalized.trim()}.`;
    
        this.displayPrompt('You', youMessage);
    
        await this.delay(500);
        document.dispatchEvent(new CustomEvent('stop'));
    
        this.displayPrompt('GPT', gptMessage);
    
        const responseArea = this.shadow.querySelector('.response-area');
        responseArea.scrollTop = responseArea.scrollHeight;
    
        const delay = gptMessage.split(' ').length * 32;
        await this.delay(delay);
        document.dispatchEvent(new CustomEvent('reStart'));
    };
    
    handleStopText = () => {
        this.stopTyping = true;
        document.dispatchEvent(new CustomEvent('returnSvg'));
    }
    
    displayPrompt(user, content) {
        const responseArea = this.shadow.querySelector('.response-area');
        const container = this.createContainer('div', 'message-container');
    
        const avatarContainer = this.createContainer('div', 'avatar-container');
        avatarContainer.innerHTML = `<h1>${user}</h1><img src="${user === 'You' ? '../images/user-avatar.png' : '../images/gpt-avatar.png'}" class="avatar">`;
    
        const paragraphContainer = this.createContainer('div', 'paragraph-container');
        paragraphContainer.innerHTML = `<div>${avatarContainer.outerHTML}</div><p>${content}</p>`;
    
        const typingTextContainer = this.createContainer('div', 'paragraph-container');
        typingTextContainer.innerHTML = `<div>${avatarContainer.outerHTML}</div><p class="typing-text-gpt"></p>`;
    
        container.appendChild(user === 'You' ? paragraphContainer : typingTextContainer);
        responseArea.appendChild(container);
    
        if (user === 'GPT') {
            this.typingText(typingTextContainer, content);
        } else {
            responseArea.scrollTop = responseArea.scrollHeight;
        }
    }
    
    typingText = async (typingTextContainer, content) => {
        this.stopTyping = false;

        const words = content.split(' ');

        const wordTyping = async (word) => {
            if (this.stopTyping) return;

            const typingText = typingTextContainer.querySelector('.typing-text-gpt');
            typingText.innerHTML += word + ' ';
            const responseArea = this.shadow.querySelector('.response-area');
            responseArea.scrollTop = responseArea.scrollHeight;
            await this.delay(30);
        };

        const wordTypings = async () => {
            for (let i = 0; i < words.length; i++) {
                await wordTyping(words[i], i);
            }
        };

        wordTypings();
    }
    
    delay = ms => new Promise(resolve => setTimeout(resolve, ms));
    
    createContainer = (elementType, className) => {
        const container = document.createElement(elementType);
        container.classList.add(className);
        return container;
    }
    
    connectedCallback() {
        this.render();
    }

    render() {
        this.shadow.innerHTML =
        /*html*/`
        <style>
            .conversation {
                justify-content: center;
                align-items: center;
                text-align: justify;
                position: absolute;
                height: 100rem;
                display: flex;
                width: 100%;
                bottom: 0;
                right: 0;
            }

            .response-area {
                font-family: "SoehneBuch", sans-serif;
                flex-direction: column;
                padding-bottom: 1.5rem;
                padding-top: 4.5rem;
                padding-right: 0.5rem;
                position: absolute;
                overflow-y: auto;
                bottom: 4.5rem;
                width: 46rem;
                overflow-y: auto;
                top: 41rem;
            }

            .response-area::-webkit-scrollbar {
                width: 0.1em;
            }

            .response-area::-webkit-scrollbar-thumb {
                background-color: transparent;
            }

            .message-container{
                margin-top:2rem;
            }

            .avatar-container {
                flex-direction: row-reverse;
                justify-content: start;
                align-items: center;
                display: flex;
            }

            .avatar {
                margin-right:0.6rem;
                border-radius: 50%;
                height: 30px;
                width: 30px;
            }

            h1, p {
                font-size: 16px;
                color: white;
                margin: 0;
            }

            p {
                margin-left: 2.6rem;
                line-height:1.5;
                max-width:40rem;
            }

            @media only screen and (max-width: 900px) {
                .conversation {
                    justify-content: end;
                    align-items: end;
                }

                .response-area {
                    width:89%;
                    left:2rem;
                    height:45%;
                }
            }
        </style>

        <section class="conversation">
            <div class="response-area">
            
            </div>
        </section>
      `;
    }
}

customElements.define('response-component', Response);
