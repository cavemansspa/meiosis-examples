import Mapper from "url-mapper";
import { pages } from "./navigation";

export const createRouter = navigation => {
  const urlMapper = Mapper();

  const routes = {
    "/": { id: pages.home.id, action: navigation.navigateToHome },
    "/coffee/:id?": { id: pages.coffee.id, action: navigation.navigateToCoffee },
    "/beer": { id: pages.beer.id, action: navigation.navigateToBeer },
    "/beer/:id": { id: pages.beerDetails.id, action: navigation.navigateToBeerDetails }
  };

  const resolveRoute = () => {
    const route = document.location.hash.substring(1);
    const resolved = urlMapper.map(route, routes);
    if (resolved) {
      resolved.match.action(resolved.values);
    }
  };

  window.onpopstate = resolveRoute;

  const routeMap = Object.keys(routes).reduce((result, route) => {
    result[routes[route].id] = route;
    return result;
  }, {});

  const routeSync = model => {
    const segment = routeMap[model.page.id] || "/";
    const route = urlMapper.stringify(segment, model.params || {});
    if (document.location.hash.substring(1) !== route) {
      window.history.pushState({}, "", "#" + route);
    }
  };

  return { resolveRoute, routeSync };
};
