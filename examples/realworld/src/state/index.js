export const selectors = {
  route: state => state.route,
  page: state => selectors.route(state).value,
  params: state => selectors.route(state).params,
  toRoute: (page, params = {}, options = {}) => ({
    value: page,
    params,
    ...options
  }),
  fromRoute: route => ({ page: route.value, params: route.params })
}
