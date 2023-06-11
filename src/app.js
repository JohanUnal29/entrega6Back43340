import express from "express";
import handlebars from "express-handlebars";
import { Server } from "socket.io";
import { ProductManager } from "./manager/productManager.js";
import { realTimeProducts } from "./routes/real-time-products.routes.js";
import { __dirname, connectMongo} from "./utils.js";
import { routerUsers } from "./routes/users.router.js";

const app = express();
const port = 8080;

connectMongo();

const productManager = new ProductManager();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// CONFIGURACION DEL MOTORO DE HANDLEBARS
app.engine("handlebars", handlebars.engine());
app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");

//archivos publicos
app.use(express.static(__dirname + "/public"));

app.get("/", async (req, res) => {
  const allProducts = await productManager.getProducts();
  res.render("home", {allProducts})
});

//probando mongo
app.use("/api/users", routerUsers);

/* VISTA SOCKET */
app.use("/realtimeproducts", realTimeProducts)

app.get("*", (req, res) => {
  return res.status(404).json({
    status: "error",
    msg: "Page not found",
    data: {},
  });
});

const httpServer = app.listen(port, () => {
  console.log(`Server running on port http://localhost:${port}`);
});

const socketServer = new Server(httpServer);

socketServer.on("connection", (socket) => {

  socket.on("new-product-created", async (newProduct) => {
    const productCreated = await productManager.addProduct(newProduct);
    if (productCreated) {
      const productList = await productManager.getProducts();
      socketServer.emit("products", productList);
    } else {
      socketServer.emit("products", productCreated)
    }
  });

  socket.on("delete-product", async (idToDelete) => {
    await productManager.deleteProduct(idToDelete);
    socketServer.emit("delete-product-in-table", idToDelete);
  })
});

