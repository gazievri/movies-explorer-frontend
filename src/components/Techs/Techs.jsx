import "./Techs.css";

const Techs = () => {
  return (
    <section className="techs" id="techs">
      <div className="techs__wrapper">
        <h2 className="techs__title">Технологии</h2>
        <h3 className="techs__subtitle">7 технологий</h3>
        <p className="techs__text">
          На курсе веб-разработки мы освоили технологии, которые применили в
          дипломном проекте.
        </p>
        <ul className="techs__list">
          <li className="techs__item">
            <a
              className="techs__link"
              target="_blank"
              href="https://html.com/"
              rel="noreferrer"
            >
              HTML
            </a>
          </li>
          <li className="techs__item">
            <a
              className="techs__link"
              target="_blank"
              href="https://www.w3.org/Style/CSS/Overview.en.html"
              rel="noreferrer"
            >
              CSS
            </a>
          </li>
          <li className="techs__item">
            <a
              className="techs__link"
              target="_blank"
              href="https://www.javascript.com/"
              rel="noreferrer"
            >
              JS
            </a>
          </li>
          <li className="techs__item">
            <a
              className="techs__link"
              target="_blank"
              href="https://reactjs.org/"
              rel="noreferrer"
            >
              React
            </a>
          </li>
          <li className="techs__item">
            <a
              className="techs__link"
              target="_blank"
              href="hhttps://git-scm.com/"
              rel="noreferrer"
            >
              Git
            </a>
          </li>
          <li className="techs__item">
            <a
              className="techs__link"
              target="_blank"
              href="https://expressjs.com/"
              rel="noreferrer"
            >
              Express.js
            </a>
          </li>
          <li className="techs__item">
            <a
              className="techs__link"
              target="_blank"
              href="https://www.mongodb.com/"
              rel="noreferrer"
            >
              mongoDB
            </a>
          </li>
        </ul>
      </div>
    </section>
  );
};

export default Techs;
