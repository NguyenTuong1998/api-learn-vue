const jsonServer = require("json-server");
const server = jsonServer.create();


const fs = require('fs')
const path = require('path')
const filePath = path.join('db.json')
const data = fs.readFileSync(filePath, "utf-8");
const db = JSON.parse(data);
const router = jsonServer.router(db)

const middlewares = jsonServer.defaults();

server.use(middlewares);
// Add this before server.use(router)
server.use(
	// Add custom route here if needed
	jsonServer.rewriter({
		"/api/*": "/$1",
	})
);
server.use(router);
server.listen(3000, () => {
	console.log("JSON Server is running");
});

// Export the Server API
module.exports = server;
