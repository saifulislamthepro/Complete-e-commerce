
import "./Featured.css";

export default function Featured() {



    return(
        <div className="featured flex">
            <section className="grid">
                <div className="img-container flex">
                    <img src="/window.svg" alt="banner" />
                </div>
                <div className="img-container flex">
                    <img src="/window.svg" alt="banner" />
                </div>
            </section>
        </div>
    )
}