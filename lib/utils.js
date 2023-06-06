const cn = (...args) => {
  return args.filter(Boolean).join(" ");
};

const isValidURL = (string) => {
  // include / end the end of the url or extra paths like /about/?-87
  var res = string.match(
    /^(?:https?:\/\/)?(?:www\.)?(?:[\w-]+\.)*([\w-]{2,})(?:\.\w{2,})+(?:\/.*)?$/
  );
  return res !== null;
};

export { cn, isValidURL };
