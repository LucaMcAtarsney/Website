const EDUCATION = {
  degree: "BSc Computer Science (Digital & Technology Solutions)",
  institution: "University of Leeds",
  years: "2022 – 2026",
  result: "First-Class Honours",
};

const DISSERTATION = {
  title: "AlphaSantorini",
  summary:
    "An AlphaZero-inspired framework for the board game Santorini: seven agents from classical baselines and Minimax to a neural-network-guided MCTS, with a PyTorch policy/value network trained via self-play on the Leeds HPC cluster. Graded First.",
  href: "", // optional: link to PDF or write-up
};

const INTERESTS = [
  "full-stack web",
  "machine learning",
  "game development",
  "computer art",
  "3D graphics",
];

export function Profile() {
  return (
    <section id="profile">
      <h2 className="section-label">~/profile</h2>

      <div className="profile">
        <div className="profile-row">
          <div className="profile-key">education</div>
          <div className="profile-val">
            <p>
              {EDUCATION.degree}, {EDUCATION.institution}
            </p>
            <p className="profile-sub">
              {EDUCATION.years} · {EDUCATION.result}
            </p>
          </div>
        </div>

        <div className="profile-row">
          <div className="profile-key">dissertation</div>
          <div className="profile-val">
            <p>
              {DISSERTATION.href ? (
                <a href={DISSERTATION.href} target="_blank" rel="noreferrer">
                  {DISSERTATION.title}
                </a>
              ) : (
                DISSERTATION.title
              )}
            </p>
            <p className="profile-sub">{DISSERTATION.summary}</p>
          </div>
        </div>

        <div className="profile-row">
          <div className="profile-key">interests</div>
          <div className="profile-val">
            <div className="tags">
              {INTERESTS.map((item) => (
                <span key={item} className="tag">
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="profile-row">
          <div className="profile-key">cv</div>
          <div className="profile-val">
            <p>
              <a href="/cv.pdf" target="_blank" rel="noreferrer">
                download (pdf)
              </a>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
