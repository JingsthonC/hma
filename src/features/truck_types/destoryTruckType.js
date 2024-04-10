import { redirect } from "react-router-dom";
import apiService from "../../services/apiService";

export async function action({ params }) {
  await apiService.deleteTruckType(params.truckTypeId);
  return redirect("/truck-types");
}
