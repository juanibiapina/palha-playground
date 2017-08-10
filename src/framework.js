export const start = (data) => {
  let currentModel = data.initialModel;
  let nextCommand = null;

  const runCommand = (command) => {
    nextCommand = command;
  };

  const dispatch = (action) => {
    currentModel = data.update(currentModel, action, runCommand);

    if (nextCommand) {
      perform(nextCommand)
        .then((result) => {
          currentModel = data.update(currentModel, result, runCommand);
          // next command again, oops
          data.renderer(data.view(currentModel, dispatch));
        })
        .catch((result) => {
          currentModel = data.update(currentModel, result, runCommand);
          // next command again, oops
          data.renderer(data.view(currentModel, dispatch));
        });

      nextCommand = null;
    }

    data.renderer(data.view(currentModel, dispatch));
  };

  data.renderer(data.view(currentModel, dispatch))
};

export const Http = {
  send: (tagger, request) => ({
    type: "HTTP_REQUEST",
    tagger,
    request,
  }),
  request: (request) => request,
};

const perform = (command) => {
  if (command.type === "HTTP_REQUEST") {
    return new Promise((resolve, reject) => {
      const request = command.request;

      fetch(request.url, {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        method: request.method,
        body: JSON.stringify(request.body),
      })
        .then((response) => resolve(command.tagger(response)))
        .catch((response) => reject(command.tagger(response)));
    });
  }
};
