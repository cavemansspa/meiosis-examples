import { append, assoc } from "ramda";
import { Action } from "./action";
import { createLabeledSliderWidget } from "../labeledSlider/widget";

const updateMeasurement = update => measurement =>
  update.id === measurement.id
    ? assoc("model", measurement.update(update.action)(measurement.model), measurement)
    : measurement;

const rnd = (min, max) => Math.round(Math.random() * min) + (max || 0);

// handler : Model -> [ model, Maybe (Task Action) ]
const handler = model => ({
  NoOp: () => [model],
  AddMeasurement: subaction => [
    assoc("nextId",
      model.nextId + 1,
      assoc("measurements",
        append(
          createLabeledSliderWidget(
            model.nextId,
            subaction(model.nextId),
            {
              label: "Measurement",
              value: rnd(50),
              max: rnd(50,100),
              units: rnd(10) % 2 === 0 ? "cm" : "mm"
            }
          ),
          model.measurements
        ),
        model
      )
    )
  ],
  RemoveMeasurement: id => [
    assoc("measurements", model.measurements.filter(m => m.id !== id), model)
  ],
  UpdateMeasurement: update => [
    assoc("measurements", model.measurements.map(updateMeasurement(update)), model)
  ]
});

// update : Action -> Model -> [ model, Maybe (Task Action) ]
const update = action => model => Action.case(handler(model), action);

export { update };
