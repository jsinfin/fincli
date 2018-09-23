module.exports = (msg, exit) => {
  console.error(msg)
  exit && process.exit(1)
}
