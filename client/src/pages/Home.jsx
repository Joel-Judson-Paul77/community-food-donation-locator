import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../api.js';
import { useAuth } from '../context/AuthContext.jsx';
import DonationCard from '../components/DonationCard.jsx';
import HeroBackground from '../components/HeroBackground.jsx';
import { ArrowIcon, CheckIcon, PinIcon, UploadIcon } from '../components/Icons.jsx';
import { CATEGORIES } from '../utils/constants.js';

const STEPS = [
  {
    Icon: UploadIcon,
    title: 'Post surplus',
    text: 'Restaurants, stores, caterers and households list extra food with a pickup window and a pin on the map.',
  },
  {
    Icon: PinIcon,
    title: 'Discover nearby',
    text: 'NGOs, shelters and neighbours search a live map of what’s available within walking or driving distance.',
  },
  {
    Icon: CheckIcon,
    title: 'Request & collect',
    text: 'Recipients request what they need. Donors approve, contact details are shared, and the food is handed over.',
  },
];

const IMPACT = [
  ['availableNow', 'Available now'],
  ['itemsShared', 'Items shared'],
  ['donors', 'Active donors'],
  ['recipients', 'Recipients & NGOs'],
];

export default function Home() {
  const { user } = useAuth();
  const [stats, setStats] = useState(null);
  const [latest, setLatest] = useState([]);

  useEffect(() => {
    api('/stats/public').then(setStats).catch(() => {});
    api('/donations', { query: { limit: 6, sort: 'expiring' } })
      .then((d) => setLatest(d.items))
      .catch(() => {});
  }, []);

  const donateLink = user?.role === 'donor' ? '/donate' : user ? '/dashboard' : '/register?role=donor';

  return (
    <>
      <section className="hero">
        <HeroBackground />
        <div className="container hero-inner">
          <span className="eyebrow">Community food rescue</span>
          <h1 className="hero-title">
            Good food should feed people,
            <span className="fade-text">not landfills.</span>
          </h1>
          <p className="lead">
            FoodShare connects surplus food from kitchens, stores and homes with the shelters, NGOs and neighbours
            who need it, on a live map of what’s available near you.
          </p>
          <div className="btn-row hero-actions">
            <Link to="/browse" className="btn btn-primary btn-lg">Find food near me</Link>
            <Link to={donateLink} className="btn btn-ghost btn-lg">Donate surplus</Link>
          </div>
        </div>

        <div className="hero-strip">
          <span className="mono-label">
            Rescuing
            <br />
            every day
          </span>
          <div className="marquee">
            <div className="marquee-track">
              {[...CATEGORIES, ...CATEGORIES].map((c, i) => (
                <span key={i} aria-hidden={i >= CATEGORIES.length}>{c.label}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="container section">
        <div className="impact">
          {IMPACT.map(([key, label]) => (
            <div key={key} className="impact-item">
              <div className="impact-num">{stats ? stats[key] : '–'}</div>
              <div className="mono-label">{label}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="container section">
        <div className="section-head">
          <div>
            <span className="eyebrow">Pick up soon</span>
            <h2>Food that needs a home today.</h2>
          </div>
          <Link to="/browse" className="btn btn-ghost btn-sm">
            Open live map <ArrowIcon size={15} />
          </Link>
        </div>
        {latest.length ? (
          <div className="card-grid">
            {latest.map((d) => <DonationCard key={d._id} donation={d} />)}
          </div>
        ) : (
          <p className="muted">No food listed right now. Check back soon.</p>
        )}
      </section>

      <section className="container section">
        <div className="center">
          <span className="eyebrow">How it works</span>
          <h2>From surplus to supper in three steps.</h2>
        </div>
        <div className="steps">
          {STEPS.map(({ Icon, title, text }, i) => (
            <div key={title} className="step card glow">
              <div className="icon-box"><Icon /></div>
              <span className="step-num">0{i + 1}</span>
              <h3>{title}</h3>
              <p className="muted">{text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="container section">
        <span className="eyebrow">Categories</span>
        <h2 className="display">
          We rescue every
          <br />
          kind of food.
        </h2>
        <p className="muted lead-sm">
          Cooked meals, bakery, fresh produce, dairy, staples and more. If it’s safe to eat, it shouldn’t be thrown away.
        </p>
        <div className="category-pills">
          {CATEGORIES.map((c) => (
            <Link key={c.value} to={`/browse?category=${c.value}`} className="mono-pill">
              {c.label}
            </Link>
          ))}
        </div>
      </section>

      {!user && (
        <section className="container section">
          <div className="cta card glow">
            <span className="eyebrow">Join the network</span>
            <h2>Ready to make a difference?</h2>
            <p className="muted">Join as a donor to share surplus, or as a recipient to find food near you.</p>
            <div className="btn-row hero-actions">
              <Link to="/register?role=donor" className="btn btn-primary">I have food to give</Link>
              <Link to="/register?role=recipient" className="btn btn-ghost">I’m looking for food</Link>
            </div>
          </div>
        </section>
      )}
    </>
  );
}
