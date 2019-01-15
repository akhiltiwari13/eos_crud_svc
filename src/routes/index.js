import { AccountController, TransactionController, HealthController, CoinController } from "../controller";
import * as Adapters from '../adapters';

const _checkAuthentication = (req, res, next) => {
  // TODO: check authentication
  next();
};

const _getBlockChain = (req, res, next) => {
  req.adapter = Adapters.getBlockchain(req.headers["blockchain"]);
  next();
};

const initRoutes = app => {
  // Health Check Routes
  app.get('/healthCheck', _checkAuthentication, HealthController.getStatus);

  // Coin Routes
  // app.get('/coin/:coinId/price', _checkAuthentication, _getBlockChain, CoinController.getPrice);

  // Account Routes
  app.get("/account/:accountName/balance", _checkAuthentication, _getBlockChain, AccountController.getBalance);
  // app.get("/account/:accountName/txnHistory", _checkAuthentication, _getBlockChain, AccountController.getTxnHistory);
  // app.post("/account", _checkAuthentication, AccountController.createAccount);

  // Transfer/Transaction Routes
  // app.get("/transaction/:txnId/status", _checkAuthentication, _getBlockChain, TransactionController.status);
  app.post("/transaction", _checkAuthentication, _getBlockChain, TransactionController.transaction);
};

export default initRoutes;