const O = require("patchinko/constant")
const R = require("ramda")

const { actions } = require("./actions")
const { view } = require("./view")

const RandomGif = require("../random-gif")

module.exports = {
  model: () => ({
    randomGifIds: []
  }),
  actions,
  dependencies: [ { component: RandomGif, key: "randomGif" } ],
  view,
  state: model => ({
    randomGifList: O({
      hasGifs: R.any(
        R.equals("Y"),
        R.map(R.path(["image", "value", "value", "case"]),
          R.map(id => R.prop(id, model), model.randomGifList.randomGifIds)
        )
      )
    })
  })
}
