"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const Shared_1 = require("./domain/Shared");
const server = app_1.default;
server.listen(Shared_1.Shared.PORT, () => {
    console.log(`Server listening on port ${Shared_1.Shared.PORT}`);
});
