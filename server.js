var express = require("express");
require("dotenv").config();
var PORT = process.env.PORT || 2000;
var cors = require("cors");
var mysql = require("mysql");
var connection;
var dbhost = process.env.DB_HOST || "localhost";
var dbuser = process.env.DB_USER || "root";
var dbpassword = process.env.DB_PASSWORD || "";
var dbname = process.env.DB_NAME || "fae_database";
var dev_database_url =
  "mysql://" + dbuser + ":" + dbpassword + "@" + dbhost + "/" + dbname;
const fs = require("fs");
const app = express();

function handleMysqlContext() {
  connection = mysql.createConnection(
    process.env.CLEARDB_DATABASE_URL || dev_database_url
  );
  connection.connect(function (err) {
    if (err) {
      console.log("error when connecting to db:", err);
      setTimeout(handleMysqlContext, 2000);
    }
  });
  connection.on("error", function (err) {
    console.log("db error", err);
    if (err.code === "PROTOCOL_CONNECTION_LOST") {
      // Connection to the MySQL server is usually
      handleMysqlContext(); // lost due to either server restart, or a
    } else {
      // connnection idle timeout (the waittimeout
      throw err; // server variable configures this)
    }
  });
}

handleMysqlContext();

app.use(cors({ origin: "*" }));
app.use(express.urlencoded());
app.use(express.json());

app.listen(PORT, () => {
  console.log(`le serveur est lancé sur le port: ${PORT}`);
});

// recherche annonces
app.get("/search/annonces", function (req, res) {
  var query = "SELECT * from annonces";
  try {
    connection.query(query, function (error, results, fields) {
      if (error) throw error;
      res.send(JSON.stringify(results));
    });
  } catch (error) {
    console.log(error);
  }
});

// recherche annonces par categorie
app.get("/search/annonces/categorie", function (req, res) {
  var params = req.query;
  var query =
    "SELECT * from annonces where IDCategorie =" +
    connection.escape(params.IDCate);
  try {
    connection.query(query, function (error, results, fields) {
      if (error) throw error;
      res.send(JSON.stringify(results));
    });
  } catch (error) {
    console.log(error);
  }
});

// recherche annonces avec texte
app.get("/search/annonces/recherche", function (req, res) {
  var params = req.query;
  var query = "SELECT * from annonces where Titre LIKE '%" + params.Texte;
  query += "%'";
  try {
    connection.query(query, function (error, results, fields) {
      if (error) throw error;
      res.send(JSON.stringify(results));
    });
  } catch (error) {
    console.log(error);
  }
});

// recherche annonces avec texte et categorie
app.get("/search/annonces/rechcate", function (req, res) {
  var params = req.query;
  var query = "SELECT * from annonces where Titre LIKE '%" + params.Texte;
  query += "%' AND IDCategorie =" + connection.escape(params.IDCate);
  try {
    connection.query(query, function (error, results, fields) {
      if (error) throw error;
      res.send(JSON.stringify(results));
    });
  } catch (error) {
    console.log(error);
  }
});

// recherche categories
app.get("/search/categories", function (req, res) {
  var query = "SELECT * from categories";
  try {
    connection.query(query, function (error, results, fields) {
      if (error) throw error;
      res.send(JSON.stringify(results));
    });
  } catch (error) {
    console.log(error);
  }
});

// formulaire d'inscription
app.post("/inscription", function (req, res) {
  var params = req.body;
  var userID;
  if (params.Birthdate == "") {
    delete params.Birthdate;
  }
  if (params.Confirm) {
    delete params.Confirm;
  }
  try {
    connection.query(
      "SELECT MAX(IDUtilisateur) AS IDUser from utilisateurs",
      function (error, results, fields) {
        if (error) throw error;
        userID = results[0].IDUser;
        connection.query(
          "INSERT INTO `utilisateurs` SET IDUtilisateur = " +
            (userID + 1) +
            ", IDHistorique = " +
            (userID + 1) +
            ", ?",
          params,
          function (error, results, fields) {
            if (error) throw error;
            res.status(204).send();
          }
        );
      }
    );
  } catch (error) {
    console.log(error);
  }
});

// formulaire de connexion
app.post("/connexion", function (req, res) {
  var params = req.body;
  try {
    connection.query(
      "SELECT IDUtilisateur, IDAdmin from utilisateurs WHERE Email='" +
        params.Email +
        "' AND password='" +
        params.Password +
        "'",
      function (error, results, fields) {
        if (error) throw error;
        res.send(JSON.stringify(results));
      }
    );
  } catch (error) {
    console.log(error);
  }
});

// recherche utilisateur
app.get("/search/utilisateur", function (req, res) {
  var params = req.query;
  var query =
    "SELECT * from utilisateurs where IDUtilisateur =" +
    connection.escape(params.IDUtilisateur);
  try {
    connection.query(query, function (error, results, fields) {
      if (error) throw error;
      res.send(JSON.stringify(results));
    });
  } catch (error) {
    console.log(error);
  }
});

// recherche detail
app.get("/search/detail", function (req, res) {
  var params = req.query;
  var query =
    "SELECT * from annonces where IDAnnonce =" +
    connection.escape(params.IDAnnonce);
  try {
    connection.query(query, function (error, results, fields) {
      if (error) throw error;
      res.send(JSON.stringify(results));
    });
  } catch (error) {
    console.log(error);
  }
});

// enchere offre
app.get("/encherir", function (req, res) {
  var params = req.query;
  var query =
    "UPDATE annonces set Enchere =" +
    params.Enchere +
    ", IDAcheteur = " +
    params.IDUtilisateur +
    " where IDAnnonce =" +
    params.IDAnnonce;
  try {
    connection.query(query, function (error, results, fields) {
      if (error) throw error;
      res.status(204).send();
    });
  } catch (error) {
    console.log(error);
  }
});

// achat immédiat offre
app.get("/achim", function (req, res) {
  var params = req.query;
  var IDAnnonce = params.IDAnnonce;
  var IDUtilisateur = params.IDUtilisateur;
  var query = "UPDATE annonces SET IDAcheteur = "+IDUtilisateur+" WHERE IDAnnonce = '" + IDAnnonce + "';";
  try {
    connection.query(query, function (error, results, fields) {
      if (error) throw error;
      var query = "INSERT INTO historiques SELECT * FROM annonces WHERE IDAnnonce = '" + IDAnnonce + "';";
      connection.query(query, function (error, results, fields) {
        if (error) throw error;
        query =
          " DELETE FROM annonces where IDAnnonce = '" + IDAnnonce + "';";
        connection.query(query, function (error, results, fields) {
          if (error) throw error;
          res.status(204).send();
        });
      });
    });   
  } catch (error) {
    console.log(error);
  }
});

// formulaire poster une annonce
app.post("/poster", function (req, res) {
  var params = req.body;
  var IDAnnonce1;
  var IDAnnonce2;
  var IDAnnonce;
  try {
    connection.query(
      "SELECT MAX(IDAnnonce) AS IDAnnonce from annonces",
      function (error, results, fields) {
        if (error) throw error;
        IDAnnonce1 = results[0].IDAnnonce;
        connection.query(
          "SELECT MAX(IDAnnonce) AS IDAnnonce from historiques",
          function (error, results, fields) {
            if (error) throw error;
            IDAnnonce2 = results[0].IDAnnonce;
            IDAnnonce = Math.max(IDAnnonce1, IDAnnonce2);
            connection.query(
              "INSERT INTO `annonces` SET DateCrea=NOW(), IDAnnonce = " +
                (IDAnnonce + 1) +
                ", IDUtilisateur = " +
                params.IDUtilisateur +
                ",Image='" +
                params.Image +
                "', ?",
              params.Annonce,
              function (error, results, fields) {
                if (error) throw error;
                res.status(204).send();
              }
            );
          }
        );
      }
    );
  } catch (error) {
    console.log(error);
  }
});

// recherche historique
app.get("/historique", function (req, res) {
  var params = req.query;
  try {
    connection.query(
      "SELECT * from historiques where IDUtilisateur =" + params.IDUtilisateur,
      function (error, results, fields) {
        if (error) throw error;
        var vend = JSON.stringify(results);
        connection.query(
          "SELECT * from historiques where IDAcheteur =" + params.IDUtilisateur,
          function (error, results, fields) {
            if (error) throw error;
            var ach = JSON.stringify(results);
            connection.query(
              "SELECT * from annonces where IDUtilisateur =" +
                params.IDUtilisateur,
              function (error, results, fields) {
                if (error) throw error;
                var vent = JSON.stringify(results);
                connection.query(
                  "SELECT * from annonces where IDAcheteur =" +
                    params.IDUtilisateur,
                  function (error, results, fields) {
                    if (error) throw error;
                    var enc = JSON.stringify(results);
                    res.send({
                      vendues: vend,
                      achetees: ach,
                      vente: vent,
                      enchere: enc,
                    });
                  }
                );
              }
            );
          }
        );
      }
    );
  } catch (error) {
    console.log(error);
  }
});

// recherche liste utilisateurs
app.get("/search/utilisateurs", function (req, res) {
  var params = req.query;
  var query =
    "SELECT * FROM utilisateurs WHERE NOT IDUtilisateur= " +
    params.IDUtilisateur;
  try {
    connection.query(query, function (error, results, fields) {
      if (error) throw error;
      res.send(JSON.stringify(results));
    });
  } catch (error) {
    console.log(error);
  }
});

// supprimer categorie
app.get("/delete/categorie", function (req, res) {
  var params = req.query;
  var query =
    "DELETE FROM categories WHERE IDCategorie=" +
    params.IDCategorie +
    " AND Nom='" +
    params.Nom +
    "'";
  try {
    connection.query(query, function (error, results, fields) {
      if (error) throw error;
      res.status(204).send();
    });
  } catch (error) {
    console.log(error);
  }
});

// formulaire de création de catégorie
app.post("/createcate", function (req, res) {
  var params = req.body;
  try {
    connection.query(
      "SELECT MAX(IDCategorie) AS IDCate from categories",
      function (error, results, fields) {
        if (error) throw error;
        cateID = results[0].IDCate;
        connection.query(
          "INSERT INTO `categories` SET IDCategorie = " +
            (cateID + 1) +
            ", Nom = '" +
            params.Nom +
            "'",
          function (error, results, fields) {
            if (error) throw error;
            res.status(204).send();
          }
        );
      }
    );
  } catch (error) {
    console.log(error);
  }
});

// supprimer utilisateur
app.get("/delete/user", function (req, res) {
  var params = req.query;
  var query =
    "DELETE FROM utilisateurs WHERE IDUtilisateur=" + params.IDUtilisateur;
  try {
    connection.query(query, function (error, results, fields) {
      if (error) throw error;
      res.status(204).send();
    });
  } catch (error) {
    console.log(error);
  }
});

// supprimer annonce
app.get("/delete/annonce", function (req, res) {
  var params = req.query;
  const annonce = JSON.parse(params.Annonce);
  var query = "DELETE FROM annonces WHERE IDAnnonce=" + annonce.IDAnnonce;
  try {
    connection.query(query, function (error, results, fields) {
      if (error) throw error;
      res.status(204).send();
    });
  } catch (error) {
    console.log(error);
  }
});

// annonces bientot expirées
app.get("/search/annonces/expirees", function (req, res) {
  var query = "SELECT * from annonces ORDER BY DateFin ASC LIMIT 5;"
  try {
    connection.query(query, function (error, results, fields) {
      if (error) throw error;
      res.send(JSON.stringify(results));
    });
  } catch (error) {
    console.log(error);
  }
});

// suggestions annonces
app.get("/search/annonces/suggestions", function (req, res) {
  var params = req.query;
  var query = "SELECT * FROM annonces WHERE IDAnnonce NOT IN ("+params.IDs.join(',')+") ORDER BY RAND ( ) LIMIT 5;"
  try {
    connection.query(query, function (error, results, fields) {
      if (error) throw error;
      res.send(JSON.stringify(results));
    });
  } catch (error) {
    console.log(error);
  }
});