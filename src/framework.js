export const start = (data) => {
  let currentModel = data.initialModel;

  const dispatch = (action) => {
    currentModel = data.update(currentModel, action);

    data.renderer(data.view(currentModel, dispatch));
  };

  data.renderer(data.view(currentModel, dispatch))
};
