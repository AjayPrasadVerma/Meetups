import { useRouter } from "next/router";
import Card from "../ui/Card";
import classes from "./MeetupItem.module.css";

function MeetupItem(props) {
  const router = useRouter();

  /**
   * @useRouter
   * useRouter proved list object through we can perform varoius operation like
   * (1) (router.query.your_id) to get the dynamic link parameters
   * (2) (router.push) through it push new page on stack of page it is eqivalent to 'Link'
   */

  function showDetailsHandler() {
    router.push("/" + props.id);
  }

  return (
    <li className={classes.item}>
      <Card>
        <div className={classes.image}>
          <img src={props.image} alt={props.title} />
        </div>
        <div className={classes.content}>
          <h3>{props.title}</h3>
          <address>{props.address}</address>
        </div>
        <div className={classes.actions}>
          <button onClick={showDetailsHandler}>Show Details</button>
        </div>
      </Card>
    </li>
  );
}

export default MeetupItem;
