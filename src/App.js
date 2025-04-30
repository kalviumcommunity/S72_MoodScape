import styled from 'styled-components';

const StyledWrapper = styled.div`
  min-height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: ${props => props.moodColor};
  transition: background-color 0.5s ease;
`; 