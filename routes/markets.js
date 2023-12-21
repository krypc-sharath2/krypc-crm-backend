var express = require("express");
const MarketController = require("../controllers/MarketResearchController");

var router = express.Router();

router.get("/", MarketController.marketList);
router.get("/:id", MarketController.getMarketById);
router.post("/", MarketController.addMarket);
router.put("/:id", MarketController.marketUpdate);
router.delete("/:id", MarketController.marketDelete);

module.exports = router;