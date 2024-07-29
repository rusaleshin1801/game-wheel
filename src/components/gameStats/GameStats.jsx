import React from "react";
import styles from "./styles";

const { Container, Title, Info } = styles;

const GameStats = () => {
  const bet = [
    { prize: 21.3, desc: "Prize Pool" },
    { prize: 21.3, desc: "Min bet" },
    { prize: 21.3, desc: "Number of Players" },
    { prize: 21.3, desc: "Max bet" },
  ];

  const iconsRequired = ["Prize Pool", "Number of Players"];

  return (
    <Container>
      <Title>Game Stats</Title>
      <Info>
        {bet.map((item) => (
          <div
            key={item.desc}
            style={{
              display: "flex",
              flexDirection: "column",
              width: "146px",
              height: "51px",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              {iconsRequired.includes(item.desc) && (
                <i>
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 18 18"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <rect width="18" height="18" rx="9" fill="#2C2F3F" />
                  </svg>
                </i>
              )}
              <h2
                style={{
                  lineHeight: "28px",
                  fontSize: "24px",
                  fontWeight: "400",
                  color: "#2C2F3F",
                }}
              >
                {item.prize}
              </h2>
            </div>
            <div>
              <p
                style={{
                  lineHeight: "19.2px",
                  fontSize: "16px",
                  fontWeight: "400",
                  color: "#2C2F3F",
                }}
              >
                {item.desc}
              </p>
            </div>
          </div>
        ))}
      </Info>
    </Container>
  );
};

export default GameStats;
