#!/usr/bin/env node
import { StudiesSelfserviceDemoBackendApi } from "../src/Adapter/Api/StudiesSelfserviceDemoBackendApi.mjs";

try {
    const studies_selfservice_demo_backend_api = StudiesSelfserviceDemoBackendApi.new();

    await studies_selfservice_demo_backend_api.init();

    studies_selfservice_demo_backend_api.runServer();
} catch (error) {
    console.error(error);

    process.exit(1);
}
