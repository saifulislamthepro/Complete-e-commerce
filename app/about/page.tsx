import "./about.css";

export default function AboutPage() {
  return (
    <div className="about-page">
        <div className="flex">
            
            {/* Hero Section */}
            <section className="hero-section flex-column">
                <h1>About Ravaa Fashion</h1>
                <p>
                Ravaa Fashion is a premier clothing brand in Bangladesh, dedicated to bringing
                style, quality, and comfort to modern fashion enthusiasts.
                </p>
                <img src="/images/about-hero.jpg" alt="Ravaa Fashion" className="hero-img"/>
            </section>

            {/* Our Story */}
            <section className="story-section flex-row">
                <div className="story-text">
                <h2>Our Story</h2>
                <p>
                    Founded with a vision to blend tradition with contemporary fashion, Ravaa
                    Fashion has been crafting stylish and high-quality clothing for men and
                    women. Our collections celebrate creativity, comfort, and sustainability.
                </p>
                </div>
                <div className="story-img">
                <img src="/images/story.jpg" alt="Our Story"/>
                </div>
            </section>

            {/* Mission & Vision */}
            <section className="mission-section flex-column">
                <h2>Our Mission & Vision</h2>
                <div className="mission-cards">
                <div className="card">
                    <h3>Mission</h3>
                    <p>
                    To provide premium clothing that combines style, comfort, and quality
                    at affordable prices for fashion lovers in Bangladesh and beyond.
                    </p>
                </div>
                <div className="card">
                    <h3>Vision</h3>
                    <p>
                    To become a leading fashion brand that defines trends and inspires
                    creativity in every wardrobe.
                    </p>
                </div>
                </div>
            </section>

            {/* Team */}
            <section className="team-section">
                <h2>Meet Our Team</h2>
                <div className="team-grid">
                <div className="team-member">
                    <img src="/images/team1.jpg" alt="Team Member"/>
                    <h4>Ayesha Rahman</h4>
                    <p>Founder & CEO</p>
                </div>
                <div className="team-member">
                    <img src="/images/team2.jpg" alt="Team Member"/>
                    <h4>Rafiq Hasan</h4>
                    <p>Head Designer</p>
                </div>
                <div className="team-member">
                    <img src="/images/team3.jpg" alt="Team Member"/>
                    <h4>Sumaiya Khan</h4>
                    <p>Marketing Lead</p>
                </div>
                </div>
            </section>

            {/* Contact / Call-to-action */}
            <section className="contact-section flex-column">
                <h2>Get in Touch</h2>
                <p>Have questions or want to collaborate? Reach out to us anytime.</p>
                <a href="/contact" className="contact-btn">Contact Us</a>
            </section>
        </div>
    </div>
  )
}
