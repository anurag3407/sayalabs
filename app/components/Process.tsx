export default function Process() {
  const steps = [
    {
      number: "01",
      title: "DISCOVERY",
      desc: "We immerse ourselves in your world — understanding your brand, your audience, your goals, and your competitors. Deep research fuels sharp strategy.",
    },
    {
      number: "02",
      title: "STRATEGY",
      desc: "Every great project needs a battle plan. We define the architecture, user flows, technical approach, and creative direction before a single pixel is placed.",
    },
    {
      number: "03",
      title: "CREATION",
      desc: "This is where the forge runs hot. Design and development work in lockstep, crafting experiences that are as beautiful as they are functional.",
    },
    {
      number: "04",
      title: "LAUNCH",
      desc: "Rigorous testing, performance optimization, and a seamless deployment. We don't just launch — we ensure your digital presence hits the ground running.",
    },
  ];

  return (
    <section className="section" id="process">
      <div className="section-kanji">工程</div>

      <div className="container">
        <div className="section-header">
          <div className="section-tag">How We Work</div>
          <h2 className="section-title">OUR PROCESS</h2>
          <p className="section-description">
            A battle-tested methodology refined over years. Four phases that
            transform vision into reality.
          </p>
        </div>

        <div className="process-timeline">
          {steps.map((step, i) => (
            <div key={step.number} className="process-step">
              <div className="process-step-number">{step.number}</div>
              <h3 className="process-step-title">{step.title}</h3>
              <p className="process-step-desc">{step.desc}</p>
              {i < steps.length - 1 && <div className="process-connector" />}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
