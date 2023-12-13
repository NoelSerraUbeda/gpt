class Response extends HTMLElement {
    constructor() {
        super();
        this.shadow = this.attachShadow({ mode: 'open' });

        this.rendered = false;

        document.addEventListener('newPrompt', this.handleNewPrompt.bind(this));
        document.addEventListener('newChat', this.handleNewChat.bind(this));
    }

    handleNewChat = event => {
        this.shadow.innerHTML = '';
    }

    handleNewPrompt = event => {
        const promptContent = event.detail.message;

        if (!this.rendered) {
            this.render();
            this.rendered = true;
        }

        this.displayPrompt(promptContent);
    }

    connectedCallback() {}

    displayPrompt(content) {


        const responseArea = this.shadow.querySelector('.response-area');

        const container = document.createElement('div');
        container.classList.add('message-container');

        const avatarContainer = document.createElement('div');
        avatarContainer.classList.add('avatar-container');

        const youHeader = document.createElement('h1');
        youHeader.textContent = 'You';

        const avatar = document.createElement('img');
        avatar.src = 'https://img.freepik.com/premium-vector/avatar-icon002_750950-52.jpg';
        avatar.classList.add('avatar');

        const paragraphContainer = document.createElement('div');
        paragraphContainer.classList.add('paragraph-container');

        const paragraph = document.createElement('p');
        paragraph.textContent = content;

        avatarContainer.appendChild(youHeader);
        avatarContainer.appendChild(avatar);

        paragraphContainer.appendChild(paragraph);

        container.appendChild(avatarContainer);
        container.appendChild(paragraphContainer);

        responseArea.appendChild(container);
    }

    render() {
        this.shadow.innerHTML = 
        /*html*/`
        <style>
            .conversation {
                height: 100rem;
                width: 100%;
                position: absolute;
                bottom: 0rem;
                right: 0rem;
                display: flex;
                justify-content: center;
                align-items: center;

            }

            .response-area {
    font-family: "SoehneBuch", sans-serif;
    position: absolute;
    height: 50rem;
    width: 60rem;
    bottom: 5rem;
    overflow-y: auto;
    padding: 10px;
}

/* Oculta la barra de desplazamiento en navegadores webkit (Chrome, Safari) */
.response-area::-webkit-scrollbar {
    width: 0.1em;
}

.response-area::-webkit-scrollbar-thumb {
    background-color: transparent;
}

.response-area {
    scrollbar-width: thin; /* Para navegadores que no son webkit (Firefox) */
    scrollbar-color: transparent transparent; /* Para navegadores que no son webkit (Firefox) */
}


            .message-container {
                display: flex;
                align-items: flex-start;
                margin-bottom: 10px;
                margin-top:2rem;
                display:flex;
                flex-direction:column;
            }

            .avatar-container {
                margin-right: 10px;
                display:flex;
                flex-direction:row-reverse;
                justify-content:center;
                align-items:center;
            }

            .avatar {
                width: 40px;
                height: 40px;
                border-radius: 50%;
            }

            h1 {
                font-size: 20px;
                color: white;
                margin: 0 0 0 1rem;
            }

            p {
                font-size: 20px;
                color: white;
                margin-left: 3.5rem;
                margin-top:0;
                margin-right:0;
                margin-bottom:0;
                max-width:55rem;
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
