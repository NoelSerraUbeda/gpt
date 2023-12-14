class Name extends HTMLElement {
    constructor() {
        super();
        this.shadow = this.attachShadow({ mode: 'open' });
        this.isDropdownOpen = false;
    }

    toggleDropdown(event) {
        event.stopPropagation();
        this.isDropdownOpen = !this.isDropdownOpen;
        this.render();
        this.toggleActiveClass();
        this.setupEventListeners();
    }

    toggleActiveClass() {
        const nameContent = this.shadow.querySelector('.name-content');
        if (nameContent) {
            nameContent.classList.toggle('active', this.isDropdownOpen);
        }
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

    connectedCallback() {
        this.render();
        this.setupEventListeners();
    }

    render() {
        this.shadow.innerHTML = 
        /*html*/`
        <style>
            .name {
                position: absolute;
                top: 0;
                left: 0;
                display: flex;
                align-items: start;
                justify-content: start;
                padding-left: 0.25rem;
                padding-right: 0.5rem;
                padding-top: 0.2rem;
                width: 100%;
                background-color: hsl(235, 11%, 23%, 0.5);
                z-index:2;
            }

            h1 {
                font-family: "SoehneBuch", sans-serif;
                margin-right: 8px;
                font-size: 18px;
                color: white;
                z-index: 1;
                padding-left: 1rem;
                cursor: pointer;
                transition: background-color 0.3s ease;
            }

            .name-content {
                display: flex;
                align-items: center;
            }

            .name-content:hover {
                cursor: pointer;
                background-color: hsl(231, 12%, 21%);
                border-radius: 1rem;
            }

            .name-content.active {
                background-color: hsl(240, 11%, 18%);
                border-radius: 1rem;
            }

            .dropdown-button {
                justify-content: center;
                align-items: center;
                position: relative;
                cursor: pointer;
                display: flex;
                padding-right: 0.5rem;
            }

            svg {
                width: 17px;
                stroke: grey;
                z-index: 1;
            }

            .dropdown-content {
                display: ${this.isDropdownOpen ? 'block' : 'none'};
                box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
                background-color: hsl(240, 11%, 18%);
                border: 0.1rem grey solid;
                border-radius: 0.5rem;
                position: absolute;
                margin-top: 11rem;
                min-width: 160px;
                z-index: 2;
            }

            .dropdown-content a {
                font-family: "SoehneBuch", sans-serif;
                border: 0.2rem hsl(240, 11%, 18%) solid;
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
            <div class="name-content">
                <h1>ChettoGPT 3.5</h1>
                <div class="dropdown-content">
                    <a href="Hola" id="version35">3.5</a>
                    <a href="Adios" id="version4">GPT-4</a>
                </div>
                <div class="dropdown-button">
                    <svg viewBox="0 0 16 17" fill="none" class="text-token-text-tertiary dropdown-button">
                        <path d="M11.3346 7.83203L8.00131 11.1654L4.66797 7.83203" stroke="grey" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
                    </svg>
                </div>
            </div>
        </section>
      `;
    }
}

customElements.define('name-component', Name);
