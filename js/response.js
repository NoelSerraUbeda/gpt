class Response extends HTMLElement {
    constructor() {
        super();
        this.shadow = this.attachShadow({ mode: 'open' });
    
        document.addEventListener('newPrompt', event => this.handleNewPrompt(event));
        document.addEventListener('newChat', event => this.handleNewChat(event));
    }

    handleNewChat = event => {
        this.shadow.innerHTML = '';
        this.render();
    }

    handleNewPrompt = event => {
        const promptContent = event.detail.message;
        const gptResponse = "Lorem Ipsum es simplemente el texto de relleno de las imprentas y archivos de texto. Lorem Ipsum ha sido el texto de relleno estándar de las industrias desde el año 1500, cuando un impresor (N. del T. persona que se dedica a la imprenta) desconocido usó una galería de textos y los mezcló de tal manera que logró hacer un libro de textos especimen. No sólo sobrevivió 500 años, sino que tambien ingresó como texto de relleno en documentos electrónicos, quedando esencialmente igual al original. Fue popularizado en los 60s con la creación de las hojas, las cuales contenian pasajes de Lorem Ipsum, y más recientemente con software de autoedición, como por ejemplo Aldus PageMaker, el cual incluye versiones de Lorem Ipsum";
        this.displayPrompt('You', promptContent); // Mensaje del usuario
    
        setTimeout(() => {
            this.displayPrompt('GPT', gptResponse); // Mensaje de GPT
            const responseArea = this.shadow.querySelector('.response-area');
            responseArea.scrollTop = responseArea.scrollHeight;
        }, 500);
    }

    // Interfaz
    displayPrompt(user, content) {
        const responseArea = this.shadow.querySelector('.response-area');
    
        // Contenedor principal
        const container = document.createElement('div');
        container.classList.add('message-container');
    
        // Avatar
        const avatarContainer = this.createContainer('div', 'avatar-container');
        avatarContainer.innerHTML = `<h1>${user}</h1><img src="${user === 'You' ? '../images/user-avatar.png' : '../images/gpt-avatar.png'}" class="avatar">`;
    
        // Párrafo sin clase de animación para el usuario
        const paragraphContainer = this.createContainer('div', 'paragraph-container');
        paragraphContainer.innerHTML = `<div>${avatarContainer.outerHTML}</div><p>${content}</p>`;
    
        // Párrafo con clase 'typing-text' para la animación para el GPT
        const typingTextContainer = this.createContainer('div', 'paragraph-container');
        typingTextContainer.innerHTML = `<div>${avatarContainer.outerHTML}</div><p class="typing-text-gpt"></p>`;
    
        // Añadir contenedores según el usuario
        container.appendChild(user === 'You' ? paragraphContainer : typingTextContainer);
        responseArea.appendChild(container);
    
        // Letras GPT
        if (user === 'GPT') {
            const letters = content.split('');
    
            // Animar cada letra en secuencia
            letters.forEach((letter, index) => {
                setTimeout(() => {
                    const typingText = typingTextContainer.querySelector('.typing-text-gpt');
                    typingText.innerHTML += letter;
                }, index * 10);
            });
    
            // Desplazar
            setTimeout(() => {
                responseArea.scrollTop = responseArea.scrollHeight;
            }, letters.length * 10);
        } else {
            responseArea.scrollTop = responseArea.scrollHeight;
        }
    }
    
    createContainer(elementType, className) {
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
                position: absolute;
                bottom: 0;
                right: 0;
                height: 100rem;
                width: 100%;
                display: flex;
                justify-content: center;
                align-items: center;
                text-align: justify;
            }

            .response-area {
                font-family: "SoehneBuch", sans-serif;
                flex-direction: column;
                padding-bottom: 1.5rem;
                padding-top: 1.5rem;
                padding-right: 0.5rem;
                position: absolute;
                bottom: 4.5rem;
                width: 46%;
                overflow-y: auto;
                top: 43rem;
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
                display: flex;
                align-items: center;
                flex-direction: row-reverse;
                justify-content: start;
            }

            .avatar {
                width: 30px;
                height: 30px;
                border-radius: 50%;
                margin-right:0.6rem;
            }

            h1, p {
                font-size: 16px;
                color: white;
                margin: 0;
            }

            p {
                margin-left: 2.6rem;
                margin-top: 0.5rem;
                line-height:1.5;
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
