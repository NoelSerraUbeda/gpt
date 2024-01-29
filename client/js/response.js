class Response extends HTMLElement {
    constructor() {
        super();
        this.shadow = this.attachShadow({ mode: 'open' });
        this.addEventListeners();
    }

    addEventListeners() {
        document.addEventListener('newPrompt', event => this.handleNewPrompt(event));
        document.addEventListener('newChat', () => this.handleNewChat());
        document.addEventListener('stop', () => this.handleStop());
    }

    handleNewChat() {
        this.shadow.innerHTML = '';
        this.render();
    }

    handleStop() {
        this.stopTyping = true;
    }

    async handleNewPrompt(event) {
        const { message } = event.detail;
        let gptMessage = "Lorem Ipsum es simplemente el texto de relleno de las imprentas y archivos de texto. Lorem Ipsum ha sido el texto de relleno estándar de las industrias desde el año 1500, cuando un impresor (N. del T. persona que se dedica a la imprenta) desconocido usó una galería de textos y los mezcló de tal manera que logró hacer un libro de textos especimen. No sólo sobrevivió 500 años, sino que tambien ingresó como texto de relleno en documentos electrónicos, quedando esencialmente igual al original. Fue popularizado en los 60s con la creación de las hojas";  

        this.displayPrompt('You', message);
        
        await this.delay(500);
        this.displayPrompt('GPT', gptMessage);

        const responseArea = this.shadow.querySelector('.response-area');
        responseArea.scrollTop = responseArea.scrollHeight;

        const delay = gptMessage.split(' ').length * 32;
        await this.delay(delay);
    }

    displayPrompt(user, content) {
        const responseArea = this.shadow.querySelector('.response-area');
        const container = this.createContainer('div', 'message-container');
        const avatarContainer = this.createContainer('div', 'avatar-container');
        avatarContainer.innerHTML = `<h1>${user}</h1><img src="${user === 'You' ? './images/user-avatar.png' : './images/gpt-avatar.png'}" class="avatar">`;

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

    async typingText(typingTextContainer, content) {
        this.stopTyping = false;
        const words = content.split(' ');

        for (const word of words) {
            if (this.stopTyping) return;

            const typingText = typingTextContainer.querySelector('.typing-text-gpt');
            typingText.innerHTML += word + ' ';

            const responseArea = this.shadow.querySelector('.response-area');
            responseArea.scrollTop = responseArea.scrollHeight;

            await this.delay(30);
        }
        document.dispatchEvent(new CustomEvent('endText'));
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
                margin-top:2.6vh;
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
                    margin-top:1rem;
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
