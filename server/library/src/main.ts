/*global process*/
import { start } from "./app";
const port: number = process.env.PORT || 3000;

start(port);

console.log("Server is listening on port", port);
