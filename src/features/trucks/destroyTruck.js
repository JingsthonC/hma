import { redirect } from "react-router-dom";
import apiService from "../../services/apiService";

export async function action({ params }) {
  await apiService.deleteTruck(params.truckId);
  return redirect("/trucks");
}
