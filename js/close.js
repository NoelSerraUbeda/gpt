class Close extends HTMLElement {
    constructor() {
        super();
        this.shadow = this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this.render();

        const closeButton = this.shadowRoot.querySelector('.close-button');
        const overlay = this.shadowRoot.querySelector('.overlay');
        let isAsideOpen = true;

        const updateAside = () => {
            const aside = this.closest('body').querySelector('aside');
            aside.style.width = isAsideOpen ? '260px' : '0';
            closeButton.classList.toggle('closed', !isAsideOpen);
            overlay.classList.toggle('visible', isAsideOpen);
        };

        const handleMouseOver = () => {
            if (isAsideOpen) {
                overlay.classList.add('hovered');
            }
        };

        const handleMouseOut = () => {
            overlay.classList.remove('hovered');
        };

        closeButton.addEventListener('click', () => {
            isAsideOpen = !isAsideOpen;
            updateAside();
        });

        closeButton.addEventListener('mouseover', handleMouseOver);
        closeButton.addEventListener('mouseout', handleMouseOut);
    }

    render() {
        this.shadow.innerHTML = 
        /*html*/`
        <style>
            .close-button {
                cursor: pointer;
                position: absolute;
                left: 1rem;
                z-index: 1;
                top: 390px;
                padding: 5px;
                padding-top: 25px;
                height: 40px;
            }

            .button-content {
                opacity: 0.25;
                display: flex;
                height: 48px;
                width: 24px;
                flex-direction: column;
                align-items: center;
                transition: opacity 0.3s ease;
            }

            .line {
                height: 3px;
                width: 1.5rem;
                background-color: #ffffff;
                border-radius: 2px;
                margin: 2px 0;
                transform: rotate(90deg);
                transition: transform 0.3s ease, width 0.3s ease;
            }

            .close-button:hover .line:nth-child(1) {
                transform: translateY(0px) rotate(-45deg) scaleX(0.8);
            }

            .close-button:hover .line:nth-child(2) {
                transform: translateY(5px) rotate(45deg) scaleX(0.8);
            }

            .closed .line:nth-child(1) {
                transform: rotate(-145deg) translateY(4px);
            }

            .closed .line:nth-child(2) {
                transform: rotate(145deg) translateY(-4px);
            }

            .close-button:hover .button-content {
                opacity: 1;
            }

            .user-interaction {
                display: flex;
                flex-direction: column;
                gap: 1rem;
                padding: 1.5rem 0;
                width: 47%;
            }

            .overlay {
                position: fixed;
                opacity: 0.5;
                width: 260px;
                transition: background 0.3s ease;
            }

            .overlay.visible {
                opacity: 1;
            }

            .overlay.hovered {
                background: rgba(0, 0, 0, 0.7);
                width: 260px;
                height: 100%;
                top: 0; 
                left: 0; 
            }
        </style>

        <div class="close-button" title="Close sidebar">
            <div class="button-content">
                <div class="line"></div>
                <div class="line"></div>
            </div>
        </div>
        <div class="overlay"></div>
        `;
    }
}

customElements.define('close-component', Close);
