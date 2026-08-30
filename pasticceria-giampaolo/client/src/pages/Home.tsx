import { useEffect, useState } from "react";
import {
  ArrowDownRight,
  ArrowUpRight,
  ChevronDown,
  Clock3,
  Coffee,
  Croissant,
  ExternalLink,
  Heart,
  MapPin,
  Menu,
  Phone,
  ShoppingBag,
  Star,
  X,
} from "lucide-react";

/**
 * Design reminder: editorial piemontese — warm ivory, dark chocolate, toasted caramel,
 * asymmetric magazine rhythm, large food imagery, and calm interactions that never
 * compete with the product. Keep copy factual: no opening hours or unverified menu.
 */

const PHONE = "0173363749";
// Replace this address-search URL with the official Google Maps link supplied by the client.
const MAPS_URL = "https://www.google.com/maps/search/?api=1&query=Via+Pietrino+Belli+39%2C+12051+Alba+CN%2C+Italia";
const REVIEWS_URL = "https://www.google.com/maps/search/?api=1&query=Pasticceria+Giampaolo+Alba";

const editorialImages = {
  hero: "/manus-storage/hero-pasticceria_ab524346.jpg",
  detail: "/manus-storage/pastry-detail_b8f92f04.jpg",
  home: "/manus-storage/pastry-table_c089938f.jpg",
  mark: "/manus-storage/giampaolo-mark_82b6a263.png",
};

function BrandMark({ compact = false }: { compact?: boolean }) {
  return (
    <a href="#home" className={`brand-mark ${compact ? "brand-mark--compact" : ""}`} aria-label="Pasticceria Giampaolo, torna all'inizio">
      <img src={editorialImages.mark} alt="" aria-hidden="true" />
      <span>
        <strong>PASTICCERIA</strong>
        <em>Giampaolo</em>
      </span>
    </a>
  );
}

function SectionLabel({ number, children }: { number: string; children: string }) {
  return (
    <div className="section-label">
      <span>{number}</span>
      <i />
      <small>{children}</small>
    </div>
  );
}

function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const close = () => setOpen(false);
  return (
    <header className={`site-header ${scrolled ? "site-header--scrolled" : ""}`}>
      <div className="header-inner">
        <BrandMark compact />
        <nav className={`main-nav ${open ? "main-nav--open" : ""}`} aria-label="Navigazione principale">
          <a href="#la-pasticceria" onClick={close}>La Pasticceria</a>
          <a href="#specialita" onClick={close}>Specialità</a>
          <a href="#recensioni" onClick={close}>Recensioni</a>
          <a href="#dove-siamo" onClick={close}>Dove siamo</a>
          <a className="nav-call" href={`tel:${PHONE}`} onClick={close}><Phone size={15} /> Chiama</a>
        </nav>
        <button className="menu-toggle" onClick={() => setOpen(!open)} aria-expanded={open} aria-label={open ? "Chiudi menu" : "Apri menu"}>
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section id="home" className="hero" aria-labelledby="hero-title">
      <img className="hero-image" src={editorialImages.hero} alt="Pasticceria artigianale con croissant, pasticcini e crema" />
      <div className="hero-shade" />
      <div className="hero-content container reveal">
        <p className="eyebrow eyebrow-light">Alba · Piemonte</p>
        <h1 id="hero-title">Il piacere della<br /><em>pasticceria.</em></h1>
        <p className="hero-subtitle">Specialità dolci e momenti di autentica golosità, nel cuore di Alba.</p>
        <div className="hero-actions">
          <a className="button button--caramel" href="#la-pasticceria">Scopri la pasticceria <ArrowDownRight size={17} /></a>
          <a className="button button--ghost-light" href={MAPS_URL} target="_blank" rel="noreferrer">Come arrivare <ArrowUpRight size={17} /></a>
        </div>
      </div>
      <div className="hero-aside" aria-hidden="true"><span>PASTICCERIA GIAMPAOLO</span><i /></div><img className="hero-mark" src={editorialImages.mark} alt="" aria-hidden="true" />
      <a className="hero-scroll" href="#la-pasticceria" aria-label="Scorri alla sezione successiva"><span>Scopri</span><ChevronDown size={17} /></a>
    </section>
  );
}

function About() {
  return (
    <section id="la-pasticceria" className="about section-pad">
      <div className="container about-grid">
        <div className="about-copy reveal">
          <SectionLabel number="01" >La pasticceria</SectionLabel>
          <h2>Una pausa<br /><em>fatta bene.</em></h2>
          <p className="lead">Pasticceria Giampaolo è un punto di riferimento per chi cerca il piacere semplice di una buona pasticceria ad Alba.</p>
          <p>Un invito a rallentare, scegliere qualcosa di buono e concedersi un momento tutto per sé. In negozio, da portare via o da condividere.</p>
          <a className="text-link" href={`tel:${PHONE}`}>Parla con noi <ArrowUpRight size={16} /></a>
        </div>
        <div className="about-image-wrap reveal reveal-delay-1">
          <img src={editorialImages.detail} alt="Dettaglio di un dolce alla crema con glassa al caramello" loading="lazy" />
          <span className="image-note">Una pausa, ad Alba.</span>
        </div>
      </div>
    </section>
  );
}

const categories = [
  { name: "Pasticceria", note: "Piccole creazioni da assaporare", className: "category--large" },
  { name: "Colazione", note: "Il buongiorno che preferisci", className: "category--small" },
  { name: "Torte", note: "Per un momento da celebrare", className: "category--medium" },
  { name: "Specialità stagionali", note: "I sapori del momento", className: "category--small" },
];

function Products() {
  return (
    <section id="specialita" className="products section-pad section-cream">
      <div className="container">
        <div className="section-heading reveal">
          <SectionLabel number="02">Le nostre tentazioni</SectionLabel>
          <div><h2>Da guardare.<br /><em>Da desiderare.</em></h2><p>Una selezione di mondi dolci da scoprire in pasticceria.</p></div>
        </div>
        <div className="category-list">
          {categories.map((category, index) => (
            <a className={`category ${category.className} reveal reveal-delay-${Math.min(index + 1, 3)}`} href={`tel:${PHONE}`} key={category.name}>
              <div className="category-number">0{index + 1}</div>
              <div><h3>{category.name}</h3><p>{category.note}</p></div>
              <ArrowUpRight className="category-arrow" size={21} />
            </a>
          ))}
        </div>
        <p className="editorial-note"><span>*</span> Le immagini e le categorie sono suggestioni editoriali. Per disponibilità e proposte del giorno, contatta direttamente la pasticceria.</p>
      </div>
    </section>
  );
}

function Moments() {
  const moments = [
    { icon: Coffee, title: "Colazione", text: "Comincia la giornata con qualcosa di buono." },
    { icon: Heart, title: "Una pausa dolce", text: "Un momento di piacere da concedersi con calma." },
    { icon: ShoppingBag, title: "Da portare a casa", text: "Il gusto della pasticceria da condividere." },
  ];
  return (
    <section className="moments section-pad">
      <div className="container">
        <div className="moments-header"><SectionLabel number="03">Per ogni momento</SectionLabel><img className="moments-mark" src={editorialImages.mark} alt="" aria-hidden="true" /></div>
        <div className="moments-intro"><div><h2>Piccoli momenti<br /><em>di dolcezza.</em></h2><p className="moments-kicker">La parte migliore della giornata può cominciare da una cosa semplice.</p></div><figure className="moments-image"><img src={editorialImages.home} alt="Scatola di pasticceria con dolci da portare a casa" loading="lazy" /><figcaption>Da condividere, con calma.</figcaption></figure></div>
        <div className="moments-list">
          {moments.map(({ icon: Icon, title, text }, index) => <article className="moment reveal" key={title}><div className="moment-top"><span>0{index + 1}</span><Icon size={20} strokeWidth={1.5} /></div><h3>{title}</h3><p>{text}</p></article>)}
        </div>
      </div>
    </section>
  );
}

function Reviews() {
  return (
    <section id="recensioni" className="reviews section-pad section-cocoa">
      <div className="container reviews-grid">
        <div className="reviews-copy reveal"><SectionLabel number="04">La parola ai clienti</SectionLabel><h2>Chi ci conosce,<br /><em>torna.</em></h2><p>La valutazione riportata su Google racconta la fiducia di chi ci ha scelto.</p><a className="button button--outline-light" href={REVIEWS_URL} target="_blank" rel="noreferrer">Leggi le recensioni su Google <ExternalLink size={16} /></a></div>
        <div className="rating reveal reveal-delay-1"><div className="rating-number">4,5</div><div className="rating-meta"><div className="stars" aria-label="4,5 su 5 stelle"><Star fill="currentColor" size={16} /><Star fill="currentColor" size={16} /><Star fill="currentColor" size={16} /><Star fill="currentColor" size={16} /><Star fill="currentColor" size={16} /></div><strong>/ 5</strong><span>281 recensioni<br />su Google</span></div></div>
      </div>
    </section>
  );
}

function Services() {
  const services = [{ icon: Croissant, title: "Consumazione sul posto", text: "Goditi la tua pausa direttamente in pasticceria." }, { icon: ShoppingBag, title: "Asporto", text: "Porta con te le tue preferenze." }, { icon: MapPin, title: "Consegna a domicilio", text: "Servizio disponibile. Contattaci per informazioni." }];
  return <section className="services section-pad"><div className="container"><SectionLabel number="05">Come vivere la pasticceria</SectionLabel><div className="services-grid">{services.map(({ icon: Icon, title, text }, i) => <article className="service reveal" key={title}><div className="service-icon"><Icon size={21} strokeWidth={1.5} /></div><span>0{i + 1}</span><h3>{title}</h3><p>{text}</p></article>)}</div></div></section>;
}

function Location() {
  return <section id="dove-siamo" className="location section-pad section-cream"><div className="container location-grid"><div className="map-placeholder reveal"><div className="map-lines" /><MapPin size={30} /><span>Alba · CN</span><small>Mappa pronta per il link ufficiale</small></div><div className="location-copy reveal reveal-delay-1"><SectionLabel number="06">Vieni a trovarci</SectionLabel><h2>Nel cuore<br /><em>di Alba.</em></h2><p>Passa in Via Pietrino Belli 39, ad Alba. La tua prossima pausa dolce è più vicina di quanto pensi.</p><address><MapPin size={18} /><span>Via Pietrino Belli, 39<br />12051 Alba (CN), Italia</span></address><a className="button button--dark" href={MAPS_URL} target="_blank" rel="noreferrer">Ottieni indicazioni <ArrowUpRight size={17} /></a><a className="phone-link" href={`tel:${PHONE}`}><Phone size={16} /> 0173 363749</a></div></div></section>;
}

function FinalCta() { return <section className="final-cta"><div className="container final-cta-inner reveal"><p className="eyebrow">Un invito semplice</p><h2>La tua prossima<br /><em>pausa dolce</em> ti aspetta.</h2><p>Passa a trovarci ad Alba.</p><div className="hero-actions"><a className="button button--caramel" href={`tel:${PHONE}`}>Chiama 0173 363749 <Phone size={16} /></a><a className="button button--ghost-light" href={MAPS_URL} target="_blank" rel="noreferrer">Come arrivare <ArrowUpRight size={17} /></a></div></div></section>; }

function Footer() { return <footer className="footer"><div className="container footer-top"><BrandMark /><div className="footer-contact"><p>Via Pietrino Belli, 39<br />12051 Alba (CN)</p><a href={`tel:${PHONE}`}>0173 363749</a></div><div className="footer-links"><a href="#home">Home</a><a href="#la-pasticceria">La Pasticceria</a><a href="#specialita">Specialità</a><a href="#recensioni">Recensioni</a><a href="#dove-siamo">Dove siamo</a></div></div><div className="container footer-bottom"><span>© {new Date().getFullYear()} Pasticceria Giampaolo</span><span>Alba · Piemonte</span><span>Privacy Policy · Cookie Policy</span></div></footer>; }

export default function Home() {
  return <div className="site-shell"><Header /><main><Hero /><About /><Products /><Moments /><Reviews /><Services /><Location /><FinalCta /></main><Footer /><div className="mobile-action-bar"><a href={`tel:${PHONE}`}><Phone size={17} /> Chiama</a><a href={MAPS_URL} target="_blank" rel="noreferrer"><MapPin size={17} /> Mappa</a></div></div>;
}
