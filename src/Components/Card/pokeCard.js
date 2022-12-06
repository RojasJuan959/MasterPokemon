import "./pokeCard.css";

const pokeCard = ({
  name,
  sprites,
  hp,
  attack,
  defense,
  specialAttack,
  specialDefense,
  speed,
  type,
}) => {
  return (
    <div className="baseCard" id={type}>
      <div className="cardNameSection">
        <p className="nameSectionTitle">{name}</p>
      </div>
      <div className="cardSpriteSection">
        <span className="spriteSection">
          <img
            className="spriteImage"
            src={sprites}
            alt="PokeIMG"
          ></img>
        </span>
      </div>
      <span className="cardLineSeparator"></span>
      <div className="cardStatsSection">
        <div className="statsSectionN1">
          <div className="statsSectionN11">
            <p className="statsName">HP</p>
            <div className="statsBarContainer">
              <div
                className="statsBarFill"
                style={{
                  width: `calc((100% * ${hp}) / 260)`,
                  backgroundColor: "green",
                }}
              ></div>
            </div>
            <p className="statsName">{hp}/260</p>
          </div>
          <div className="statsSectionN12">
            <p className="statsName">Attack</p>
            <div className="statsBarContainer">
              <div
                className="statsBarFill"
                style={{
                  width: `calc((100% * ${attack}) / 200)`,
                  backgroundColor: "red",
                }}
              ></div>
            </div>
            <p className="statsName">{attack}/200</p>
          </div>
        </div>
        <div className="statsSectionN2">
          <div className="statsSectionN21">
            <p className="statsName">Special-Attack</p>
            <div className="statsBarContainer">
              <div
                className="statsBarFill"
                style={{
                  width: `calc((100% * ${specialAttack}) / 200)`,
                  backgroundColor: "brown",
                }}
              ></div>
            </div>
            <p className="statsName">{specialAttack}/200</p>
          </div>
          <div className="statsSectionN22">
            <p className="statsName">Speed</p>
            <div className="statsBarContainer">
              <div
                className="statsBarFill"
                style={{
                  width: `calc((100% * ${speed}) / 200)`,
                  backgroundColor: "darkorange",
                }}
              ></div>
            </div>
            <p className="statsName">{speed}/200</p>
          </div>
        </div>
        <div className="statsSectionN3">
          <div className="statsSectionN31">
            <p className="statsName">Special-Defense</p>
            <div className="statsBarContainer">
              <div
                className="statsBarFill"
                style={{
                  width: `calc((100% * ${specialDefense}) / 260)`,
                  backgroundColor: "darkcyan",
                }}
              ></div>
            </div>
            <p className="statsName">{specialDefense}/260</p>
          </div>
          <div className="statsSectionN32">
            <p className="statsName">Defense</p>
            <div className="statsBarContainer">
              <div
                className="statsBarFill"
                style={{
                  width: `calc((100% * ${defense}) / 260)`,
                  backgroundColor: "blue",
                }}
              ></div>
            </div>
            <p className="statsName">{defense}/260</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default pokeCard;
