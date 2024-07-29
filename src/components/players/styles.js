import styled from "styled-components";

const styles = {
  Container: styled.div`
    position: absolute;
    width: 360px;
    height: 919px;
    top: 124px;
    left: 146px;
    padding: 24px;
    gap: 20px;
    border-radius: 20px;
    background-color: #fff5e6;
  `,
  Title: styled.h2`
    width: 120px;
    height: 24px;
    background-color: #fff5e6;
    margin-bottom: 20px;
    font-size: 20px;
    font-weight: 600;
    line-height: 24px;
    color: #2c2f3f;
    font-family: "Poppins", sans-serif;
  `,
  Info: styled.div`
    display: flex;
    align-items: center;
    width: 312px;
    height: 42px;
    gap: 12px;
    background-color: #fff5e6;
    flex-direction: row;
    margin-bottom: 12px;
  `,
};

export default styles;
