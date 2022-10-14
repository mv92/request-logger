const getCircularReplacer = () => {
  const seen = new WeakSet();
  return (key, value) => {
    if (key[0] === '_') return;

    else if (typeof value === "object" && value !== null) {
      if (seen.has(value)) {
        return;
      }
      seen.add(value);
    }
    return value;
  };
};

module.exports = getCircularReplacer;
