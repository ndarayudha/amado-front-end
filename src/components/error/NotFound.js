import classes from "./NotFound.module.css";
import IcNotFound from "../../asset/ic_not_found.png";

const NotFound = () => {
  return (
    <div className={classes["not-found"]}>
      <img src={IcNotFound} alt="not found" />
      <h2>Page is not found</h2>
    </div>
  );
};

export default NotFound;
