class Aside extends HTMLElement {
    constructor() {
        super();
        this.shadow = this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this.render();
    }

    render() {

        this.shadow.innerHTML = 
        /*html*/`
        
        <style>
            aside {
                background-color: hsl(0, 0%, 0%);
                height: 100%;
                width: 260px;
                transition: width 0.2s ease;
                z-index:33;
            }
        
        </style>

        <aside>
            <slot name="content"></slot>
        </aside>
      `
    } 
              
}
customElements.define('aside-component', Aside);


