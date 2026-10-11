import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { api } from "../services/api";
import ArtisanCard from "../components/ArtisanCard";

export default function Artisans() {
  const { category } = useParams();
  const [params] = useSearchParams();
  const search = params.get("search") || "";
  const [artisans, setArtisans] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    api.artisans({ category, search }).then(setArtisans).finally(()=>setLoading(false));
  }, [category, search]);

  const title = search ? `Résultats pour « ${search} »` : category ? `Artisans — ${category}` : "Tous les artisans";
  return (
    <section className="container section">
      <p className="eyebrow">Annuaire régional</p>
      <h1>{title}</h1>
      {loading ? <p>Chargement…</p> :
       artisans.length === 0 ? <div className="empty-state"><h2>Aucun artisan trouvé</h2><p>Essayez une autre recherche ou une autre catégorie.</p></div> :
       <div className="row g-4 mt-2">{artisans.map(a=><div className="col-md-6 col-lg-4" key={a.id}><ArtisanCard artisan={a}/></div>)}</div>}
    </section>
  );
}
