import { registerApplication, start } from "single-spa";
import {
  constructApplications,
  constructRoutes,
  constructLayoutEngine,
} from "single-spa-layout";
import microfrontendLayout from "./microfrontend-layout.html";

const routes = constructRoutes(microfrontendLayout);
const applications = constructApplications({
  routes,
  loadApp({ name }) {
    return System.import(name);
  },
});
const layoutEngine = constructLayoutEngine({ routes, applications });

registerApplication({
  name: "@olympus/vanilla",
  app: () => System.import("@olympus/vanilla"),
  activeWhen: function ({ search }: Location): boolean {
    return (search || "").includes("show_clock");
  },
});

applications.forEach(registerApplication);
layoutEngine.activate();
start();
