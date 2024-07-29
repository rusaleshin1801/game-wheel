import styled from "styled-components";

const styles = {
  Container: styled.div`
    position: absolute;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 868px;
    height: 782px;
    top: 124px;
    left: 526px;
    padding: 24px;
    gap: 20px;
    border-radius: 20px;
    background-color: #fff5e6;
  `,
  Time: styled.div`
    width: 129px;
    height: 62px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 12px;
    border: 2px solid #2c2f3f;
    color: #2c2f3f;
    background-color: #f4ebde;
    font-size: 32px;
    margin-bottom: 25px;
  `,

  Clock: styled.div`
    width: 560px;
    height: 560px;
    border: 8px solid black;
    border-radius: 50%;
    position: relative;
  `,

  Arrow: styled.div`
    width: 0;
    height: 0;
    border-left: 20px solid transparent;
    border-right: 20px solid transparent;
    border-top: 40px solid black;
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    z-index: 1000;
  `,
};

export default styles;
