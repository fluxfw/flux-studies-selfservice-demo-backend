#!/usr/bin/env node
import { StudiesSelfserviceDemoBackendApi } from "../src/Adapter/Api/StudiesSelfserviceDemoBackendApi.mjs";

try {
    process.on("uncaughtException", console.error);
    process.on("unhandledRejection", console.error);

    process.on("SIGINT", process.exit);
    process.on("SIGTERM", process.exit);

    const studies_selfservice_demo_backend_api = StudiesSelfserviceDemoBackendApi.new();

    await studies_selfservice_demo_backend_api.init();

    await studies_selfservice_demo_backend_api.runServer();
} catch (error) {
    console.error(error);

    process.exit(1);
}
