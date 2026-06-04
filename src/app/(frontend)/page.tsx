export default function HomePage() {
  return (
    <>
      <section className="hero">
        <div className="hero-inner">
          <p className="eyebrow">Fireplaces, stone, BBQs and wood stoves</p>
          <h1>A.P.A LithoTherm</h1>
          <p>
            Fireplaces, natural stones, barbeques and wood stoves for homes and outdoor spaces.
          </p>
          <div className="actions">
            <a className="button primary" href="/products">
              View Products
            </a>
            <a className="button" href="/projects">
              View Projects
            </a>
          </div>
        </div>
      </section>
      <section className="home-services" aria-label="Main services">
        <p>Looking for something specific?</p>
        <div className="home-service-actions">
          <a href="/contact">Contact us</a>
        </div>
      </section>
    </>
  )
}
