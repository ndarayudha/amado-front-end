import classes from "./Card.module.css";

const Card = (props) => {
  return (
    <div
      className={`${classes.card} ${props.className} ${
        props.second ? classes.shadow2 : classes.shadow1
      } ${props.third ? classes.shadow3 : classes.shadow1} ${
        props.fourth ? classes.shadow4 : classes.shadow1
      }`}
    >
      {props.children}
    </div>
  );
};

export default Card;
