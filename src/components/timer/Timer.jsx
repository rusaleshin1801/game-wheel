import React, { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { CircularProgress, Box, Typography } from "@mui/material";
import Zoom from "@mui/material/Zoom";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import IconTimer from "../../assets/icon/IconTimer";
import Icon from "../../assets/icon/Icon";
import IconStars from "../../assets/icon/IconStars";

import styles from "./styles";
import { setTime, setWinner } from "../../store/slices/time";

ChartJS.register(ArcElement, Tooltip, Legend);

const { Container, Time, Clock, Arrow } = styles;

const Timer = () => {
  const dispatch = useDispatch();
  const players = useSelector((state) => state.players);
  const time = useSelector((state) => state.timer.time);
  const winner = useSelector((state) => state.timer.winner);

  const [timerStarted, setTimerStarted] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [, setIsRotating] = useState(false);
  const [ratio, setRatio] = useState(null);
  const chartRef = useRef(null);

  const completedPlayers = players.filter((player) => player.complete);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
  };

  useEffect(() => {
    let timer;
    if (timerStarted && time > 0) {
      timer = setInterval(() => {
        dispatch(setTime(time - 1));
      }, 1000);
    } else if (time === 0) {
      clearInterval(timer);
      setIsFinished(true);
      setIsRotating(true);

      spinWheel();
    }

    return () => clearInterval(timer);
  }, [timerStarted, time, dispatch]);

  useEffect(() => {
    const completedPlayers = players.filter((player) => player.complete).length;

    if (completedPlayers >= 2 && !timerStarted) {
      setTimerStarted(true);
    }
  }, [players, timerStarted]);

  const spinWheel = () => {
    const rotationDegrees = Math.random() * 360 + 720;
    const duration = 10000;
    const startTime = Date.now();

    const animateRotation = () => {
      const elapsedTime = Date.now() - startTime;
      const progress = Math.min(elapsedTime / duration, 1);
      setRotation(rotationDegrees * progress);

      if (progress < 1) {
        requestAnimationFrame(animateRotation);
      } else {
        determineWinner(rotationDegrees);
      }
    };

    animateRotation();
  };

  const determineWinner = (rotationDegrees) => {
    const segmentDegrees = 360 / completedPlayers.length;
    const endAngle = (rotationDegrees % 360) + 90;
    const normalizedAngle = ((endAngle % 360) + 360) % 360;

    const index = Math.floor((normalizedAngle % 360) / segmentDegrees);
    const winnerPlayer = completedPlayers[index];

    if (winnerPlayer) {
      dispatch(setWinner(winnerPlayer.name));
      const winnerTon = parseFloat(winnerPlayer.ton);
      const totalTon = completedPlayers.reduce(
        (sum, player) => sum + parseFloat(player.ton || 0),
        0
      );
      setRatio((totalTon / winnerTon).toFixed(2));
    }
  };

  const progress = ((90 - time) / 90) * 100;

  const totalTon = players
    .filter((player) => player.complete)
    .reduce((sum, player) => sum + parseFloat(player.ton || 0), 0)
    .toFixed(2);

  const colors = [
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

  const data = {
    labels: completedPlayers.map((player) => player.name),
    datasets: [
      {
        data: completedPlayers.map((player) => parseFloat(player.ton)),
        backgroundColor: colors.slice(0, completedPlayers.length),
        spacing: 10,
        borderRadius: 10,
      },
    ],
  };

  const options = {
    maintainAspectRatio: false,
    responsive: true,
    cutout: "75%",
    rotation: rotation,
    animation: {
      duration: 0,
    },
    plugins: {
      tooltip: {
        enabled: true,
        callbacks: {
          label: function (context) {
            const dataIndex = context.dataIndex;
            const player = completedPlayers[dataIndex];
            return `${player.name}: ${player.ton} ${player.percentage}`;
          },
        },
        backgroundColor: "rgba(0, 0, 0, 0.7)",
        titleColor: "#fff",
        bodyColor: "#fff",
      },
      legend: {
        display: false,
      },
    },
  };

  return (
    <Container>
      <Time>{timerStarted ? formatTime(time) : "-:--"}</Time>

      <Box
        sx={{
          position: "relative",
          display: "inline-flex",
          alignItems: "center",
          width: 560,
          height: 560,
        }}
      >
        {isFinished ? (
          <Clock>
            <Arrow />
          </Clock>
        ) : (
          <React.Fragment>
            <CircularProgress
              variant="determinate"
              value={100}
              size={560}
              thickness={0.8}
              sx={{
                color: "#2C2F3F",
                position: "absolute",
                zIndex: 0,
              }}
            />
            <CircularProgress
              variant="determinate"
              value={progress}
              size={560}
              thickness={0.8}
              sx={{
                color: "#a9a9a9",
                position: "absolute",
                zIndex: 1,
                opacity: "4",
              }}
            />
          </React.Fragment>
        )}

        <Zoom in={timerStarted}>
          {!!winner ? (
            <Box
              sx={{
                position: "absolute",
                top: 0,
                left: 0,
                bottom: 0,
                right: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "column",
                gap: "8px",
              }}
            >
              <Typography
                sx={{
                  position: "relative",
                  zIndex: 2,
                  width: "179px",
                  height: "45px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontFamily: "'Poppins', sans-serif",
                  fontSize: "36px",
                  lineHeight: "18px",
                  fontWeight: "600",
                  color: "#2C2F3F",
                  gap: "12px",
                }}
              >
                {winner}
              </Typography>
              <Typography
                sx={{
                  position: "relative",
                  zIndex: 2,
                  color: "#2C2F3F",
                  fontSize: "16px",
                  fontWeight: "400",
                  lineHeight: "18px",
                  fontFamily: "'Poppins', sans-serif",
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                }}
              >
                <Icon /> {totalTon} {ratio ? `${ratio}x WIN` : "Calculating..."}
              </Typography>
              <Typography
                sx={{
                  position: "absolute",
                  top: "50%",
                  transform: "translateY(-50%)",
                  zIndex: 1,
                }}
              >
                <IconStars />
              </Typography>
            </Box>
          ) : (
            <Box
              sx={{
                position: "absolute",
                top: 0,
                left: 0,
                bottom: 0,
                right: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "column",
              }}
            >
              <Typography
                variant="caption"
                component="div"
                color="text.secondary"
                sx={{
                  width: "179px",
                  height: "72px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontFamily: "'Poppins', sans-serif",
                  fontSize: "48px",
                  fontWeight: "600",
                  color: "#2C2F3F",
                  gap: "12px",
                }}
              >
                <IconTimer />
                {totalTon}
              </Typography>
              <Typography
                sx={{
                  color: "#2C2F3F",
                  fontSize: "16px",
                  fontWeight: "600",
                  lineHeight: "18px",
                  fontFamily: "'Poppins', sans-serif",
                }}
              >
                {isFinished ? "Drawing Winner..." : "$1204.56"}
              </Typography>
            </Box>
          )}
        </Zoom>

        <Zoom in={timerStarted}>
          <Box
            sx={{
              position: "absolute",
              width: 500,
              height: 500,
              top: 30,
              left: 30,
            }}
          >
            <Doughnut ref={chartRef} data={data} options={options} />
          </Box>
        </Zoom>
      </Box>
    </Container>
  );
};

export default Timer;
