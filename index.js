import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core";
import { ApolloServer } from "apollo-server-express";
import express from "express";
import depthLimit from "graphql-depth-limit";
import mongoose from "mongoose";
import mongoDataMethods from "./data/db.js";
import resolvers from "./resolver/resolver.js";
import typeDefs from "./schema/schema.js";
import { createServer } from "http";
import { ApolloServerPluginDrainHttpServer } from "apollo-server-core";
import { makeExecutableSchema } from "@graphql-tools/schema";

// connect MongoDB

const connectDB = async () => {
  const mongoUrl = `mongodb+srv://phukhanhnguyen1997:WEhDgb1WWct2yis6@graphql.jvdid.mongodb.net/?retryWrites=true&w=majority`;
  await mongoose.connect(mongoUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
};

connectDB();

const schema = makeExecutableSchema({ typeDefs, resolvers });
const app = express();
const httpServer = createServer(app);
const server = new ApolloServer({
  schema,
  context: () => ({ mongoDataMethods }),
  validationRules: [depthLimit(3)],
  cache: "bounded",
  plugins: [
    ApolloServerPluginLandingPageGraphQLPlayground,
    // Proper shutdown for the HTTP server.
    ApolloServerPluginDrainHttpServer({ httpServer }),
  ],
});

await server.start();
server.applyMiddleware({ app, path: "/phukhanh/a/b/c" });

httpServer.listen({ port: 4000 }, () => {
  console.log(`Server start at localhost:4000${server.graphqlPath}`);
});
