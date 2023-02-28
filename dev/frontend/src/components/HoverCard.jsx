import { Card, styled } from "@mui/material";

const HoverCard = styled(Card)`
  width: 310px;
  height: 310px;
  border-radius: 10px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
  transition: 0.3s;
  &:hover {
    cursor: pointer;
    transform: translate(0, -10px);
  }
`;

export default HoverCard;
