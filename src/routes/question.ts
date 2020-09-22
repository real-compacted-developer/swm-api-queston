import { Router } from "express";

const router = Router();

router.get("/echo", (req, res) => {
  res.send("echo");
});

export default router;
