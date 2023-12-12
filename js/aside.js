class Aside extends HTMLElement {
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
            const aside = this.closest('body').querySelector('aside-component');
            const asideWidth = isAsideOpen ? 260 : 0;

            aside.style.width = `${asideWidth}px`;
            aside.style.transition = 'width 0.3s ease';

            const closeBtnLeft = isAsideOpen ? 17 : asideWidth + 0.5;
            closeButton.style.left = `${closeBtnLeft}rem`;

            closeButton.classList.toggle('closed', !isAsideOpen);
            overlay.classList.toggle('visible', isAsideOpen);
        };

        closeButton.addEventListener('click', () => {
            isAsideOpen = !isAsideOpen;
            updateAside();
        });

        closeButton.addEventListener('mouseover', () => {
            if (isAsideOpen) overlay.classList.add('hovered');
        });

        closeButton.addEventListener('mouseout', () => {
            overlay.classList.remove('visible', 'hovered');
        });
    }

    render() {

        this.shadow.innerHTML =
        /*html*/`
        
        <style>
           aside {
                background-color: hsl(0, 0%, 0%);
                height: 100%;
                width: 260px;
            }

            .close-button {
                cursor: pointer;
                position: absolute;
                z-index: 1;
                top: 27rem;
                left: 17rem; 
                padding: 5px;
                padding-top: 25px;
                height: 40px;
                transition: left 0.3s ease; 
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

            .close-button .tooltiptext{
                background-color: black;
                border-radius: 0.5rem;
                color: #fff;
                font-family: 'SoehneBuch', sans-serif;
                font-size: 0.8rem;
                margin-top: -3.5rem;
                margin-left: 2rem;
                opacity: 0;
                padding: 0.5rem 0;
                pointer-events: none; 
                position: absolute;
                text-align: center;
                transition: opacity 0.3s;
                width: 100px;
                z-index: 1001;
            }

            .close-button .tooltiptext::after {
                border-width: 8px;
                transform: rotate(90deg);
                border-style: solid;
                border-color: rgb(0, 0, 0) transparent transparent transparent;
                content: "";
                left: -15%;
                position: absolute;
                top: 27%;   
            }

            .close-button:hover .tooltiptext{
                opacity: 1;
                visibility: visible;
            }

            @media only screen and (max-width: 900px) {
                aside{
                    display:none
                }
            }
        
        </style>

        <aside>
            <slot name="content"></slot>

            <div class="close-button">
            <div class="button-content">
                <div class="line"></div>
                <div class="line"></div>
            </div>
            <span class="tooltiptext">Cerrar barra lateral</span> 
        </div>
        <div class="overlay"></div>
        </aside>
      `
    }

}
customElements.define('aside-component', Aside);


