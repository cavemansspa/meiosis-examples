import { articlesApi, loadArticlesAndTags } from "../services"
import { Route } from "../router"
import { get, pick } from "../util/fp"
import { getArticlesFilter } from "../util/filter"

export const Effect = update => state => {
  if (state.route.page === Route.Home && state.loading) {
    const filter = getArticlesFilter(state.route)

    get(state, ["route", "params", "queryParams", "feed"])
      ? articlesApi
          .getFeed(pick(["limit", "offset"], filter))
          .then(data => update([data, { loading: false }]))
      : loadArticlesAndTags(filter).then(data => update([data, { loading: false }]))
  }
}
