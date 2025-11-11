import './Settings.css'


export default function Settings () {





    return (
        <div className='settings'>
            <div className='heading'>
                <h1><i className="fa fa-cog" aria-hidden="true"></i>Settings</h1>
            </div>
            <div className="sub-heading categories">
                <h3><i className="fa-solid fa-folder-tree"></i>Categories</h3>
                <ul className='input-container'>
                    <li>Jeans</li>
                    <li>Shirts</li>
                    <li>T-shirts</li>
                    <li>Punjabi</li>
                    <div>
                        <input type="text" /><button>Add Category</button>
                    </div>
                </ul>
            </div>
            <div className="sub-heading make-admin">
                <h3><i className="fa-solid fa-code-pull-request"></i>Make Admin</h3>
                <div className="input-container flex column">
                    <strong>Email:</strong>
                    <input type="text" />
                    <button>Search</button>
                    <strong>Name: SAIFUL </strong>
                    <button>Make Admin</button>
                </div>
            </div>
        </div>
    )
}