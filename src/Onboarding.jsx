import bgImg     from './assets/themes/daytime-waterfall/background.png';
import ninjaImg  from './assets/ninja/white-belt/meditating.png';

export default function Onboarding({ onBegin }) {
  return (
    <div className="ob-screen">

      {/* Full-bleed background */}
      <img src={bgImg} alt="" className="ob-bg" />

      {/* Dark gradient at top for title legibility */}
      <div className="ob-top-fade" />

      {/* Title block */}
      <div className="ob-title-block">
        <div className="ob-title-row">
          <span className="ob-arrow ob-arrow-left">→</span>
          <span className="ob-title-focus">FOCUS</span>
          <span className="ob-arrow ob-arrow-right">←</span>
        </div>
        <div className="ob-title-dojo">DOJO</div>
        <p className="ob-subtitle">
          Enter the dojo.<br />Protect your focus.
        </p>
      </div>

      {/* Ninja */}
      <div className="ob-ninja-wrap">
        <img src={ninjaImg} alt="Meditating ninja" className="ob-ninja" />
      </div>

      {/* Bottom card */}
      <div className="ob-card">
        <p className="ob-card-text">
          Start a focus session,<br />
          protect your attention,<br />
          and build discipline<br />
          one minute at a time.
        </p>
        <button className="ob-btn-primary" onClick={onBegin}>
          BEGIN TRAINING
        </button>
        <p className="ob-signin">
          Already training?{' '}
          <span className="ob-signin-link" onClick={onBegin}>Sign in</span>
        </p>
      </div>
    </div>
  );
}
