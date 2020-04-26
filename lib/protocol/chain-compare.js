module.exports = function (a, b) {
  if (a.length === 0 && b.length === 0) {
    return 0
  } else if (a.length !== b.length) {
    return (a.length - b.length < 0) ? -1 : 1
  }

  // Both chains have non-zero length
  const linkA = a.links[a.links.length - 1]
  const linkB = b.links[b.links.length - 1]

  return Buffer.compare(linkA.trusteePubKey, linkB.trusteePubKey)
}
