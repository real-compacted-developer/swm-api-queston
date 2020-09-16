import "./utils/load-env";
import app from "./server";

// Start the server
const port = Number(process.env.PORT || 3000);
app.listen(port);
