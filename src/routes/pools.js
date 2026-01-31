const express = require("express");
const { getPoolsWithYield } = require("../services/yieldService");

const router = express.Router();

router.get("/:token", async (req, res) => {
  try {
    const token = req.params.token.toLowerCase();
    const data = await getPoolsWithYield(token);
    res.json({ count: data.length, pools: data });
  } catch (e) {
    res.status(500).json({ error: "failed" });
  }
});

module.exports = router;
