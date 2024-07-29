import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { TextField, Button, InputAdornment } from "@mui/material";
import {
  updatePlayer,
  addPlayer,
  validatePlayers,
  removeIncompletePlayers,
} from "../../store/slices/state";
import Icon from "../../assets/icon/Icon";
import styles from "./styles";

const { Container, Title, Info } = styles;

const Players = () => {
  const dispatch = useDispatch();
  const players = useSelector((state) => state.players);
  const time = useSelector((state) => state.timer.time);
  const maxPlayers = 10;

  useEffect(() => {
    if (time === 0) {
      dispatch(removeIncompletePlayers());
    }
  }, [time, dispatch]);

  useEffect(() => {
    const completePlayers = players.filter((player) => player.complete);
    const totalTon = completePlayers.reduce(
      (total, player) => total + parseFloat(player.ton || 0),
      0
    );

    if (totalTon > 0) {
      players.forEach((player, index) => {
        if (player.complete) {
          const percentage = (
            (parseFloat(player.ton) / totalTon) *
            100
          ).toFixed(0);
          dispatch(
            updatePlayer({ index, key: "percentage", value: percentage })
          );
        } else {
          dispatch(updatePlayer({ index, key: "percentage", value: 0 }));
        }
      });
    } else {
      players.forEach((player, index) => {
        dispatch(updatePlayer({ index, key: "percentage", value: 0 }));
      });
    }
  }, [players, dispatch]);

  const handleNameChange = (index, event) => {
    dispatch(updatePlayer({ index, key: "name", value: event.target.value }));
    if (event.target.value === "" || players[index].ton === "") {
      dispatch(updatePlayer({ index, key: "complete", value: false }));
    }
    dispatch(validatePlayers());
  };

  const handleTonChange = (index, event) => {
    let newValue = event.target.value;
    newValue = newValue.replace(/,/g, ".");
    const validValue = newValue.replace(/[^0-9.]/g, "");
    dispatch(updatePlayer({ index, key: "ton", value: validValue }));
    if (validValue === "" || players[index].name === "") {
      dispatch(updatePlayer({ index, key: "complete", value: false }));
    }
    dispatch(validatePlayers());
  };

  const addPlayerField = (index) => {
    if (players.length < maxPlayers) {
      dispatch(addPlayer(index));
    }
  };

  const colors = [
    "rgba(218, 72, 182, 0.1)",
    "rgba(47, 195, 191, 0.1)",
    "rgba(236, 85, 64, 0.1)",
    "rgba(246, 155, 32, 0.1)",
    "rgba(33, 198, 86, 0.1)",
    "rgba(215, 49, 29, 0.1)",
    "rgba(223, 48, 85, 0.1)",
    "rgba(24, 153, 201, 0.1)",
    "rgba(143, 63, 223, 0.1)",
    "rgba(89, 45, 210, 0.1)",
  ];

  const colorsBorder = [
    "#DA48B6",
    "#2FC3BF",
    "#EC5540",
    "#F69B20",
    "#21C656",
    "#D7311D",
    "#DF3055",
    "#1899C9",
    "#8F3FDF",
    "#592DD2",
  ];

  return (
    <Container>
      <Title>{players.length} players</Title>

      {players.map((player, index) => (
        <Info key={index}>
          <TextField
            id={`name-input-${index}`}
            variant="outlined"
            placeholder="Enter name"
            value={player.name}
            onChange={(event) => handleNameChange(index, event)}
            sx={{
              width: "140px",
              "& .MuiOutlinedInput-root": {
                backgroundColor: colors[index % colors.length],
                "& fieldset": {
                  borderColor: colorsBorder[index % colors.length],
                },
                "&:hover fieldset": {
                  borderColor: colorsBorder[index % colors.length],
                },
                "&.Mui-focused fieldset": {
                  borderColor: colorsBorder[index % colors.length],
                },
                height: "42px",
              },
              "& .MuiInputBase-input": {
                color: "#2C2F3F",
                height: "100%",
                boxSizing: "border-box",
                fontSize: "16px",
                fontWeight: 400,
              },
              "& .MuiInputBase-input::placeholder": {
                color: colorsBorder[index % colors.length],
                fontSize: "16px",
              },
            }}
          />
          <TextField
            id={`ton-input-${index}`}
            variant="outlined"
            placeholder="TON"
            value={player.ton}
            onChange={(event) => handleTonChange(index, event)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Icon />
                </InputAdornment>
              ),
            }}
            sx={{
              width: "102px",
              "& .MuiOutlinedInput-root": {
                backgroundColor: colors[index % colors.length],
                "& fieldset": {
                  borderColor: colorsBorder[index % colors.length],
                },
                "&:hover fieldset": {
                  borderColor: colorsBorder[index % colors.length],
                },
                "&.Mui-focused fieldset": {
                  borderColor: colorsBorder[index % colors.length],
                },
                height: "42px",
              },
              "& .MuiInputBase-input": {
                color: "#2C2F3F",
                height: "100%",
                boxSizing: "border-box",
                fontSize: "16px",
                fontWeight: 400,
              },
              "& .MuiInputBase-input::placeholder": {
                color: colorsBorder[index % colors.length],
                fontSize: "16px",
              },
            }}
          />
          {players.length >= maxPlayers && index === maxPlayers - 1 ? (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "68px",
                height: "42px",
                fontSize: "16px",
                fontWeight: "500",
                lineHeight: "18px",
                borderRadius: "4px",
                backgroundColor: colors[index % colors.length],
                border: `1px solid ${colorsBorder[index % colors.length]}`,
              }}
            >
              {player.percentage}%
            </div>
          ) : (
            <>
              {!player.complete ? (
                <Button
                  size="small"
                  variant="contained"
                  onClick={() => addPlayerField(index)}
                  disabled={!player.name || !player.ton}
                  sx={{
                    backgroundColor: colorsBorder[index % colors.length],
                    "&:hover": {
                      backgroundColor: colorsBorder[index % colors.length],
                    },
                    fontSize: "20px",
                    width: "68px",
                    height: "42px",
                    padding: 0,
                    minWidth: "0",
                    minHeight: "0",
                  }}
                  style={{
                    textTransform: "none",
                  }}
                >
                  +
                </Button>
              ) : (
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: "68px",
                    height: "42px",
                    fontSize: "16px",
                    fontWeight: "500",
                    lineHeight: "18px",
                    borderRadius: "4px",
                    backgroundColor: colors[index % colors.length],
                    border: `1px solid ${colorsBorder[index % colors.length]}`,
                  }}
                >
                  {player.percentage}%
                </div>
              )}
            </>
          )}
        </Info>
      ))}
    </Container>
  );
};

export default Players;
