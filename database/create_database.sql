USE chercheartisan_trouve_ton_artisan;

DROP TABLE IF EXISTS artisans;
DROP TABLE IF EXISTS specialites;
DROP TABLE IF EXISTS categories;

CREATE TABLE categories (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  nom VARCHAR(80) NOT NULL UNIQUE
) ENGINE=InnoDB;

CREATE TABLE specialites (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  nom VARCHAR(100) NOT NULL,
  categorie_id INT UNSIGNED NOT NULL,
  CONSTRAINT uq_specialite_categorie UNIQUE (nom, categorie_id),
  CONSTRAINT fk_specialite_categorie
    FOREIGN KEY (categorie_id) REFERENCES categories(id)
    ON UPDATE CASCADE ON DELETE RESTRICT
) ENGINE=InnoDB;

CREATE TABLE artisans (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  nom VARCHAR(160) NOT NULL,
  note DECIMAL(2,1) NOT NULL,
  ville VARCHAR(120) NOT NULL,
  a_propos TEXT NOT NULL,
  email VARCHAR(190) NOT NULL,
  site_web VARCHAR(255) NULL,
  top BOOLEAN NOT NULL DEFAULT FALSE,
  specialite_id INT UNSIGNED NOT NULL,
  INDEX idx_artisan_nom (nom),
  INDEX idx_artisan_top (top),
  CONSTRAINT chk_note CHECK (note BETWEEN 0 AND 5),
  CONSTRAINT fk_artisan_specialite
    FOREIGN KEY (specialite_id) REFERENCES specialites(id)
    ON UPDATE CASCADE ON DELETE RESTRICT
) ENGINE=InnoDB;
