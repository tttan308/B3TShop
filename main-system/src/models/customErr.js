class customErr extends Error {
  constructor(message, sc) {
    super(message);
    this.statusCode = sc;
  }
}
module.exports = customErr;
