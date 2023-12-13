class Name extends HTMLElement {
    constructor() {
        super();
        this.shadow = this.attachShadow({ mode: 'open' });

        document.addEventListener('startChat', this.handlestartChat.bind(this));
        document.addEventListener('newChat', this.handleNewChat.bind(this));

        this.isDropdownOpen = false;
    }

    handlestartChat = event => {
        this.shadow.innerHTML = '';
    }

    handleNewChat = event => {
        this.render();
        this.setupEventListeners();
    }

    connectedCallback() {
        this.render();
        this.setupEventListeners();
    }

    toggleDropdown(event) {
        event.stopPropagation();
    
        this.isDropdownOpen = !this.isDropdownOpen;
        this.render();
        this.setupEventListeners();
    }

    setupEventListeners() {
        const nameSection = this.shadow.querySelector('.name');
        if (nameSection) {
            nameSection.removeEventListener('click', this.toggleDropdown.bind(this));
            nameSection.addEventListener('click', this.toggleDropdown.bind(this));
        }

        const button = this.shadow.querySelector('.dropdown-button');
        if (button) {
            button.removeEventListener('click', this.toggleDropdown.bind(this));
            button.addEventListener('click', this.toggleDropdown.bind(this));
        }
    }

    render() {
        this.shadow.innerHTML =
        /*html*/`
        <style>
            .name {
                position: absolute;
                top: 0.3rem;
                left: 0.6rem;
                display: flex;
                align-items: start;
                justify-content: start;
                padding-left: 10px;
                padding-right: 10px;
            }

            .name:hover {
                cursor: pointer;
                background-color: hsl(231, 12%, 21%);
                border-radius: 1rem;
            }

            h1 {
                font-family: "SoehneBuch", sans-serif;
                margin-right: 8px;
                font-size: 18px;
                color: white;
            }

            .dropdown-button {
                justify-content: center;
                align-items: center;
                position: relative;
                cursor: pointer;
                margin-top: 8px;
                display: flex;
                z-index: 1;
            }

            svg {
                widht: 17px;
                height: 17px;
                stroke: grey;
            }

            .dropdown-content {
                display: ${this.isDropdownOpen ? 'block' : 'none'};
                box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
                background-color: #202123;
                border: 0.1rem grey solid;
                border-radius: 0.5rem;
                position: absolute;
                margin-top: 60px;
                min-width: 160px;
                z-index: 1;
            }

            .dropdown-content a {
                font-family: "SoehneBuch", sans-serif;
                border: 0.2rem #202123 solid;
                text-decoration: none;
                padding: 12px 16px;
                display: block;
                color: white;
                margin: 8px;
            }

            .dropdown-content a:hover {
                background-color: hsl(220, 3%, 17%);
                border: 0.2rem white solid;
                border-radius: 0.5rem;
            }
        </style>

        <section class="name">
            <h1>ChettoGPT 3.5</h1>
            <div class="dropdown-content">
                <a href="#" id="version35">3.5</a>
                <a href="#" id="version4">GPT-4</a>
            </div>
            <div class="dropdown-button">
                <svg viewBox="0 0 16 17" fill="none" class="text-token-text-tertiary dropdown-button"><path d="M11.3346 7.83203L8.00131 11.1654L4.66797 7.83203" stroke="grey" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path></svg>
            </div>
        </section>
      `;
    }
}

customElements.define('name-component', Name);
