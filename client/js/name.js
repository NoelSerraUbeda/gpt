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
        const nameSection = this.shadow.querySelector('.name-content');
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
                background-color: hsl(235, 11%, 23%, 0.5);
                font-family: "SoehneBuch", sans-serif;
                justify-content: start;
                padding-left: 0.20rem;
                padding-right: 0.4rem;
                padding-top: 0.5rem;
                align-items: start;
                position: absolute;
                display: flex;
                width: 100%;
                left: 3rem;
                z-index:2;
                top: 0;
            }

            h1 {
                transition: background-color 0.3s ease;
                padding-left: 1rem;
                margin-right: 8px;
                cursor: pointer;
                font-size: 18px;
                color: white;
                z-index: 1;
            }

            .name-content {
                align-items: center;
                display: flex;
            }

            .name-content:hover {
                background-color: hsl(231, 12%, 21%);
                border-radius: 1rem;
                cursor: pointer;
            }

            .name-content.active {
                background-color: hsl(240, 11%, 18%);
                border-radius: 1rem;
            }

            .dropdown-button {
                justify-content: center;
                padding-right: 0.5rem;
                align-items: center;
                position: relative;
                cursor: pointer;
                display: flex;
            }

            svg {
                stroke: grey;
                width: 17px;
                z-index: 1;
            }

            .dropdown-content {
                display: ${this.isDropdownOpen ? 'block' : 'none'};
                box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
                border: 0.1rem hsl(235, 11%, 23%) solid;
                background-color: hsl(220, 4%, 13%);
                border-radius: 0.5rem;
                position: absolute;
                margin-top: 4rem;
                z-index: 2;
            }

            .dropdown-content a {
                text-decoration: none;
                padding: 12px 16px;
                display: block;
                color: white;
                margin: 8px;
                width:100%;
            }

            .head {
                justify-content: space-between; 
                display:flex;
                cursor:pointer;
            }

            .head svg {
                width:40px;
                position:absolute;
                top:0.8rem;
                right:1rem;                
                margin-right:1rem;
                margin-top:1.5rem;
            }

            .option{
                margin:0.5rem;
            }

            .option:hover {
                background-color: hsl(220, 3%, 17%);
                border-radius: 0.3rem;
            }

            .line{
                border:0.1rem solid hsl(235, 11%, 23%);
            }

            .option p {
                margin:0 0 0.8rem 1.5rem;
                color: hsl(0, 0%, 60%);
                padding-bottom:10px;
                max-width:20rem;
            }

        </style>

        <section class="name">
            <div class="name-content">
                <h1>ChettoGPT 3.5</h1>
                <div class="dropdown-button">
                <svg viewBox="0 0 16 17" fill="none" class="text-token-text-tertiary dropdown-button">
                    <path d="M11.3346 7.83203L8.00131 11.1654L4.66797 7.83203" stroke="grey" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
                </svg>
            </div>
            </div>
                <div class="dropdown-content">
                    <div class="option">
                        <div class="head">
                            <a href="Hola" id="version35">3.5</a>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>check-circle-outline</title><path fill="white" stroke="white" d="M12 2C6.5 2 2 6.5 2 12S6.5 22 12 22 22 17.5 22 12 17.5 2 12 2M12 20C7.59 20 4 16.41 4 12S7.59 4 12 4 20 7.59 20 12 16.41 20 12 20M16.59 7.58L10 14.17L7.41 11.59L6 13L10 17L18 9L16.59 7.58Z" /></svg>
                        </div>
                        <p>Great for everyday tasks</p>
                    </div>
                <div class="line"></div>
                <div class="option">
                    <div class="head">
                        <a href="Adios" id="version4">GPT-4</a>
                    </div>
                    <p>Our smartest and most capable model.
                    Includes DALL.E, browsing and more.</p>
                </div>
            </div>
        </section>
      `;
    }
}

customElements.define('name-component', Name);
