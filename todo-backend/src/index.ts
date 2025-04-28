import { serve } from "@hono/node-server";
import {cors} from "hono/cors"
import { Axios } from "../axiosInstance.ts";
// Create a new Hono app
const app = new Hono();
app.use(
	cors({
		origin: ['http://localhost:5173'], // Your frontend application
	})
);

app.use(logger());

app.get("/", (c) => {
  return c.text("Hello Hono!");
});

app.route("", mainRouter);

serve(
  {
    fetch: app.fetch,
    port: 8000,
  },
  (info) => {
    console.log(`Server is running on http://localhost:${info.port}`);
  }
);
