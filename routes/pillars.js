var express = require("express");
const PillarController = require("../controllers/PillarsController");

var router = express.Router();

router.get("/", PillarController.pillarList);
router.get("/:id", PillarController.getPillarById);
router.post("/", PillarController.addPillar);
router.put("/:id", PillarController.pillarUpdate);
router.delete("/:id", PillarController.pillarDelete);

module.exports = router;