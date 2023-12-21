var express = require("express");
const PillarController = require("../controllers/PillarsController");
const bodyParser = require("body-parser");

var router = express.Router();

router.get("/", PillarController.pillarList);
router.get("/:id", PillarController.getPillarById);
router.post("/", bodyParser.json(),PillarController.addPillar);
router.put("/:id", PillarController.pillarUpdate);
router.delete("/:id", PillarController.pillarDelete);

module.exports = router;