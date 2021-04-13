let makePath = (str) => {
  var result = str;
  for (var i = 0; i < result.length; i++) {
    if (result[i] === ' ' && (i > 0 && result[i-1] !== '-')) {
      result = result.replace(' ', '-');
    }
    else if (!result[i].match(/[A-Za-z0-9]/i)) {
      result = result.slice(0, i) + result.slice(i+1, result.length);
      i--;
    }
  }
  result = result.toLowerCase();
  return result;
}

module.exports = makePath;
