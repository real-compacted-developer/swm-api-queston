import "./utils/load-env";
import app from "./server";

// Start the server
const port = Number(process.env.PORT || 3000);
if (process.env.NODE_ENV === "development") {
  console.log("listen port", process.env.PORT || 3000);
}
if (process.env.NODE_ENV === "test") {
  console.log("test mode. the port is", process.env.PORT || 3000);
}

app.listen(port);
