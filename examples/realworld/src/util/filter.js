import { assoc } from "../util/fp"
import { selectors } from "../state"

export const getArticlesFilter = state => {
  const filter = ["feed", "offset", "tag"].reduce(
    (result, param) => assoc(param, selectors.params(state)[param], result),
    {}
  )
  filter.offset = Number(filter.offset) || 0
  filter.limit = 10

  return filter
}
