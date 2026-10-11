import { Categorie } from "../models/index.js";
export async function getCategories(req,res,next){
  try { res.json(await Categorie.findAll({ order:[["nom","ASC"]] })); }
  catch(e){ next(e); }
}
