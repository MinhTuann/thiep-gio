export default function LandingPage({ onOpenCard }) {
  return (
    <section className="figma-landing-section animate-fade-in">
      <div className="figma-landing-card">
        <img
          src="/landing-page-floral-decoration-top.png"
          alt=""
          className="landing-floral-top"
        />
        <img
          src="/figma-landing-card.png"
          alt="Thiệp mời lễ giỗ 1 năm Maria Nguyễn Thị Thi, Thứ bảy 11/07/2026"
          className="figma-landing-image"
        />
        <button
          type="button"
          className="figma-open-card-button"
          onClick={onOpenCard}
        >
          Mở thiệp
        </button>
        <img
          src="/landing-page-floral-decoration-bottom.png"
          alt=""
          className="landing-floral-bottom"
        />
      </div>
    </section>
  );
}
