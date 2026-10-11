
import { Op } from "sequelize";
import { Artisan, Specialite, Categorie } from "../models/index.js";

const include = [
  {
    model: Specialite,
    attributes: ["id", "nom"],
    include: [
      {
        model: Categorie,
        attributes: ["id", "nom"]
      }
    ]
  }
];

export async function getArtisans(req, res, next) {
  try {
    const { category, search } = req.query;

    const term = String(search || "").trim().slice(0, 100);

    const where = {};

    if (term) {
      where[Op.or] = [
        { nom: { [Op.like]: `%${term}%` } },
        { ville: { [Op.like]: `%${term}%` } },
        {
          "$Specialite.nom$": {
            [Op.like]: `%${term}%`
          }
        }
      ];
    }

    const result = await Artisan.findAll({
      where,
      include: [
        {
          model: Specialite,
          attributes: ["id", "nom"],
          required: Boolean(category),
          include: [
            {
              model: Categorie,
              attributes: ["id", "nom"],
              where: category
                ? { nom: category }
                : undefined,
              required: Boolean(category)
            }
          ]
        }
      ],
      order: [["nom", "ASC"]]
    });

    res.json(result);
  } catch (error) {
    next(error);
  }
}

export async function getTopArtisans(req, res, next) {
  try {
    const result = await Artisan.findAll({
      where: { top: true },
      include,
      order: [["note", "DESC"]]
    });

    res.json(result);
  } catch (error) {
    next(error);
  }
}

export async function getArtisan(req, res, next) {
  try {
    const artisan = await Artisan.findByPk(
      req.params.id,
      { include }
    );

    if (!artisan) {
      return res.status(404).json({
        message: "Artisan introuvable."
      });
    }

    res.json(artisan);
  } catch (error) {
    next(error);
  }
}
