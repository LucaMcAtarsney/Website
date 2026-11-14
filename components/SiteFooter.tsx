export function SiteFooter() {
  return (
    <footer className="foot">
      <a href="mailto:lucamc1604@gmail.com">contact</a>
      <a href="https://github.com/LucaMcAtarsney" target="_blank" rel="noreferrer">
        github
      </a>
      <span className="foot-copy">© {new Date().getFullYear()} Luca McAtarsney</span>
    </footer>
  );
}
