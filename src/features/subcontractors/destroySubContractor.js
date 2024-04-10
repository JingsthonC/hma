import { redirect } from "react-router-dom";
import apiService from "../../services/apiService";

export async function action({ params }) {
  await apiService.deleteSubCon(params.subConId);
  return redirect("/subcons");
}
