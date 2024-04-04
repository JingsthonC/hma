import { redirect } from "react-router-dom";
import apiService from "../../services/apiService";

export async function action({ params }) {
  // throw new Error("oh dang!");
  await apiService.deleteTransaction(params.transactionNumber);
  return redirect("/transactions");
}
