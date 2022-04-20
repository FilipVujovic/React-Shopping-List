import { useDispatch } from "react-redux";
import { listActions } from "../global/global-state";

export function useUpdateListAndState(items) {
  const dispatch = useDispatch();
  items.forEach((item) => {
    console.log(item);
    //   fetch(`http://localhost:9000/item/${item._id}`, {
    //     method: "DELETE",
    //   }).then((response) => {});
  });
}
