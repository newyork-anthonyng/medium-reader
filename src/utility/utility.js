function verifyMediumLink (link) {
  const index = link.indexOf('medium')
  const mediumLink = link.slice(index)

  return `https://${mediumLink}`
}

module.exports = {
  verifyMediumLink
}
