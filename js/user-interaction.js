class Message extends HTMLElement {

    constructor() {
        super();
        this.shadow = this.attachShadow({ mode: 'open' });

        document.addEventListener('newChat', () => this.render());
    }

    static get observedAttributes() {
        return ['state']
    }

    connectedCallback() {
        this.render();
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (name === 'state') {
            if (newValue === "true") {
                this.sendButton.parentElement.setAttribute('hidden', '');
                this.stopButton.parentElement.removeAttribute('hidden');
            } else {
                this.sendButton.parentElement.removeAttribute('hidden');
                this.stopButton.parentElement.setAttribute('hidden', '');
            }  
        }
    }

    render() {

        this.shadow.innerHTML =
        /*html*/`
        
        <style>

        .message-input {
            width: 55rem;
            margin-bottom:15px;
            position: fixed;
            bottom: 0;
            margin-left:-27.5rem;
            left:none;
            z-index:500;
        }

        .message-input .attach-button button{
            background-color: hsl(0, 0%, 100%, 0);
            border: none;
            border-radius: 0.5rem;
            cursor: pointer;
        }

        .message-input .attach-button svg{
            color: hsl(0, 0%, 100%);
            width: 1.3rem;
        }

        .message-input form{
            align-items: center;
            border: 1px solid hsl(0, 0%, 40%);
            border-radius: 1rem;
            display: flex;
            justify-content: center;
            padding: 0.5rem;
        }

        .message-input form .form-element{
            height: max-content;
            width: 100%
        }

        .message-input form .form-element textarea {
            background-color: hsl(235, 11%, 23%);
            border: none;
            color: hsl(0, 0%, 100%);
            font-family: 'SoehneBuch', Arial;
            font-size: 0.9rem;
            height: 1.5rem;
            max-height: 5rem;
            resize: none;
            width: 99%;
            padding-top: 0.5rem;
            overflow: auto;
        }

        ::-webkit-scrollbar {
            width: 6px;
        }

        ::-webkit-scrollbar-thumb {
            background-color: transparent;
        }

        .message-input form .form-element textarea::placeholder{
            color: hsl(0, 0%, 100%, 0.5);
            font-weight: 300;
        }

        .message-input form .form-element textarea:focus{
            outline: none;
        }

        .message-input .stop-button button{
            align-items: center;
            background-color: hsl(235, 7%, 31%);
            border: 1px hsl(235, 7%, 31%) solid;
            border-radius: 0.5rem;
            display: flex;
            padding: 0.3rem 0.2rem;
            cursor:pointer;   
        }

        .message-input .stop-button button:hover{
            background-color: hsl(235, 11%, 23%);
        }

        .message-input .stop-button svg{
            color:hsl(0, 0%, 0%, 0.3);
            width: 1.3rem;
        }

        .message-input .stop-button.active button{
            background-color: white;
            cursor: pointer;
        }

        .message-input .stop-button.active svg{
            color:hsl(0, 0%, 0%);
        }

        .stop-button .tooltiptext{
            background-color: black;
            border-radius: 0.5rem;
            color: #fff;
            font-family: 'SoehneBuch', sans-serif;
            font-size: 0.8rem;
            margin-top: -5rem;
            margin-left: -3rem;
            opacity: 0;
            padding: 0.5rem 0;
            pointer-events: none; 
            position: absolute;
            text-align: center;
            transition: opacity 0.3s;
            width: 120px;
            z-index: 1001;
        }

        .stop-button .tooltiptext::after {
            border-width: 5px;
            border-style: solid;
            border-color: rgb(0, 0, 0) transparent transparent transparent;
            content: "";
            left: 45%;
            position: absolute;
            top: 100%;   
        }

        .stop-button:hover .tooltiptext{
            opacity: 1;
            visibility: visible;
        }

        .message-input .send-button button{
            align-items: center;
            background-color: hsl(235, 7%, 31%);
            border: 1px hsl(235, 7%, 31%) solid;
            border-radius: 0.5rem;
            display: flex;
            padding: 0.1rem 0.2rem;
            cursor:not-allowed;   
        }

        .message-input .send-button button:hover{
            background-color: hsl(235, 11%, 23%);
        }

        .message-input .send-button svg{
            color:hsl(0, 0%, 0%, 0.3);
            width: 1.3rem;
        }

        .message-input .send-button.active button{
            background-color: white;
            cursor: pointer;
        }

        .message-input .send-button.active svg{
            color:hsl(0, 0%, 0%);
        }

        .send-button .tooltiptext{
            background-color: black;
            border-radius: 0.5rem;
            color: #fff;
            font-family: 'SoehneBuch', sans-serif;
            font-size: 0.8rem;
            margin-top: -5rem;
            margin-left: -3rem;
            opacity: 0;
            padding: 0.5rem 0;
            pointer-events: none; 
            position: absolute;
            text-align: center;
            transition: opacity 0.3s;
            width: 120px;
            z-index: 1001;
        }

        .send-button .tooltiptext::after {
            border-width: 5px;
            border-style: solid;
            border-color: rgb(0, 0, 0) transparent transparent transparent;
            content: "";
            left: 45%;
            position: absolute;
            top: 100%;   
        }

        .send-button:hover .tooltiptext{
            opacity: 1;
            visibility: visible;
        }

        .attach-button .tooltiptext{
            background-color: black;
            border-radius: 0.5rem;
            color: #fff;
            font-family: 'SoehneBuch', sans-serif;
            font-size: 0.8rem;
            margin-top: -2.5rem;
            margin-left: -4.3rem;
            opacity: 0;
            padding: 0.5rem 0;
            pointer-events: none; 
            position: absolute;
            text-align: center;
            transition: opacity 0.3s;
            width: 120px;
            z-index: 1001;
        }

        .attach-button .tooltiptext::after {
            border-width: 5px;
            border-style: solid;
            border-color: rgb(0, 0, 0) transparent transparent transparent;
            content: "";
            left: 45%;
            position: absolute;
            top: 100%;   
        }

        .attach-button:hover .tooltiptext{
            opacity: 1;
            visibility: visible;
        }

        @media only screen and (max-width: 900px) {
            .message-input {
                width: 30rem;
                margin-bottom:20px;
                margin-left:-240px;
                margin-top:10px;
            }    
        }

        </style>

        <section class="message-input">
            <form>
                <div class="attach-button">
                    <button>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M9 7C9 4.23858 11.2386 2 14 2C16.7614 2 19 4.23858 19 7V15C19 18.866 15.866 22 12 22C8.13401 22 5 18.866 5 15V9C5 8.44772 5.44772 8 6 8C6.55228 8 7 8.44772 7 9V15C7 17.7614 9.23858 20 12 20C14.7614 20 17 17.7614 17 15V7C17 5.34315 15.6569 4 14 4C12.3431 4 11 5.34315 11 7V15C11 15.5523 11.4477 16 12 16C12.5523 16 13 15.5523 13 15V9C13 8.44772 13.4477 8 14 8C14.5523 8 15 8.44772 15 9V15C15 16.6569 13.6569 18 12 18C10.3431 18 9 16.6569 9 15V7Z" fill="currentColor"></path>
                    </svg> 
                    <input multiple="" type="file" tabindex="-1" class="hidden" style="display: none;">
                    <span class="tooltiptext">Añadir archivo</span>   
                    </button>
                </div>
                <div class="form-element">
                    <textarea placeholder="Message ChatGPT..." autofocus></textarea>
                </div>
                <div class="send-button" visible>
                    <button>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" class="text-white dark:text-black">
                            <path d="M7 11L12 6L17 11M12 18V7" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
                        </svg>            
                        <span class="tooltiptext">Enviar mensaje</span>                  
                    </button>
                </div>
                <div class="stop-button" hidden>
                    <button> 
                    <svg fill="white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>stop-circle-outline</title><path d="M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M12,4C16.41,4 20,7.59 20,12C20,16.41 16.41,20 12,20C7.59,20 4,16.41 4,12C4,7.59 7.59,4 12,4M9,9V15H15V9" /></svg>            
                        <span class="tooltiptext">Detener mensaje</span>                  
                    </button>
                </div>
            </form>
        </section>;
      `

        this.sendButton = this.shadow.querySelector('.send-button button');
        this.stopButton = this.shadow.querySelector('.stop-button button');

        const textarea = this.shadow.querySelector('.form-element textarea');
        const sendButton = this.shadow.querySelector('.send-button button');
        const stopButton = this.shadow.querySelector('.stop-button button');
        const buttonParent = sendButton.parentElement;

        const activateSendButton = () => {
            const validate = textarea.value.trim() !== '';
            buttonParent.classList.toggle('active', validate);
            sendButton.disabled = !validate;
        };

        const handleSendAction = (event) => {
            event.preventDefault();
            const areaValue = textarea.value.trim();
            if (areaValue !== '') {
                this.render();
                document.dispatchEvent(new CustomEvent('startChat'));
                document.dispatchEvent(new CustomEvent('newPrompt', { detail: { message: areaValue } }));
                this.setAttribute('state', "true")
            }
        };

        const handleStopAction = (event) => {
            event.preventDefault();
            document.dispatchEvent(new CustomEvent('stop'));
            this.setAttribute('state', "false")
        };

        textarea.addEventListener('input', activateSendButton);

        textarea.addEventListener('keydown', (event) => {
            if (event.key === 'Enter' && !event.shiftKey) {
                handleSendAction(event);
            }
        });

        sendButton.addEventListener('click', handleSendAction);
        stopButton.addEventListener('click', handleStopAction);
    }
}
customElements.define('input-component', Message);


