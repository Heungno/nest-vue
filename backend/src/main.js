"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var core_1 = require("@nestjs/core");
var common_1 = require("@nestjs/common");
var cookieParser = require("cookie-parser");
var helmet = require("helmet");
var csurf = require("csurf");
var app_module_1 = require("./app.module");
var nest_winston_1 = require("nest-winston");
var logger_option_1 = require("./configs/logger.option");
var nest_winston_2 = require("nest-winston");
function bootstrap() {
    return __awaiter(this, void 0, void 0, function () {
        var logger, nestAppOptions, app, port;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    logger = nest_winston_1.WinstonModule.createLogger(logger_option_1.winstonOption.option);
                    nestAppOptions = {
                        logger: logger
                    };
                    return [4 /*yield*/, core_1.NestFactory.create(app_module_1.AppModule, nestAppOptions)];
                case 1:
                    app = _a.sent();
                    console.log(JSON.stringify(nest_winston_2.utilities.format.nestLike('API')));
                    // 전역 범위 파이프
                    app.useGlobalPipes(new common_1.ValidationPipe({
                        whitelist: true,
                        forbidNonWhitelisted: true,
                        transform: true
                    }));
                    // global prefix
                    app.setGlobalPrefix(process.env.ROUTE_PREFIX || 'api');
                    app.use(cookieParser());
                    // Security
                    app.use(helmet());
                    app.use(csurf({ cookie: true }));
                    app.enableCors({
                        origin: 'http://heung.win:3000',
                        credentials: true
                    });
                    port = process.env.PORT || 3000;
                    return [4 /*yield*/, app.listen(port, function () {
                            return logger.log("\uD83D\uDE80 \uC560\uD50C\uB9AC\uCF00\uC774\uC158 \uC2DC\uC791 {PORT: " + port + ", NODE_ENV: " + process.env.NODE_ENV + "}", 'main');
                        })];
                case 2:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
bootstrap();