class Name extends HTMLElement {
    constructor() {
        super();
        this.shadow = this.attachShadow({ mode: 'open' });

        document.addEventListener('InitiateConversation', this.handleInitiateConversation.bind(this));
        document.addEventListener('newChat', this.handleNewChat.bind(this));


    }

    handleInitiateConversation = event => {
        this.shadow.innerHTML = '';
    }

    handleNewChat = event => {
        this.render();
    }

    connectedCallback() {
        this.render();
    }

    render() {

        this.shadow.innerHTML = 
        /*html*/`
        
        <style>
        
        .name{
            display:flex;
            align-items:start;
            justify-content:start;
            position:absolute;
            left:2rem;
        }

        h1{
            font-family: "SoehneBuch", sans-serif;
            font-size: 1.5rem;
            color:white;
        }
        
        </style>

        <section class="name">
            <h1>ChettoGPT 3.5</h1>
        </section>
      `
    } 
              
}
customElements.define('name-component', Name);


