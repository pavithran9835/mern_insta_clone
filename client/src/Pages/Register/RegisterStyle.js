import styled from "styled-components";

export const RegisterContainer = styled.div`
  width: 100%;
  height: auto;
  /* background-color: #fafafa; */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  overflow: hidden;

  p {
    margin-top: 10px;
  }
`;

export const RegisterLeft = styled.div`
  width: 50%;
  height: auto;
`;
export const RegisterRight = styled.div`
  width: 50%;
  height: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const Havaccount = styled.div`
  width: 320px;
  height: auto;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  padding: 30px;
  margin-top: 10px;

  a {
    color: #0095f6;
  }
`;

export const StoreImages = styled.div`
  width: 350px;
  display: flex;
  justify-content: space-between;
  margin-top: 20px;

  img {
    width: 45%;
    object-fit: contain;
  }
`;

export const ListPages = styled.div`
  width: 550px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  margin-top: 25px;

  li {
    list-style-type: none;
    margin: 5px 10px;
    font-size: 13px;
  }
`;
