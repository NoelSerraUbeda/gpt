class User extends HTMLElement {
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
        .user{
            bottom: 0;
            cursor: pointer;
            display: flex;
            gap: 0.5rem;
            padding: 1rem;
            position: absolute;
            flex-direction:column;
        }

        .user-logo{
            align-items: center;
            border-radius: 50%;
            display: flex;
            height: 2rem;
            justify-content: center;
            overflow: hidden;
            width: 2rem;
        }

        .user-logo img{
            width: 100%;
        }

        .user-name{
            display: flex;
            flex-direction: column;
            justify-content: center;
        }

        .user-area{
            justify-content: center;
            justify-content:start;
            flex-direction: row;
            display: flex;
            gap:10px;
            width:13.5rem;
            padding:0.5rem;
        }

        .user-area:hover {
            background-color:hsl(220, 4%, 13%);
            border-radius:0.4rem;
        }

        .user-name h3{
            color: hsl(0, 0%, 100%);
            font-family: 'SoehneBuch', sans-serif;
            font-size: 0.9rem;
            margin: 0;
            overflow: hidden;
            white-space: nowrap;
        }
        </style>

        <section class="user">
            <div class="user-area">
                <div class="user-logo">
                <svg fill="white" width="20" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>creation</title><path d="M19,1L17.74,3.75L15,5L17.74,6.26L19,9L20.25,6.26L23,5L20.25,3.75M9,4L6.5,9.5L1,12L6.5,14.5L9,20L11.5,14.5L17,12L11.5,9.5M19,15L17.74,17.74L15,19L17.74,20.25L19,23L20.25,20.25L23,19L20.25,17.74" /></svg>
                </div>
                <div class="user-name">
                    <h3>Upgrade plan</h3>
                </div>
            </div>
            <div class="user-area">
                <div class="user-logo">
                    <img src="images/user-avatar.png" alt="avatar de usuario">
                </div>
                <div class="user-name">
                    <h3>Noel Serra</h3>
                </div>
            </div>
        </section>
      `
    }

}
customElements.define('user-component', User);


