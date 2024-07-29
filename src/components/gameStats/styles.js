import styled from "styled-components";

const styles = {
  Container: styled.div`
    position: absolute;
    width: 466px;
    height: 218px;
    top: 124px;
    left: 1414px;
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
    width: 418px;
    height: 126px;
    color: #2c2f3f;
    background-color: #fff5e6;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 20px;
  `,
};

export default styles;
